------------------------------------------------------
task
------------------------------------------------------
/实现button icon 属性：实现扩展属性。
实现全屏 mask loading 效果
实现 <StyleAll box='border-box'>
实现 resize = 'all,t,b,l,r'
实现 drag = 'all,h,v'
实现 hoverEffect，把效果写在里面

实现复杂控件
    实现 panel
    实现 dialog
    实现 switch
    动态创建的对象中的子对象解析有问题，如<toast.row>，考虑用innerHtml方式
    实现各种 popup


剥离扩展控件属性的逻辑，需要给标签附上一个onAttributeChanged(name, newValue)方法



------------------------------------------------------
done
------------------------------------------------------
/实现所有对象的theme能力，只要设置了themeCls就会上色，此外还会调用自定义的 setTheme() 方法
/优化<a>
/增加属性 gridc, gridr, childpadding
/实现 icon
/实现 icona
/click传递的this有问题，见 animate.html
/gridcolumn 有问题
/img.icon
/click 统一处理。
/toast
/把方法注入到 HTMLElement 下，简化代码（算了）
/创建一个框架，支持自定义标签，不用类似 x-mytag 这样的格式
    /Container
    /Popup
/优化index.html，支持源码展示。
/迁移xtags，基于 nocss.js 创建

