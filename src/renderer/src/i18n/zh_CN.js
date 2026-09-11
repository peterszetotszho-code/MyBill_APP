export default {
  menu: {
    record: '记一笔',
    bills: '账单',
    categories: '分类管理',
    stats: '统计'
  },
  record: {
    title: '记一笔',
    amount: '金额（港元）',
    amountPlaceholder: '0.00',
    amountRequired: '请输入金额',
    category: '分类',
    categoryPlaceholder: '先选大类，再选小类',
    categoryRequired: '请选择分类',
    date: '日期',
    dateRequired: '请选择日期',
    payment: '支付方式',
    note: '备注',
    notePlaceholder: '选填',
    save: '保存',
    saved: '已记下这笔花销',
    saveFailed: '保存失败，请重试'
  },
  bills: {
    title: '账单',
    date: '日期',
    category: '分类',
    amount: '金额（港元）',
    payment: '支付方式',
    note: '备注',
    action: '操作',
    delete: '删除',
    deleteConfirm: '确定删除这一笔吗？',
    deleted: '已删除',
    count: '共 {{count}} 笔',
    total: '合计'
  },
  categories: {
    title: '分类管理',
    addTop: '新增一级分类',
    addSub: '＋小类',
    addSubTitle: '在「{{name}}」下新增小类',
    delete: '删除',
    deleteConfirm: '删除后，该分类下的账目不受影响。确定删除？',
    namePlaceholder: '分类名称',
    nameRequired: '请输入分类名称',
    added: '已添加',
    deleted: '已删除',
    ok: '确定',
    cancel: '取消'
  },
  stats: {
    title: '统计',
    totalTitle: '{{month}} 总支出',
    category: '分类',
    amount: '金额（港元）',
    empty: '本月还没有账目'
  },
  payment: {
    wechat: '微信',
    alipay: '支付宝',
    cash: '现金',
    bankcard: '银行卡',
    creditcard: '信用卡',
    octopus: '八达通',
    other: '其他'
  },
  language: {
    zhCN: '简体中文',
    zhTW: '繁體中文',
    en: 'English'
  }
}
