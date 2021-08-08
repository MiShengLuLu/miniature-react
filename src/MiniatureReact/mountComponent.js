import isFunction from './isFunction'
import isFunctionComponent from './isFunctionComponent'
import mountNativeElement from './mountNativeElement'

export default function mountComponent (virtualDOM, container) {
  let nextVirtualDOM = null
  // 还需判断组件是 类组件/函数式组件
  // 技巧：判断组件的原型对象上是否有 render 方法
  if (isFunctionComponent(virtualDOM)) {
    // 函数式组件
    nextVirtualDOM = buildFunctionComponent(virtualDOM)
  } else {
    // 类组件
    nextVirtualDOM = buildClassComponent(virtualDOM)
  }
  // 判断 nextVirtualDOM 对象是普通 DOM 元素还是 函数式组件
  if (isFunction(nextVirtualDOM)) {
    mountComponent(nextVirtualDOM, container)
  } else {
    mountNativeElement(nextVirtualDOM, container)
  }
}

function buildFunctionComponent (virtualDOM) {
  // 调用函数式组件的 type 本身
  // return virtualDOM.type()

  // 将 virtualDOM.type 传递进去
  return virtualDOM.type(virtualDOM.props || {})
}

function buildClassComponent (virtualDOM) {
  // virtualDOM.type 中存储着组件的构造函数
  // 创建类组件实例对象
  const component = new virtualDOM.type(virtualDOM.props || {})
  // 调用组件的 render 方法并返回
  return component.render()
}