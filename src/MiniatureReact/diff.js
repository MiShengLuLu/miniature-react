import createDOMElement from './createDomElement'
import updateNodeElement from './updateNodeElement'
import updateTextNode from './updateTextNode'
import unmountNode from './unmountNode'
import diffComponent from './diffComponent'
import mountElement from './mountElement'

export default function diff (virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
  const oldComponent = oldVirtualDOM.component
  if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
    if (virtualDOM.type === 'text') {
      // 更新文本内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 更新元素
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
    }

    // 1. 将拥有 key 属性的子元素放置在一个单独的对象中
    let keyedElements = {}
    for (let i = 0, l = oldDOM.childNodes.length; i < l; i++) {
      let domElement = oldDOM.childNodes[i]
      if (domElement.nodeType === 1) {
        let key = domElement.getAttribute('key')
        if (key) {
          keyedElements[key] = domElement
        }
      }
    }

    const hasKey = Object.keys(keyedElements).length === 0
    if (hasKey) {
      // 对比子节点
      virtualDOM.children.forEach((child, index) => {
        diff(child, oldDOM, oldDOM.childNodes[index])
      })
    } else {
      // 2. 循环 virtualDOM 的子元素，获取子元素的 key 属性
      virtualDOM.children.forEach((child, i) => {
        let { key } = child.props
        if (key) {
          // 判断 keyedElements 中是否存在 key 属性对应的元素
          let domElement = keyedElements[key]
          if (domElement) {
            // 3. 看看当前位置的元素是不是我们期望的元素
            if (oldDOM.childNodes[i] && oldDOM.childNodes[i] !== domElement) {
              // 将 domeElement 插入 oldDOM.childNodes[i] 的前面
              oldDOM.insertBefore(domElement, oldDOM.childNodes[i])
            }
          } else {
            // 新增元素
            mountElement(child, oldDOM, oldDOM.childNodes[i])
          }
        }
      })
    }

    // 删除节点
    const oldChildNodes = oldDOM.childNodes
    // 对比新旧节点子节点的长度
    if (oldChildNodes.length > virtualDOM.children.length) {
      if (hasKey) {
        // 有节点需要删除
        for(let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
          unmountNode(oldChildNodes[i])
        }
      } else {
        for (let i = 0; i < oldChildNodes.length; i++) {
          const oldChild = oldChildNodes[i]
          const oldChildKey = oldChild._virtualDOM.props.key
          let found = false

          for (let j = 0; j < virtualDOM.children.length; j++) {
            if (oldChildKey === virtualDOM.children[j].props.key) {
              found = true
              break
            }
          }

          if (!found) {
            // 带有 key 属性的元素需要被删除
            unmountNode(oldChild)
          }
        }
      }
      
    }
  }
  // 新旧节点类型不同，还需排除函数式组件的情况
  else if (oldVirtualDOM && virtualDOM.type !== oldVirtualDOM.type && typeof virtualDOM.type !== 'function') {
    // 不需要再比对，直接使用 virtualDOM 生成 DOM 对象，然后让新的 DOM 对象替换旧的 DOM 对象
    const newElement = createDOMElement(virtualDOM)
    oldDOM.parentNode.replaceChild(newElement, oldDOM)
  }
  else if (typeof virtualDOM.type === 'function') {
    // 组件
    diffComponent(virtualDOM, oldComponent, oldDOM, container)
  }
}