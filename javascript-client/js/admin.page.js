$(document).ready(function () {

  /**
   * Loader bøger når man er logget ind som admin
   */
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

  //Loader brugere når man er logget ind som admin
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
   * Opret en ny bog
   * Først registerer den man klikker på knappen der eksisterer nedest i vores book table der er vist på siden
   */
  $("#addNewBookButton").on("click", function () {

    //Herefter kommer modalet op, der hænger sammen med oprettelsen af en ny bog
    $('#newBookModal').modal('show');

    //Indtaster information der skal til for at kunne oprette en ny bog

    $("#createBookButton").on("click", function () {

      //Create JSON object
      var book = {
        title: $("#bookTitle").val(),
        isbn: parseInt($("#bookISBN").val()),
        author: $("#bookAuthor").val(),
        edition: $("#bookEdition").val()
      };

      //Bogen bliver oprettet hvis man har indtastet korrekt information i de forskellige felter.
      SDK.Book.create(book, function (err, data) {
        if (err) {
          return $("#createBookForm").find(".form-group").addClass("has-error");
        }
        // Modalet forsvinder og en ny bog er oprettet i databasen og vises nu på listen over bøger.
        $("#newBookModal").modal("hide");
      });

    });
  });

  //Samme opbygning som opret bog
  $("#addDeleteBookButton").on("click", function () {

    //Viser modal
    $('#deleteBookModal').modal('show');

    //Her indtaster man ISBN da det er PRIMERY KEY i databasen.

    $("#deleteBookButton").on("click", function () {
      var book = {
        isbn: parseInt($("#deletebookISBN").val())
      };

      //Sletter bogen hvis ISBN eksisterer.
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
   * Tilføj ny bruger
   */
  $("#addNewUserButton").on("click", function () {

    //Viser modal
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

      //Opretter ny bruger hvis informationerne er korrekte
      SDK.User.create(user, function (err, data) {
        if (err) {
          return $("#createUserForm").find(".form-group").addClass("has-error");
        }
        $("#newUserModal").modal('hide');
      });


    });
  });
      //Slet bruger funktion
    $("#addDeleteUserButton").on("click", function () {

      //Vis modal
      $('#deleteUserModal').modal('show');

       //Indtast userId som er PRIMERY KEY i databasen i vores user tabel.
      $("#deleteUserButton").on("click", function () {
        var user = {
          id: parseInt($("#deleteUserId").val())
        };
        //Sletter bruger hvis man har indtastet et userId der eksisterer i databasen
        SDK.User.delete(user, function (err, data) {
          if (err) {
            return $("#deleteUserForm").addClass("has-error");
          }
          $('#deleteUserModal').modal("hide");


        });

      });

    });
});




