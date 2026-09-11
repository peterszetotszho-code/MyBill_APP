import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import zh_CN from './zh_CN'
import zh_TW from './zh_TW'
import en from './en'

export const LANGUAGES = [
  { code: 'zh-CN', label: '简体中文' },
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'en', label: 'English' }
]

const savedLang = localStorage.getItem('lang') || 'zh-CN'

i18n.use(initReactI18next).init({
  resources: {
    'zh-CN': { translation: zh_CN },
    'zh-TW': { translation: zh_TW },
    en: { translation: en }
  },
  lng: savedLang,
  fallbackLng: 'zh-CN',
  interpolation: { escapeValue: false }
})

// 根据当前语言取分类树节点的显示名（getCategories 返回 name/nameTw/nameEn）
export function localName(item, lang) {
  if (lang.startsWith('zh-TW')) return item.nameTw || item.name
  if (lang.startsWith('en')) return item.nameEn || item.name
  return item.name
}

// 根据当前语言取账单记录的分类名（getExpenses 返回 category_name/_tw/_en 等）
export function localExpenseNames(r, lang) {
  const tw = lang.startsWith('zh-TW')
  const en = lang.startsWith('en')
  return {
    category: tw
      ? r.category_name_tw || r.category_name
      : en
        ? r.category_name_en || r.category_name
        : r.category_name,
    parent: tw ? r.parent_name_tw || r.parent_name : en ? r.parent_name_en || r.parent_name : r.parent_name
  }
}

// 根据当前语言取统计记录的一级分类名（getStats 返回 parent_name/_tw/_en）
export function localParentName(r, lang) {
  const tw = lang.startsWith('zh-TW')
  const en = lang.startsWith('en')
  return tw ? r.parent_name_tw || r.parent_name : en ? r.parent_name_en || r.parent_name : r.parent_name
}

export default i18n
