
/************************************************************
 * Dialog
 * @example
 *     Dialog.show();
 *     Dialog.close();
 ***********************************************************/
class Dialog extends Tag {
    static { NoCss.registCustomTag('Dialog', new Dialog());}

    createStyle(){
        const style = document.createElement('style');
        style.textContent = `
          /* popup layer */
          .popup {
              position: absolute;
              background-color: white;
              padding: 40px 20px 20px 20px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
              display: none;
              overflow: auto;
              box-sizing: border-box;
              width: 500px;
              height: 400px;
              z-index: 999;
              transition = 'all 0.5s';
            }
          .popup-content {
              text-align: center;
              /*user-select: none;*/
            }
          /* close button */
          .btn-close {
              position: absolute;
              top: 10px;
              right: 10px;
              cursor: pointer;
              user-select: none;
            }
          .btn-close:hover{
            color: red;
          }
          /* resizers */
          .resizer {
              position: absolute;
              cursor: pointer;
            }
          .resizer-top {
              top: 0;
              left: 0;
              right: 0;
              height: 10px;
              cursor: ns-resize;
            }
          .resizer-bottom {
              bottom: 0;
              left: 0;
              right: 0;
              height: 10px;
              cursor: ns-resize;
            }
          .resizer-left {
              top: 0;
              bottom: 0;
              left: 0;
              width: 10px;
              cursor: ew-resize;
            }
          .resizer-right {
              top: 0;
              bottom: 0;
              right: 0;
              width: 10px;
              cursor: ew-resize;
            }
          .resizer-topleft {
              top: 0;
              left: 0;
              width: 10px;
              height: 10px;
              cursor: nwse-resize;
            }
          .resizer-topright {
              top: 0;
              right: 0;
              width: 10px;
              height: 10px;
              cursor: nesw-resize;
            }
          .resizer-bottomleft {
              bottom: 0;
              left: 0;
              width: 10px;
              height: 10px;
              cursor: nesw-resize;
            }
          .resizer-bottomright {
              bottom: 0;
              right: 0;
              width: 10px;
              height: 10px;
              cursor: nwse-resize;
            }
          `;
        return style;
    }

    createRoot(){
        // popup
        this.root = document.createElement('div');
        this.root.classList.add('popup');
        this.root.transition = 'all 0.5s';


        // close button
        this.closeButton = document.createElement('span');
        this.closeButton.classList.add('btn-close');
        this.closeButton.textContent = '×';
        this.closeButton.addEventListener('click', async () => await this.close());
        this.root.appendChild(this.closeButton);

        // content
        this.contentDiv = document.createElement('div');
        this.contentDiv.classList.add('popup-content');
        //this.contentDiv.innerHTML = this.innerHTML;   ///////////
        Array.from(this.childNodes).forEach(child => this.contentDiv.appendChild(child));
        this.root.appendChild(this.contentDiv);

        // resizer(todo: use tag)
        const resizerTop = document.createElement('div');
        resizerTop.classList.add('resizer', 'resizer-top');
        this.root.appendChild(resizerTop);
        const resizerBottom = document.createElement('div');
        resizerBottom.classList.add('resizer', 'resizer-bottom');
        this.root.appendChild(resizerBottom);
        const resizerLeft = document.createElement('div');
        resizerLeft.classList.add('resizer', 'resizer-left');
        this.root.appendChild(resizerLeft);
        const resizerRight = document.createElement('div');
        resizerRight.classList.add('resizer', 'resizer-right');
        this.root.appendChild(resizerRight);
        const resizerTopLeft = document.createElement('div');
        resizerTopLeft.classList.add('resizer', 'resizer-topleft');
        this.root.appendChild(resizerTopLeft);
        const resizerTopRight = document.createElement('div');
        resizerTopRight.classList.add('resizer', 'resizer-topright');
        this.root.appendChild(resizerTopRight);
        const resizerBottomLeft = document.createElement('div');
        resizerBottomLeft.classList.add('resizer', 'resizer-bottomleft');
        this.root.appendChild(resizerBottomLeft);
        const resizerBottomRight = document.createElement('div');
        resizerBottomRight.classList.add('resizer', 'resizer-bottomright');
        this.root.appendChild(resizerBottomRight);

        // mouse, popup, handler
        let rawX, rawY;
        let rawTop, rawLeft, rawWidth, rawHeight;
        let handler = '';

        // mouse down to record data
        this.root.addEventListener('mousedown', (e) => {
            rawX = e.clientX;
            rawY = e.clientY;
            rawTop    = this.root.offsetTop;
            rawLeft   = this.root.offsetLeft;
            rawWidth  = this.root.offsetWidth;
            rawHeight = this.root.offsetHeight;

            if (e.target.classList.contains('resizer-topleft')) {
                handler = 'TL';
                document.documentElement.style.cursor = 'nwse-resize';
            } else if (e.target.classList.contains('resizer-topright')) {
                handler = 'TR';
                document.documentElement.style.cursor = 'nesw-resize';
            } else if (e.target.classList.contains('resizer-bottomleft')) {
                handler = 'BL';
                document.documentElement.style.cursor = 'nesw-resize';
            } else if (e.target.classList.contains('resizer-bottomright')) {
                handler = 'BR';
                document.documentElement.style.cursor = 'nwse-resize';
            } else if (e.target.classList.contains('resizer-top')) {
                handler = 'T';
                document.documentElement.style.cursor = 'ns-resize';
            } else if (e.target.classList.contains('resizer-bottom')) {
                handler = 'B';
                document.documentElement.style.cursor = 'ns-resize';
            } else if (e.target.classList.contains('resizer-left')) {
                handler = 'L';
                document.documentElement.style.cursor = 'ew-resize';
            } else if (e.target.classList.contains('resizer-right')) {
                handler = 'R';
                document.documentElement.style.cursor = 'ew-resize';
            } else {
                handler = 'DRAG';
                document.documentElement.style.cursor = 'pointer';
            }

            console.log(`DOWN : (${rawLeft}, ${rawTop}, ${rawWidth}, ${rawHeight}), (${rawX}, ${rawY}), ${handler}`);
        });

        // mouse move to drag or resize
        document.addEventListener('mousemove', (e) => {
            if (handler === '') return;

            let dx = e.clientX - rawX;
            let dy = e.clientY - rawY;
            switch (handler) {
                case 'DRAG':
                    this.root.style.left = rawLeft + dx + 'px';
                    this.root.style.top = rawTop + dy + 'px';
                    break;
                case 'TL':
                    this.root.style.left = rawLeft + dx + 'px';
                    this.root.style.top = rawTop + dy + 'px';
                    this.root.style.width = rawWidth - dx + 'px';
                    this.root.style.height = rawHeight - dy + 'px';
                    break;
                case 'T':
                    this.root.style.top = rawTop + dy + 'px';
                    this.root.style.height = rawHeight - dy + 'px';
                    break;
                case 'TR':
                    this.root.style.top = rawTop + dy + 'px';
                    this.root.style.width = rawWidth + dx + 'px';
                    this.root.style.height = rawHeight - dy + 'px';
                    break;
                case 'L':
                    this.root.style.left = rawLeft + dx + 'px';
                    this.root.style.width = rawWidth - dx + 'px';
                    break;
                case 'R':
                    this.root.style.width = rawWidth + dx + 'px';
                    break;
                case 'BL':
                    this.root.style.left = rawLeft + dx + 'px';
                    this.root.style.width = rawWidth - dx + 'px';
                    this.root.style.height = rawHeight + dy + 'px';
                    break;
                case 'B':
                    this.root.style.height = rawHeight + dy + 'px';
                    break;
                case 'BR':
                    this.root.style.width = rawWidth + dx + 'px';
                    this.root.style.height = rawHeight + dy + 'px';
                    break;
            }

            console.log(`${handler} : (${dx}, ${dy}), (${this.root.offsetLeft}, ${this.root.offsetTop}, ${this.root.offsetWidth}, ${this.root.offsetHeight}), (${e.clientX}, ${e.clientY})`);
        });

        // mouse up to clear
        document.addEventListener('mouseup', () => {
            handler = '';
            document.documentElement.style.cursor = 'auto';
        });

        return this.root;
    }

    async show(){ return await this.show({});}
    /**Show dialog with mask and center in screen
     * @param {boolean} [opt.model=true] 
     * @param {boolean} [opt.closable=true] 
     * @param {string} [opt.width='600px'] 
     * @param {string} [opt.height='400px'] 
     * @param {string} [opt.x=''] 
     * @param {string} [opt.y=''] 
     * @param {string} [opt.dock=''] right, bottom, center
     * @param {HTMLElement} [opt.appendIn=document.body] element that dialog create in.
    */
    async show({
        model=true, closable=true, 
        width='600px', height='400px', x='', y='', 
        dock='center', 
        appendIn=document.body
    }) {
        if (appendIn != null && this.parentNode == null)
            appendIn.appendChild(this);

        if (model)
            Mask.show();
        this.closeButton.style.display = closable ? 'block' : 'none';
        this.root.style.display = 'block';
        this.root.style.width = width;
        this.root.style.height = height;
        this.root.dock = dock;

        // get pixsel size
        const viewWidth = window.innerWidth || document.documentElement.clientWidth;
        const viewHeight = window.innerHeight || document.documentElement.clientHeight;
        const popWidth  = this.root.offsetWidth;
        const popHeight = this.root.offsetHeight;

        // position - certain
        if (x!='' && y!=''){
            x = XTags.calcPx(x, this.root);
            y = XTags.calcPx(y, this.root);
            this.root.startRect = new DOMRect(x + popWidth/2, y, 0, 0);
            this.setBound(this.root.startRect);
            await XTags.sleep(100);

            this.root.style.left = x + 'px';
            this.root.style.top = y + 'px';
            this.root.style.width = width;
            this.root.style.height = height;
            await XTags.sleep(100);
            return;
        }
        // position - center
        if (dock == Anchor.C){
            this.root.style.left = (viewWidth - popWidth) / 2 + 'px';
            this.root.style.top  = (viewHeight - popHeight) / 2 + 'px';
            return;
        }
        // position - fill
        if (dock == Anchor.F){
            this.root.startRect = new DOMRect(viewWidth, 0, viewWidth, viewHeight);
            this.setBound(this.root.startRect);
            await XTags.sleep(100);

            this.root.style.left = 0;
            this.root.style.borderRadius = 0;
            await XTags.sleep(100);
            return;
        }
        // position - left
        if (dock == Anchor.L){
            this.root.startRect = new DOMRect(-popWidth, 0, popWidth, viewHeight);
            this.setBound(this.root.startRect);
            await XTags.sleep(100);

            this.root.style.left = 0;
            this.root.style.borderTopLeftRadius = 0;
            this.root.style.borderBottomLeftRadius = 0;
            await XTags.sleep(100);
            return;
        }
        // position - right
        if (dock == Anchor.R){
            this.root.startRect = new DOMRect(viewWidth, 0, popWidth, viewHeight);
            this.setBound(this.root.startRect);
            await XTags.sleep(100);

            this.root.style.left = viewWidth - popWidth + 'px';
            this.root.style.borderTopRightRadius = 0;
            this.root.style.borderBottomRightRadius = 0;
            await XTags.sleep(100);
            return;
        }
        // position - bottom
        if (dock == Anchor.T){
            this.root.startRect = new DOMRect(0, -popHeight, viewWidth, popHeight);
            this.setBound(this.root.startRect);
            await XTags.sleep(100);

            this.root.style.top = 0;
            this.root.style.borderTopLeftRadius = 0;
            this.root.style.borderTopRightRadius = 0;
            await XTags.sleep(100);
            return;
        }
        // position - bottom
        if (dock == Anchor.B){
            this.root.startRect = new DOMRect(0, viewHeight, viewWidth, popHeight);
            this.setBound(this.root.startRect);
            await XTags.sleep(100);

            this.root.style.top = viewHeight - popHeight  + 'px';
            this.root.style.borderBottomLeftRadius = 0;
            this.root.style.borderBottomRightRadius = 0;
            await XTags.sleep(100);
            return;
        }
    }

    /**Close dialog*/
    async close(remove=true) {
        // move. TODO: animation
        if (this.root.startRect != null){
            // move to start position
            this.root.transition = 'all 0.5s';

            var dock = this.root.dock;
            if (dock == 'top' || dock == 'bottom')                      
                this.root.style.top = this.root.startRect.top;
            else if (dock == 'left' || dock == 'right' || dock == 'fill')    
                this.root.style.left = this.root.startRect.left;
            //this.setBound(this.root.startRect);
            await XTags.sleep(100);
        }

        // remove
        await XTags.sleep(100);
        this.root.style.display = 'none';
        if (remove)
            this.root.remove();

        // hide mask
        await XTags.sleep(100);
        Mask.hide();
    }


    /*Content*/
    get content()    { return this.contentDiv.innerHTML; }
    set content(val) { this.contentDiv.innerHTML = val; }

    /*Width*/
    get width()      { return this.root.style.width;}
    set width(val)   { this.root.style.width = val;}
    get height()     { return this.root.style.height;}
    set height(val)  { this.root.style.height = val;}


    /**Set bound rect
     * @param {DOMRect} rect 
     */
    setBound(rect){
        this.root.style.left   = rect.left   + 'px';
        this.root.style.top    = rect.top    + 'px';
        this.root.style.width  = rect.width  + 'px';
        this.root.style.height = rect.height + 'px';
    }
}