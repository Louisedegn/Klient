/**
 * Created by louisedegn on 18/11/16.
 */
$(document).ready(function () {

    //Fires on page-load
    SDK.Book.getAll(function (err, data) {
        if (err) throw err;

        var $booksTableBody = $("#booksTableBody");
        data.forEach(function (book, i) {

            $booksTableBody.append(
                "<tr>" +
                "<td>" + book.title + "</td>" +
                "<td>" + book.isbn + "</td>" +
                "<td>" + book.author + "</td>" +
                "<td>" + book.edition + "</td>" +
                "</tr>");
        });

    });

    var currentUser = SDK.User.current();
    $("#currentUserName").text(currentUser.username);

    // TODO: Lav modal til når der trykkes på addReserveButton

    /**
     * reserve ad
     */
    $("#addreserveadButton").on("click", function () {

        //Show modal
        $('#reserveadModal').modal('show');

        //Fetch authors, and set to DOM

        $("#reserveadButton").on("click", function () {

            //Create JSON object
            var reservation = {
                id: parseInt($("#adId").val()),
                userId: SDK.User.current().userId
            };

            //Create reservation
            SDK.Ad.reserve(reservation, function (err, data) {
                if (err) {
                    return $("#reserveadForm").find(".form-group").addClass("has-error");
                }
                $("#reserveadModal").modal("hide");
            });

        });
    });


    //Fires on page-load
    SDK.Ad.getAll(function (err, data) {
        if (err) throw err;

        var $adsTableBody = $("#adsTableBody");
        data.forEach(function (ad, i) {

            $adsTableBody.append(
                "<tr>" +
                "<td>" + ad.bookTitle + "</td>" +
                "<td>" + ad.bookAuthor + "</td>" +
                "<td>" + ad.price + "</td>" +
                "<td>" + ad.userUsername + "</td>" +
                "<td>" + ad.userMobilepay + "</td>" +
                "<td>" + ad.userCash + "</td>" +
                "<td>" + ad.userPhonenumber + "</td>" +
                "<td>" + ad.comment + "</td>" +
                "<td>" + ad.adId + "</td>" +
                "</tr>");
        });

    });


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
     * Add a new ad
     */
    $("#addCreateNewAdButton").on("click", function () {

        //Show modal
        $('#newAdModal').modal('show');

        //Fetch authors, and set to DOM

        $("#createAdButton").on("click", function () {

            //Create JSON object
            var ad = {
                comment: $("#bookComment").val(),
                price: parseInt($("#bookPrice").val()),
                isbn: parseInt($("#bookISBN").val()),
                rating: parseInt($("#bookRating").val()),
                userId: SDK.User.current().userId
            };

            //Create ad
            SDK.Ad.create(ad, function (err, data) {
                if (err) {
                    return $("#createAdForm").find(".form-group").addClass("has-error");
                }
                $("#newAdModal").modal("hide");
            });

        });
    });


    var currentUser = SDK.User.current();
    $("#currentUserName").text(currentUser.username);

    /**
     * Update user
     */
    $("addUpdateUserButton").on("click", function () {

        $('#updateUserModal').modal('show');


        var user = {
            username: $("#username").val(),
            email: $("#email").val(),
            mobilepay: parseInt($("#mobilepay").val()),
            cash: parseInt($("#cash").val()),
            password: $("#password").val(),
            phonenumber: parseInt($("#phonenumber").val),
            address: $("#address").val,
            transfer: parseInt($("#transfer").val)
        };


        SDK.User.handleUpdate(ad, function (err, data) {
            if (err) {
                return $("updateUserForm").find(".form-group").addClass("has-error");
            }
            $("updateUserModal").modal("hide");
        })

    });


    });







