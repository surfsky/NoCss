/************************************************************
 * Align enum for anchor and childAnchor
 ***********************************************************/
const Anchors = {
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


/************************************************************
 * Theme
 ***********************************************************/
class Themes{
    name          = 'iOSLight';
    text          = 'black';
    textLight     = 'white';
    background    = 'white';
    link          = 'blue';
    linkHover     = 'darkblue';
    linkVisited   = 'gray';
    primary       = '#007bff';
    secondary     = '#7633d4';
    success       = '#28a745';
    info          = '#17a2b8';
    warning       = '#ffc107';
    danger        = '#dc3545';
    dark          = '#343a40';
    light         = '#f8f9fa';
    border        = '1px solid #cdcdcd';
    radius        = '8px';
    rowHeight     = '48px';
    controlHeight = '40px';

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



    /** Ajax
    * @param {string} method POST|GET
    * @param {string} url
    * @param {object} data 
    * @param {function(response)} callback
    * @example ajax('GET', url, null, function (response) {console.log('GET请求响应:', response);});
    */
    static ajax(method, url, data, callback, fail) {
        if (method === 'GET' && data)
            url += '?' + new URLSearchParams(data).toString();

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200)
                    callback(xhr.responseText);
                else if (fail != null)
                    fail();
            }
        };
        xhr.open(method, url, true);
        if (method === 'GET') {
            xhr.send();
        } else {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(JSON.stringify(data));
        }
    }
    
    /** Ajax get
    * @param {string} url
    * @param {function(response)} callback
    * @example ajaxGet(url, function (response) {console.log('GET请求响应:', response);});
    */
    static ajaxGet(url, callback, fail=null) {
        return this.ajax("GET", url, null, callback, fail);
    }

    /** Ajax post
    * @param {string} url
    * @param {function(response)} callback
    * @example ajaxPost(url, function (response) {console.log('GET请求响应:', response);});
    */
    static ajaxPost(url, data, callback, fail=null) {
        return this.ajax("POST", url, data, callback, fail);
    }
    

    /**Async Ajax 
     * @param {string} method GET|POST
     * @param {string} url 
     * @param {object} data valid when method is POST 
    */
    static async ajaxAsync(method, url, data=null){
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

    /**Async Ajax get
     * @param {string} url 
    */
    static async get(url) {
        return await this.ajaxAsync('GET', url);
    }

    /**Async Ajax post
     * @param {string} url 
     * @param {object} data 
    */
    static async post(url, data) {
        return await this.ajaxAsync('GET', url, data);
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
            'width', 'height', 
            'margin', 'padding', 'top', 'left', 'right', 'bottom', 
            'gridCol', 'gridRow', 

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

                //
                if (mutation.type == 'childList'){
                    // when new element created, set it's custom attributes.
                    mutation.addedNodes.forEach((node)=>{
                        if (node instanceof HTMLElement) {
                            //var render = this.getTagRender(node);
                            //if (render != null)
                            //    node = render.render(node);
                            this.setCustomAttributes(node);
                        };
                    });
                }
                else if (mutation.type === 'attributes') {
                    var name = mutation.attributeName;
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
    static tagRenders = {};

    /**Regist tag render 
     * @param {string} name 
     * @param {Render} tag 
    */
    static registTagRender(name, tag){
        name = name.toLowerCase();
        this.tagRenders[name] = tag;
    }

    /**Get custom tag render
     * @param {HTMLElement} ele  
     * @returns {Render}
     */
    static getTagRender(ele){
        return this.tagRenders[ele.tagName.toLowerCase()];
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
        if (ele == null || ele.getAttributeNames == null || ele.hasSetAttributes)
            return;

        var names = ele.getAttributeNames();
        names.forEach((name) => {
            this.setCustomAttribute(ele, name, ele.getAttribute(name));
        })
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
        var b = name in ele;  // is property or attribute

        // click is speical
        if (name == 'click'){
            this.setClick(ele, newValue);
            return;
        }

        // exclude ele's own property
        if (newValue==null || (name in ele))
            return;

        // set basic style property (support low/high case)
        for (const k of this.styleNames){
            if (k.toLowerCase() == name) {
                ele.style[k] = newValue;
                return;
            }
        }

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
            case 'gridcolumn':        this.setGridColumn(ele, newValue); break;
            case 'gridrow':           this.setGridRow(ele, newValue); break;

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
            default:                  break;
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
     * @param {string} color 
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
     * @param {string} color 
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
     * @param {string} color 
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

