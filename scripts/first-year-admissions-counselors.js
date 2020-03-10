$(document).ready(function () {

// Filter by typing function
    function filterFunction () {
        var fForm = $('.filterForm');
        var fSelect = $('.filterSelect');
        var fSelectDefault = $('.filterSelect option[value=""]');
        var fInput = $('.filterInput');
        var fControl = $('.filterControl');
        var fItems = $('.filteredItems');
        var fItem = $('.filteredItem');
        var fItemBy = $('.filteredItem-byThisContent');
        var fItemByB = $('.filteredItem-byThisContent-b');
        var fSearchButton = $('.filterForm button[name="Search"]');
        var fStartOver = $('.start-over-item');

        fForm.on('submit', function(e) {
            e.preventDefault();
            $([document.documentElement, document.body]).animate({
                scrollTop: fItems.offset().top - 100
            }, 500);
        });
        function jqFilterSearch () {
            var value = fInput.val().toLowerCase();
            var x;
            if(value.length === 2) {
                fItem.filter(function () {
                    x = $(this).find('.filteredItem-byThisContent-b');
                    $(this).toggle(x.text().toLowerCase().indexOf(value) > -1);
                });
            } else if(value.length === 0) {
                fItem.filter(function () {
                    x = $(this).find('.filteredItem-byThisContent-b');
                    $(this).toggle(x.text().toLowerCase().indexOf(value) > -1);
                });
            } else {
                fItem.filter(function () {
                    x = $(this).find('.filteredItem-byThisContent');
                    $(this).toggle(x.text().toLowerCase().indexOf(value) > -1);
                });
            }

        }
        function resetFilter() {
            fSelect.find('option:first-child').prop('selected', true);
            fInput.val('');
            fItem.removeClass('active');
            fStartOver.removeClass('active');
            jqFilterSearch();
        }

        fControl.on("keyup change blur click", jqFilterSearch); //adds state name to search bar when select dropdown is used
        fSelect.on('keyup change blur click', function () {
            var value = $(this).val();
            $('#counselorSearch').val(value);
        });
        fSearchButton.click(jqFilterSearch);
        $('.start-over').click(resetFilter); //adds active class to profile cards when learn more is clicked
        fInput.on('change keyup', function () {
            fSelectDefault.prop('selected', true);
        });
    }
    filterFunction();


    //counselor card function -- adds active class to list item
    $('.counselorProf-LearnMore > a').click(function () {
        var fStartOver = $('.start-over-item');
        var dParent = $(this).parents('.media');
        $('#counselorList .media').removeClass('active');
        dParent.addClass('active');
        fStartOver.addClass('active');
    });

    //SVG Map of US JS -- When state is clicked, it gives that value to the input and runs filter function

    function wSVGMapOpen () {
        $('#counselor-map-svg-container').fadeIn(200);
        $('body').addClass('overflow-hidden wSvg-MapOpen');
    }

    function wSVGMapClose () {
        $('#counselor-map-svg-container').fadeOut(200);
        $('body').removeClass('overflow-hidden wSvg-MapOpen');
    }


    $('.state-group').click(function () {
        var fStartOver = $('.start-over-item');
        var stateInitials = $(this).attr('id');
        $('#counselorSearch').val(stateInitials);
        $('#search').trigger('click');
        wSVGMapClose();
    });
    // $('.state-group').click();
    $('.map-close, .start-over').click(wSVGMapClose);
    $('.map-button').click(wSVGMapOpen);

});