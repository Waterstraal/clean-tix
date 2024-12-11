const version = '3.0.0';

const loadjQuery = (callback) => {
    const script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
    script.type = 'text/javascript';
    script.onload = callback;
    document.head.appendChild(script);
};

const bookmarkletCode = () => {
    const initialize = () => {
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
                if (mutationsList.filter(m => m.target.classList.contains('matrix-component')).length > 0) {
                    mergeMatrixRows(matrixContainer$);
                }
            });
            observer.observe(document.getElementsByClassName('webGrid')[0], { attributes: true, childList: false, subtree: true });

            matrixContainer$.on('focus', '.matrix-component .input', (el) => {
                const index = $(el.currentTarget).parents('.matrix-cell-component').index() + 1;
                $('.matrix-cell-component:nth-child(' + index + ')').addClass('is-focussed')
            });

            matrixContainer$.on('blur', '.matrix-component .input', () => {
                $('.matrix-cell-component').removeClass('is-focussed');
            });

            const sidePanel$ = $('.webGrid-side-panel');

            const toggleSidePanelBtn$ = $('<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABNklEQVR4nN2VMUvDQBSAn6DiKCg4FMQ4urkHBMVqIAFDSELI5lgbu[...]
            toggleSidePanelBtn$.on('click', () => sidePanel$.toggle());

            const ufoBtn$ = $('<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAFzUkdCAK7OHOkAAAAEZ0FNQQAAsY8L/GEFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFW[...]
            ufoBtn$.on('click', () => body$.toggleClass('ufo'));

            const ufoTitle$ = $('<span class="ufo-title"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAPCAMAAAA1b9QjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAASUExURcDAwAD//////wAAAICAgAA[...]
            $('.icons-right').prepend([ufoTitle$, ufoBtn$, toggleSidePanelBtn$]);

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
                '.enlarge-icon { display: none !important; }  ' +
                '.icons-right > * { cursor: pointer !important; }  ' +
                '.rea-list-icon.remove, .ufo-title { display:none; } ' +
                '.ufo.sitebackground { background: #FFC080 }' +
                '.ufo #P_C_W_Gridform_Grid { border: 1px solid #343434; border-radius: 10px; overflow: hidden; }' +
                '.ufo .partheader, .ufo .pagetitle, .ufo .masterheaderback { display: none; }' +
                '.ufo .ufo-title { display: initial; position: absolute; left: 8px; padding-top: 3px; }' +
                '.ufo .ufo-title img { display: inline-block; }' +
                '.ufo .webGrid-header-bar { position: relative; }' +
                '.ufo .matrix-row-component:not(.nested-matrix-row-component-level-last), .ufo .is-aggregation, .ufo .webGrid .matrix-component>.matrix-row-component.header { background: #F0F0F0 !importan[...]
                '.ufo .calendar-header-day-title, .ufo .matrix-cell-component-title { color: inherit !important; } ' +
                '.ufo .webGrid-header-bar { height: 32px; margin: 0; background: rgb(255,255,255); background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(152,180,208,1) 1%, rgba(164,190,217,1) 50%[...]
            $('<style>').text(styles).appendTo(document.head);

            body$.data('cleaned', true);
        }
    };

    if (typeof jQuery === 'undefined') {
        loadjQuery(initialize);
    } else {
        initialize();
    }
};
