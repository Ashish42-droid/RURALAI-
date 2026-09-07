import React, { useState, useMemo, useEffect } from 'react';
import { Languages, Search, Check, AlertTriangle } from 'lucide-react';
import { useI18n } from '../i18n/index.jsx';

/**
 * Choosing a language, on the first visit and afterwards.
 *
 * Shown before the app because the first thing this interface asks anyone to do
 * is read. A health worker who cannot read the sign-in screen cannot get past
 * it to find a language menu, so the menu comes first.
 *
 * Every option is written in its own script. Someone looking for Punjabi scans
 * for "ਪੰਜਾਬੀ"; a romanised "Punjabi" is invisible to a reader who does not use
 * the Latin alphabet, which is precisely the reader this screen exists for.
 * The English name is kept alongside, smaller, for anyone who is looking for it
 * that way and for search.
 *
 * Unreviewed locales are marked rather than hidden. This is a clinical
 * interface and a wrong word in a triage label has consequences, so the screen
 * says which translations a qualified speaker has checked. It does not block
 * the choice: someone who reads Santali is better served by imperfect Santali
 * than by fluent English they cannot read.
 */

function LanguageList({ value, onPick, query, setQuery, t }) {
  const { languages } = useI18n();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return languages;
    return languages.filter((l) =>
      l.native.toLowerCase().includes(q)
      || l.english.toLowerCase().includes(q)
      || l.code.includes(q));
  }, [languages, query]);

  return (
    <>
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('lang.search', 'Search languages')}
          aria-label={t('lang.search', 'Search languages')}
          className="w-full rounded-field border border-line bg-surface pl-9 pr-3 py-2.5 text-sm text-ink outline-none focus:border-gov-600"
        />
      </div>

      <div className="mt-3 max-h-[46vh] overflow-y-auto -mx-1 px-1">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {filtered.map((l) => {
            const active = l.code === value;
            return (
              <button
                key={l.code}
                type="button"
                onClick={() => onPick(l.code)}
                aria-pressed={active}
                className={[
                  'relative text-left rounded-field border px-3 py-2.5 transition-colors',
                  active
                    ? 'border-gov-600 bg-gov-50 dark:bg-gov-100'
                    : 'border-line hover:border-gov-600/50 hover:bg-surface-sunken'
                ].join(' ')}
              >
                {active && (
                  <Check className="w-3.5 h-3.5 absolute top-2 right-2 text-gov-600 dark:text-gov-500" />
                )}
                {/* The script itself is the label. `lang` lets the browser pick
                    the right font for each row rather than one fallback for all. */}
                <span lang={l.code} dir={l.rtl ? 'rtl' : 'ltr'} className="block text-base font-semibold text-ink leading-snug">
                  {l.native}
                </span>
                <span className="block text-[11px] text-ink-muted mt-0.5">
                  {l.english}
                  {!l.reviewed && <span className="text-tier-moderate"> ·&nbsp;unreviewed</span>}
                </span>
              </button>
            );
          })}
        </div>

        {!filtered.length && (
          <p className="text-xs text-ink-muted py-6 text-center">
            {t('lang.search', 'Search languages')} — 0
          </p>
        )}
      </div>
    </>
  );
}

/** The blocking first-visit screen. Renders nothing once a choice exists. */
export function LanguageGate() {
  const { chosen, choose, lang, suggested, t, languages } = useI18n();
  const [pending, setPending] = useState(() => suggested || lang);
  const [query, setQuery] = useState('');

  // Nothing below should run for the overwhelming majority of visits.
  useEffect(() => {
    if (chosen || typeof document === 'undefined') return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [chosen]);

  if (chosen) return null;

  const picked = languages.find((l) => l.code === pending);

  return (
    <div className="fixed inset-0 z-[100] bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-card bg-surface shadow-2xl border border-line overflow-hidden">
        <div className="px-5 py-4 border-b border-line flex items-center gap-3">
          <Languages className="w-5 h-5 text-gov-600 dark:text-gov-500 shrink-0" />
          <div className="min-w-0">
            {/* Deliberately bilingual: the person reading this has not chosen a
                language yet, so the heading cannot rely on either one. */}
            <h1 className="text-base font-bold text-ink leading-tight">
              भाषा चुनें · Choose your language
            </h1>
            <p className="text-[11px] text-ink-muted mt-0.5">
              {t('lang.subtitle', 'You can change this at any time.')}
            </p>
          </div>
        </div>

        <div className="p-5">
          <LanguageList value={pending} onPick={setPending} query={query} setQuery={setQuery} t={t} />

          {picked && !picked.reviewed && (
            <div className="mt-3 flex items-start gap-2 p-2.5 rounded-field bg-tier-moderateBg border border-tier-moderate/30">
              <AlertTriangle className="w-4 h-4 text-tier-moderate shrink-0 mt-0.5" />
              <p className="text-[11px] text-ink">
                {t('lang.unreviewed', 'This translation has not yet been checked by a qualified speaker. Clinical wording may be imperfect.')}
              </p>
            </div>
          )}
        </div>

        <div className="px-5 py-4 border-t border-line bg-surface-sunken">
          <button
            type="button"
            onClick={() => choose(pending)}
            className="w-full py-3 rounded-field bg-gov-600 hover:bg-gov-700 text-white font-semibold text-sm transition-colors"
          >
            {t('lang.continue', 'Continue')}
            {picked && <span className="opacity-80 font-normal"> · {picked.native}</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

/** The switcher for afterwards. Same list, in a popover. */
export function LanguageSwitcher({ className = '' }) {
  const { language, choose, lang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={t('lang.switch', 'Language')}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-field border border-line text-xs font-semibold text-ink-muted hover:text-ink hover:bg-surface-sunken transition-colors"
      >
        <Languages className="w-3.5 h-3.5" />
        <span lang={language.code}>{language.native}</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="absolute right-0 mt-2 w-[19rem] sm:w-[24rem] z-50 rounded-card bg-surface border border-line shadow-xl p-3">
            <LanguageList
              value={lang}
              onPick={(code) => { choose(code); setOpen(false); }}
              query={query}
              setQuery={setQuery}
              t={t}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default LanguageGate;
