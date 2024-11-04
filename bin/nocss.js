/************************************************************
 * Align enum for anchor and childAnchor
 ***********************************************************/
const Anchor = {
    TL: 'topLeft',
    T:  'top',
    TR: 'topRight',
    L:  'left',
    C:  'center',
    CH: 'centerH',
    R:  'right',
    BL: 'bottomLeft',
    B:  'bottom',
    BR: 'bottomRight',
    F:  'fill'
};

/**Color*/
class Color{
    r = 0;
    g = 0;
    b = 0;
    a = 0;

    constructor(r,g,b,a){
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}

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
        //document.body.style.transition = 'all 0.4s';
        //document.body.style.backgroundColor = theme.background;
        //document.body.style.color = theme.text;
        var eles = Array.from(document.querySelectorAll('*'));
        eles.forEach(ele => {
            if (ele instanceof HTMLElement){
                this.setBaseTheme(ele);
                if (ele.setTheme != undefined)
                  ele.setTheme();
            }
        });
        document.dispatchEvent(new Event('themechanged'));  // send message to document
    }

    /**
     * Set element theme.
     * @param {HTMLElement} ele 
     * @param {Theme} theme 
     */
    static setThemeCls(ele, themeCls){
        this.setBaseTheme(ele, themeCls);
        if (ele.setTheme != undefined){
            ele.setTheme();
        }
    }


    /**
     * Set theme for background and text color. Other settings will be setted in child class.
     * @param {HTMLElement} ele 
     */
    static setBaseTheme(ele, themeCls=null){
        if (themeCls == null)
            themeCls = ele.getAttribute('themeCls');
        if (themeCls == null)
            return;

        var t = Theme.current;
        ele.style.transition = 'all 0.4s';
        ele.style.color = t.text;
        switch (themeCls){
            case "bg":        ele.style.backgroundColor = t.background;  break;
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
    //-----------------------------------------
    // Icon
    //-----------------------------------------
    /** Icon root path*/
    static iconRoot = "../img/";
    static iconFontRoot = '../iconfont/';

    /** Get icon url from icons root and icon name 
     * @param {string} name IconName without folder and extension
    */
    static getIconUrl(name){
        if (name.includes('.'))
            return this.iconRoot + name;
        return `${this.iconRoot}${name}.png`;
    }


    //-----------------------------------------
    // Log
    //-----------------------------------------
    /** Write log in container
     * @param (string) msg
     * @param (string) containerId Log container's id
     * @param (string) lvl  Message level: INFO, WARN, ERROR
     * @param (string) format Default : [{date}] {level} : {message}
    */
    static log(msg='', lvl='INFO', containerId='', format='[{date}] {level} : {message}'){
        // text
        if (format != ''){
            var dt = new Date();
            var dt = dt.toLocaleDateString() + ' ' + dt.toLocaleTimeString();
            msg = format
                .replace('{date}', dt)
                .replace('{level}', lvl)
                .replace('{message}', msg)
                ;
        }

        // element
        var ele = document.createElement('div');
        ele.innerHTML = msg;
        ele.style.display = 'block';
        if (lvl == 'WARN')  ele.style.color = 'orange';
        if (lvl == 'ERROR') ele.style.color = 'red';

        // container
        var container = document.body;
        if (containerId != '')
            container = document.getElementById(containerId);
        container.appendChild(ele);
    }

    /**Clear logs */
    static clearLog(containerId){
        var container = document.body;
        if (containerId != '')
            container = document.getElementById(containerId);
        container.innerHTML = '';
    }


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

    /**HtmlEncode string to & lt; & gt;...
     * @param {string} code 
    */
    static htmlEncode(code) {
        //return code.replace(/[<>&"']/g, function(match) {
        return code.replace(/[<>]/g, function(match) {
            switch (match) {
                case '<':   return '&lt;';
                case '>':   return '&gt;';
                //case '&':   return '&amp;';
                //case '"':   return '&quot;';
                //case "'":   return '&#39;';
            }
        });
    }

    /**HtmlDecode string to <>&'"
     * @param {string} code 
    */
    static htmlDecode(code) {
        return code
            .replace('&lt;',   '<')
            .replace('&gt;',   '>')
            .replace('&amp;',  '&')
            .replace('&quot;', '"')
            .replace('&#39;',  "'")
            ;
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

    /**Insert link and check link whether exists 
     * @param {string} href 
    */
    static addLink(href) {
        if (!this.isLinkExist(href)) {
            const link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('href', href);
            document.head.appendChild(link);
        }
    }

    /**Check link whether exists 
     * @param {string} href 
    */
    static isLinkExist(href) {
        const links = document.getElementsByTagName('link');
        for (let i = 0; i < links.length; i++) {
            if (links[i].getAttribute('href') === href) {
                return true;
            }
        }
        return false;
    }



    //-----------------------------------------
    // DOM Calculate
    //-----------------------------------------
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

    /**Parse color string to object with r,g,b 
     * @param {string} colorStr support blue, #F0F0F0, rgb(...), rgba(...)
     * @returns {object} color object with r,g,b,a properties.
    */
    static parseColor(colorStr) {
        colorStr = colorStr.trim();
        if (colorStr == '')
            return null;

        let rgb;
        if (colorStr.startsWith('#')) {
          rgb = this.hexToRgb(colorStr);
        } else if (colorStr.startsWith('rgb(')) {
          rgb = this.rgbFromRgbExpression(colorStr);
        } else if (colorStr.startsWith('rgba(')) {
          rgb = this.rgbaFromRgbaExpression(colorStr);
        } else {
            var div = document.createElement('div');
            div.style.color = colorStr;
            document.body.appendChild(div);
            var clr = window.getComputedStyle(div).color;
            document.body.removeChild(div);
            return this.parseColor(clr);
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

    //-----------------------------------------
    // Ajax
    //-----------------------------------------
    /**Parse QueryString 
     * @param {string} url
     * @returns {object} 
    */
    static getQueryStrings(url) {
        const queryString = url.split('?')[1];
        if (!queryString) {
            return {};
        }
        return queryString.split('&').reduce((acc, pair) => {
            const [key, value] = pair.split('=');
            acc[key] = decodeURIComponent(value);
            return acc;
        }, {});
    }

    /**Async Ajax get
     * @param {string} url 
    */
    static async get(url) {
        return await this.ajax('GET', url);
    }

    /**Async Ajax post
     * @param {string} url 
     * @param {object} data 
    */
    static async post(url, data) {
        return await this.ajax('GET', url, data);
    }

    /**Async Ajax 
     * @param {string} method GET|POST
     * @param {string} url 
     * @param {object} data valid when method is POST 
    */
    static async ajax(method, url, data=null){
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.onreadystatechange = function () {
              if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                  const content = xhr.responseText;
                  resolve(content);
                } else {
                  reject(new Error('Failed to fetch the page.'));
                }
              }
            };

            xhr.send(data);
          });    
    }
}

/*************************************************************
 * NoCss class : Write html with only attribute, no CSS anymore.
 * @author surfsky.github.com 2024-10
 *************************************************************/
class NoCss{

    /**Regist convenient properties */
    static registProperties(){
        //var baseAttrs = this.getPropertyNames(document.createElement('div').style);
        //var attrs = ['radius', 'bgcolor'].concat(baseAttrs);
        var names = [
            // alias
            'width', 'height', 'margin', 'padding', 'top', 'left', 'right', 'bottom', 
            'gridC', 'gridR', 

            // basic
            'newClass', 'z', 'visible',
    
            // box module
            'box', 'radius',  
    
            // position
            'anchor', 'lineAnchor', 'fixAnchor', 'dock', 
    
            // child
            'childAnchor', 'childMargin', 'childPadding',
    
            // theme
            'themeCls', 'color',
            'bg','bgColor', 'bgImage', 'bgRepeat', 'bgPosition', 'bgSize',
        
            // effect
            'shadow', 'transform', 'rotate', 'scale', 'skew', 'textShadow', 
            'hoverBgColor', 'hoverColor',
    
            // event
            'events', 'click', 'draggable',
        ];
        names.forEach((name) =>{
            var self = this;
            HTMLElement.prototype.__defineGetter__(name, function(){
                //return this.getAttribute(name);
                return self.getCustomAttribute(this, name);
            });
            HTMLElement.prototype.__defineSetter__(name, function (value) { 
                this.setAttribute(name, value);
                self.setCustomAttribute(this, name, value); 
            });

            /*
            HTMLElement.defineProperty(mydiv, name, {
                get: function () {
                    return self.getCustomAttribute(this, name);
                },
                set: function (value) {
                    this.setAttribute(name, value);
                    self.setCustomAttribute(this, name, value);
                },
                enumerable: true,
                configurable: true
            });
            */
        });
    }

    /**
     * static constrctor
     */
    static {
        // create observer for dom changing.
        const observer = new MutationObserver((mutationsList, observer) => {
            for (const mutation of mutationsList) {
                const ele = mutation.target;
                if (mutation.type == 'childList'){
                    // when new element created, set it's custom attributes.
                    if (mutation.addedNodes.length > 0){
                        mutation.addedNodes.forEach((node)=>{
                            if (node instanceof HTMLElement)
                                node = this.renderCustomTag(node);
                                this.setCustomAttributes(node);
                        });
                    }
                }
                else if (mutation.type === 'attributes') {
                    var name = mutation.attributeName;
                    if (name != 'style' && name != 'id')
                        this.setCustomAttribute(ele, name, ele.getAttribute(name));
                }
            }
        });
        observer.observe(document, { attributes: true, childList: true, subtree: true });
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

    /**
     * Render custom tag.
     * @param {HTMLElement} ele 
     * @returns {HTMLElement}
     */
    static renderCustomTag(ele){
        // custome tag render process
        var render = this.getCustomTag(ele);
        if (render != null){
            ele = render.render(ele);
        }
        return ele;
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


    //-----------------------------------------------------
    // Attributes
    //-----------------------------------------------------
    /**Get attribute value
     * @param {HTMLElement} ele
     * @param {string} name  
     */
    static getCustomAttribute(ele, name){
        var styleName = this.styleNames.find(t => t.toLowerCase() === name);
        if (styleName != null)
            return ele.style[styleName];
        return ele.getAttribute(name);
    }

    /**Set custom attributes values
    * @param {HTMLElement} ele
    */
    static setCustomAttributes(ele){
        if (ele == null)
            return;

        if (ele.getAttributeNames && !ele.hasSetAttributes){
            var attrs = ele.getAttributeNames();
            attrs.forEach((attr) => {
                var val = ele.getAttribute(attr);
                if (val != null)
                    this.setCustomAttribute(ele, attr, val);
            })
        }
        ele.hasSetAttributes = true;
    }

    // style keys has 638-645 items.
    static styleNames = Object.keys(document.createElement('div').style);

    /**Set custom attribute value
    * @param {HTMLElement} ele
    * @param {string} name 
    * @param {string} newValue 
    */
    static setCustomAttribute(ele, name, newValue){
        // set basic style property (support low/high case)
        this.styleNames.forEach(k =>{
            if (k.toLowerCase() == name) {
                ele.style[k] = newValue;
                return;
            }
        });

        // set extension attribute value
        switch(name.toLowerCase()){
            // alias
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
            case 'gridc':             this.setGridColumn(ele, newValue); break;
            case 'gridr':             this.setGridRow(ele, newValue); break;

            // common
            case 'newclass':          ele.classList.add(newValue); break; //.setAttribute('class', newValue + ' ' + ele.getAttribute('class')); break;
            case 'visible':           this.setVisible(ele, newValue); break;

            // anchor(position)
            case 'anchor':            this.setAnchor(ele, newValue, 'absolute'); break;
            case 'fixanchor':         this.setAnchor(ele, newValue, 'fixed'); break;
            case 'dock':              this.setDock(ele, newValue, 'absolute'); break;
            case 'lineanchor':        this.setLineAnchor(ele, newValue); break;

            // child
            case 'childanchor':       this.setChildAnchor(ele, newValue); break;
            case 'childmargin':       this.setChildStyle(ele, 'margin', newValue); break;
            case 'childpadding':      this.setChildStyle(ele, 'padding', newValue); break;


            // theme
            case 'themecls':          Theme.setThemeCls(ele, newValue); break;

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

    /** Set children style
     * @param {HTMLElement} ele 
     * @param {string} name css style name. eg. margin
     * @param {string} val css number. eg. 10px, 1em, 1rem
    */
    static setChildStyle(ele, name, val){
        ele.id = this.getId(ele);
        if (ele.styleTag == null)
            ele.styleTag = document.createElement('style');
        ele.styleTag.textContent = `#${ele.id} > *  {${name}: ${val} }`;
        this.saveStyle(ele);
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
                case Anchor.CH  : s.flexDirection='row';     s.justifyContent='center';      s.alignItems='center';     break;
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

    /**Set grid row
     * @param {HTMLElement} ele
     * @param {string} expr start-length or start/end
     */
    static setGridRow(ele, expr){
        if (expr.indexOf('-') != -1){
            // start-length
            const parts = expr.split("-");
            ele.style.gridRowStart = parts[0];
            ele.style.gridRowEnd = parseInt(parts[1]) + 1;
        }
        else{
            // start/end
            ele.style.gridRow = expr;
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
        ele.style.boxSizing = 'border-box';
        ele.style.width = '100%';
        ele.style.height = '100px';
        ele.style.display = "flex";
        ele.style.flexDirection = "row";
        var gap = ele.getAttribute('gap');
        if (gap != null)
            NoCss.setChildStyle(ele, 'margin', `0 ${gap} 0 0`);
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
        ele.style.boxSizing = 'border-box';
        ele.style.width = '100px';
        ele.style.height = '100%';
        ele.style.display = "flex";
        ele.style.flexDirection = "column";
        var gap = ele.getAttribute('gap');
        if (gap != null)
            NoCss.setChildStyle(ele, 'margin', `0 0 ${gap} 0`);
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
        ele.style.boxSizing = 'border-box';
        ele.style.display = "grid";
        ele.style.gap = '10px';
        this.setColumns(ele, 4);

        var gap = ele.getAttribute('gap');
        if (gap != null)  
            ele.style.gap = gap;
        var cols = ele.getAttribute('columns');
        if (cols != null)  
            this.setColumns(ele, cols);
        var columnsSmall = ele.getAttribute('columnsSmall');
        if (columnsSmall != null)  
            this.setScreenColumns(ele, columnsSmall, '800px');
        var rows = ele.getAttribute('rows');
        if (rows != null)  
            this.setRows(ele, rows);
        var minColumn = ele.getAttribute('minColumn');
        if (minColumn != null)  
            this.setAutoColumn(ele, minColumn);

        return ele;
    }

    /**Is certain str is number 
     * @param {string} str 
     * @returns {boolean}
    */
    isNumberString(str) {
        const num = Number(str);
        return !isNaN(num);
    }

    /**Set auto layout grid 
     * @param {HTMLElement} ele
     * @param {string} minWidth gridItem min width 
    */
    setAutoColumn(ele, minWidth='100px'){
        // repeat(auto-fit, minmax(200px, 1fr));
        ele.style.gridTemplateColumns = `repeat(auto-fit, minmax(${minWidth}, 1fr))`;
    }

    /**
     * Set grid template columns
     * @param {HTMLElement} ele  
     * @param {string|number} val 
    */
    setColumns(ele, val){
        if (this.isNumberString(val))
            ele.style.gridTemplateColumns = `repeat(${val}, 1fr)`; 
        else
            ele.style.gridTemplateColumns = val;
    }


    /**
     * Set grid template columns
     * @param {HTMLElement} ele  
     * @param {string|number} val 
     * @media screen and (max-width: 610px) { .container { grid-template-columns: 200px;}}
    */
    setScreenColumns(ele, val, screenWidth='800px'){
        var gridColumns = val;
        if (this.isNumberString(val))
            gridColumns = `repeat(${val}, 1fr)`;

        ele.id = NoCss.getId(ele);
        var style = document.createElement('style');
        style.id = ele.id + '-style';
        style.textContent = `
            @media screen and (max-width: ${screenWidth}) { 
                #${ele.id} { grid-template-columns: ${gridColumns} !important; }
            }
        `;
        ele.styleTag = style;
        NoCss.saveStyle(ele);
    }


    /**
     * Set grid template rows
     * @param {HTMLElement} ele  
     * @param {string|number} val 
    */
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

        var icon = ele.getAttribute('icon');
        if (icon != null) {
            // <icon color='black'  fontsize="34px" key='user'      ></icon>
            var tag = document.createElement('icon');
            tag.setAttribute('key', icon);
            tag.style.color = Theme.current.textLight;
            tag.style.fontSize = '20px';
            tag.style.marginRight = '4px';
            ele.insertBefore(tag, ele.firstChild);
        }

        // event
        //var click = ele.getAttribute('click');
        //if (click != null) this.setClick(ele, click, false);
        var asyncClick = ele.getAttribute('asyncClick');
        if (asyncClick != null) this.setClick(ele, asyncClick, true);

        // default themecls
        var themeCls = ele.getAttribute('themeCls');
        if (themeCls == null) ele.setAttribute('themeCls', 'primary');

        // theme
        ele.setTheme = function(){
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


/************************************************************
 * Mask
 * @example
 *     Mask.show(100);
 *     Mask.hide();
 ***********************************************************/
class Mask {
    static async show(z = 99) {
        if (this.overlay == null) {
            this.overlay = document.createElement('div');
            this.overlay.style.position = 'fixed';
            this.overlay.style.top = 0;
            this.overlay.style.left = 0;
            this.overlay.style.width = '100%';
            this.overlay.style.height = '100%';
            this.overlay.style.display = 'none';
            this.overlay.style.transition = 'all 0.5s';
            this.overlay.style.zIndex = z;
            document.body.appendChild(this.overlay);
        }
        this.overlay.style.display = 'block';
        //this.overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.0)';
        await Utils.sleep(50);
        this.overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    }

    static async hide() {
        if (this.overlay != null) {
            this.overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.0)';
            await Utils.sleep(500);
            this.overlay.style.display = 'none';
            document.body.removeChild(this.overlay);
            this.overlay = null;
        }
    }
}



/************************************************************
 * Toast
 * @example
 *     Toast.show('info', 'message info');
 ***********************************************************/
class Toast {
    static counter = 0;

    /**
     * Show toast
     * @param {string} icon iconname without extension
     * @param {string} text information 
     */
    static async show(text, icon='white-bulb', width='400px', height='38px') {
        var id = Utils.uuid();
        var tag = `
            <rect id='${id}' box='border-box' fixanchor='top' top='-100px' childanchor='centerH'
              width='${width}' height='${height}' radius='6px'  border='0'
              bgcolor='${Theme.current.success}' color='${Theme.current.light}' opacity='0.8'>
                <img src='${Utils.getIconUrl(icon)}' width='20px' height='20px'/>&nbsp;
                <div>${text}<div>
            </rect>
        `;

        // add to body
        var ele = Utils.parseElement(tag);
        document.body.appendChild(ele);

        // parse height's value and unit, calc top position.
        this.counter++;
        const regex = /(\d+(?:\.\d+)?)(px|rem|em|%)/;
        const match = height.match(regex);
        const value = match ? parseFloat(match[1]) : 38;
        const unit  = match ? match[2] : 'px';
        var top = 25 + (this.counter-1)*(value+10) + unit;

        // show and hide with animation
        var toast = Utils.$('#' + id);  // = ele.root
        await Utils.sleep(50);
        toast.style.top = top;
        await Utils.sleep(2000);
        toast.style.top = '-100px';
        await Utils.sleep(1000);
        document.body.removeChild(toast);
        this.counter--;
    }

}

/************************************************************
 * Tooltip
 * @example
 *     Tooltip.show(ele, 'message info');
 *     Tooltip.bind('#id');
 *     Tooltip.hide();
 ***********************************************************/
class Tooltip {
    /** Bind all matched elements to show tooltip
     * @param {string} selector Element selector 
     * @param {string} [attrName='tip'] Attribute name or callback， If null, show element's text content.
    */
    static bind(selector, attrName=null) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(ele => {
            var o = (ele.root == null) ? ele : ele.root;
            o.addEventListener('mouseover', () => Tooltip.show(ele, attrName));
            o.addEventListener('mouseout',  () => Tooltip.hide());
        });
    }

    /**
     * Show tooltip under element. 
     * @param {Tag} element 
     * @param {string} attrName
     */
    static show(element, attrName) {
        var text = '';
        if (attrName == null)                    text = element.textContent;
        else if (typeof attrName == 'function')  text = attrName(element);
        else                                     text = this.getVal(element, attrName);
        if (text == null || text == '')
            return;

        const tooltip = document.createElement('div');
        tooltip.id = 'tooltip';
        tooltip.innerHTML = text;
        tooltip.style.display = 'block';
        tooltip.style.position = "fixed";
        tooltip.style.backgroundColor = 'white'; //"#f9f9f9";
        tooltip.style.border = "1px solid #ccc";
        tooltip.style.borderRadius = '4px';
        tooltip.style.padding = "5px";
        tooltip.style.zIndex = "999";

        var rect = element.getBoundingClientRect(); // get rect in viewport
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top  = rect.bottom + 4 + 'px';
        document.body.appendChild(tooltip);
    }

    /** Hide tooltip */
    static hide() {
        const tooltip = document.getElementById('tooltip');
        if (tooltip != null)
            document.body.removeChild(tooltip);
    }

    /** Get element's attribute's value 
     * @param {Element} element 
     * @param {string} attr Attribute name, can be comma-seperated string: 'style.width'
    */
    static getVal(element, attr) {
        let attrs = attr.split('.');
        let value = element;
        for (let a of attrs) {
            value = value[a];
            if (value === undefined) {
                return undefined;
            }
        }
        return value;
    }
}


/***********************************************************
 * Column container
 * @example
 *     <img icon="20px">
 ***********************************************************/
class Image extends Tag {
    static { NoCss.registCustomTag('Img', new Image());}

    /**@param {HTMLElement} ele */
    render(ele) {
        ele.style.boxSizing = 'border-box';

        var icon = ele.getAttribute('icon');
        if (icon != null)
            ele.src = `${Utils.getIconUrl(icon)}`;

        var avatar = ele.getAttribute('avatar');
        if (avatar != null) {
            ele.style.height = ele.style.width;
            ele.style.backgroundColor = 'white';
            ele.style.padding = '5px';
            ele.style.border = '1px solid #a0a0a0';
            ele.style.borderRadius = '50%';
        }

        return ele;
    }
}


/************************************************************
 * IconFont
 * @example
 *     <icon name='user'  color='red'></icon>
 *     <icon name='users' color='blue'></icon>
 * @description
 *     see https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=1271142
 ***********************************************************/
class Icon extends Tag {
    static { NoCss.registCustomTag('Icon', new Icon());}

    /**@param {HTMLElement} ele */
    render(ele) {
        // <span class="icon iconfont icon-shop-pay"></span>
        ele.style.display = 'inline-block';
        ele.style.transition = 'all 0.5s';  // animation
        ele.classList.add('icon', 'iconfont');
        ele.classList.add('icon-' + ele.getAttribute('key'));

        // <link rel="stylesheet" href="iconfont.css">
        Utils.addLink(Utils.iconFontRoot + "iconfont.css");
        return ele;
    }
}



/************************************************************
 * FontAwesome Icon
 * @example
 *     <icona name='bulb' type='solid' color='red'></icona>
 *     <icona name='bulb' type='regular' color='blue'></icona>
 * @description
 *     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
 *     <i class="fa-regular fa-lightbulb" style="color:red"></i>
 *     see https://fontawesome.com.cn/v5
 ***********************************************************/
class IconAwesome extends Tag {
    static { NoCss.registCustomTag('Icona', new IconAwesome());}

    /**@param {HTMLElement} ele */
    render(ele) {
        // <i class="fa-regular fa-lightbulb" style="color:red"></i>
        ele.style.display = 'inline-block';
        ele.style.transition = 'all 0.5s';  // animation
        ele.classList.add('fa-' + ele.getAttribute('key'));
        ele.classList.add('fa-' + ele.getAttribute('type'));

        // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        Utils.addLink("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css")
        return ele;
    }
}


/************************************************************
 * Global style
 * @example
 *     <globalStyle 
 *         box='border-box' 
 *         transition='all 0.5s' 
 *         linkColor='red' linkHoverColor='green' linkVisitColor='purple' 
 *         fullScreen='true' 
 *         rem='16px'
 *         />
 ***********************************************************/
class GlobalStyle extends Tag {
    static { NoCss.registCustomTag('GlobalStyle', new GlobalStyle());}

    /**@param {HTMLElement} ele */
    render(ele) {
        //
        var box = ele.getAttribute('box') || 'border-box';
        var transition = ele.getAttribute('transition') || '0.5s';
        var linkColor = ele.getAttribute('linkColor') || 'blue';
        var linkHoverColor = ele.getAttribute('linkHoverColor') || 'green';
        var linkVisitColor = ele.getAttribute('linkVisitColor')|| 'purple';
        var fullScreen = ele.getAttribute('fullScreen')|| 'true';
        var rem = ele.getAttribute('rem') || '16px';

        //
        var tag = document.createElement('style');
        tag.id = 'global';
        tag.textContent = `
            /* for all elements */
            *, *::before, *::after {
                box-sizing: ${box};
                transition: ${transition};
            }

            /* link */
            a, a:hover, a:visited { text-decoration: none; }
            a         {color: ${linkColor}}
            a:hover   {color: ${linkHoverColor}}
            a:visited {color: ${linkVisitColor}}

            /* rem */
            html { font-size : ${rem} }
        `;
        if (fullScreen == 'true')
            tag.textContent = tag.textContent + `
            /* fullscreen */
            html,body {
                width: 100%;  height: 100%;
                padding: 0px; margin: 0px;
            }
        `;
        tag.textContent = tag.textContent + ele.innerText;
        document.head.appendChild(tag);
        return ele;
    }    
}



/************************************************************
 * Exapandable panel
 ***********************************************************/
class Panel extends Column{
    static {NoCss.registCustomTag('Panel', new Panel());}

    /**
    <column id='panel' width="400px" height="500px">
        <rect id="title" width="400px" height="40px" radius="20px 20px 0 0" border="1px solid #a0a0a0" bg="lightblue" hoverColor="red">Title</rect>
        <rect id='body'  width="400px" height="400px" radius="0 0 20px 20px" border="1px solid #a0a0a0" bg="">Body</rect>
    </column>
     */
    render(ele){
        super.render(ele);
        NoCss.setCustomAttributes(ele);

        //
        ele.id = NoCss.getId(ele);
        ele.style.overflow = 'hidden';
        var titleId = `${ele.id}-title`;
        var bodyId = `${ele.id}-body`;

        // common attributes
        var height          = ele.getAttribute('height') || '400px';
        var borderColor     = ele.getAttribute('borderColor') || '#a0a0a0';
        var titleVisible    = Utils.toBool(ele.getAttribute('titleVisible') || true);

        // render innerHTML without title
        if (!titleVisible){
            ele.innerHTML = `
                <div id='${bodyId}'  width="100%" flex='1' childAnchor='center' overflow='hidden'>
                    ${ele.innerHTML}
                </div>
            `;
            return ele;
        }
        else{
            // render innerHTML with title
            var radiusTopLeft   = ele.getAttribute('radius') || '0';
            var radiusTopRight  = ele.getAttribute('radius') || '0';
            var title           = ele.getAttribute('title') || 'Title';
            var titleHeight     = ele.getAttribute('titleHeight') || '40px';
            var titleBgColor    = ele.getAttribute('titleBgColor') || 'lightBlue';
            var titleColor      = ele.getAttribute('titleColor') || 'black';
            var titleBgHoverColor = Utils.getDarkerColor(titleBgColor);
            var minHeight       = ele.getAttribute('minHeight') || titleHeight;
            ele.innerHTML = `
                <div id="${titleId}" width="100%" height="${titleHeight}" 
                    borderBottom="1px solid ${borderColor}" 
                    color='${titleColor}'
                    bgColor="${titleBgColor}" hoverBgColor="${titleBgHoverColor}"
                    radiusTopLeft='${radiusTopLeft}'
                    radiusTopRight='${radiusTopRight}'
                    childAnchor='center'
                    >
                    ${title}
                </div>
                <div id='${bodyId}'  width="100%" flex='1' childAnchor='center' overflow='hidden'>
                    ${ele.innerHTML}
                </div>
            `;

            // expanded property
            var name = 'expanded';
            Object.defineProperty(ele, name, {
                get: function () {
                    return Utils.toBool(ele.getAttribute(name));
                },
                set: function (value) {
                    var b = Utils.toBool(value);
                    this.setAttribute(name, b);
                    ele.style.height = b ? height : minHeight;
                },
                //enumerable: true,
                //configurable: true
            });
            ele.expanded = Utils.toBool(ele.getAttribute('expanded') || true);

            // script
            var panel = document.getElementById(ele.id);
            var divTitle = document.getElementById(titleId);
            if (divTitle)
                divTitle.addEventListener('click', ()=> panel.expanded = !panel.expanded);
            return ele;
        }
    }
}

/************************************************************
 * Switcher
 ***********************************************************/
class Switcher extends Row{
    static {NoCss.registCustomTag('Switcher', new Switcher());}

    /**
    <row id="switch1" width="100px" height="40px" radius="20px" 
        border="1px solid #a0a0a0" 
        bgcolor="white"
        checked="false"
        >
        <circle width="38px"  order="1" bgcolor="green" border="2px solid white"></circle>
        <div    height="40px" order="2" flex="1" childAnchor="center">OFF</div>
    </row>
     */
    render(ele){
        super.render(ele);
        NoCss.setCustomAttributes(ele);

        //
        ele.id = NoCss.getId(ele);

        // common attributes
        var width           = ele.getAttribute('width') || '100px';
        var height          = ele.getAttribute('height') || '40px';
        var radius          = ele.getAttribute('radius') || '20px';
        var border          = ele.getAttribute('border') || "1px solid #a0a0a0";
        var trueText        = ele.getAttribute('trueText') || "ON";
        var falseText       = ele.getAttribute('falseText') || "OFF";
        var checked         = Utils.toBool(ele.getAttribute('checked') || "false");
        var baseColor       = Theme.current.primary;
        var heightNum       = Utils.calcPx(height);

        // render innerHTML
        ele.style.width = width;
        ele.style.height = height;
        ele.style.borderRadius = radius;
        ele.style.border = border;
        ele.innerHTML = `
            <circle id='${ele.id}-circle' width="${heightNum-2}px"  border="2px solid white"></circle>
            <div    id='${ele.id}-text'   height="${heightNum}px"   flex="1" childAnchor="center">${trueText}</div>
        `;

        // event
        ele.addEventListener('click', ()=> {
            var b = ele.checked || false;
            setChecked(ele, !b, baseColor, trueText, falseText);
        });
        this.setChecked(ele, checked, baseColor, trueText, falseText);
        return ele;
    }

    /** Set switcher value
     * @param {HTMLElement} ele
     * @param {boolean} b
     * @param {string} clr
    */
    setChecked(ele, b, clr, trueText='ON', falseText='OFF'){
        //var divCircle = ele.querySelector('circle')[0];
        //var divText   = ele.querySelector('div')[0];
        var divCircle = document.getElementById(ele.id + '-circle');
        var divText   = document.getElementById(ele.id + '-text');

        ele.checked = b;
        ele.style.backgroundColor           = b ? clr : 'white';

        divCircle.style.order               = b ? 2 : 1;
        divCircle.style.borderColor         = b ? clr : 'white';
        divCircle.style.backgroundColor     = b ? 'white' : clr;

        divText.style.order                 = b ? 1 : 2;
        divText.style.color                 = b ? 'white' : clr;
        divText.innerText                   = b ? trueText : falseText;
    }
}