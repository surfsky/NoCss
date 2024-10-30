------------------------------------------------------
task
------------------------------------------------------
bug
    click传递的this有问题，见 animate.html
    gridcolumn 有问题
    
迁移
    实现 StyleInit
    实现 icon
    实现 icona

实现复杂控件
    实现 panel
    实现 switch
    动态创建的对象中的子对象解析有问题，如<toast.row>
    实现各种 popup


剥离扩展控件属性的逻辑，需要给标签附上一个onAttributeChanged(name, newValue)方法



------------------------------------------------------
done
------------------------------------------------------
/img.icon
/click 统一处理。
/toast
/把方法注入到 HTMLElement 下，简化代码（算了）
/创建一个框架，支持自定义标签，不用类似 x-mytag 这样的格式
    /Container
    /Popup
/优化index.html，支持源码展示。
/迁移xtags，基于 nocss.js 创建

