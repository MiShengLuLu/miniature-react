import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'

export default function createDOMElement (virtualDOM, container) {
  let newElement = null
  if (virtualDOM.type === 'text') {
    // 文本节点
    newElement = document.createTextNode(virtualDOM.props.textContent)
  } else {
    // 元素节点
    newElement = document.createElement(virtualDOM.type)
    // 处理元素的属性
    updateNodeElement(newElement, virtualDOM)
  }
  newElement._virtualDOM = virtualDOM

  // 以上只创建了最外层的节点，如果该节点还存在子节点，还需递归创建子节点
  virtualDOM.children.forEach(child => {
    mountElement(child, newElement)
  })

  return newElement
}