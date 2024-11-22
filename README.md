# About NoCss.js

Write html tag with only attributes. NO css, NO class, NO nodejs...
Just like Tailwind.css, rapidly build modern websites without ever leaving your HTML.
And more, we don't need to remember any class name anymore.
For example:

 ``` html
<div 
    radius='5px' 
    width='100px' height='40px' 
    bgcolor='red' color="white" 
    padding="4px" margin='4px'
    anchor="center" childAnchor="center"
    >
    DIV1
</div>
```

See more examples : http://surfsky.github.io/NoCss/


# Supportted attributes

- Standard css style attributes, eg. `<div width='100px' margin='4px'>`

|Group    |Name         |Description                               | Example             |
|:--------|:------------|:-----------------------------------------|:--------------------|
|basic    |color        |style.color                               |red
|basic    |font         |style.font                                |arial
|box      |boxSizing    |style.boxSizing                           |border-box, content-box
|box      |width        |style.width                               |100px
|box      |height       |style.height                              |100px
|box      |margin       |style.margin                              |10px
|box      |padding      |style.padding                             |10px
|position |position     |style.position                            |absolute,fixed,flow...
|position |display      |style.display(children)                   |flex,grid...
|position |top          |style.top                                 |10px
|position |left         |style.left                                |10px
|position |right        |style.right                               |10px
|position |bottom       |style.bottom                              |10px
|...      |...          |...                                       |...


- Extend attributes. eg. `<div radius='4px' anchor='center'>`:

|Group    |Name         |Description                               | Example             |
|:--------|:------------|:-----------------------------------------|:--------------------|
|alias    |z            |style.zIndex                              |9
|alias    |radius       |style.borderRadius                        |12
|alias    |box          |style.boxSizing                           |border-box
|alias    |bg           |style.background                          |red
|alias    |bgcolor      |style.backgroundColor                     |red
|alias    |bgimage      |style.backgroundImage                     |
|alias    |bgrepeat     |style.backgroundRepeat                    |
|alias    |bgposition   |style.backgroundPosition                  |
|alias    |bgsize       |style.backgroundSize                      |
|alias    |events       |style.pointerEvents                       |
|common   |newclass     |classList.add(newValue)                   | 
|common   |visible      |visibiliy                                 |true,false
|anchor   |anchor       |setAnchor(ele, newValue, 'absolute')      |topLeft,top,topRight...
|anchor   |fixanchor    |setAnchor(ele, newValue, 'fixed')         |topLeft,top,topRight...
|anchor   |dock         |setDock(ele, newValue, 'absolute')        |top,left,right,bottom,fill
|child    |childanchor  |setChildAnchor(ele, newValue)             |topLeft,top,topRight...
|child    |childmargin  |setChildStyle(ele, 'margin', newValue)    |10px
|child    |childpadding |setChildStyle(ele, 'padding', newValue)   |10px
|theme    |themecls     |Theme.setThemeCls(ele, newValue)          |primary,secondary,success...
|effect   |shadow       |setShadow(ele, newValue)                  |10px
|effect   |textshadow   |setTextShadow(ele, newValue)              |10px
|effect   |rotate       |style.transform = `rotate(${newValue}deg)`|30
|effect   |skew         |style.transform = `skew(${newValue}deg)`  |30
|effect   |scale        |style.transform = `scale(${newValue})`    |1.2
|effect   |hoverbgcolor |setHoverBgColor(ele, newValue);           |red
|effect   |hovercolor   |setHoverTextColor(ele, newValue);         |red




# Install

``` html
<script src="./nocss.js"></script>
```


# Examples

Write html tag with attributes

``` html
<div 
    radius='5px' 
    width='100px' height='40px' 
    bgcolor='red' color="white" 
    padding="4px" margin='4px'
    anchor="center" childAnchor="center">
    DIV1</div>
```

Custom Tag

``` html
<rect 
    radius='5px' 
    width='100px' height='40px' 
    bgcolor='red' color="white" 
    padding="4px" margin='4px'
    anchor="center" childAnchor="center">
    RECT</rect>

```

Set attributes/properties by javascript

``` js
NoCss.registProperties();  // enject properties for all HTMLElement.
const div = document.createElement('div');
div.width  = '80px';
div.height = '40px';
div.padding = '4px';
div.innerHTML = "DIV2"
div.radius = '5px';
div.bgColor = 'blue';
div.childAnchor = 'center';
document.body.appendChild(div);
```

# Paid services

- Provide training services.
- Provide more commercial controls.
- Provide customized versions that are compatible with third-party libraries.
- Contact me by wechat: surfsky