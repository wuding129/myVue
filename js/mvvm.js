// 作用：解析视图模板，把对应的数据，渲染到页面上
class MVVM {
  constructor(options) {
    this.$vm = this;
    this.$el = options.el;
    this.$data = options.data;

    // 判断视图是否存在
    if (this.$el) {
      // 创建模板编译器， 来解析视图
      this.$compiler = new TemplateCompiler($el, $vm)
    }
  }
}