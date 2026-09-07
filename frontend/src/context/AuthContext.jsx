import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { getToken, getUser, setSession, setUser as storeUser, clearSession as wipeSession } from '../services/session.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser);
  // Per tab, so signing in as the doctor next door cannot change who this tab
  // is. See services/session.js.
  const [token, setToken] = useState(getToken);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  const clearSession = useCallback(() => {
    wipeSession();
    setToken(null);
    setUser(null);
  }, []);

  /**
   * Revalidate the stored session against the API on load.
   *
   * The cached user object holds a role, and the app renders navigation from
   * it. That cache is client-side and therefore editable, so it is confirmed
   * against GET /auth/me before it is used — if the account was suspended or
   * its role changed, this is where the stale session is dropped. The server
   * re-checks the role on every request regardless; this only keeps the UI
   * from showing controls that would fail.
   */
  useEffect(() => {
    let cancelled = false;

    const revalidate = async () => {
      if (!token) { setReady(true); return; }
      try {
        const res = await api.get('/auth/me');
        if (!cancelled) {
          setUser(res.data.user);
          storeUser(res.data.user);
        }
      } catch {
        if (!cancelled) clearSession();
      } finally {
        if (!cancelled) setReady(true);
      }
    };

    revalidate();
    return () => { cancelled = true; };
    // Runs once on mount; a token change comes from login/logout, which set
    // user state directly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token: jwtToken, user: profile } = res.data;
      setSession(jwtToken, profile);
      setToken(jwtToken);
      setUser(profile);
      return profile;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Local cleanup proceeds regardless — a failed call must not strand the
      // user in a signed-in-looking state.
    }
    clearSession();
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, ready, loginUser, logoutUser, clearSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
