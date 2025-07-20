interface HTMLAttributes {
    // 边距
    marginTop?: string;
    marginBottom?: string;
    marginLeft?: string;
    marginRight?: string;
    margin?: string;
    
    // 内边距
    paddingTop?: string;
    paddingBottom?: string;
    paddingLeft?: string;
    paddingRight?: string;
    padding?: string;

    // 位置
    position?: 'dock' | 'anchor' | 'fixed' | 'absolute' | 'relative';
    dock?: 'top' | 'bottom' | 'left' | 'right' | 'fill';
    anchor?: 'top' | 'bottom' | 'left' | 'right' | 'center';
    
    // 尺寸
    width?: string;
    height?: string;
    maxWidth?: string;
    maxHeight?: string;
    minWidth?: string;
    minHeight?: string;

    // 其他样式
    background?: string;
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    // ... 添加其他您支持的属性
}

// 扩展所有 HTML 元素的接口
declare namespace JSX {
    interface IntrinsicElements {
        body: HTMLAttributes; 
        div: HTMLAttributes;
        img: HTMLAttributes;
        span: HTMLAttributes;
        p: HTMLAttributes;
        iframe: HTMLAttributes;
        a: HTMLAttributes;
        pre: HTMLAttributes;
        button: HTMLAttributes;
        form: HTMLAttributes;
        h1: HTMLAttributes;
        h2: HTMLAttributes;
        h3: HTMLAttributes;
        small: HTMLAttributes;
        row: HTMLAttributes;
        column: HTMLAttributes;
        container: HTMLAttributes;
        grid: HTMLAttributes;
        rect: HTMLAttributes;
        circle: HTMLAttributes;
        icon: HTMLAttributes;
        icona: HTMLAttributes;
        panel: HTMLAttributes;
        dialog: HTMLAttributes;
        switcher: HTMLAttributes;
        // ... 添加其他需要支持的 HTML 标签
    }
} 