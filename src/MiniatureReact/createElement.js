export default function createElement (type, props, ...children) {
  // 处理子元素，判断子元素是否是文本节点
  // 先拷贝 children，然后遍历
  // const childElements = [].concat(children).map(child => {
  //   if (child instanceof Object) {
  //     return child
  //   } else {
  //     return createElement('text', { textContent: child })
  //   }
  // })

  // 如果是布尔值的节点，页面是不展示的，所以需要处理
  const childElements = [].concat(...children).reduce((result, child) => {
    if (child !== false && child !== true && child !== null) {
      if (child instanceof Object) {
        result.push(child)
      } else {
        result.push(createElement('text', { textContent: child }))
      }
    }
    return result
  }, [])

  return {
    type,
    // react 中可以通过 props.children 访问子元素
    props: Object.assign({ children: childElements }, props),
    children: childElements
  }
}