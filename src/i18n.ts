import { useEffect, useState } from 'react'
import en from '../locales/en/common.json'
import ar from '../locales/ar/common.json'

export type Lang = 'en' | 'ar'
type Dict = Record<string, string>
const dicts: Record<Lang, Dict> = { en: en as Dict, ar: ar as Dict }

export function useI18n(storageKey: string) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      return saved === 'ar' || saved === 'en' ? saved : 'en'
    } catch { return 'en' }
  })
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    try { localStorage.setItem(storageKey, lang) } catch { /* storage unavailable */ }
  }, [lang, storageKey])
  const t = (key: string): string => dicts[lang][key] ?? dicts.en[key] ?? key
  return { lang, setLang, t, dir: lang === 'ar' ? 'rtl' : 'ltr' as const }
}
