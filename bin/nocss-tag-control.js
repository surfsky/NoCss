import {Anchor, Theme, Utils} from './nocss-utils.js'
import {NoCss, Tag} from './nocss-base.js';


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
        ele.classList.add('icon-' + ele.getAttribute('name'));

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
        ele.classList.add('fa-' + ele.getAttribute('name'));
        ele.classList.add('fa-' + ele.getAttribute('type'));

        // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        Utils.addLink("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css")
        return ele;
    }
}
