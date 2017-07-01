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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQSxTQUFBLEdBQUE7O0VBRUEsSUFBQSxNQUFBO0lBQ0EsU0FBQTtJQUNBLE1BQUEsV0FBQTtNQUNBLElBQUE7O0lBRUEsVUFBQSxXQUFBO01BQ0EsSUFBQSxVQUFBLElBQUEsUUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BMkJBLE9BQUE7Ozs7RUFJQSxFQUFBLFFBQUEsR0FBQSxRQUFBOzs7O0dBSUEsT0FBQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigkKSB7XG5cbiAgdmFyIGFwcCA9IHtcbiAgICBiYXNlVXJsOiAnaHR0cDovL2xvY2FsaG9zdDozMDAxJyxcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgIGFwcC5nZXRTdHVmZigpO1xuICAgIH0sXG4gICAgZ2V0U3R1ZmY6IGZ1bmN0aW9uKCkge1xuICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBcImFjY2VwdFwiOiBcImFwcGxpY2F0aW9uL2pzb247IG9kYXRhPXZlcmJvc2VcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICAgICAgdXJsOiBgJHthcHAuYmFzZVVybH0vcGVyc29uc2AsXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oaXRlbXMpIHtcbiAgICAgICAgICAgIGl0ZW1zLnBlcnNvbnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAkKCcjc2hvd0FsbCcpLmFwcGVuZChgXG4gICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgPGRpdj4ke2l0ZW0ubmFtZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+JHtpdGVtLmFjdGl2ZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+JHtpdGVtLmFnZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24+RGVsZXRlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uPkVkaXQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICBgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVzKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvcjogKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICByZWooKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG4gIH07XG5cbiAgJCh3aW5kb3cpLm9uKCdsb2FkJywgKCkgPT4ge1xuICAgIGFwcC5pbml0KCk7XG4gIH0pO1xuXG59KSh3aW5kb3cualF1ZXJ5KTtcbiJdfQ==
