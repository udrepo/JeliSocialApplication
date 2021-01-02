var $userlist = $('.userlist');
var $users_roles = $('.users_roles');
var $title = $('#title');

function addUser(user){
    $userlist.append('<tr>')
    $userlist.append('<td>' + user.userName + '</td>')
    $userlist.append(' <td>' + user.email + '</td>')
    $userlist.append(' <td>' + user.city + '</td>')
    $userlist.append(' <td>' + user.country + '</td>')
    $userlist.append(' <td>' + user.pnumber + '</td>')
    $userlist.append('</tr>')
}



$(function(){
    $.ajax({
        type:'GET'	,
        url: '/users',
        success: function(users){
            $.each(users, function(i, user){
               addUser(user);
            });
        }
    })
});

function addUserRole(user_role){
    $users_roles.append('<tr>')
    $users_roles.append('<td>' + users_roles.user_id + '</td>')
    $users_roles.append(' <td>' + users_roles.role_id_ + '</td>')
    $users_roles.append('</tr>')
}



$(function(){
    $.ajax({
        type:'GET'	,
        url: '/users_roles',
        success: function(users_roles){
            $.each(users_roles, function(i, user_role){
                addUserRole(user_role);
            });
        }
    })
});







