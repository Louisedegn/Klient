var SDK = {

  //SDK er her der bliver lavet API kald og i denne klasse er der forbindelse til serveren.

  serverURL: "https://localhost:8000",

  request: function (options, cb) {

    //Perform XHR
    $.ajax({
      url: SDK.serverURL + options.url,
      method: options.method,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify(options.data),
      xhrFields: {
        withCredentials: true
      },
      success: function (data, status, xhr) {
        cb(null, data, status, xhr);
      },
      error: function (xhr, status, errorThrown) {
        cb({xhr: xhr, status: status, error: errorThrown});
      }
    });
  },
  //Her har vi alle metoder der har med bøger i vores applikation at gøre. Først getbooks, createbook og deletebook.
  Book: {
    getAll: function (cb) {
      SDK.request({method: "GET", url: "/getbooks", headers: {filter: {include: ["author", "publisher"]}}}, cb);
    },
    create: function (data, cb) {
      SDK.request({method: "POST", url: "/createbook", data: data}, cb);
    },
    delete: function (data, cb) {
      SDK. request({method: "POST", url: "/deletebook", data: data}, cb);
    }

  },
  //Her har vi alle metoder der har med annoncer at gøre i vores applikation. Først getads, create ad og reservead.
  Ad: {
    getAll: function (cb) {
      SDK.request({method: "GET", url: "/getads"}, cb);
    },
    create: function (data, cb) {
      SDK.request({method: "POST", url: "/createad", data: data}, cb);
    },
    reserve: function (data, cb) {
      SDK.request({method: "POST", url: "/reservead", data: data}, cb);
    }
  },

  //Her har vi alle metoder der har med brugere at gøre. Først getusers, loaduser, createuser og deleteuser.
  User: {
    getAll: function (cb) {
      SDK.request({method: "GET", url: "/getusers"}, cb);
    },
    current: function() {
      return SDK.Storage.load("user");
    },
    create: function (data,cb) {
      SDK.request({method:"POST", url: "/createuser", data: data}, cb);
    },
    delete: function (data,cd) {
      SDK. request({method: "POST", url: "/deleteuseradmin", data: data}, cd);
    }
  },

  Publisher: {
    getAll: function (cb) {
      SDK.request({method: "GET", url: "/publishers"}, cb);
    }
  },

  Author: {
    getAll: function (cb) {
      SDK.request({method: "GET", url: "/getauthors"}, cb);
    }
  },

  //Log ud funktion - Fjerner userId, og fjerner dig som logget ind.
  logOut:function() {
    SDK.Storage.remove("tokenId");
    SDK.Storage.remove("userId");
    SDK.Storage.remove("user");
  },

  //Login funktion - Tager dit username og password.
  login: function (username, password, cb) {
    this.request({
      data: {
        username: username,
        password: password
      },
      url: "/login?include=user",
      method: "POST"
    }, function (err, data) {
      //On login-error
      if (err) return cb(err);

      SDK.Storage.persist("tokenId", data.id);
      SDK.Storage.persist("userId", data.userId);
      SDK.Storage.persist("user", data.user);

      cb(null, data);

    });
  },

  Storage: {
    prefix: "BookStoreSDK",
    persist: function (key, value) {
      window.localStorage.setItem(this.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
    },
    load: function (key) {
      var val = window.localStorage.getItem(this.prefix + key);
      try {
        return JSON.parse(val);
      }
      catch (e){
        return val;
      }
    },
    remove:function (key) {
      window.localStorage.removeItem(this.prefix + key);
    }
  }

};
