import {Anchor, Theme, Utils} from './nocss-utils.js'
import {NoCss, Tag} from './nocss-base.js';


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




