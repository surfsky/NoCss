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

see http://surfsky.github.io/NoCss/


# Supported attributes

- Traditional css style attributes that can be visited by tag.style.xxx, eg. `tag.style.borderRadius='4px'; `

- Extend attributes that can be directly visited by attribute name. eg. `tag.radius='4px';`. Below is supportted extend attributes:

``` js
    // frequency attributes
    'width', 'height', 'margin', 'padding', 'top', 'left', 'right', 'bottom',

    // basic
    'newClass', 'z', 'visible',

    // box module
    'box', 'radius',  

    // position
    'anchor', 'fixAnchor', 'childAnchor', 'dock', 

    // container's children
    'gridCol',

    // theme, color, image
    'theme', 
    'bg','bgColor', 'bgImage', 'bgRepeat', 'bgPosition', 'bgSize',

    // effect
    'hoverColor', 'hoverBgColor', 
    'shadow', 'transform', 'rotate', 'scale', 'skew', 'textShadow',

    // event
    'events', 'click', 'draggable',
```


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
    NoCss.registProperties();
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

# VIP Paid services

- Provide training services.
- Provide more commercial controls.
- Provide customized versions that are compatible with third-party libraries.
