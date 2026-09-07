/**
 * Where the signed-in session lives.
 *
 * It used to live in localStorage alone, and localStorage is shared by every
 * tab on the origin. That is fine for one person doing one job, and wrong for
 * the thing this platform is built around: a consultation has two ends, and
 * demonstrating or testing one means signing in as the assistant in one tab and
 * the doctor in another.
 *
 * When the second tab signed in, it overwrote the first tab's token. The first
 * tab carried on rendering the assistant's screen from React state that had
 * never changed, while every request it made went out as the doctor. The
 * symptoms looked unrelated and were reported as two separate faults:
 *
 *   "Access denied. This operation requires: CLINIC_ASSISTANT" when sending a
 *   case — the assistant's own screen, refused for not being an assistant.
 *
 *   The video call never connecting — both tabs authenticated as the same
 *   person, so the call had one participant twice and the other end never
 *   arrived.
 *
 * ── The rule ────────────────────────────────────────────────────────────────
 *
 * A tab's identity is its own. It is read from sessionStorage, which no other
 * tab can write, so signing in somewhere else can never change who this tab is.
 *
 * localStorage is kept, but demoted to a starting point: a newly opened tab
 * with no identity of its own adopts it, so closing and reopening the app does
 * not force a fresh sign-in on a phone. The moment a tab adopts or is given a
 * token it copies it into sessionStorage, and from then on it is immune.
 *
 * Every accessor is wrapped: private browsing and locked-down site data make
 * these throw rather than return null, and a storage exception must not take
 * the app down.
 */

const TOKEN_KEY = 'vvc_token';
const USER_KEY = 'vvc_user';

const safeGet = (store, key) => {
  try { return store.getItem(key); } catch { return null; }
};
const safeSet = (store, key, value) => {
  try { store.setItem(key, value); } catch { /* storage unavailable; session lives in memory */ }
};
const safeRemove = (store, key) => {
  try { store.removeItem(key); } catch { /* nothing to clean up */ }
};

/**
 * This tab's token.
 *
 * Adopts the shared one exactly once, on a tab that has no identity yet, and
 * immediately makes it this tab's own so a later sign-in elsewhere cannot
 * reach it.
 */
export const getToken = () => {
  const own = safeGet(sessionStorage, TOKEN_KEY);
  if (own) return own;

  const inherited = safeGet(localStorage, TOKEN_KEY);
  if (inherited) safeSet(sessionStorage, TOKEN_KEY, inherited);
  return inherited;
};

export const getUser = () => {
  const raw = safeGet(sessionStorage, USER_KEY) || safeGet(localStorage, USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    // A corrupt entry should sign the user out, not white-screen the app.
    safeRemove(sessionStorage, USER_KEY);
    safeRemove(localStorage, USER_KEY);
    return null;
  }
};

/**
 * Record a sign-in.
 *
 * sessionStorage is this tab's identity. localStorage is only the default the
 * *next* new tab will start from — writing it here cannot disturb a tab that
 * already has one of its own, which is the whole point.
 */
export const setSession = (token, user) => {
  safeSet(sessionStorage, TOKEN_KEY, token);
  safeSet(localStorage, TOKEN_KEY, token);
  const serialised = JSON.stringify(user);
  safeSet(sessionStorage, USER_KEY, serialised);
  safeSet(localStorage, USER_KEY, serialised);
};

/** Store a refreshed profile without touching the token. */
export const setUser = (user) => {
  const serialised = JSON.stringify(user);
  safeSet(sessionStorage, USER_KEY, serialised);
  safeSet(localStorage, USER_KEY, serialised);
};

export const clearSession = () => {
  for (const store of [sessionStorage, localStorage]) {
    safeRemove(store, TOKEN_KEY);
    safeRemove(store, USER_KEY);
  }
};

export const hasToken = () => Boolean(getToken());
