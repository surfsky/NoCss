import {Anchor, Theme, Utils} from './nocss-utils.js'
import {NoCss, Tag} from './nocss-base.js';




/************************************************************
 * Mask
 * @example
 *     Mask.show(100);
 *     Mask.hide();
 ***********************************************************/
export class Mask {
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
export class Toast {
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
export class Tooltip {
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

