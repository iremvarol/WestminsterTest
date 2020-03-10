$(document).ready(function () {
    if(window.location.href.indexOf("digital-signage") > -1) {


        $('.slide-background').each(function () {
            var getBGAttr = $(this).attr('data-background-hash');

            if(typeof getBGAttr !== typeof undefined && getBGAttr !== false) {

            } else {

                $(this).remove();
            }
        });


        $('.sfPublicWrapper.slides section').each(function () {
            var getBGImgAttr = $(this).attr('data-background-image');

            if(getBGImgAttr === '') {
                $(this).remove();
            }


        });


    }


    Reveal.initialize({
        autoSlide: 15000,
        autoSlideStoppable: false,
        controls: false,
        loop: true,
        progress: false,
        transition: 'slide'
    });

});