import { useState, useEffect } from 'react'
import { Card, DatePicker, Table, Button, Popconfirm, Space, App } from 'antd'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { localExpenseNames } from '../i18n'

function Bills() {
  const { t, i18n } = useTranslation()
  const { message } = App.useApp()
  const [month, setMonth] = useState(dayjs())
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  const load = (m) => {
    setLoading(true)
    window.api
      .getExpenses({ month: m.format('YYYY-MM') })
      .then((rows) => {
        setList(rows)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    load(month)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onMonthChange = (m) => {
    setMonth(m)
    load(m)
  }

  const del = async (id) => {
    await window.api.deleteExpense(id)
    message.success(t('bills.deleted'))
    load(month)
  }

  const columns = [
    { title: t('bills.date'), dataIndex: 'date', width: 110 },
    {
      title: t('bills.category'),
      dataIndex: 'parent_name',
      width: 190,
      render: (_, r) => {
        const n = localExpenseNames(r, i18n.language)
        return `${n.parent} / ${n.category}`
      }
    },
    {
      title: t('bills.amount'),
      dataIndex: 'amount',
      width: 120,
      render: (v) => <span style={{ color: '#f5222d', fontWeight: 600 }}>{Number(v).toFixed(2)}</span>
    },
    {
      title: t('bills.payment'),
      dataIndex: 'payment',
      width: 110,
      render: (v) => t(`payment.${v}`, { defaultValue: v })
    },
    { title: t('bills.note'), dataIndex: 'note', ellipsis: true },
    {
      title: t('bills.action'),
      width: 90,
      render: (_, r) => (
        <Popconfirm title={t('bills.deleteConfirm')} onConfirm={() => del(r.id)}>
          <Button size="small" danger>
            {t('bills.delete')}
          </Button>
        </Popconfirm>
      )
    }
  ]

  const total = list.reduce((s, r) => s + Number(r.amount), 0)

  return (
    <Card
      title={t('bills.title')}
      extra={
        <Space>
          <DatePicker picker="month" value={month} onChange={onMonthChange} allowClear={false} />
        </Space>
      }
    >
      <div style={{ marginBottom: 12 }}>
        {t('bills.count', { count: list.length })} · {t('bills.total')}{' '}
        <span style={{ color: '#f5222d', fontWeight: 700 }}>HK$ {total.toFixed(2)}</span>
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={list}
        loading={loading}
        pagination={{ pageSize: 20, showSizeChanger: false }}
        size="small"
      />
    </Card>
  )
}

export default Bills
