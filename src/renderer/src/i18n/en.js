export default {
  menu: {
    record: 'Add Expense',
    bills: 'Bills',
    categories: 'Categories',
    stats: 'Statistics'
  },
  record: {
    title: 'Add Expense',
    amount: 'Amount (HKD)',
    amountPlaceholder: '0.00',
    amountRequired: 'Please enter an amount',
    category: 'Category',
    categoryPlaceholder: 'Select a category',
    categoryRequired: 'Please select a category',
    date: 'Date',
    dateRequired: 'Please select a date',
    payment: 'Payment Method',
    note: 'Note',
    notePlaceholder: 'Optional',
    save: 'Save',
    saved: 'Expense saved',
    saveFailed: 'Failed to save, please try again'
  },
  bills: {
    title: 'Bills',
    date: 'Date',
    category: 'Category',
    amount: 'Amount (HKD)',
    payment: 'Payment',
    note: 'Note',
    action: 'Actions',
    delete: 'Delete',
    deleteConfirm: 'Delete this expense?',
    deleted: 'Deleted',
    count: '{{count}} entries',
    total: 'Total'
  },
  categories: {
    title: 'Categories',
    addTop: 'Add Category',
    addSub: '+ Sub',
    addSubTitle: 'Add subcategory under "{{name}}"',
    delete: 'Delete',
    deleteConfirm: "Deleting this category won't affect existing records. Delete?",
    namePlaceholder: 'Category name',
    nameRequired: 'Please enter a name',
    added: 'Added',
    deleted: 'Deleted',
    ok: 'OK',
    cancel: 'Cancel'
  },
  stats: {
    title: 'Statistics',
    totalTitle: 'Total for {{month}}',
    category: 'Category',
    amount: 'Amount (HKD)',
    empty: 'No records this month'
  },
  payment: {
    wechat: 'WeChat',
    alipay: 'Alipay',
    cash: 'Cash',
    bankcard: 'Bank Card',
    creditcard: 'Credit Card',
    octopus: 'Octopus',
    other: 'Other'
  },
  language: {
    zhCN: '简体中文',
    zhTW: '繁體中文',
    en: 'English'
  }
}
