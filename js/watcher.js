// 声明一个订阅者
class Watcher {
  // 1）需要使用订阅功能的节点
  // 2）全局vm对象，用于获取数据
  // 3）需要使用订阅功能的节点
  constructor(vm, expr, cb){
    // 缓存重要属性
    this.vm = vm
    this.expr = expr
    this.cb = cb
    // 缓存当前值，后面做新旧对比时用
    this.value = this.get()
  }

  // 获取当前值
  get(){
    // 把当前订阅者添加到全局
    Dep.target = this // watcher实例
    // 获取当前值
    var value = this.vm.$data[this.expr]

    // 清空全局
    Dep.target = null
    // 返回
    return value
  }

  // 提供一个更新方法（应对发布后要做的事）
  update(){
    // 获取新值
    var newVaule = this.vm.$data[this.expr]
    // 老值
    var oldValue = this.value
    if (newVaule !== oldValue) {
      // 执行回调
      this.cb(newVaule)
      // this.cb.call(this.vm, newVaule)
    }
  }

}
