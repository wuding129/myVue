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
      var fragment = this.node2fragment(el);
      // 2、解析模板
      this.compile(fragment);
      // 3、把内存的结果返回到页面
      el.appendChild(fragment);
    }
  }

  // ************************工具方法*************************
  isElementNode(node) {
    return node.nodeType === 1; // 1:元素节点，2：属性节点，3：文本节点
  }

  isTextNode(node) {
    return node.nodeType === 3;
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
  }

  compile(parent) {

  }

  // ********************************************************

}