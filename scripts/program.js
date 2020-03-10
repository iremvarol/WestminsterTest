
    //Elements to check
    var programsCheckEl = '.card-deck';

    // function that is called when document is ready
    function programFilterActions (e) {

        // function that runs if element (above) exists
        function checkElLoaded (s) {
            //        CUSTOM FUNCTION FOR ELEMENT BELOW


            //console.log('programFilterActions Ran');
            var pSearch = $('#programSearch');
            var pBtns = $('#programSearchForm .button.button-grey.button-small');
            var pAllBtn = $('#programSearchForm .button.programs_filter-all');
            function programsFilterReset () {
                pSearch.val(' ');
                pAllBtn.trigger('click');
                //console.log('programsFilterReset ran');
            }

            $('#programSearchStartOver').click(function () {
                programsFilterReset();
                //console.log('clear search clicked');
            });

            $('.button.button-grey.button-small:not(.programs_filter-all)').click(function (){
                $(this).toggleClass('active');
                $('#programSearchForm button.programs_filter-all').removeClass('active');
                //console.log('Program Button Clicked -- not "All"');
            });

            $('#programSearchForm .button.programs_filter-all').click(function (){
                $('.button.button-grey.button-small:not(.programs_filter-all)').removeClass('active');
                $(this).addClass('active');
            });

            setTimeout(function (){
                if (window.location.href.indexOf("?nursing") > -1) {
                    $('button.programs_filter-nurs').trigger('click');
                    pBtns.removeClass('active');
                    $('button.programs_filter-nurs').addClass('active');
                    //console.log('nursing requested');
                } else {

                    //console.log('nursing NOT requested');
                }
            }, 100);


            //     End   CUSTOM FUNCTION FOR ELEMENT ABOVE
        }


        // cpromise to check if element exists
        var checkElPromise = new Promise(function(resolve, reject) {
            var checkExist = setInterval(function() {
                if ($(e).length) {
                    resolve(e + " element exists");
                    //console.log(e + " promise resolved");
                    clearInterval(checkExist);
                }  else {
                    setTimeout(function () {
                        clearInterval(checkExist);
                        //console.log(e + ' not on page');
                    }, 12000);
                    //console.log(e + "does not exist yet...");
                }
            }, 100);
        });
//   if promise resoves then ...
        checkElPromise.then(function(){
            checkElLoaded(e);
        });

    }


    $(function(){
        programFilterActions(programsCheckEl);

        /*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Cmd-R),
 * 2. Inspect to bring up an Object Inspector on the result (Cmd-I), or,
 * 3. Display to insert the result in a comment after the selection. (Cmd-L)
 */

        var allClear = $('.button.inline-clear--button');
        var search = $('.button.inline-search--button');
        $('#programSearch').on('input',function(){
            var hasVal;
            var si = $(this);
            var go = si.parent().find('.button.inline-search--button');
            var clear = si.parent().find('.button.inline-clear--button');
            if(si.val() != "" || si.val() != undefined) {
                go.hide();
                clear.show();
            }
        });


        allClear.on('click',function(){
            $(this).hide();
            search.show();
        });
    });


    function makeDropdown () {
        var c = '<div class="bs4"> <div class="col-12">';
        c += '<button class="button button-grey button-small d-flex interest-dropdown-button closed mb-5" role="button" aria-role="collapse" aria-expanded="false" aria-controls="programs-filter-list">';
        c += '<span class="button-text">Filter by interest</span>' + '<span class="fa fa-chevron-down"></span>' + '</button></div></div>';

        $('p').each(function(){
            var el = $(this);
            var t = el.text();
            if(t.indexOf('Filter by Interest:') > -1){
                el.html(c);
                var list = $('li.programs_filter-all').parents('ul.inline-list');
                list.addClass('dropdown-list');
                list.attr('id','programs-filter-list');
                list.hide();
                function dropdownListeners () {
                    var b = $('.interest-dropdown-button');
                    b.on('click',function(){
                        if(b.hasClass('open')) {
                            //             console.log('should close');
                            b.attr('aria-expanded',false);
                            b.removeClass('open');
                            b.addClass('closed');
                            list.slideUp(300);
                            b.removeClass('active');
                        } else {
                            //             console.log('should open');
                            b.attr('aria-expanded',true);
                            b.removeClass('closed');
                            b.addClass('open');
                            list.slideDown(300);
                            b.removeClass('active');
                        }
                        setTimeout(function(){
                            b.removeClass('active');
                        }, 250);
                        b.removeClass('active');
                    });
                }
                dropdownListeners();

            }

        });
    }


    $(document).ready(function(){
        var w = $(window).width();

        if(w < 768) {
            console.log(w+' make dropdown');
            makeDropdown();
        }
    });


