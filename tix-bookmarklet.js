const bookmarkletCode = () => {
    const cleaned = $('body').data('cleaned');
    if (!cleaned) {
        $('.type-of-work-title:contains(Direct hours)').each((v, el) => {
            const $el = $(el);
            const $topLevel = $el.parent().parent().prev();
            const startIndexName = $topLevel.text().search(/[a-zA-Z]/);
            const dsc = $topLevel.text().substr(startIndexName);
            $el.find('.title-part-item').append(': ' + dsc);
            $topLevel.hide();
        });

        $('.matrix-component').on('focus', '.input', (el) => {
            const index = $(el.currentTarget).parents('.matrix-cell-component').index() + 1;
            $('.matrix-cell-component:nth-child(' + index + ')').addClass('is-focussed')
        });

        $('.matrix-component').on('blur', '.input', (el) => {
            $('.matrix-cell-component').removeClass('is-focussed');
        });

        const styles = '.weeknr { background-color: antiquewhite !important; font-size: 0.7em !important; font-style: italic; } ' +
            '.type-of-work-title .toggle {display: none !important;} ' +
            '.nested-matrix-row-component-level-2>div:first-child {margin-left:20px !important;} ' +
            '.is-focussed, .is-focussed .input { background-color: lightyellow !important; } ' +
            '.input { transition: none !important; } ' +
            '.input:focus { background-color: white !important; outline-width: 1px !important; box-shadow: none !important; }';

        $('<style>').text(styles).appendTo(document.head);

        $('body').data('cleaned', true);
    }
};
