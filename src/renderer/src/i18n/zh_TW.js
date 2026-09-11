export default {
  menu: {
    record: '記一筆',
    bills: '賬單',
    categories: '分類管理',
    stats: '統計'
  },
  record: {
    title: '記一筆',
    amount: '金額（港元）',
    amountPlaceholder: '0.00',
    amountRequired: '請輸入金額',
    category: '分類',
    categoryPlaceholder: '先選大類，再選小類',
    categoryRequired: '請選擇分類',
    date: '日期',
    dateRequired: '請選擇日期',
    payment: '支付方式',
    note: '備註',
    notePlaceholder: '選填',
    save: '保存',
    saved: '已記下這筆花銷',
    saveFailed: '保存失敗，請重試'
  },
  bills: {
    title: '賬單',
    date: '日期',
    category: '分類',
    amount: '金額（港元）',
    payment: '支付方式',
    note: '備註',
    action: '操作',
    delete: '刪除',
    deleteConfirm: '確定刪除這一筆嗎？',
    deleted: '已刪除',
    count: '共 {{count}} 筆',
    total: '合計'
  },
  categories: {
    title: '分類管理',
    addTop: '新增一級分類',
    addSub: '＋小類',
    addSubTitle: '在「{{name}}」下新增小類',
    delete: '刪除',
    deleteConfirm: '刪除後，該分類下的賬目不受影響。確定刪除？',
    namePlaceholder: '分類名稱',
    nameRequired: '請輸入分類名稱',
    added: '已添加',
    deleted: '已刪除',
    ok: '確定',
    cancel: '取消'
  },
  stats: {
    title: '統計',
    totalTitle: '{{month}} 總支出',
    category: '分類',
    amount: '金額（港元）',
    empty: '本月還沒有賬目'
  },
  payment: {
    wechat: '微信',
    alipay: '支付寶',
    cash: '現金',
    bankcard: '銀行卡',
    creditcard: '信用卡',
    octopus: '八達通',
    other: '其他'
  },
  language: {
    zhCN: '简体中文',
    zhTW: '繁體中文',
    en: 'English'
  }
}
