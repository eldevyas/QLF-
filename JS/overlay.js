let Wrap = document.getElementById('Merci'),
    Feedback = document.getElementById('feedback')


function Merci(){
    Wrap.style.opacity = '1';
    Wrap.style.visibility= 'visible';
}

function Hide(){
    Wrap.style.opacity = '0';
    Wrap.style.visibility = 'hidden';
}




$(document).mouseup(function(e) {
    var container = $("#Overlay");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        Hide();
    }
});



$(function(){
    $( "#feedback" ).on( "submit", function(e) {
        e.preventDefault();
        Merci();
      });
    });
