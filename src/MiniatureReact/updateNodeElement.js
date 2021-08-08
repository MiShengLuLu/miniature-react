export default function updateNodeElement (newElement, virtualDOM, oldVirtualDOM = {}) {
  // 获取节点对应的属性对象
  const newProps = virtualDOM.props || {}
  const oldProps = oldVirtualDOM.props || {}

  Object.keys(newProps).forEach(propName => {
    // 获取属性值
    const newPropsValue = newProps[propName]
    const oldPropsValue = oldProps[propName]

    if (newPropsValue !== oldPropsValue) {
      // 判断属性是否是事件属性
      if (propName.slice(0, 2) === 'on') {
        //  onClick -> click
        const eventName = propName.toLowerCase().slice(2)
        // 为元素添加事件
        newElement.addEventListener(eventName, newPropsValue)

        if (oldPropsValue) {
          // 删除原有的事件处理函数
          newElement.removeEventListener(eventName, oldPropsValue)
        }
      } else if (propName === 'value' || propName === 'checked') {
        newElement[propName] = newPropsValue
      } else if (propName !== 'children') {
        if (propName === 'className') {
          newElement.setAttribute('class', newPropsValue)
        } else {
          newElement.setAttribute(propName, newPropsValue)
        }
      }
    }
  })

  // 判断属性被删除的请求
  Object.keys(oldProps).forEach(propName => {
    const oldPropsValue = oldProps[propName]
    const newPropsValue = newProps[propName]
    if (!oldPropsValue) {
      // 属性被删除了
      if (propName.slice(0, 2) === 'on') {
        const eventName = propName.toLowerCase().slice(2)
        newElement.removeEventListener(eventName, newPropsValue)
      } else if (propName !== 'children') {
        newElement.removeAttribute(propName)
      }
    }
  })
}