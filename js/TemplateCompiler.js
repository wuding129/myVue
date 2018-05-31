class TemplateCompiler {
  // 1）视图线索
  // 2）全局vm对象
  constructor(el, vm) {
    // 缓存重要的属性
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    // 判断视图存在
    if (this.el) {
      // 1、把模板内容放入内存（片段），减少dom操作，提升页面渲染性能
      var fragment = this.node2fragment(this.el);
      // 2、解析模板
      this.compile(fragment);
      // 3、把内存的结果返回到页面
      this.el.appendChild(fragment);
    }
  }

  // ************************工具方法*************************
  isElementNode(node) {
    return node.nodeType === 1; // 1:元素节点，2：属性节点，3：文本节点
  }

  isTextNode(node) {
    return node.nodeType === 3;
  }

  toArray(fakeArr){
    return [].slice.call(fakeArr)
  }
  isDirective(attrName){ // v-text
    return attrName.indexOf('v-') >= 0;
  }
  // ********************************************************


  // ************************核心方法*************************
  node2fragment(node) {
    // 1、创建内存片段
    var fragment = document.createDocumentFragment(), child;
    // 2、把模板内容丢到内存
    while (child = node.firstChild) {
      fragment.appendChild(child)
    }
    // 3、返回
    return fragment;
  }

  compile(parent) {
    // 1、获取子节点
    var childNodes = parent.childNodes,
        complier = this // 缓存当前实例，下面要用
    // 2、遍历每一个节点
    this.toArray(childNodes).forEach((node) => {
      // 3、判断节点类型
      if(complier.isElementNode(node)){
        // 1)元素节点（解析指令）
        complier.compileElement(node)

      }
    })
  }
  // 解析元素节点的指令
  compileElement(node){
    // 获取当前元素节点的所有属性
    var arrs = node.attributes,
        compiler = this;
    // 遍历所有属性
    this.toArray(arrs).forEach(attr => {
      var attrName = attr.name;
      if(compiler.isDirective(attrName)){
        // 指令类型
        var type = attrName.substr(2) // v-text v-model
        // var type = attrName.split('-')[1]

        // 指令的值就是表达式
        var expr = attr.value

        CompilerUtils.text(node, compiler.vm, expr)
      }
    })
  }
  // 解析表达式的
  compileText(){

  }
  // ********************************************************

}

CompilerUtils = {
  // 解析text
  text(node, vm, expr){
    // 1、找到更新方法
    var updaterFn = this.updater['textUpdater']
    // 2、执行方法
    updaterFn && updaterFn(node, vm.$data[expr])
  },

  // 更新规则对象
  updater: {
    // 文本更新方法
    textUpdater(node, value){
      node.textContent = value
    }
  }
}