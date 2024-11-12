------------------------------------------------------
task
------------------------------------------------------
实现 drag/slide
    dragArea='body'
    dragDirection = 'all,h,v'
实现 resizer = 'all,t,b,l,r'，事实上加上flex就实现了 splitter
使用新的标准属性设置语法，并测试

模拟实现手机端布局方式，滑屏方式

实现 menu 自定义标签，可自适应展示：横向下拉菜单、左侧树状菜单两种方式，用于适配手机和web响应式布局
再找找有没有reactor 或 vue 那样的方式创建组件***
重构和简化 NoCss.saveStyle(ele);
实现全屏 mask loading 效果

实现复杂控件
    实现 dialog
    动态创建的对象中的子对象解析有问题，如<toast.row>，考虑用innerHtml方式
    实现各种 popup

给控件加上属性
    方案一：onAttributeChanged(name, newValue)方法。
    方案二：参考Panel.expanded 属性。

------------------------------------------------------
done
------------------------------------------------------
/美化 switcher，handler用位移动画后再变色
/Theme补充参数：实现通用的控件尺寸控制：Theme.controlHeight
/minify js:  https://skalman.github.io/UglifyJS-online/
/custom theme
/app-portal.html
/position.html
/position-anchor.html
/解决github.io 上https/http的问题。
/优化 grid
    实现autoColumn，自动容纳，若太挤了，自动换行
    实现媒体查询，minColumns='200px';
            /* 媒体查询，当页面宽度小于一定值时，让中间部分换行展示 */
        @media screen and (max-width: 610px) {
           .container {
                grid-template-columns: 200px;
                grid-template-rows: auto auto;
                grid-gap: 10px;
            }
/实现 switcher
/实现 hoverEffect，把效果写在里面。算了，此项目的目的就是简化95%的事情。
/实现扩展属性。参考 Panel.expanded. 如button tag.prototype.__getter(name)
/如何实现完全设置好attribute 后再加载子控件，参考panel.innerHTML，应先完全设置好panel的attribute再执。行内部生成语句。这样布局展示速度会最快。
/实现 panel
/优化 GlobalStyle，支持自定义的style，写在标签里面就行
/实现 <GlobalStyle box='border-box' linkColor, fullscreen, rem> 
/实现button icon 属性：
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

