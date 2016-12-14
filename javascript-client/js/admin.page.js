$(document).ready(function () {


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
   * Add a new Book
   */
  $("#addNewBookButton").on("click", function () {

    //Show modal
    $('#newBookModal').modal('show');

    //Fetch authors, and set to DOM

    $("#createBookButton").on("click", function () {

      //Create JSON object
      var book = {
        title: $("#bookTitle").val(),
        isbn: parseInt($("#bookISBN").val()),
        author: $("#bookAuthor").val(),
        edition: $("#bookEdition").val()
      };

      //Create book
      SDK.Book.create(book, function (err, data) {
        if (err) {
          return $("#createBookForm").find(".form-group").addClass("has-error");
        }
        $("#newBookModal").modal("hide");
      });

    });
  });

  $("#addDeleteBookButton").on("click", function () {

    //Show modal
    $('#deleteBookModal').modal('show');


    $("#deleteBookButton").on("click", function () {
      var book = {
        isbn: parseInt($("#deletebookISBN").val())
      };
      SDK.Book.delete(book, function (err, data) {
        if (err) {
          return $("#deleteBookForm").addClass("has-error");
        }
        $('#deleteBookModal').modal("hide");

      });

    });

  });

 var currentUser = SDK.User.current();
 $("#currentUserName").text(currentUser.username);


  /**
   * Add a new user
   */
  $("#addNewUserButton").on("click", function () {

    //show modal
    $('#newUserModal').modal('show');

    //Fetch authors, and set to DOM

    $("#createUserButton").on("click", function () {

      //Create JSON object
      var user = {
        username: $("#username").val(),
        email: $("#email").val(),
        mobilepay: parseInt ($("#mobilepay").val()),
        cash: parseInt($("#cash").val()),
        password: $("#password").val(),
        phonenumber: parseInt($("#phonenumber").val()),
        address: $("#address").val(),
        transfer: parseInt($("#transfer").val())
      };


      SDK.User.create(user, function (err, data) {
        if (err) {
          return $("#createUserForm").find(".form-group").addClass("has-error");
        }
        $("#newUserModal").modal('hide');
      });


    });
  });

    $("#addDeleteUserButton").on("click", function () {

      //Show modal
      $('#deleteUserModal').modal('show');


      $("#deleteUserButton").on("click", function () {
        var user = {
          id: parseInt($("#deleteUserId").val())
        };
        SDK.User.delete(user, function (err, data) {
          if (err) {
            return $("#deleteUserForm").addClass("has-error");
          }
          $('#deleteUserModal').modal("hide");


        });

      });

    });
});




