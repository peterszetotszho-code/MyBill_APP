import { useState, useEffect } from 'react'
import { Card, Form, InputNumber, Cascader, DatePicker, Select, Input, Button, App } from 'antd'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { localName } from '../i18n'

const PAY_KEYS = ['wechat', 'alipay', 'cash', 'bankcard', 'creditcard', 'octopus', 'other']

function Record() {
  const { t, i18n } = useTranslation()
  const { message } = App.useApp()
  const [form] = Form.useForm()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    window.api.getCategories().then(setCategories)
  }, [])

  const options = categories.map((p) => ({
    value: p.id,
    label: localName(p, i18n.language),
    children: p.children.map((c) => ({ value: c.id, label: localName(c, i18n.language) }))
  }))

  const payOptions = PAY_KEYS.map((k) => ({ value: k, label: t(`payment.${k}`) }))

  const onFinish = async (values) => {
    setLoading(true)
    try {
      await window.api.addExpense({
        amount: values.amount,
        categoryId: values.category[1],
        note: values.note,
        payment: values.payment,
        date: values.date.format('YYYY-MM-DD')
      })
      message.success(t('record.saved'))
      form.resetFields()
    } catch (e) {
      message.error(t('record.saveFailed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card title={t('record.title')} style={{ maxWidth: 520, margin: '0 auto' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ date: dayjs(), payment: 'wechat' }}
      >
        <Form.Item
          label={t('record.amount')}
          name="amount"
          rules={[{ required: true, message: t('record.amountRequired') }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            min={0.01}
            precision={2}
            placeholder={t('record.amountPlaceholder')}
            addonBefore="HK$"
          />
        </Form.Item>

        <Form.Item
          label={t('record.category')}
          name="category"
          rules={[{ required: true, message: t('record.categoryRequired') }]}
        >
          <Cascader options={options} placeholder={t('record.categoryPlaceholder')} />
        </Form.Item>

        <Form.Item label={t('record.date')} name="date" rules={[{ required: true, message: t('record.dateRequired') }]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label={t('record.payment')} name="payment">
          <Select options={payOptions} />
        </Form.Item>

        <Form.Item label={t('record.note')} name="note">
          <Input.TextArea rows={2} placeholder={t('record.notePlaceholder')} maxLength={200} />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={loading}>
          {t('record.save')}
        </Button>
      </Form>
    </Card>
  )
}

export default Record
