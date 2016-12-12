/**
 * Created by louisedegn on 30/11/16.
 */

//Fires on page-load
SDK.User.getAll(function (err, users) {
    if (err) throw err;

    var $usersTableBody = $("#usersTableBody");
    users.forEach(function (user) {

        $usersTableBody.append(
            "<tr>" +
            "<td>" + user.username + "</td>" +
            "<td>" + user.email + "</td>" +
            "<td>" + user.userId + "</td>" +
            "<td>" + user.mobilepay + "</td>" +
            "<td>" + user.cash + "</td>" +
            "</tr>");
    });

});

var currentUser = SDK.User.current();
$("#currentUserName").text(currentUser.username);


/**
 * Add a new user
 */
$("#addNewUserButton").on("click", function () {

    //show modal
    $('#updateUserModal').modal('show');

    //Fetch authors, and set to DOM

    $("#createUserButton").on("click", function () {

        //Create JSON object
        var user = {
            username: $("#username").val(),
            email: $("#email").val(),
            mobilepay: parseInt ($("#mobilepay").val()),
            cash: parseInt($("#cash").val()),
            password: $("#password").val(),
            phonenumber: parseInt($("#phonenumber").val),
            address: $("#address").val,
            transfer: parseInt($("#transfer").val)
        };

        SDK.User.create(user, function (err, data) {
            if (err) {
                return $("#createUserForm").find(".form-group").addClass("has-error");
            }
            $("#newUserModal").modal('hide');
        });


    });
});