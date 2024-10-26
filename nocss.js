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

/**
 * NoCss class : Write html with only attribute, no CSS anymore.
 * @author surfsky.github.com 2024-10
 */
class NoCss{
    // static constrctor
    static {
        // enject custom properties
        //var attrs = this.getPropertyNames(document.createElement('div').style);
        //attrs = ['radius', 'bgcolor'].concat(attrs);
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
            'childAnchor', 'gridCol',
    
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
    }

    //-----------------------------------------------------
    // Attributes
    //-----------------------------------------------------
    /**Set custom attributes values
    * @param {HTMLElement} ele
    */
    static setCustomAttributes(ele){
        var attrs = ele.getAttributeNames();
        attrs.forEach((attr) => {
            var val = ele.getAttribute(attr);
            if (val != null)
                this.setCustomAttribute(ele, attr, val);
        })
    }

    /**Set custom attribute value
    * @param {HTMLElement} ele
    * @param {string} name 
    * @param {string} newValue 
    */
    static setCustomAttribute(ele, name, newValue){
        if (ele.style.hasOwnProperty(name)){
            ele.style.setProperty(name, newValue);
            return;
        }
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
            case 'childanchor':       this.setChildAnchor(ele, newValue); break;
            case 'lineanchor':        this.setLineAnchor(ele, newValue); break;

            // grid
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
            var idAttr = this.getAttribute('id');
            if (idAttr != null)
                id = idAttr;
            else
                id = uuid();
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
        ele.id = this.getId();
        var styleId = ele.id + '-style';
        ele.styleTag.id = styleId;

        //
        var tag = document.getElementById(styleId);
        if (tag == null)
            document.head.appendChild(ele.styleTag);
        else
            tag.textContent = ele.styleTag.textContent;
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
    static setLineAnchor(ele, anchor){
        var s = ele.style;
        switch (anchor){
            case Anchor.L   : s.marginLeft = 0;       break;
            case Anchor.C   : s.margin = '0 auto';    break;
            case Anchor.R   : s.marginLeft = 'auto'; s.marginRight = 0; break;
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
        var oldColor = element.style.Color;
        var oldCursor = element.style.cursor;
        element.addEventListener('mouseover', function() {
            element.style.Color = color;
            element.style.cursor = 'pointer';
        });
        element.addEventListener('mouseout', function() {
            element.style.Color = oldColor;
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