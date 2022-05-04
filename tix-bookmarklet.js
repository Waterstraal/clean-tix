const bookmarkletCode = () => {
    const body$ = $('body');
    const cleaned = body$.data('cleaned');
    if (!cleaned) {
        const matrix$ = $('.matrix-component');

        matrix$.find('.type-of-work-title:contains(Direct hours)').each((v, el) => {
            const $el = $(el);
            const $topLevel = $el.parent().parent().prev();
            const startIndexName = $topLevel.text().search(/[a-zA-Z]/);
            const dsc = $topLevel.text().substring(startIndexName);
            $el.find('.title-part-item').append(': ' + dsc);
            $topLevel.hide();
        });

        matrix$.on('focus', '.input', (el) => {
            const index = $(el.currentTarget).parents('.matrix-cell-component').index() + 1;
            $('.matrix-cell-component:nth-child(' + index + ')').addClass('is-focussed')
        });

        matrix$.on('blur', '.input', () => {
            $('.matrix-cell-component').removeClass('is-focussed');
        });

        const styles =
            '.weeknr { background-color: antiquewhite !important; font-size: 0.7em !important; font-style: italic; } ' +
            '.type-of-work-title .toggle {display: none !important;} ' +
            '.nested-matrix-row-component-level-2>div:first-child {margin-left:20px !important;} ' +
            '.is-focussed, .is-focussed .input { background-color: lightyellow !important; } ' +
            '.input { transition: none !important; } ' +
            '.input:focus { background-color: white !important; outline-width: 1px !important; box-shadow: none !important; }';

        $('<style>').text(styles).appendTo(document.head);

        body$.data('cleaned', true);
    }
};
