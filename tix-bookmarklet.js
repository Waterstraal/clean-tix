const version = '2.0.0' ;

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

        const toggleSidePanelBtn$ = $('<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABNklEQVR4nN2VMUvDQBSAn6DiKCg4FMQ4urkHBMVqIAFDSELI5lgbu4ilv6MWlOZXCA7i4hwJGTIEB4cUMgRCL3eY+UkiSms7JVaID771++5ueAfwrwYRlwkhO2ma7paBEMLljrlyxtgZpZQyxrAKhJB313XPf558KU3T8d3tPbZb/dJYF320hw+YJEnGcdzWd4BSupHXL9s3+DrGSnSsQXET0zSbk8+zWQSsQSnp1fMnkwFd14WFBlRVPZ0JdH4xoGnayUIDiqI0FxqQZfm43gFJkmoeEEXxqN4BQRAO/y5ACFn/WnZemKE3KkmYFY7cxfP8wdTKjuP47enxBXtdG3vXw3J0bcwdYRiOAGBvKuA4zn4QBG4URXEVfN/3DMNoAcDazK8GAKsA0ACA7Qo0AGBlnrye8wEJv1lwNJJMtQAAAABJRU5ErkJggg==">');
        toggleSidePanelBtn$.on('click', () => sidePanel$.toggle());

        const ufoBtn$ = $('<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAFzUkdCAK7OHOkAAAAEZ0FNQQAAsY8L/GEFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAABJBJREFUSEu9lXtMW1Ucx7+3LwoFWkpfDLDtaMd4bDyKwswQx5RgNgGZi9MMEreRJZK4DUWzmP2jic6o8xkx0S1mW9grbokOZZsgKJBtEEAynLyFUug2qIAtr5Zez32wUQYsUeMn+eWe8/2dc37nnN/93UvhwWwGRRUoteaNQQrdQ4zgHL9lddg762maPk66PzLacqwUQC+SBB6LSt2Z+XDGTmg04bzM4Ryzo63hFJprv66ZnZrYRaQ+zuPLcgHWB2nWXrHkvKWJi46Hn5+Ul33xuGfgsHfh8umDI7etN7KI1MJ57rFUALVMtbrFmLon3N1zEjQlRsaOMgSFhPFuDtfEHfxUvhcCegZ6yy40VX9pHx3qSCIuOzeCQ8g/76JPKXzO/NjLBZOD9UhLiIBOq8LwqAeaiFh+BEdfezWMqmkYDQZ09dqwcWtpYPvVM+E07f2GH8Ky+ASRxrSiNkt2iSJ4zo6ac6/DKh2CzOEPuSIcngAnhAIBRC4Zxhw2TKgmETmpQ8az70CpNaHyRIn3t8YLa8g6Pdxy95/gRWPa7jyj3gyFXIkIczqaLpaBzjch+VA+El/IgjFvAyKeXgda5IH9UjPy9pxAiNrIThZLZdTNxgs20qxnBYKAf86ToghPRICEi1t78TCoNzLxZHEhwpU6VmMQSiWILczGE2Wl+KXiXV4FwgxMCpDCdnh8AlAisVoslUMkoDD8Rws6VnVjzaMWuGo7WP/cjJs1hoGqJqjXR8EvWYjB7musJvGTQeIfpGE7PL4BIOS2TjLT1foDkGWGMVAHt3OKlX9+5VPUHvgYpMBYjfbSMG97HJ2t37N+BiEl8llz8RXdZWx0gKRcDoU0CKb8DFbb9FkJMj9/lRQ2hajcdAj9xAjS6zDusLL+pVg2gJeeIyeh2MVWgvXTXr53P8sG+K/4vwN4MTU+hInRQXhmp4HbTrhsI3Da7qxoHvc0JhyDrLFXu4CFF5ylD407vzoiTiYS//OD9d/6farT2rqdNCuY/nyAJJMmpe6lLUcCZEoKN/quIsaQguAAJe/m6LA2w+v1IkbvU0twTo2hve864oypkEoCcOTsvum2nnrm1bvObFUU7K86XpjxZoAqLBhHL5Ui+pEqHK3cx06e59fuOvS6PoDN8wmaOqp5leOrygOITq0izxKIhGIUP3NYqpKHMT8j9i62bYotiNdqNRCQCvbCBUtiGARirrjm+WvyT0SbQrGWGNP2QTAJSwL5nAtcbFcmDUbuxqJo0nyeqdzXdmw4lKDWySEQUuSbsw4nz3QgM2E3QhZUfYTahGtNDtgHtNhs2Q4BdS9POkU8ys92ISu5CIpAFatplZH4ruGYm8nB3jRT7hcmfQz+TXIXYxvpxZWm0/vnk2whNr/d4px0w5aCnBgI1bIHVjID8206db4d5769eZl0P+JUjBBrXGo2c237E82qg4W5MaHZT0VDH0XeJpKfxczOzqGmoR9vf1jnaGwZfo9I7xPzsE6elbbnT2wrsaxValmSQR9iCAyUKJgZLpd7vN861u/2eCtUCr/y9i5HPxk3yUzyBfgbuDWFeeKABJ8AAAAASUVORK5CYII=">');
        ufoBtn$.on('click', () => body$.toggleClass('ufo'));

        const ufoTitle$ = $('<span class="ufo-title">UFO</span>');

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
            '.ufo .webGrid-header-bar { position: relative; }' +
            '.ufo .matrix-row-component:not(.nested-matrix-row-component-level-last), .ufo .is-aggregation, .ufo .webGrid .matrix-component>.matrix-row-component.header { background: #F0F0F0 !important; color: #000000 !important; } ' +
            '.ufo .calendar-header-day-title, .ufo .matrix-cell-component-title { color: inherit !important; } ' +
            '.ufo .webGrid-header-bar { height: 32px; margin: 0; background: rgb(255,255,255); background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(152,180,208,1) 1%, rgba(164,190,217,1) 50%, rgba(185,209,234,1) 100%); }';

        $('<style>').text(styles).appendTo(document.head);

        body$.data('cleaned', true);
    }
};
