var $posts = $('.posts');
var $content = $('#content');
var $title = $('#title');
var $title_name = $('#title_name')
function addPost(post){
    $posts.append('<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjP4Q96pQgCqGMoEENv3gAe4iIXKY92DIcT-qZAf0Pm_6k4VpIAQ" alt="Avatar" class="w3-left w3-white w3-circle w3-margin-right" style="width:60px">')
    $posts.append('<h4>' + post.title + '</h4><br>')
    $posts.append('<hr class="w3-clear">')
    $posts.append('<p>' + post.content + '</p>')
    $posts.append('<button type="button" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-comment"></i>  Comment</button>')
    $posts.append('<button type="button" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa"></i>  Edit</button>')
    $posts.append('<button type="button" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa"></i>  Delete</button>')

}

$(function(){
    $.ajax({
        type:'GET'	,
        url: '/posts',
        success: function(posts){
            $.each(posts, function(i, post){
               / if($title == "ulekem") {
                    addPost(post);
               / }

            });
        }
    })
});

$('#posting').on('click', function(){
    var post = {
        content: $content.val(),
        title: $title.val(),
    };

    $.ajax({
        type:'POST' ,
        url: '/posts',
        data: post,
        success: function(newPost){
            addPost(newPost);
        },
        error: function () {
            alert("doesn't work");
        }
    });

});





