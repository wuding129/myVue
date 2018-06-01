// 创建观察对象
class Observer {
  // 构造函数
  constructor(data){
    // 提供一个解析方法，完成属性的分析和挟持
    this.observe(data)
  }

  // 解析数据，完成对数据属性的挟持（控制对象属性的getter和setter）
  observe(data){
    // 判断数据的有效性，必须是对象
    if(!data || typeof data !== 'object'){
      return
    }
    // 针对当前对象属性的重新定义（挟持）
    var keys = Object.keys(data)
    // 遍历
    keys.forEach((key) => {
      // 重新定义key
      this.defineReactive(data, key, data[key])
    })
  }

  defineReactive(obj, key, val){
    var dep = new Dep()
    // 重新定义
    // 1)目标对象
    // 2)属性名
    // 3)属性配置
    Object.defineProperty(obj, key, {
      // 是否可遍历
      enumerable: true,
      // 是否可重新配置
      configurable: false,
      // 特权方法：getter 取值
      get(){
        // var watcher = Dep.target
        // 针对watcher创建时，直接完成发布订阅的添加
        Dep.target && dep.addSub(Dep.target)
        return val
      },

      // 特权方法：setter 修改至
      set(newVal){
        // 新值覆盖旧值
        val = newVal

        dep.notify()
      }


    })
  }
}


// 创建发布者
  // 1.管理订阅者
  // 2.通知
class Dep{
  constructor(){
    this.subs = []

  }
  // 添加订阅
  // 传的sub就是watcher实例
  addSub(sub){
    this.subs.push(sub)
  }

  // 通知
  notify(){
    this.subs.forEach((sub) => {
      sub.update()
    })
  }


}
