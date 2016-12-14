$(document).ready(function () {


    //Loader bøger uden man er logget ind i systemet.
    SDK.Book.getAll(function(err, data){
        if(err) throw err;

        var $booksTableBody = $("#booksTableBody");
        data.forEach(function (book, i) {

            $booksTableBody.append(
                "<tr>" +
                "<td>" + book.isbn + "</td>" +
                "<td>" + book.title  + "</td>" +
                "<td>" + book.author + "</td>" +
                "<td>" + book.edition + "</td>" +
                "</tr>");
        });

    });

});


