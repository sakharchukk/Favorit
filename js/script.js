$('.button').click( function() {
    $('.overlay').fadeIn();
});


$('.close-popup').click( function() {
    $('.overlay').fadeOut();
});

$(document).mouseup( function (e) {
    let popup = $('.popup');
    if (e.target != popup[0] && popup.has(e.target).length === 0){
        $('.overlay').fadeOut();
    }
});
