import { useState } from 'react'
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu, ConfigProvider, App as AntApp, Select } from 'antd'
import { useTranslation } from 'react-i18next'
import zhCN from 'antd/locale/zh_CN'
import zhTW from 'antd/locale/zh_TW'
import enUS from 'antd/locale/en_US'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/zh-tw'
import i18n, { LANGUAGES } from './i18n'
import Record from './pages/Record'
import Bills from './pages/Bills'
import Categories from './pages/Categories'
import Stats from './pages/Stats'

const { Sider, Content } = Layout

const antdLocales = { 'zh-CN': zhCN, 'zh-TW': zhTW, en: enUS }

function Shell({ onChangeLanguage }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { key: '/', label: t('menu.record') },
    { key: '/bills', label: t('menu.bills') },
    { key: '/categories', label: t('menu.categories') },
    { key: '/stats', label: t('menu.stats') }
  ]

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider theme="light" width={180} style={{ borderRight: '1px solid #f0f0f0' }}>
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            padding: '22px 20px',
            color: '#1677ff',
            whiteSpace: 'nowrap'
          }}
        >
          MyBill
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={(e) => navigate(e.key)}
          style={{ border: 'none' }}
        />
        <div style={{ padding: '12px 16px' }}>
          <Select
            value={i18n.language}
            onChange={onChangeLanguage}
            options={LANGUAGES.map((l) => ({ value: l.code, label: l.label }))}
            style={{ width: '100%' }}
          />
        </div>
      </Sider>
      <Layout>
        <Content style={{ padding: 24, overflow: 'auto', background: '#f5f5f5' }}>
          <Routes>
            <Route path="/" element={<Record />} />
            <Route path="/bills" element={<Bills />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}

export default function App() {
  const [locale, setLocale] = useState(antdLocales[i18n.language] || zhCN)

  const changeLanguage = (code) => {
    i18n.changeLanguage(code)
    localStorage.setItem('lang', code)
    setLocale(antdLocales[code])
    dayjs.locale(code === 'zh-TW' ? 'zh-tw' : code === 'en' ? 'en' : 'zh-cn')
  }

  return (
    <ConfigProvider locale={locale}>
      <AntApp>
        <HashRouter>
          <Shell onChangeLanguage={changeLanguage} />
        </HashRouter>
      </AntApp>
    </ConfigProvider>
  )
}
