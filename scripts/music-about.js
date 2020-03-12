function filter() {

var $btns = $(".filter").click(function () {
    if ("all" == this.id) {
        $("#parent > div").fadeIn(450);
    }
    else {
        var i = $("." + this.id).fadeIn(450);
        $("#parent > div").not(i).hide()
    }
    $btns.removeClass("active"), $(this).addClass("active")
    $(".modal.fade").hide()
});

};