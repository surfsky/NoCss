/************************************************************
 * Align enum for anchor and childAnchor
 ***********************************************************/
const Anchor = {
    TL: 'topLeft',
    T:  'top',
    TR: 'topRight',
    L:  'left',
    C:  'center',
    R:  'right',
    BL: 'bottomLeft',
    B:  'bottom',
    BR: 'bottomRight',
    F:  'fill'
};

/************************************************************
 * Theme
 ***********************************************************/
class Theme{
    constructor(opt) {
        this.name        = opt.name;
        this.text        = opt.text;
        this.textLight   = opt.textLight;
        this.background  = opt.background;
        this.link        = opt.link;
        this.linkHover   = opt.linkHover;
        this.linkVisited = opt.linkVisited;
        this.primary     = opt.primary;
        this.secondary   = opt.secondary;
        this.success     = opt.success;
        this.info        = opt.info;
        this.warning     = opt.warning;
        this.danger      = opt.danger;
        this.dark        = opt.dark;
        this.light       = opt.light;
        this.border      = opt.border;  // border style. eg. '1px solid red'
        this.radius      = opt.radius;
    }

    /** Theme light*/
    static themeLight = new Theme({
        name        : 'iOSLight',
        text        : 'black',
        textLight   : 'white',
        background  : 'white',
        link        : 'blue',
        linkHover   : 'darkblue',
        linkVisited : 'gray',
        primary     : '#007bff',
        secondary   : '#7633d4',
        success     : '#28a745',
        info        : '#17a2b8',
        warning     : '#ffc107',
        danger      : '#dc3545',
        dark        : '#343a40',
        light       : '#f8f9fa',
        //border      : '1px solid #cdcdcd',
        radius      : '8px',
    });

    /** Theme dark */
    static themeDark = new Theme({
        name        : 'MaterialDark',
        text        : '#cccccc',
        textLight   : '#f0f0f0', //'#f8f9fa',
        background  : '#171717',
        link        : 'red',
        linkHover   : 'green',
        linkVisited : 'gray',
        primary     : '#007bff',
        secondary   : '#7633d4',
        success     : '#28a745',
        info        : '#17a2b8',
        warning     : '#ffc107',
        danger      : '#dc3545',
        dark        : '#343a40',
        light       : '#f8f9fa',
        //border      : '1px solid #707070',
        radius      : '8px',
    });

    /** Global Theme*/
    static current = Theme.themeLight;

    /**
     * Set page theme.
     * @param {Theme} theme 
     */
    static setTheme(theme){
        this.current = theme;
        document.body.style.transition = 'all 0.4s';
        document.body.style.backgroundColor = theme.background;
        document.body.style.color = theme.text;
        var tags = Array.from(document.querySelectorAll('*'));
        tags.forEach(tag => {
            if (tag.setTheme != undefined){
              tag.setTheme();
            }
        });
        document.dispatchEvent(new Event('themechanged'));  // send message to document
    }

    /**
     * Set theme for background and text color. Other settings will be setted in child class.
     * @param {HTMLElement} ele 
     */
    static setBaseTheme(ele){
        var t = Theme.current;
        ele.style.color = t.text;
        var cls = ele.getAttribute('themeCls');
        switch (cls){
            case "primary":   ele.style.backgroundColor = t.primary;     break;
            case "secondary": ele.style.backgroundColor = t.secondary;   break;
            case "success":   ele.style.backgroundColor = t.success;     break;
            case "info":      ele.style.backgroundColor = t.info;        break;
            case "warning":   ele.style.backgroundColor = t.warning;     break;
            case "danger":    ele.style.backgroundColor = t.danger;      break;
            default:          ele.style.backgroundColor = t.background;  break;
        }
        return ele;
    }
}


/************************************************************
 * Utils: sleep, theme, icon, color, px, position....
 ***********************************************************/
class Utils {
    /** Icon root path*/
    static iconRoot = "../img/";
    static iconFontRoot = '../iconfont/';


    //-----------------------------------------
    // Common
    //-----------------------------------------
    /**
     * async/await sleep 
     * @param {number} ms
     * @example await delay(20);
     */
    static sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    /**Take a nap by loop */
    static sleepNap(loop){
        while(loop > 0){
            loop--;
        }
    }

    /** Change func to async promise. eg. await toPromise(func); */
    static toPromise(func){
      return new Promise((resolve) => {
        func(); 
        resolve();
      });
    }

    /** Create unique id */
    static uuid(){
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }

    /**HtmlEncode */
    static htmlEncode(code) {
        return code.replace(/[<>]/g, function(match) {
            switch (match) {
                case '<':   return '&lt;';
                case '>':   return '&gt;';
            }
        });
        //return code.replace(/[<>&"']/g, function(match) {
        //    switch (match) {
        //        case '<':   return '&lt;';
        //        case '>':   return '&gt;';
        //        case '&':   return '&amp;';
        //        case '"':   return '&quot;';
        //        case "'":   return '&#39;';
        //    }
        //});
    }
  

    //-----------------------------------------
    // DOM
    //-----------------------------------------
    /** Get element by class or id
     * @param {string} selector eg. tagName #idName .className
     */
    static $(selector){
        return document.querySelector(selector);
    }

    /** Get all elements by class or id */
    static $$(selector){
       return document.querySelectorAll(selector);
    }

    /**Parse centain tag string to a html element node.
     * @param {string} tagText eg. <div>...</div>
     * @returns {ChildNode}
    */
    static parseElement(tagText){
        var parser = new DOMParser();
        var doc = parser.parseFromString(tagText, 'text/html');
        return doc.body.firstChild;
    }


    /** Get view width */
    static get viewWidth() { return  window.innerWidth || document.documentElement.clientWidth;}

    /** Get view height */
    static get viewHeight() { return window.innerHeight || document.documentElement.clientHeight;}

    /** Center element in window */
    static centerlize(selector){
      const popup = document.querySelector(selector);
      const popupWidth = popup.offsetWidth;
      const popupHeight = popup.offsetHeight;
      popup.style.transtion = '';
      popup.style.left = (this.viewportWidth - popupWidth) / 2 + 'px';
      popup.style.top  = (this.viewportHeight - popupHeight) / 2 + 'px';
      popup.style.display = 'block';
    }

    /** Calculate element's real pixel value. 
     * @param {string} num css number expression, eg. 12px, 1em, 1rem
     * @param {Element} element when num unit is 'em', we need this parameter to calculate by parent node's size. 
    */
    static calcPx(num, element=null){
      if (num.endsWith('px')) {
        return parseInt(num, 10);
      } else if (num.endsWith('rem')) {
        const rootFontSize   = parseInt(getComputedStyle(document.documentElement).fontSize, 10);
        return parseInt(num, 10) * rootFontSize;
      } else if (num.endsWith('em')) {
        const parentFontSize = parseInt(getComputedStyle(element.parentNode).fontSize, 10);
        return parseInt(num, 10) * parentFontSize;
      }
      return 0;
    }

    /**Get element's real bound 
     * @param {Element} ele 
     * @returns DOMRect
    */
    static calcBound(ele){
      return ele.getBoundingClientRect();
    }

    /**
     * Calc element's real display style.
     * @param {Element} ele 
     * @returns CSSStyleDeclaration
     */
    static calcStyle(ele){
        return getComputedStyle(ele);
    }

    /**
     * Search and remove &lt;style&gt; tag that contains certain stylename (eg. '.mytag')
     * @param {string} styleName 
     */
    static removeStyleTag(styleName) {
        const styleTags = document.getElementsByTagName('style');
        for (let i = 0; i < styleTags.length; i++) {
            const tag = styleTags[i];
            if (tag.textContent.includes(styleName)) {
                tag.remove();
            }
        }
    }


    //-----------------------------------------
    // Icon
    //-----------------------------------------
    /** Get icon url from icons root and icon name 
     * @param {string} name IconName without folder and extension
    */
    static getIconUrl(name){
        if (name.includes('.'))
            return this.iconRoot + name;
        return `${this.iconRoot}${name}.png`;
    }


    //-----------------------------------------
    // Convertor
    //-----------------------------------------
    /**Get boolean value 
     * @param {string | boolean} val 
    */
    static toBool(val){
        var type = typeof val;
        if (type == 'boolean') return val;
        if (type == 'string')  return val.toLowerCase() == 'true';
        return false;
    }
    

    //-----------------------------------------
    // Color
    //-----------------------------------------
    /** Build random color */
    static getRandomColor() {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgb(${r},${g},${b})`;
  }

    /** Build opacity color */
    static getOpacityColor(rawColor, opacity) {
        var clr = this.parseColor(rawColor);
        if (clr!= null)
          return `rgba(${clr.r}, ${clr.g}, ${clr.b}, ${opacity})`;
        return 'white';
    }

    /** Build lighter color */
    static getLighterColor(color, factor = 0.5) {
        const rgb = this.parseColor(color);
        if (!rgb) return null;
      
        const r = Math.min(255, Math.round(rgb.r + (255 - rgb.r) * factor));
        const g = Math.min(255, Math.round(rgb.g + (255 - rgb.g) * factor));
        const b = Math.min(255, Math.round(rgb.b + (255 - rgb.b) * factor));
      
        if (rgb.hasOwnProperty('a')) {
          return `rgba(${r}, ${g}, ${b}, ${rgb.a})`;
        } else {
          return `rgb(${r}, ${g}, ${b})`;
        }
      }
      
    /** Build darker color */
    static getDarkerColor(color, factor = 0.5) {
        const rgb = this.parseColor(color);
        if (!rgb) return null;
      
        const r = Math.max(0, Math.round(rgb.r * (1 - factor)));
        const g = Math.max(0, Math.round(rgb.g * (1 - factor)));
        const b = Math.max(0, Math.round(rgb.b * (1 - factor)));
      
        if (rgb.hasOwnProperty('a')) {
          return `rgba(${r}, ${g}, ${b}, ${rgb.a})`;
        } else {
          return `rgb(${r}, ${g}, ${b})`;
        }
      }

    static parseColor(colorStr) {
        let rgb;
        if (colorStr.startsWith('#')) {
          rgb = this.hexToRgb(colorStr);
        } else if (colorStr.startsWith('rgb(')) {
          rgb = this.rgbFromRgbExpression(colorStr);
        } else if (colorStr.startsWith('rgba(')) {
          rgb = this.rgbaFromRgbaExpression(colorStr);
        } else {
          return null;
        }
        return rgb;
    }
      
    static hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
            }
            : null;
    }
      
    static rgbFromRgbExpression(rgbExpression) {
        const values = rgbExpression.match(/\d+/g);
        return values
            ? {
              r: parseInt(values[0]),
              g: parseInt(values[1]),
              b: parseInt(values[2]),
            }
            : null;
    }
      
    static rgbaFromRgbaExpression(rgbaExpression) {
        const values = rgbaExpression.match(/[\d.]+/g);
        return values
            ? {
              r: parseInt(values[0]),
              g: parseInt(values[1]),
              b: parseInt(values[2]),
              a: parseFloat(values[3]),
            }
            : null;
      }
}

/*************************************************************
 * NoCss class : Write html with only attribute, no CSS anymore.
 * @author surfsky.github.com 2024-10
 *************************************************************/
class NoCss{

    /**
     * static constrctor
     */
    static {
        // enject custom properties
        //var baseAttrs = this.getPropertyNames(document.createElement('div').style);
        //var attrs = ['radius', 'bgcolor'].concat(baseAttrs);
        var attrs = [
            //
            'width', 'height', 'margin', 'padding', 'top', 'left', 'right', 'bottom',

            // basic
            'newClass', 'z', 'visible',
    
            // box module
            'box', 'radius',  
    
            // position
            'anchor', 'lineAnchor', 'fixAnchor', 'dock', 
    
            // child position
            'childAnchor', 'gridCol', 'childMargin',
    
            // theme
            'theme', 'color',
            'bg','bgColor', 'bgImage', 'bgRepeat', 'bgPosition', 'bgSize',
        
            // effect
            'shadow', 'transform', 'rotate', 'scale', 'skew', 'textShadow',
            'hoverBgColor', 'hoverColor',
    
            // event
            'events', 'click', 'draggable',
        ];
        attrs.forEach((attr) =>{
            var self = this;
            HTMLElement.prototype.__defineGetter__(attr, () => this.getAttribute(attr));
            HTMLElement.prototype.__defineSetter__(attr, function (value) { self.setCustomAttribute(this, attr, value); });
        });

        // create observer for dom changing.
        const observer = new MutationObserver((mutationsList, observer) => {
            for (const mutation of mutationsList) {
                const ele = mutation.target;
                if (mutation.type == 'childList'){
                    // when new element created, set it's custom attributes.
                    if (mutation.addedNodes.length > 0){
                        mutation.addedNodes.forEach((node)=>{
                            if (node instanceof HTMLElement)
                                this.setCustomAttributes(node);
                        });
                    }
                }
                //else if (mutation.type === 'attributes') {
                //    this.setCustomAttribute(ele, mutation.attributeName, ele.getAttribute(mutation.attributeName));
                //}
            }
        });
        observer.observe(document, { attributes: true, childList: true, subtree: true });

        // enject extension functions
        HTMLElement.prototype.animate = function(animFunc, endFunc=null, second=0.1, easing='ease'){
            var ele = this;
            ele.style.transition = `all ${second}s ${easing}`;
            if (endFunc != null)
                ele.addEventListener('transitionend', () => endFunc(ele), { once: true });
            requestAnimationFrame(() => animFunc(ele));
        };
    }

    //-----------------------------------------------------
    // Attributes
    //-----------------------------------------------------
    /**Set custom attributes values
    * @param {HTMLElement} ele
    */
    static setCustomAttributes(ele){
        // custome tag render process
        var render = this.getCustomTag(ele);
        if (render != null){
            ele = render.render(ele);
        }

        // set attributes
        var attrs = ele.getAttributeNames();
        attrs.forEach((attr) => {
            var val = ele.getAttribute(attr);
            if (val != null)
                this.setCustomAttribute(ele, attr, val);
        })
    }

    //-----------------------------------------------------
    // Custom tag
    //-----------------------------------------------------
    /**Custom tag renders */
    static customTags = {};

    /**Regist tag render 
     * @param {string} name 
     * @param {Tag} tag 
    */
    static registCustomTag(name, tag){
        name = name.toLowerCase();
        this.customTags[name] = tag;
    }

    /**Get custom tag render
     * @param {HTMLElement} ele  
     * @returns {Tag}
     */
    static getCustomTag(ele){
        var name = ele.tagName.toLowerCase();
        var render = this.customTags[name];
        return render;
    }

    // style keys has 638-645 items.
    static styleKeys = Object.keys(document.createElement('div').style);

    /**Set custom attribute value
    * @param {HTMLElement} ele
    * @param {string} name 
    * @param {string} newValue 
    */
    static setCustomAttribute(ele, name, newValue){
        // set basic style property (support low/high case)
        this.styleKeys.forEach(k =>{
            if (k.toLowerCase() == name) {
                ele.style[k] = newValue;
                return;
            }
        });

        // set extension attribute value
        switch(name.toLowerCase()){
            // rename
            case 'z':                 ele.style.zIndex = newValue; break;
            case 'radius':            ele.style.borderRadius = newValue;  break;
            case 'box':               ele.style.boxSizing = newValue; break;
            case 'bg':                ele.style.background = newValue; break;
            case 'bgcolor':           ele.style.backgroundColor = newValue;  break;
            case 'bgimage':           ele.style.backgroundImage = `url('${newValue}')`; break;
            case 'bgrepeat':          ele.style.backgroundRepeat = newValue; break;
            case 'bgposition':        ele.style.backgroundPosition = newValue; break;
            case 'bgsize':            ele.style.backgroundSize = newValue; break;
            case 'events':            ele.style.pointerEvents = newValue; break;

            // common
            case 'newclass':          ele.classList.add(newValue); break; //.setAttribute('class', newValue + ' ' + ele.getAttribute('class')); break;
            case 'visible':           this.setVisible(ele, newValue); break;

            // anchor(position)
            case 'anchor':            this.setAnchor(ele, newValue, 'absolute'); break;
            case 'fixanchor':         this.setAnchor(ele, newValue, 'fixed'); break;
            case 'dock':              this.setDock(ele, newValue, 'absolute'); break;
            case 'lineanchor':        this.setLineAnchor(ele, newValue); break;

            // grid
            case 'childmargin':       this.setChildMargin(ele, newValue); break;
            case 'childanchor':       this.setChildAnchor(ele, newValue); break;
            case 'gridcol':           this.setGridColumn(ele, newValue); break;


            // theme
            //case 'theme':             this.setThemeCls(newValue); break;

            // effect
            case 'shadow':            this.setShadow(ele, newValue); break;
            case 'textshadow':        this.setTextShadow(ele, newValue); break;
            case 'rotate':            ele.style.transform = `rotate(${newValue}deg)`; break;
            case 'skew':              ele.style.transform = `skew(${newValue}deg)`; break;
            case 'scale':             ele.style.transform = `scale(${newValue})`; break;
            case 'hoverbgcolor':      this.setHoverBgColor(ele, newValue); break;
            case 'hovercolor':        this.setHoverTextColor(ele, newValue);  break;

            // event
            case 'click':             this.setClick(ele, newValue); break;
            case 'draggable':         ele.setAttribute('draggable', newValue); break;
        }
    }


    //-----------------------------------------------------
    // Common
    //-----------------------------------------------------
    /**Get property names 
     * @param {object} o 
     * @returns {string[]}
    */
    static getPropertyNames(o){
        var names = [];
        for (let prop in o) {
            if (o.hasOwnProperty(prop)) {
                names.push(prop);
            }
        }
        return names;
    }

    /**Get or build uuid id. 
     * @param {Element} ele 
    */
    static getId(ele){
        var id = ele.id;
        if (id == ''){
            var idAttr = ele.getAttribute('id');
            if (idAttr != null)
                id = idAttr;
            else
                id = Utils.uuid();
        }
        return id;
    }

    /** Create unique id */
    static uuid(){
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }
    
    /** Save element's styleTage element 
    * @param {HTMLElement} ele
    */
    static saveStyle(ele){
        if (ele.styleTag == null) return;
        ele.id = this.getId(ele);
        var styleId = ele.id + '-style';
        ele.styleTag.id = styleId;

        //
        var tag = document.getElementById(styleId);
        if (tag == null)
            document.head.appendChild(ele.styleTag);
        else
            tag.textContent = ele.styleTag.textContent;
    }

    /** Set children margin 
     * @param {HTMLElement} ele 
     * @param {string} val css number. eg. 10px, 1em, 1rem
    */
    static setChildMargin(ele, val){
        ele.id = this.getId(ele);
        if (ele.styleTag == null)
            ele.styleTag = document.createElement('style');
        ele.styleTag.textContent = `#${ele.id} > *  {margin: ${val} }`;
        this.saveStyle(ele);
    }

    //-----------------------------------------------------
    // Animation
    //-----------------------------------------------------
    /**
     * Make animation
     * @param {HTMLElement} ele
     * @param {function} animFunc  target animation function. eg. this.style.height='0px';
     * @param {function} endFunc callback animation when finished. eg. this.style.visibility = 'hidden';
     * @param {number} second animation duration seconds
     * @param {string} [easing='ease'] easing animation name 
     * @example tag.animate((ele)=> ele.style.height = '0px');
     */
    static animate(ele, animFunc, endFunc=null, second=0.1, easing='ease'){
        ele.style.transition = `all ${second}s ${easing}`;
        if (endFunc != null)
            ele.addEventListener('transitionend', () => endFunc(ele), { once: true });
        requestAnimationFrame(() => animFunc(ele));
    }

    //-----------------------------------------------------
    // Anchor
    //-----------------------------------------------------
    /**
     * Set anchor
     * @param {HTMLElement} ele
     * @param {string} anchor see Anchor
     * @param {string} [position='absolute'] positon type: absolute | fixed
     * @description
        .fixTopLeft    {position:fixed; top:0px;    left:0px; }
        .fixTop        {position:fixed; top:0px;    left:50%; transform: translateX(-50%);}
        .fixTopRight   {position:fixed; top:0px;    right:0px; }
        .fixBottomLeft {position:fixed; bottom:0px; left:0px; }
        .fixBottom     {position:fixed; bottom:0px; left:50%; transform: translateX(-50%); }
        .fixBottomRight{position:fixed; bottom:0px; right:0px; }
        .fixLeft       {position:fixed; top:50%;    left:0px; transform: translateY(-50%); }
        .fixCenter     {position:fixed; top:50%;    left:50%;transform: translate3D(-50%, -50%, 0); }
        .fixRight      {position:fixed; top:50%;    right:0px; transform: translateY(-50%); }
        .fill          {position:fixed; top:0px;    left:0px;  right:0px; bottom:0px; }
    */
    static setAnchor(ele, anchor, position='absolute'){
        var s = ele.style;
        switch (anchor){
            case Anchor.TL  : s.position=position; s.top='0px';    s.left='0px';  break;
            case Anchor.T   : s.position=position; s.top='0px';    s.left='50%';  s.transform='translateX(-50%)';break;
            case Anchor.TR  : s.position=position; s.top='0px';    s.right='0px'; break;
            case Anchor.BL  : s.position=position; s.bottom='0px'; s.left='0px';  break;
            case Anchor.B   : s.position=position; s.bottom='0px'; s.left='50%';  s.transform='translateX(-50%)'; break;
            case Anchor.BR  : s.position=position; s.bottom='0px'; s.right='0px'; break;
            case Anchor.L   : s.position=position; s.top='50%';    s.left='0px';  s.transform='translateY(-50%)';           break;
            case Anchor.C   : s.position=position; s.top='50%';    s.left='50%';  s.transform='translate3D(-50%, -50%, 0)'; break;
            case Anchor.R   : s.position=position; s.top='50%';    s.right='0px'; s.transform='translateY(-50%)';           break;
            case Anchor.F   : s.position=position; s.top='0';      s.right='0';   s.bottom='0';   s.left='0'; s.width='100%'; s.height='100%';              break;  //
        }
        return ele;
    }

    /**
     * Set flow mode line anchor
     * @param {HTMLElement} ele
     * @param {string} anchor left|center|right
    */
    //static setLineAnchor(ele, anchor){
    //    var s = ele.style;
    //    s.display = 'block';
    //    switch (anchor){
    //        case Anchor.L   : s.width='400px'; s.marginLeft = 0;       break;
    //        case Anchor.C   : s.width='400px'; s.margin = '0 auto';    break;
    //        case Anchor.R   : s.width='400px'; s.marginLeft = 'auto'; s.marginRight = 0; break;
    //    }
    //    return ele;
    //}
    static setLineAnchor(ele, anchor){
        var s = ele.style;
        s.display = 'block';
        switch (anchor){
            case Anchor.L   : s.width='400px'; s.marginLeft = 0;       break;
            case Anchor.C   : s.width='400px'; s.margin = '0 auto';    break;
            case Anchor.R   : s.width='400px'; s.marginLeft = 'auto'; s.marginRight = 0; break;
        }
        return ele;
    }
    

    /**
     * Set child anchor
     * @param {HTMLElement} ele
     * @param {Anchor} anchor 
     .childTopLeft       {display: flex; justify-content: flex-start;  align-items: flex-start;}
    .childTop           {display: flex; justify-content: center;      align-items: flex-start;}
    .childTopRight      {display: flex; justify-content: flex-end;    align-items: flex-start;}
    .childBottomLeft    {display: flex; justify-content: flex-start;  align-items: flex-end;}
    .childBottom        {display: flex; justify-content: center;      align-items: flex-end;}
    .childBottomRight   {display: flex; justify-content: flex-end;    align-items: flex-end;}
    .childLeft          {display: flex; justify-content: flex-start;  align-items: center;}
    .childCenter        {display: flex; justify-content: center;      align-items: center; flex-direction: column;}
    .childRight         {display: flex; justify-content: flex-end;    align-items: center;}
    */
    static setChildAnchor(ele, anchor){
        var s = ele.style;
        if (anchor == null || anchor == ""){
            s.display = '';
            s.flexDirection  = '';     
            s.justifyContent = '';  
            s.alignItems = '';
        }
        else{
            s.display = 'flex';
            switch (anchor){
                case Anchor.TL  : s.flexDirection='row';     s.justifyContent='flex-start';  s.alignItems='flex-start'; break;
                case Anchor.T   : s.flexDirection='row';     s.justifyContent='center';      s.alignItems='flex-start'; break;
                case Anchor.TR  : s.flexDirection='row';     s.justifyContent='flex-end';    s.alignItems='flex-start'; break;
                case Anchor.L   : s.flexDirection='row';     s.justifyContent='flex-start';  s.alignItems='center';     break;
                case Anchor.C   : s.flexDirection='column';  s.justifyContent='center';      s.alignItems='center';     break;
                case Anchor.R   : s.flexDirection='row';     s.justifyContent='flex-end';    s.alignItems='center';     break;
                case Anchor.BL  : s.flexDirection='row';     s.justifyContent='flex-start';  s.alignItems='flex-end';   break;
                case Anchor.B   : s.flexDirection='row';     s.justifyContent='center';      s.alignItems='flex-end';   break;
                case Anchor.BR  : s.flexDirection='row';     s.justifyContent='flex-end';    s.alignItems='flex-end';   break;
                case Anchor.F   : this.setChildFill();   break;
            }
        }
        return ele;
    }

    /** Set child fill parent. Add css. 
     * @param {HTMLElement} ele
    */
    static setChildFill(ele){
        ele.style.display = 'flex';
        ele.id = this.getId(ele);
        if (ele.styleTag == null){
            ele.styleTag = document.createElement('style');
        }
        ele.styleTag.textContent = `#${ele.id} > * { flex: 1}`;
        this.saveStyle(ele);
    }

    /**Set dock 
     * @param {HTMLElement} ele
     * @param {string} anchor top, left, right, bottom 
    */
    static setDock(ele, anchor, position='absolute'){
        var s = ele.style;
        switch (anchor){
            case Anchor.T   : s.position=position; s.width='';               s.top='0';                      s.left='0';    s.right='0';   break;
            case Anchor.B   : s.position=position; s.width='';               s.bottom='0';   s.left='0';    s.right='0';   break;
            case Anchor.L   : s.position=position; s.height='';              s.top='0';      s.bottom='0';   s.left='0';                   break;
            case Anchor.R   : s.position=position; s.height='';              s.top='0';      s.bottom='0';                  s.right='0';   break;
            case Anchor.F   : s.position=position; s.width='';  s.height=''; s.top='0';      s.bottom='0';   s.left='0';    s.right='0';   break;
        }
        return this;
    }

    //-----------------------------------------------------
    // Effect
    //-----------------------------------------------------
    /** Set box shadow
     * @param {HTMLElement} ele
     * @param {string | boolean} newValue 
    */
    static setShadow(ele, newValue){
        if (newValue == 'true' || newValue == true)
            ele.style.boxShadow = '5px 5px 10px lightgray';
        else if (newValue == 'false' || newValue == false)
            ele.style.boxShadow = '';
        else
            ele.style.boxShadow = newValue;
        return ele;
    }

    /** Set text shadow
     * @param {HTMLElement} ele
     * @param {string | boolean} newValue 
    */
    static setTextShadow(ele, newValue){
        if (newValue == 'true' || newValue == true)
            ele.style.textShadow = '5px 5px 10px black';
        else if (newValue == 'false' || newValue == false)
            ele.style.textShadow = '';
        else
            ele.style.textShadow = newValue;
        return ele;
    }

    /**
     * Set hover background color
     * @param {HTMLElement} ele
     * @param {Color} color 
     */
    static setHoverBgColor(ele, color){
        var oldColor  = ele.style.backgroundColor;
        var oldCursor = ele.style.cursor;
        ele.addEventListener('mouseover', () => {
            ele.style.backgroundColor = color;
            ele.style.cursor = 'pointer';
        });
        ele.addEventListener('mouseout', () => {
            ele.style.backgroundColor = oldColor;
            ele.style.cursor = oldCursor;
        });
        return ele;
    }

    /**
     * Set hover text color
     * @param {HTMLElement} ele
     * @param {Color} color 
     */
    static setHoverTextColor(ele, color){
        var element = ele;
        var oldColor = element.style.color;
        var oldCursor = element.style.cursor;
        element.addEventListener('mouseover', function() {
            element.style.color = color;
            element.style.cursor = 'pointer';
        });
        element.addEventListener('mouseout', function() {
            element.style.color = oldColor;
            element.style.cursor = oldCursor;
        });
        return ele;
    }

    /**
     * Set hover opacity color
     * @param {HTMLElement} ele
     * @param {Color} color 
     */
    static setHoverOpacity(ele, opacity){
        var element = ele;
        var oldValue = element.style.opacity;
        var oldCursor = element.style.cursor;
        element.addEventListener('mouseover', function() {
            element.style.opacity = opacity;
            element.style.cursor = 'pointer';
        });
        element.addEventListener('mouseout', function() {
            element.style.opacity = oldValue;
            element.style.cursor = oldCursor;
        });
        return ele;
    }
        
    /**
     * Set visible
     * @param {HTMLElement} ele
     * @param {boolean} newValue 
     */
    static setVisible(ele, newValue){
        var b = (newValue=='true' || newValue==true);
        ele.style.visibility = b ? 'visible' : 'hidden';
        return ele;
    }


    /**
     * Set enable. If disable, it become gray, and cannot click. 
     * @param {HTMLElement} ele
     * @param {boolean} b 
     */
    static setEnable(ele, b){
        if (b){
            ele.disabled = false;
            ele.style.pointerEvents = '';
            ele.style.filter = '';
        }
        else{
            ele.disabled = true;
            ele.style.pointerEvents = 'none';
            ele.style.filter = 'grayscale(100%)';
        }
        return ele;
    }


    //-----------------------------------------------------
    // Event
    //-----------------------------------------------------
    /** Set click event 
     * @param {HTMLElement} ele
     * @param {function | string} func 
    */
    static setClick(ele, func){
        ele.addEventListener('click', (e)=>{
            e.stopPropagation(); // no send event to other
            eval(func);
        });
        return ele;
    }


    /**Set grid column 
     * @param {HTMLElement} ele
     * @param {string} expr start-length or start/end
     */
    static setGridColumn(ele, expr){
        if (expr.indexOf('-') != -1){
            // start-length
            const parts = expr.split("-");
            ele.style.gridColumnStart = parts[0];
            ele.style.gridColumnEnd = parseInt(parts[1]) + 1;
        }
        else{
            // start/end
            ele.style.gridColumn = expr;
        }
        return ele;
    }
}

/*************************************************************
 * Tag render base
 *************************************************************/
class Tag{
    /**Render tag 
     * @param {HTMLElement} ele Element parsed by page engine.
    */
    render(ele) {
        ele.style.transition = 'all 0.4s';
        return ele;
    }
}

/*************************************************************
 * Rect
 *************************************************************/
class Rect extends Tag{
    static { NoCss.registCustomTag('Rect', new Rect()); }

    /**@param {HTMLElement} ele */
    render(ele) {
        super.render(ele);
        ele.style.width = '100px';
        ele.style.height = '100px';
        ele.style.border = '1px solid #a0a0a0';
        ele.style.boxSizing = 'border-box';
        ele.style.overflow = 'hidden';
        if (ele.innerHTML != '')
            NoCss.setChildAnchor(ele, 'center');
        return ele;
    }
}

/*************************************************************
 * Circle
 *************************************************************/
class Circle extends Tag{
    static { NoCss.registCustomTag('Circle', new Circle()); }

    /**@param {HTMLElement} ele */
    render(ele) {
        ele.style.border = '1px solid #a0a0a0';
        ele.style.boxSizing = 'border-box';
        ele.style.overflow = 'hidden';
        var width = ele.getAttribute('width');
        if (width != null){
            ele.style.height = width;
            ele.style.borderRadius = '50%';
        }
        if (ele.innerHTML != '')
            NoCss.setChildAnchor(ele, 'center');
        return ele;
    }
}


/***********************************************************
 * Row container
 * @example
 *     <row gap="20px">
 ***********************************************************/
class Row extends Tag {
    static { NoCss.registCustomTag('Row', new Row());}

    /**@param {HTMLElement} ele */
    render(ele) {
        ele.style.width = '100%';
        ele.style.height = '100px';
        ele.style.display = "flex";
        ele.style.flexDirection = "row";
        var gap = ele.getAttribute('gap');
        if (gap != null)
            NoCss.setChildMargin(ele, `0 ${gap} 0 0`);
        return ele;
    }
}


/***********************************************************
 * Column container
 * @example
 *     <column gap="20px">
 ***********************************************************/
class Column extends Tag {
    static { NoCss.registCustomTag('Column', new Column());}  // 'col' will collide

    /**@param {HTMLElement} ele */
    render(ele) {
        ele.style.width = '100px';
        ele.style.height = '100%';
        ele.style.display = "flex";
        ele.style.flexDirection = "column";
        var gap = ele.getAttribute('gap');
        if (gap != null)
            NoCss.setChildMargin(ele, `0 0 ${gap} 0`);
        return ele;
    }
}

/************************************************************
 * Grid container
 * @example
 *     <grid gap="20px" columns='4'>
 *     <grid gap="20px" columns='100px auto 100px'>
 ***********************************************************/
class Grid extends Tag {
    static { NoCss.registCustomTag('Grid', new Grid()); }

    /**@param {HTMLElement} ele */
    render(ele) {
        ele.style.display = "grid";
        ele.style.gap = '10px';
        this.setColumns(ele, 4);

        var gap = ele.getAttribute('gap');
        if (gap != null)  
            ele.style.gap = gap;
        var cols = ele.getAttribute('columns');
        if (cols != null)  
            this.setColumns(ele, cols);
        var rows = ele.getAttribute('rows');
        if (rows != null)  
            this.setRows(ele, rows);

        return ele;
    }

    isNumberString(str) {
        const num = Number(str);
        return !isNaN(num);
    }

    setColumns(ele, val){
        if (this.isNumberString(val))
            ele.style.gridTemplateColumns = `repeat(${val}, 1fr)`; 
        else
            ele.style.gridTemplateColumns = val;
    }

    setRows(ele, val)   { 
        if (this.isNumberString(val))
            ele.style.gridTemplateRows = `repeat(${val}, 1fr)`; 
        else
            ele.style.gridTemplateRows = val;
    }
}




/************************************************************
 * Responsive form grid container to display 1-4 columns
 * @example
 *     <form>
 ***********************************************************/
class Form extends Tag {
    static { NoCss.registCustomTag('Form', new Form()); }

    /**@param {HTMLElement} ele */
    render(ele) {
        ele.classList.add('gridForm');
        ele.id = NoCss.getId(ele);
        var gap = ele.getAttribute('gap');
        if (gap != null)
            ele.style.gap = gap;

        ele.styleTag = this.createStyle(ele);
        NoCss.saveStyle(ele);
        return ele;
    }

    createStyle(ele){
        var id = ele.id;
        const style = document.createElement('style');
        style.textContent = `
            /* Responsive form grid container to display 1-4 columns*/
            .gridForm {
                display: grid;
                gap: 10px;
                padding: 10px;
            }
            @media (min-width: 400px)  {.gridForm { grid-template-columns: auto; }}
            @media (min-width: 800px)  {.gridForm { grid-template-columns: 100px auto; }}
            @media (min-width: 1000px) {.gridForm { grid-template-columns: 100px auto 100px auto; }}
            @media (min-width: 1200px) {.gridForm { grid-template-columns: 100px auto 100px auto 100px auto 100px auto;}}
            @media (min-width: 1400px) {.gridForm { grid-template-columns: 100px auto 100px auto 100px auto 100px auto 100px auto 100px auto;}}
            .gridForm > * {text-align: left; height: 30px;}
            .gridForm > label {padding-top: 0px;}
            .gridForm > input {border-radius: 4px; border: 1px solid gray;}
        `;
        return style;
    }
}



/************************************************************
 * Responsive container
 * @example
 *     <Container>
 ***********************************************************/
class Container extends Tag {
    static { NoCss.registCustomTag('Container', new Container()); }

    /**@param {HTMLElement} ele */
    render(ele) {
        ele.id = NoCss.getId(ele);
        ele.style.display = 'block';
        ele.style.transition = 'all 0.5s';   // animation
        ele.styleTag = this.createStyle(ele);
        NoCss.saveStyle(ele);
        return ele;
    }

    createStyle(ele){
        var id = ele.id;
        const style = document.createElement('style');
        style.textContent = `
            #${id} {
                width: 100%;
                margin-left: auto;
                margin-right: auto;
                padding-left: 15px;
                padding-right: 15px;
            }

            /* Responsive container 540-720-960-1140 */
            @media (min-width: 576px)  { #${id}   {max-width: 540px;}}  /*xs*/
            @media (min-width: 768px)  { #${id}   {max-width: 720px;}}  /*s*/
            @media (min-width: 992px)  { #${id}   {max-width: 960px;}}  /*m*/
            @media (min-width: 1200px) { #${id}   {max-width: 1140px;}} /*l*/
            @media (min-width: 1500px) { #${id}   {max-width: 1400px;}} /*xl*/
            @media (min-width: 1800px) { #${id}   {max-width: 1700px;}} /*xxl*/
            @media (min-width: 2000px) { #${id}   {max-width: 1900px;}} /*xxxl*/
        `;
        return style;
    }
}



/************************************************************
 * Button
 * @example
 *     <x-btn click='alert("...")' ripple='true'></x-btn>
 * @description
 *     - default theme like bootstrap
 *     - support click disable and become gray
 ***********************************************************/
class Button extends Tag {
    static { NoCss.registCustomTag('Button', new Button()); }

    /**@param {HTMLElement} ele */
    render(ele) {
        ele.style.boxSizing = 'border-box';
        ele.style.transition = 'all 0.5s';  // animation
        ele.style.padding = "10px";
        ele.style.overflow = 'hidden';
        ele.style.borderRadius = "8px";
        ele.style.borderWidth = "0px";
        ele.style.height = '44px';
        ele.style.width = '120px';
        ele.style.userSelect = 'none';   // can't select button text
        ele.style.textAlign = 'center';  // horizontal center text
        NoCss.setHoverOpacity(ele, '0.8');

        // event
        var click = ele.getAttribute('click');
        if (click != null) this.setClick(ele, click, false);
        var asyncClick = ele.getAttribute('asyncClick');
        if (asyncClick != null) this.setClick(ele, asyncClick, true);

        // theme
        ele.setTheme = function(){
            Theme.setBaseTheme(ele);
            var o = Theme.current;
            ele.style.borderRadius = o.radius;
            ele.style.color = o.textLight;
            if (o.border == null || o.border == ''){
                var clr = Utils.getDarkerColor(ele.style.backgroundColor, 0.2);
                ele.style.border = `1px solid ${clr}`;
            }
            else{
                ele.style.border = o.border;
            }
        }
        ele.setTheme();
        return ele;
    }


    /**
     * Set click event
     * @param {function | string} func callback function or string. eg. "alert('hello world');"
     * @param {boolean} [isAsync=false] Whether the func is async?
     */
    setClick(ele, func, isAsync=false) {
        if (isAsync)
            ele.addEventListener('click', async (e) => {
                e.stopPropagation(); // no send event to other

                // disable - eval - enable
                NoCss.setEnable(ele, false);
                if (typeof func === 'string')
                    await eval(`(async () => {${func}})()`);
                else
                    await func();
                NoCss.setEnable(ele, true);
            });
        else{
            ele.addEventListener('click',  (e) => {
                e.stopPropagation();

                // disable - eval - enable
                //this.setEnable(false);
                if (typeof func === 'string')
                    eval(func);
                else
                    func();
                //this.setEnable(true);
            });
        }
    }
}