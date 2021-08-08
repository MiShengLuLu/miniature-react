export default function updateTextNode (virtualDOM, oldVirtualDOM, oldDOM) {
  // 新旧 virtualDOM 的 textContent 不相同，更新元素的文本内容
  if (virtualDOM.props.textContent !== oldVirtualDOM.props.textContent) {
    oldDOM.textContent = virtualDOM.props.textContent
    oldDOM._virtualDOM = virtualDOM
  }
}