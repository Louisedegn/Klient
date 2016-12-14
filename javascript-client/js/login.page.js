
/**
 * Funktionen får først klikket på knappen login og herefter henter den inputet i felterne
 * Hvis der er en type 1 skifter den til admin.html og hvis det er 0 skifter den til user.html
 */

$(document).ready(function () {

  $("#loginButton").on("click", function(e){
    e.preventDefault();

    var username = $("#inputUsername").val();
    var pw = $("#inputPassword").val();


    SDK.login(username, pw, function(err, data){

      //On wrong credentials
      if(err) {
        return $("#loginForm").find(".form-group").addClass("has-error");
      }

      SDK.Storage.persist("user", data);

      //Login OK!
      $("#loginForm").find(".form-group").addClass("has-success");

      if (data.type == 1) {
        window.location.href = "admin.html";
      } else {
        window.location.href = "user.html";
      }

    });

  });

});
