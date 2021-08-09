import MiniatureReact from './MiniatureReact'

const root = document.getElementById('root')

const virtualDOM = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2 data-test="test">(编码必杀技)</h2>
    <div>
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <span>这是一段内容</span>
    <button onClick={() => alert("你好")}>点击我</button>
    <h3>这个将会被删除</h3>
    2, 3
    <input type="text" value="13" />
  </div>
)

// render 函数接收两个参数，第一参数就是要转换的 virtualDOM，第二个参数是转换后的 DOM 对象要插入的容器
// MiniatureReact.render(virtualDOM, root)
// console.log(virtualDOM)


function Heart () {
  return <div>&hearts;</div>
}
// MiniatureReact.render(<Heart />, root)


// 思考：如果传入的函数式组件返回的不是 DOM 对象，而又是一个函数式组件呢？
function Demo (props) {
  return (
    <div>
      {props.title}
      <Heart />
      <button onClick={props.onClick}>按钮</button>
    </div>
  )
}
// MiniatureReact.render(<Demo title="hello React" onClick={() => alert('hello React')} />, root)


class Alert extends MiniatureReact.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: 'default title'
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick () {
    this.setState({
      title: 'changed title'
    })
  }
  componentWillReceiveProps () {
    console.log('componentWillReceiveProps')
  }
  componentWillUpdate (props) {
    console.log('componentWillUpdate')
  }
  componentDidUpdate (prevProps, prevState) {
    console.log('componentDidUpdate')
  }
  render () {
    return (
      <div>
        {this.props.name} <br />
        {this.props.age} <br />
        {this.state.title} <br />
        <button onClick={this.handleClick}>按钮</button>
      </div>
    )
  }
}
// MiniatureReact.render(<Alert name="张三" age={20} />, root)
// setTimeout(() => {
//   MiniatureReact.render(<Alert name="李四" age={28} />, root)
//   // MiniatureReact.render(<Demo title="hello react" />, root)
// }, 2000);


const modifyDOM = (
  <div className="container">
    <h1>你好 Tiny React</h1>
    <h2 data-test="test123">(编码必杀技)</h2>
    <div>
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变...)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    {/* <span>这是一段内容</span> */}
    <button onClick={() => alert("你好 React")}>点击我</button>
    {/* <h6>这个将会被删除</h6> */}
    2, 3
    <input type="text" />
  </div>
)
// MiniatureReact.render(virtualDOM, root)
// setTimeout(() => {
//   MiniatureReact.render(modifyDOM, root)
// }, 2000)


class DemoRef extends MiniatureReact.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    console.log(this.input.value)
    // console.log(this.input)
    console.log(this.alert)
  }
  componentDidMount() {
    console.log("componentDidMount")
  }
  componentWillUnmount() {
    console.log("componentWillUnmount")
  }
  render() {
    return (
      <div>
        <input type="text" ref={input => (this.input = input)} />
        <button onClick={this.handleClick}>按钮</button>
        <Alert ref={alert => (this.alert = alert)} name="张三" age={20} />
      </div>
    )
  }
}
MiniatureReact.render(<DemoRef />, root)
