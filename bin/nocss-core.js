
/*************************************************************
 * NoCss class : Write html with only attribute, no CSS anymore.
 * @author surfsky.github.com 2024-10
 * @description Use this file to avoid js library collision. eg. maptalks.
 * Map ele attribute to ele.style.xxx
 *************************************************************/
class NoCss{
    /**
     * static constrctor to monitor element create.
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
    }
}