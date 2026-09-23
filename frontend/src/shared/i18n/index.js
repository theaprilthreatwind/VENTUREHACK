/**
 * Публичный API слайса i18n.
 */
export { LanguageProvider } from "./model/LanguageProvider";
export { useLang } from "./model/useLang";
export { LanguageSwitcher } from "./ui/LanguageSwitcher";
export {
  countWord,
  getCurrentLanguage,
  resolveText,
  SUPPORTED_LANGS,
  translateText,
} from "./config/translations";