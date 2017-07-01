(function($) {

  var app = {
    baseUrl: 'http://localhost:3001',
    init: function() {
      app.getStuff();
    },
    getStuff: function() {
      let promise = new Promise((res, rej) => {
        $.ajax({
          headers: {
            "accept": "application/json; odata=verbose"
          },
          type: 'GET',
          url: `${app.baseUrl}/persons`,
          success: function(items) {
            items.persons.forEach((item) => {
              $('#showAll').append(`
                <li>
                  <div>${item.name}</div>
                  <div>${item.active}</div>
                  <div>${item.age}</div>
                  <button>Delete</button>
                  <button>Edit</button>
                </li>
              `);
            });
            res();
          },
          error: (error) => {
            console.log(error);
            rej();
          }
        });
      });
      return promise;
    }
  };

  $(window).on('load', () => {
    app.init();
  });

})(window.jQuery);
