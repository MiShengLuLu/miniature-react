import diff from "./diff"

export default class Component {
  constructor(props) {
    this.props = props
  }
  setState(state) {
    this.state = Object.assign({}, this.state, state)
    // 通过 this.render 方法获取新的 virtualDOM，对比新旧节点的差异，然后更新
    const virtualDOM = this.render()
    // 获取旧的 virtualDOM 对象进行比较
    let oldDOM = this.getDOM()
    // 获取容器
    let container = oldDOM.parentNode
    // 实现对比
    diff(virtualDOM, container, oldDOM)
  }
  setDOM (dom) {
    this._dom = dom
  }
  getDOM () {
    return this._dom
  }
  updateProps (props) {
    this.props = props
  }

  // 生命周期函数
  componentWillMount () {}
  componentDidMount () {}
  componentWillReceiveProps (nextProps) {}
  shouldComponentUpdate (nextProps, nextState) {
    return nextProps != this.props && nextProps != this.state
  }
  componentWillUpdate (nextProps, nextState) {}
  componentDidUpdate (prevProps, prevState) {}
  componentWillUnmount () {}
}