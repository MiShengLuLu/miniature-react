import mountElement from './mountElement'
import diff from './diff'

// 还有考虑是否有原有的旧元素

export default function render (virtualDOM, container, oldDOM = container.firstChild) {
  // 使用 diff 方法判断是否存在 oldDOM
  // 如果不存在，就将 virtualDOM 转换为真实的 DOM，并插入 container 容器中
  if (!oldDOM) {
    // 传入的 virtualDOM 有可能是 函数式组件，也可能是 JSX 语法编写的组件
    mountElement(virtualDOM, container)
  } else {
    diff(virtualDOM, container, oldDOM)
  }
}