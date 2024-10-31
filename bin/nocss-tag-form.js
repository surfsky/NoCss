import {Anchor, Theme, Utils} from './nocss-utils.js'
import {NoCss, Tag} from './nocss-base.js';


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
        //var click = ele.getAttribute('click');
        //if (click != null) this.setClick(ele, click, false);
        var asyncClick = ele.getAttribute('asyncClick');
        if (asyncClick != null) this.setClick(ele, asyncClick, true);

        // theme
        ele.setTheme = function(){
            var themeCls = ele.getAttribute('themeCls');
            if (themeCls == null) themeCls = 'primary';
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



