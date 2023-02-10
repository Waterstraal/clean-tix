const version = '1.0.4' ;

const bookmarkletCode = () => {
    const body$ = $('body');
    const cleaned = body$.data('cleaned');

    function mergeMatrixRows(matrixContainer$) {
        const matrix$ = matrixContainer$.find('.matrix-component:eq(0)');
        matrix$.find('.type-of-work-title:contains(Direct hours)').each((v, el) => {
            const $el = $(el);
            const $topLevel = $el.parent().parent().prev();
            const startIndexName = $topLevel.text().search(/[a-zA-Z]/);
            const dsc = $topLevel.text().substring(startIndexName);
            $el.find('.title-part-item').append(': ' + dsc);
            $topLevel.hide();
        });
    }

    if (!cleaned) {

        const matrixContainer$ = $('.webGrid:eq(0)');
        mergeMatrixRows(matrixContainer$);

        const observer = new MutationObserver((mutationsList, observer) => {
            if(mutationsList.filter(m => m.target.classList.contains('matrix-component')).length > 0) {
                mergeMatrixRows(matrixContainer$);
            }
        });
        observer.observe(document.getElementsByClassName('webGrid')[0], {attributes: true, childList: false, subtree: true});

        matrixContainer$.on('focus', '.matrix-component .input', (el) => {
            const index = $(el.currentTarget).parents('.matrix-cell-component').index() + 1;
            $('.matrix-cell-component:nth-child(' + index + ')').addClass('is-focussed')
        });

        matrixContainer$.on('blur', '.matrix-component .input', () => {
            $('.matrix-cell-component').removeClass('is-focussed');
        });

        const styles =
            '.weeknr { background-color: antiquewhite !important; font-size: 0.7em !important; font-style: italic; } ' +
            '.type-of-work-title .toggle {display: none !important;} ' +
            '.nested-matrix-row-component-level-2>div:first-child {margin-left:20px !important;} ' +
            '.is-focussed, .is-focussed .input { background-color: lightyellow !important;} ' +
            '.input { transition: none !important;} ' +
            '.input:focus, .input:hover { outline-style: auto !important; outline-offset: -2px !important; box-shadow: none !important;}' +
            '.input:focus { background-color: white !important; }  ' +
            '.matrix-cell-component-column-title { overflow: hidden !important; }  ' +
            '.rea-list-icon.remove { display:none; }';

        $('<style>').text(styles).appendTo(document.head);

        body$.data('cleaned', true);
    }
};
