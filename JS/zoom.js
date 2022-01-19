// Display Images on full screen

let closezoomed = document.getElementById('closezoomed');


function getPics() {} //just for this demo
const imgs = document.querySelectorAll('#gallery');
const fullPage = document.getElementById('zoomed');

imgs.forEach(img => {
    img.addEventListener('click', function() {
        fullPage.style.backgroundImage = 'url(' + img.src + ')';
        fullPage.style.display = "block";
        fullPage.style.height = "90%";
        fullPage.style.width = "80%";
        closezoomed.style.display = "block";
        $('#overlay').css('display', 'block');
    });
});

function hidezoom() {
    fullPage.style.height = "0%";
    fullPage.style.width = "0%";
    closezoomed.style.display = "none";
    $('#overlay').css('display', 'none');
}




$(document).mouseup(function(e) {
    var container = $("#zoomed");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        hidezoom();
    }
});