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

        const sidePanel$ = $('.webGrid-side-panel');

        // Icon attrib: https://icons8.com/icon/f8SrarlsFdYF/show-right-side-panel
        const x$ = $('.icons-right').prepend('<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABNklEQVR4nN2VMUvDQBSAn6DiKCg4FMQ4urkHBMVqIAFDSELI5lgbu4ilv6MWlOZXCA7i4hwJGTIEB4cUMgRCL3eY+UkiSms7JVaID771++5ueAfwrwYRlwkhO2ma7paBEMLljrlyxtgZpZQyxrAKhJB313XPf558KU3T8d3tPbZb/dJYF320hw+YJEnGcdzWd4BSupHXL9s3+DrGSnSsQXET0zSbk8+zWQSsQSnp1fMnkwFd14WFBlRVPZ0JdH4xoGnayUIDiqI0FxqQZfm43gFJkmoeEEXxqN4BQRAO/y5ACFn/WnZemKE3KkmYFY7cxfP8wdTKjuP47enxBXtdG3vXw3J0bcwdYRiOAGBvKuA4zn4QBG4URXEVfN/3DMNoAcDazK8GAKsA0ACA7Qo0AGBlnrye8wEJv1lwNJJMtQAAAABJRU5ErkJggg==">');
        x$.on('click', () => sidePanel$.toggle());

        const styles =
            '.weeknr { background-color: antiquewhite !important; font-size: 0.7em !important; font-style: italic; } ' +
            '.type-of-work-title .toggle {display: none !important;} ' +
            '.nested-matrix-row-component-level-2>div:first-child {margin-left:20px !important;} ' +
            '.is-focussed, .is-focussed .input { background-color: lightyellow !important;} ' +
            '.input { transition: none !important;} ' +
            '.input:focus, .input:hover { outline-style: auto !important; outline-offset: -2px !important; box-shadow: none !important;}' +
            '.input:focus { background-color: white !important; }  ' +
            '.matrix-cell-component-column-title { overflow: hidden !important; }  ' +
            '.title__day-name { visibility: hidden !important; }  ' +
            '.title__day-name:first-letter { visibility: visible !important; }  ' +
            '.rea-list-icon.remove { display:none; }';

        $('<style>').text(styles).appendTo(document.head);

        body$.data('cleaned', true);
    }
};
