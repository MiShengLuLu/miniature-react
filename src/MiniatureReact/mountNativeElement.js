import mountElement from './mountElement'
import createDOMElement from './createDOMElement'

export default function mountNativeElement (virtualDOM, container) {
  const newElement = createDOMElement(virtualDOM, container)

  // 将转换之后的 DOM 对象放置在页面容器中
  container.appendChild(newElement)
}