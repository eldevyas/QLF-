let leftBtn = document.getElementById("leftBtn"),
    rightBtn = document.getElementById("rightBtn")

$(document).ready(function() {
    "use strict";

    // Scroll

    $('#leftBtn').click(moveLeft);

    $('#rightBtn').click(moveRight);


    //Double Click

    $('#leftBox').dblclick(moveRight);

    $('#rightBox').dblclick(moveLeft);

    //Scroll

    $('#leftBox').scroll(moveRight);

    $('#rightBox').scroll(moveLeft);


});


function moveLeft() {
    $('#slider').animate({
        left: '0px'
    });
    rightBtn.style.backgroundColor = "#303030";
    leftBtn.style.backgroundColor = "#9e0808";
    $('#wrapper').css('box-shadow', '0px 0px 80px 10px rgba(255, 255, 255, 0.25)');

}


function moveRight() {
    $('#slider').animate({
        left: '-100%'
    });
    rightBtn.style.backgroundColor = "#eb8b04";
    leftBtn.style.backgroundColor = "#303030";
    $('#wrapper').css('box-shadow', '0px 0px 80px 10px rgba(255, 136, 0, 0.25)');

}