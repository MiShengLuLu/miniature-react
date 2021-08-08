import updateNodeElement from './updateNodeElement'
import updateTextNode from './updateTextNode'

export default function diff (virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
  if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
    if (virtualDOM.type === 'text') {
      // 更新文本内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 更新元素
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
    }

    virtualDOM.children.forEach((child, index) => {
      diff(child, oldDOM, oldDOM.childNodes[index])
    })
  }
}