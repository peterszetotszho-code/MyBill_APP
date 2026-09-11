import initSqlJs from 'sql.js'
import { app } from 'electron'
import { join } from 'path'
import { readFileSync, writeFileSync } from 'fs'

let db = null
let dbFilePath = null

// 默认分类（三语：name=简体 / tw=繁体 / en=英文）
export const DEFAULT_CATEGORIES = [
  {
    name: '餐饮美食',
    tw: '餐飲美食',
    en: 'Food & Dining',
    children: [
      { name: '早餐', tw: '早餐', en: 'Breakfast' },
      { name: '午餐', tw: '午餐', en: 'Lunch' },
      { name: '晚餐', tw: '晚餐', en: 'Dinner' },
      { name: '外卖', tw: '外賣', en: 'Takeout' },
      { name: '零食饮料', tw: '零食飲料', en: 'Snacks & Drinks' },
      { name: '聚餐', tw: '聚餐', en: 'Dining Out' }
    ]
  },
  {
    name: '交通出行',
    tw: '交通出行',
    en: 'Transportation',
    children: [
      { name: '公交地铁', tw: '公交地鐵', en: 'Public Transit' },
      { name: '打车', tw: '打車', en: 'Taxi & Ride-hailing' },
      { name: '加油', tw: '加油', en: 'Fuel' },
      { name: '停车', tw: '停車', en: 'Parking' },
      { name: '火车高铁', tw: '火車高鐵', en: 'Train & High-speed Rail' },
      { name: '飞机', tw: '飛機', en: 'Flight' }
    ]
  },
  {
    name: '购物消费',
    tw: '購物消費',
    en: 'Shopping',
    children: [
      { name: '服饰鞋包', tw: '服飾鞋包', en: 'Clothing & Bags' },
      { name: '数码家电', tw: '數碼家電', en: 'Electronics & Appliances' },
      { name: '日用百货', tw: '日用百貨', en: 'Daily Necessities' },
      { name: '美妆护肤', tw: '美妝護膚', en: 'Beauty & Skincare' },
      { name: '家居', tw: '家居', en: 'Home Goods' }
    ]
  },
  {
    name: '居家生活',
    tw: '居家生活',
    en: 'Housing & Utilities',
    children: [
      { name: '房租', tw: '房租', en: 'Rent' },
      { name: '水费', tw: '水費', en: 'Water Bill' },
      { name: '电费', tw: '電費', en: 'Electricity Bill' },
      { name: '燃气费', tw: '燃氣費', en: 'Gas Bill' },
      { name: '物业费', tw: '物業費', en: 'Property Management' },
      { name: '维修装修', tw: '維修裝修', en: 'Repairs & Renovation' }
    ]
  },
  {
    name: '休闲娱乐',
    tw: '休閒娛樂',
    en: 'Entertainment',
    children: [
      { name: '电影演出', tw: '電影演出', en: 'Movies & Shows' },
      { name: '游戏', tw: '遊戲', en: 'Games' },
      { name: '运动健身', tw: '運動健身', en: 'Sports & Fitness' },
      { name: '旅游', tw: '旅遊', en: 'Travel' },
      { name: '宠物', tw: '寵物', en: 'Pets' }
    ]
  },
  {
    name: '医疗健康',
    tw: '醫療健康',
    en: 'Health & Medical',
    children: [
      { name: '药品', tw: '藥品', en: 'Medicine' },
      { name: '门诊', tw: '門診', en: 'Outpatient' },
      { name: '住院', tw: '住院', en: 'Hospitalization' },
      { name: '体检', tw: '體檢', en: 'Check-up' },
      { name: '牙科眼科', tw: '牙科眼科', en: 'Dental & Eye Care' }
    ]
  },
  {
    name: '教育学习',
    tw: '教育學習',
    en: 'Education',
    children: [
      { name: '书籍', tw: '書籍', en: 'Books' },
      { name: '课程培训', tw: '課程培訓', en: 'Courses & Training' },
      { name: '学费', tw: '學費', en: 'Tuition' },
      { name: '文具', tw: '文具', en: 'Stationery' }
    ]
  },
  {
    name: '通讯网络',
    tw: '通訊網絡',
    en: 'Communication',
    children: [
      { name: '话费', tw: '話費', en: 'Phone Bill' },
      { name: '宽带', tw: '寬帶', en: 'Broadband' },
      { name: '会员订阅', tw: '會員訂閱', en: 'Subscriptions' }
    ]
  },
  {
    name: '人情往来',
    tw: '人情往來',
    en: 'Gifts & Social',
    children: [
      { name: '红包礼金', tw: '紅包禮金', en: 'Red Packets & Gifts' },
      { name: '请客送礼', tw: '請客送禮', en: 'Treats & Gifts' },
      { name: '孝敬父母', tw: '孝敬父母', en: 'Support for Parents' }
    ]
  },
  {
    name: '其他',
    tw: '其他',
    en: 'Others',
    children: [{ name: '其他', tw: '其他', en: 'Others' }]
  }
]

function queryAll(sql, params = []) {
  const stmt = db.prepare(sql)
  if (params.length) stmt.bind(params)
  const rows = []
  while (stmt.step()) rows.push(stmt.getAsObject())
  stmt.free()
  return rows
}

function run(sql, params = []) {
  db.run(sql, params)
}

function lastId() {
  return queryAll('SELECT last_insert_rowid() AS id')[0].id
}

function save() {
  writeFileSync(dbFilePath, Buffer.from(db.export()))
}

function ensureColumn(table, column, ddl) {
  const cols = queryAll(`PRAGMA table_info(${table})`)
  if (!cols.some((c) => c.name === column)) {
    run(`ALTER TABLE ${table} ADD COLUMN ${ddl}`)
  }
}

export async function initDatabase() {
  const SQL = await initSqlJs()
  dbFilePath = join(app.getPath('userData'), 'heima-bill.db')
  try {
    db = new SQL.Database(readFileSync(dbFilePath))
  } catch {
    db = new SQL.Database()
  }

  run(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    name_tw TEXT NOT NULL DEFAULT '',
    name_en TEXT NOT NULL DEFAULT '',
    parent_id INTEGER NOT NULL DEFAULT 0,
    sort INTEGER NOT NULL DEFAULT 0
  )`)

  run(`CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL,
    category_id INTEGER,
    category_name TEXT,
    category_name_tw TEXT,
    category_name_en TEXT,
    parent_id INTEGER,
    parent_name TEXT,
    parent_name_tw TEXT,
    parent_name_en TEXT,
    note TEXT,
    payment TEXT,
    date TEXT NOT NULL,
    created_at TEXT NOT NULL
  )`)

  // 迁移：旧表补三语列
  ensureColumn('categories', 'name_tw', "name_tw TEXT NOT NULL DEFAULT ''")
  ensureColumn('categories', 'name_en', "name_en TEXT NOT NULL DEFAULT ''")
  ensureColumn('expenses', 'category_name_tw', 'category_name_tw TEXT')
  ensureColumn('expenses', 'category_name_en', 'category_name_en TEXT')
  ensureColumn('expenses', 'parent_name_tw', 'parent_name_tw TEXT')
  ensureColumn('expenses', 'parent_name_en', 'parent_name_en TEXT')

  const count = queryAll('SELECT COUNT(*) AS c FROM categories')[0].c
  if (count === 0) {
    DEFAULT_CATEGORIES.forEach((cat, i) => {
      run('INSERT INTO categories (name, name_tw, name_en, parent_id, sort) VALUES (?, ?, ?, 0, ?)', [
        cat.name,
        cat.tw,
        cat.en,
        i
      ])
      const pid = lastId()
      cat.children.forEach((child, j) => {
        run('INSERT INTO categories (name, name_tw, name_en, parent_id, sort) VALUES (?, ?, ?, ?, ?)', [
          child.name,
          child.tw,
          child.en,
          pid,
          j
        ])
      })
    })
  } else {
    // 已有数据：给默认分类补三语（按简体名精确匹配）
    DEFAULT_CATEGORIES.forEach((cat) => {
      run('UPDATE categories SET name_tw = ?, name_en = ? WHERE name = ? AND parent_id = 0', [
        cat.tw,
        cat.en,
        cat.name
      ])
      const parent = queryAll('SELECT id FROM categories WHERE name = ? AND parent_id = 0', [cat.name])[0]
      if (parent) {
        cat.children.forEach((child) => {
          run('UPDATE categories SET name_tw = ?, name_en = ? WHERE name = ? AND parent_id = ?', [
            child.tw,
            child.en,
            child.name,
            parent.id
          ])
        })
      }
    })
  }
  save()
}

export function getCategories() {
  const rows = queryAll('SELECT * FROM categories ORDER BY parent_id, sort, id')
  return rows
    .filter((r) => r.parent_id === 0)
    .map((p) => ({
      id: p.id,
      name: p.name,
      nameTw: p.name_tw || p.name,
      nameEn: p.name_en || p.name,
      children: rows
        .filter((r) => r.parent_id === p.id)
        .map((c) => ({ id: c.id, name: c.name, nameTw: c.name_tw || c.name, nameEn: c.name_en || c.name }))
    }))
}

export function addExpense({ amount, categoryId, note, payment, date }) {
  const cat = queryAll(
    `SELECT c.name AS category_name, c.name_tw AS category_name_tw, c.name_en AS category_name_en,
            c.parent_id AS parent_id,
            p.name AS parent_name, p.name_tw AS parent_name_tw, p.name_en AS parent_name_en
     FROM categories c LEFT JOIN categories p ON c.parent_id = p.id
     WHERE c.id = ?`,
    [categoryId]
  )[0]
  run(
    `INSERT INTO expenses
      (amount, category_id, category_name, category_name_tw, category_name_en,
       parent_id, parent_name, parent_name_tw, parent_name_en, note, payment, date, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      amount,
      categoryId,
      cat.category_name,
      cat.category_name_tw,
      cat.category_name_en,
      cat.parent_id,
      cat.parent_name,
      cat.parent_name_tw,
      cat.parent_name_en,
      note || '',
      payment || '',
      date,
      new Date().toISOString()
    ]
  )
  save()
  return { id: lastId() }
}

export function getExpenses({ month } = {}) {
  let sql = 'SELECT * FROM expenses'
  const params = []
  if (month) {
    sql += ' WHERE date LIKE ?'
    params.push(month + '%')
  }
  sql += ' ORDER BY date DESC, id DESC'
  return queryAll(sql, params)
}

export function deleteExpense(id) {
  run('DELETE FROM expenses WHERE id = ?', [id])
  save()
}

export function addCategory(name, parentId = 0) {
  const sort = queryAll(
    'SELECT COALESCE(MAX(sort), -1) + 1 AS s FROM categories WHERE parent_id = ?',
    [parentId]
  )[0].s
  // 用户自定义分类：只填一个名称，三语共用（暂不自动翻译）
  run('INSERT INTO categories (name, name_tw, name_en, parent_id, sort) VALUES (?, ?, ?, ?, ?)', [
    name,
    name,
    name,
    parentId,
    sort
  ])
  save()
  return { id: lastId() }
}

export function deleteCategory(id) {
  run('DELETE FROM categories WHERE id = ? OR parent_id = ?', [id, id])
  save()
}

export function getStats(month) {
  const total = queryAll(
    'SELECT COALESCE(SUM(amount), 0) AS t FROM expenses WHERE date LIKE ?',
    [month + '%']
  )[0].t
  const byParent = queryAll(
    `SELECT COALESCE(parent_name, '') AS parent_name,
            COALESCE(parent_name_tw, '') AS parent_name_tw,
            COALESCE(parent_name_en, '') AS parent_name_en,
            parent_id, SUM(amount) AS total
     FROM expenses WHERE date LIKE ? GROUP BY parent_id ORDER BY total DESC`,
    [month + '%']
  )
  return { total, byParent }
}
