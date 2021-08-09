import mountElement from './mountElement'
import updateComponent from './updateComponent'

export default function diffComponent (virtualDOM, oldComponent, oldDOM, container) {
  // 判断 virtualDOM 与 oldComponent 是否是同一个组件，如果是，更新组件
  if (isSameComponent(virtualDOM, oldComponent)) {
    updateComponent(virtualDOM, oldComponent, oldDOM, container)
  } else {
    // 不是组件，直接调用 mountElement 方法，将 virtualDOM 对象转换为真实的 DOM 替换旧的 DOM 即可
    mountElement(virtualDOM, container, oldDOM)
  }
}

function isSameComponent(virtualDOM, oldComponent) {
  // virtualDOM.type 指向的是组件的构造函数
  return oldComponent && virtualDOM.type === oldComponent.constructor
}