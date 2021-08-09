import createDOMElement from './createDomElement'
import updateNodeElement from './updateNodeElement'
import updateTextNode from './updateTextNode'
import unmountNode from './unmountNode'
import diffComponent from './diffComponent'

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

    // 对比子节点
    virtualDOM.children.forEach((child, index) => {
      diff(child, oldDOM, oldDOM.childNodes[index])
    })

    // 删除节点
    const oldChildNodes = oldDOM.childNodes
    // 对比新旧节点子节点的长度
    if (oldChildNodes.length > virtualDOM.children.length) {
      // 有节点需要删除
      for(let i = oldChildNodes.length - 1; i > virtualDOM.children.length - 1; i--) {
        unmountNode(oldChildNodes[i])
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