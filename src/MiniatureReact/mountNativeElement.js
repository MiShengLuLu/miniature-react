import mountElement from './mountElement'
import createDOMElement from './createDOMElement'
import unmountNode from './unmountNode'

export default function mountNativeElement (virtualDOM, container, oldDOM) {
  const newElement = createDOMElement(virtualDOM)

  // 将转换后的 DOM 对象放置在页面中
  if (oldDOM) {
    container.insertBefore(newElement, oldDOM)
  } else {
    container.appendChild(newElement)
  }

  // 判断 oldDOM 是否存在，如果存在则删除
  if (oldDOM) {
    unmountNode(oldDOM)
  }

  // mountComponent.js 中的 buildClassComponent 方法，将实例对象的挂在到了 virtualDOM 上
  let component = virtualDOM.component
  // 需判断是否包含有类实例兑现，如果有，调用 setDOM 方法，更新 dom 的属性
  if (component) {
    component.setDOM(newElement)
  }
}