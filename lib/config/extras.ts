export default {
    accessibility: {
        class: 'sr-only',
        declaration: 'default',
    },
    accessibilityFocusable: {
        class: 'sr-only-focusable',
        declaration: 'default',
    },
    aspectRatio: {
        class: 'embed-responsive',
        values: {
            '1by1': '1:1',
            '3by2': '3:2',
            '4by3': '4:3',
            '16by9': '16:9',
            '21by9': '21:9',
            '3by4': '3:4',
            '3by5': '3:5',
        },
    },
    aspectRatioItem: {
        class: '',
    },
    btn: {
        class: 'btn',
        useVariants: true,
        declaration: 'default',
        styles: ['sm', 'lg', 'outline'],
    },
    clearfix: {
        class: 'clearfix',
        declaration: 'default',
    },
    small: {
        class: 'small',
        declaration: 'default',
    },
    textHide: {
        class: 'text-hide',
        declaration: 'default',
    },
    textTruncate: {
        class: 'text-truncate',
        declaration: 'default',
    },
    textReset: {
        class: 'text-reset',
        declaration: 'default',
    },
};
