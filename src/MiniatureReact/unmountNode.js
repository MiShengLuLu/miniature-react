export default function unmountNode (node) {
  // 获取节点的 _virtualDOM 对象
  const virtualDOM = node._virtualDOM

  // 1. 文本节点可以直接删除
  if (virtualDOM.props.type === 'text') {
    node.remove()
  }

  // 2. 看一下节点是否是由组件生成的
  const { component } = virtualDOM
  if (component) {
    component.componentWillUnmount()
  }
  // 3. 看一下节点身上是否有ref属性
  if (virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(null)
  }
  // 4. 看一下节点的属性中是否有事件属性
  Object.keys(virtualDOM.props).forEach(propName => {
    if (propName.slice(0, 2) === 'on') {
      const eventName = propName.toLowerCase().slice(2)
      const eventHandler = virtualDOM.props[propName]
      node.removeEventListener(eventName, eventHandler)
    }
  })

  // 5. 递归删除子节点
  if (node.childNodes.length > 0) {
    for (let i = 0; i < node.childNodes.length; i++) {
      unmountNode(node.childNodes[i])
      i--
    }
  }
  node.remove()
}