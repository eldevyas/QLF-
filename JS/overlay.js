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

function Post(){  //it makes the user-experience better by adding the comment instantly on submit, instead of PHP's waiting for refresh.
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;


    let Name = document.getElementById('nom'),
          Commented = document.getElementById('commentaire'),
          Posted_At = dateTime,
          Comments_list = document.getElementById('Comments');


    Subject =  `
                  <li class="comment">
                    <div class="user">
                        <div class="name">
                            <img src="images/profile.png">
                            <p>${Name.value}</p>
                        </div>
                        <div class="date">
                            <p>${Posted_At}</p>
                        </div>
                    </div>
                    <div class="subject">
                        <p>${Commented.value}</p>
                    </div>
                </li>
              `;

    Comments_list.insertAdjacentHTML("afterbegin", Subject);
}


$(function(){
    $( "#feedback" ).on( "submit", function(e) {

        var dataString = $(this).serialize();
        
        // alert(dataString); return false;
    
        $.ajax({
          type: "POST",
          url: "BIN/post.php",
          data: dataString,
          success: function () {
            Merci();
            Post();
            document.getElementById("feedback").reset();
          }
        });
    
        e.preventDefault();
      });
    });
