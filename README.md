# About NoCSS.js

 Write html with only attribute, no css ! For example:

 ``` html
<div 
    radius='5px' 
    width='100px' height='40px' 
    bgcolor='red' color="white" 
    padding="4px" margin='4px'
    anchor="center" childAnchor="center">
    DIV1</div>
```

see https://surfsky.github.io/nocss/


# Supported attributes

- All css style attributes, eg: color, width, height, opacity...
- Extension attributes:

``` js
    //
    'width', 'height', 'margin', 'padding', 'top', 'left', 'right', 'bottom',

    // basic
    'newClass', 'z', 'visible',

    // box module
    'box', 'radius',  

    // position
    'anchor', 'fixAnchor', 'dock',   

    // child position
    'childAnchor', 'gridCol',

    // theme
    'theme', 
    'bg','bgColor', 'bgImage', 'bgRepeat', 'bgPosition', 'bgSize',

    // effect
    'shadow', 'transform', 'rotate', 'scale', 'skew', 'textShadow',
    'hoverBgColor', 'hoverColor',

    // event
    'events', 'click', 'draggable',
```

Notice: Extension attributes can be visited by name, eg: `tag.radius='4px';`

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

```
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

