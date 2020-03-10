function programReviewArticles (el) {
    var artEl = '.reviewArticles_give';
    $(artEl).each(function(){
        var html = $(this).html();
        $(el).after(html);
        $(this).remove();
    });

}

$(document).ready(function(){
    if (hasReviewArticles === true){
        programReviewArticles('.plate-intro');

    }
});