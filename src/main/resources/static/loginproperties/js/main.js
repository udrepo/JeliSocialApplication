var $posts = $('.posts');
var $content = $('#content');
var $title = $('#title');
var $commenttext = $('#commenttext')

function addPost(post){
    $posts.append('<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjP4Q96pQgCqGMoEENv3gAe4iIXKY92DIcT-qZAf0Pm_6k4VpIAQ" alt="Avatar" class="w3-left w3-white w3-circle w3-margin-right" style="width:60px">')
    $posts.append('<h4>' + post.title + '</h4><br>')
    $posts.append('<hr class="w3-clear">')
    $posts.append('<p>' + post.content + '</p>')
    $posts.append('<button type="button"  onclick="deletepost(' + post.id + ')" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="remove"></i> Delete post</button>')
    $posts.append('<div class="container2">\n' +
        '  <label for="urcomment"><b>Your comment</b></label> <input type="text" placeholder="Your comment" id="commenttext" name="urcomment" required>\n' +
        '<button id="btn2" onclick="postComments(' + post.id + ')" type="submit">Send</button> </div>')
    $posts.append('<hr class="w3-clear">')
    $posts.append('<div>' +  getComments(post.id) + '</div>')
}



$(function(){
    $.ajax({
        type:'GET'	,
        url: '/posts',
        success: function(posts){
            $.each(posts, function(i, post){
               addPost(post);
            });
        }
    })
});

$('#posting').on('click', function(){
    var post = {
        content: $content.val(),
        title: $title.val()
    };
    console.log(post);

    $.ajax({
        type:'POST' ,
        url: '/posts',
        data: post,
        success: function(newPost){
            addPost(newPost);
        },
        error: function () {
            if(!alert('Post Added!')){window.location.reload();}
        }
    });

});


$posts.delegate('.remove', 'click', function (){

    var $removepoint = $(this).closest('img')

    $.ajax({
        type:'DELETE' ,
        url: '/posts/' + $(this).attr('data-id'),
        success: function () {
         $removepoint.remove;
     }
    })
    }

)

function deletepost(id) {

    $.ajax({
        type:'DELETE' ,
        url: '/posts/'+ id,
        success: function () {
                if(!alert('Post Deleted!')){window.location.reload();}

        }
    })
}


function getComments(id) {

    var $comments = $('.comments');

    var $postid = id;

    $(function () {
        $.ajax({
            type: 'GET',
            url: '/posts/' + id + '/comments',
            success: function (comments) {
                console.log('successs', comments);
                $.each(comments, function (i, comment) {
                    console.log('inside', comment);
                    $comments.append('Comments on post<br>');
                    $comments.append('<div class="info">' +
                        '<p>' + comment.text + '</p>' +
                        '<p hidden>' + id + '</p>' +
                        '<button id = "deletecomment2"  onclick="myFunction()"  type="submit">Delete</button></div>')
                    $comments.append('<hr class="w3-clear">')

                })
               //  $.each(comments, function (i, comment) {
               // $comments.append('<div class="container2">')
               //      $comments.append('<p>' + comment.text +  '</p><span class="time-right2">'+ comment.post_id + '</span>')
               //      $comments.append('  <button id = "deletecomment2" type="submit">Delete</button></div>')
               //  })
               //  $comments.append('  <form class="modal-content animate" action=""> <div class="container2">')
               //  $comments.append('   <label for="urcomment"><b>Your comment</b></label> <input type="text" placeholder="Your comment" name="urcomment" required>')
               //  $comments.append(' <button id="btn2" type="submit">Send comment</button> </div>')
               //  $comments.append('<div class="container2" style="background-color:#f1f1f1">')
               //  $comments.append('</div> </form> </div>');
            }
        })
    });

}

function deleteComments(id) {

    $.ajax({
        type:'DELETE' ,
        url: '/posts/339/comments/' + id,
        success: function () {
            if(!alert('Comment Deleted!')){window.location.reload();}

        }
    })
}


 function postComments(id) {

    var newcomment = {
        text: $commenttext.val(),
        post_id: id,
    };

    $.ajax({
        type:'POST',
        url: '/posts/' + id + '/comments',
        data: newcomment,
        success: function () {
            if(!alert('Comment Added!')){window.location.reload();}
        },
        error: function () {
            if(!alert('Comment Added!')){window.location.reload();}
        }
    })

 }



function myFunction() {
    alert("Comment deleted!");
}

// function addcomment() {
//
//
//
//     $("#btn2").click(function(){
//         $(".comments").append('Comments on post<br>');
//         $(".comments").append('<div class="info">' +
//             '<p> test</p>' +
//             '<button id = "deletecomment2"  onclick="myFunction()"  type="submit">Delete</button></div>')
//         $(".comments").append('<hr class="w3-clear">')
//     });
// }
