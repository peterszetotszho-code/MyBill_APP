import { useState, useEffect } from 'react'
import { Card, DatePicker, Statistic, Table, Empty } from 'antd'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import PieChart from '../components/PieChart'
import { localParentName } from '../i18n'

function Stats() {
  const { t, i18n } = useTranslation()
  const [month, setMonth] = useState(dayjs())
  const [data, setData] = useState({ total: 0, byParent: [] })

  const load = (m) =>
    window.api.getStats(m.format('YYYY-MM')).then((d) => setData({ total: d.total, byParent: d.byParent }))

  useEffect(() => {
    load(month)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const monthLabel = i18n.language === 'en' ? month.format('MMMM YYYY') : month.format('YYYY年MM月')

  const pieData = data.byParent.map((r) => ({
    name: localParentName(r, i18n.language),
    value: Math.round(Number(r.total) * 100) / 100
  }))

  const columns = [
    {
      title: t('stats.category'),
      dataIndex: 'parent_name',
      render: (_, r) => localParentName(r, i18n.language)
    },
    {
      title: t('stats.amount'),
      dataIndex: 'total',
      width: 160,
      render: (v) => Number(v).toFixed(2)
    }
  ]

  return (
    <Card
      title={t('stats.title')}
      extra={
        <DatePicker
          picker="month"
          value={month}
          onChange={(m) => {
            setMonth(m)
            load(m)
          }}
          allowClear={false}
        />
      }
    >
      <Statistic
        title={t('stats.totalTitle', { month: monthLabel })}
        value={Number(data.total)}
        precision={2}
        prefix="HK$"
        style={{ marginBottom: 16 }}
      />

      {data.byParent.length === 0 ? (
        <Empty description={t('stats.empty')} />
      ) : (
        <>
          <PieChart data={pieData} />
          <Table rowKey="parent_id" columns={columns} dataSource={data.byParent} pagination={false} />
        </>
      )}
    </Card>
  )
}

export default Stats
