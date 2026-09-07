import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { LANGUAGES, DEFAULT_LANGUAGE, LANGUAGE_BY_CODE, isRtl, suggestedLanguage } from './languages.js';
import { CATALOG } from './catalog.js';

/**
 * Translation, centrally.
 *
 * Deliberately not i18next. The app ships three large dependencies already and
 * this needs exactly three things — a key lookup, a fallback chain and a stored
 * preference. A library for that is 40 KB across a rural connection to solve a
 * problem forty lines solve, and the brief was explicitly to keep performance
 * unchanged.
 *
 * ── The fallback chain, and why it never shows a key ─────────────────────────
 *
 *   chosen language -> English -> the key's own default -> the key
 *
 * A missing translation renders readable English, never `nav.dashboard`. That
 * matters more here than the usual reason: this is a clinical screen, and a
 * health worker who sees a raw key does not get a degraded experience, they get
 * an unusable one. Partial coverage in a new locale is therefore safe to ship —
 * translated where translated, English where not.
 */

const STORAGE_KEY = 'vvc_lang';
const CHOSEN_KEY = 'vvc_lang_chosen';

const I18nContext = createContext(null);

const readStored = () => {
  try {
    const code = localStorage.getItem(STORAGE_KEY);
    return code && LANGUAGE_BY_CODE[code] ? code : null;
  } catch {
    return null;
  }
};

const readChosen = () => {
  try { return localStorage.getItem(CHOSEN_KEY) === 'yes'; } catch { return false; }
};

/** Resolve a dotted key against one locale's catalog. */
const lookup = (locale, key) => {
  const table = CATALOG[locale];
  if (!table) return undefined;
  return table[key];
};

export const I18nProvider = ({ children }) => {
  const [lang, setLang] = useState(() => readStored() || DEFAULT_LANGUAGE);
  // Whether the user has ever made an explicit choice. Drives the first-visit
  // gate, and is separate from `lang` so a stored default is not mistaken for
  // a decision.
  const [chosen, setChosen] = useState(readChosen);

  const choose = useCallback((code) => {
    if (!LANGUAGE_BY_CODE[code]) return;
    setLang(code);
    setChosen(true);
    try {
      localStorage.setItem(STORAGE_KEY, code);
      localStorage.setItem(CHOSEN_KEY, 'yes');
    } catch { /* preference simply will not persist */ }
  }, []);

  /*
   * Tell the document what it is rendering.
   *
   * `lang` lets the browser pick correct fonts and hyphenation for Indic
   * scripts, and lets a screen reader switch voice. `dir` is not cosmetic for
   * Urdu, Kashmiri and Sindhi — without it the whole interface reads backwards.
   */
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl(lang) ? 'rtl' : 'ltr';
  }, [lang]);

  /**
   * t('some.key', 'English default', { name: 'x' })
   *
   * The English default sits at the call site on purpose. It keeps the JSX
   * readable, and it guarantees that a key nobody has translated yet still
   * renders a real sentence.
   */
  const t = useCallback((key, fallback = '', vars = null) => {
    let out = lookup(lang, key);
    if (out === undefined && lang !== DEFAULT_LANGUAGE) out = lookup(DEFAULT_LANGUAGE, key);
    if (out === undefined) out = fallback || key;

    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        out = out.split(`{${k}}`).join(String(v));
      }
    }
    return out;
  }, [lang]);

  const value = useMemo(() => ({
    lang,
    language: LANGUAGE_BY_CODE[lang] || LANGUAGE_BY_CODE[DEFAULT_LANGUAGE],
    languages: LANGUAGES,
    chosen,
    choose,
    suggested: suggestedLanguage(),
    rtl: isRtl(lang),
    t
  }), [lang, chosen, choose, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
};

/** Shorthand for the common case. */
export const useT = () => useI18n().t;
