import { useState, useEffect } from 'react'
import { Card, Tree, Button, Input, Space, Modal, Popconfirm, App } from 'antd'
import { useTranslation } from 'react-i18next'
import { localName } from '../i18n'

function Categories() {
  const { t, i18n } = useTranslation()
  const { message } = App.useApp()
  const [tree, setTree] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [parentId, setParentId] = useState(0)
  const [parentName, setParentName] = useState('')
  const [newName, setNewName] = useState('')

  const load = () =>
    window.api.getCategories().then((cats) => {
      setTree(
        cats.map((p) => ({
          key: `p-${p.id}`,
          title: localName(p, i18n.language),
          parentId: p.id,
          children: p.children.map((c) => ({
            key: `c-${c.id}`,
            title: localName(c, i18n.language),
            categoryId: c.id,
            isLeaf: true
          }))
        }))
      )
    })

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language])

  const openAdd = (pid, pname) => {
    setParentId(pid)
    setParentName(pname)
    setNewName('')
    setModalOpen(true)
  }

  const confirmAdd = async () => {
    if (!newName.trim()) {
      message.warning(t('categories.nameRequired'))
      return
    }
    await window.api.addCategory(newName.trim(), parentId)
    message.success(t('categories.added'))
    setModalOpen(false)
    load()
  }

  const del = async (id) => {
    await window.api.deleteCategory(id)
    message.success(t('categories.deleted'))
    load()
  }

  const titleRender = (node) => {
    const isParent = !!node.children
    const id = isParent ? node.parentId : node.categoryId
    return (
      <Space>
        <span>{node.title}</span>
        {isParent && (
          <Button size="small" type="link" onClick={() => openAdd(node.parentId, node.title)}>
            {t('categories.addSub')}
          </Button>
        )}
        <Popconfirm title={t('categories.deleteConfirm')} onConfirm={() => del(id)}>
          <Button size="small" type="link" danger>
            {t('categories.delete')}
          </Button>
        </Popconfirm>
      </Space>
    )
  }

  return (
    <Card
      title={t('categories.title')}
      extra={
        <Space>
          <Button type="primary" onClick={() => openAdd(0, '')}>
            {t('categories.addTop')}
          </Button>
        </Space>
      }
    >
      <Tree treeData={tree} defaultExpandAll titleRender={titleRender} blockNode />

      <Modal
        title={parentId === 0 ? t('categories.addTop') : t('categories.addSubTitle', { name: parentName })}
        open={modalOpen}
        onOk={confirmAdd}
        onCancel={() => setModalOpen(false)}
        okText={t('categories.ok')}
        cancelText={t('categories.cancel')}
      >
        <Input
          placeholder={t('categories.namePlaceholder')}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onPressEnter={confirmAdd}
          maxLength={10}
        />
      </Modal>
    </Card>
  )
}

export default Categories
