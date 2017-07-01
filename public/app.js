(function($) {

  var app = {
    baseUrl: 'http://localhost:3001',
    init: function() {
      app.getAll();
      app.getOne();
      app.putOne();
    },
    getAll: () => {
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
                <li class='listitem'>
                  <div class='name'>${item.name}</div>
                  <div class='active'>${item.active}</div>
                  <div class='age'>${item.age}</div>
                  <button data-id="${item.id}" class="delete">Delete</button>
                  <button data-id="${item.id}"class="edit">Edit</button>
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
    },
    getOne: () => {
      $('#showAll').on('click', '.edit', function(e) {
        e.preventDefault();
        $('#showOne').addClass('active');
        let id = $(this).data('id');
        let promise = new Promise((res, rej) => {
          $.ajax({
            headers: {
              "accept": "application/json; odata=verbose"
            },
            type: 'GET',
            url: `${app.baseUrl}/persons/${id}`,
            success: (item) => {
              $('#showOne').empty();
              $('#showOne').append(`
                <input type='text' class='name e' value="${item.persons.name}" />
                <input type='text' class='active e' value="${item.persons.active}" />
                <input type='text' class='age e' value="${item.persons.age}" />
                <div class='buttonwrap'>
                  <button data-id="${item.persons.id}" class="save">Save</button>
                  <button class="cancel">Cancel</button>
                </div>
              `)
              res();
            },
            error: (error) => {
              console.log(error);
              rej();
            }
          });
        });
        return promise;
      });
    },
    putOne: () => {
      $('#showOne').on('click', '.save', function(e) {
        e.preventDefault();
        let id = $(this).data('id');
        console.log(id);
      });
    }
  };

  $(window).on('load', () => {
    app.init();
  });

})(window.jQuery);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQSxTQUFBLEdBQUE7O0VBRUEsSUFBQSxNQUFBO0lBQ0EsU0FBQTtJQUNBLE1BQUEsV0FBQTtNQUNBLElBQUE7TUFDQSxJQUFBO01BQ0EsSUFBQTs7SUFFQSxRQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUE4QkEsUUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWtDQSxRQUFBOzs7Ozs7Ozs7RUFTQSxFQUFBLFFBQUEsR0FBQSxRQUFBOzs7O0dBSUEsT0FBQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigkKSB7XG5cbiAgdmFyIGFwcCA9IHtcbiAgICBiYXNlVXJsOiAnaHR0cDovL2xvY2FsaG9zdDozMDAxJyxcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgIGFwcC5nZXRBbGwoKTtcbiAgICAgIGFwcC5nZXRPbmUoKTtcbiAgICAgIGFwcC5wdXRPbmUoKTtcbiAgICB9LFxuICAgIGdldEFsbDogKCkgPT4ge1xuICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBcImFjY2VwdFwiOiBcImFwcGxpY2F0aW9uL2pzb247IG9kYXRhPXZlcmJvc2VcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICAgICAgdXJsOiBgJHthcHAuYmFzZVVybH0vcGVyc29uc2AsXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oaXRlbXMpIHtcbiAgICAgICAgICAgIGl0ZW1zLnBlcnNvbnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAkKCcjc2hvd0FsbCcpLmFwcGVuZChgXG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzPSdsaXN0aXRlbSc+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSduYW1lJz4ke2l0ZW0ubmFtZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2FjdGl2ZSc+JHtpdGVtLmFjdGl2ZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2FnZSc+JHtpdGVtLmFnZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1pZD1cIiR7aXRlbS5pZH1cIiBjbGFzcz1cImRlbGV0ZVwiPkRlbGV0ZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLWlkPVwiJHtpdGVtLmlkfVwiY2xhc3M9XCJlZGl0XCI+RWRpdDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgIGApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXMoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yOiAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIHJlaigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH0sXG4gICAgZ2V0T25lOiAoKSA9PiB7XG4gICAgICAkKCcjc2hvd0FsbCcpLm9uKCdjbGljaycsICcuZWRpdCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCcjc2hvd09uZScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgbGV0IGlkID0gJCh0aGlzKS5kYXRhKCdpZCcpO1xuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgIFwiYWNjZXB0XCI6IFwiYXBwbGljYXRpb24vanNvbjsgb2RhdGE9dmVyYm9zZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICAgICAgICB1cmw6IGAke2FwcC5iYXNlVXJsfS9wZXJzb25zLyR7aWR9YCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICQoJyNzaG93T25lJykuZW1wdHkoKTtcbiAgICAgICAgICAgICAgJCgnI3Nob3dPbmUnKS5hcHBlbmQoYFxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBjbGFzcz0nbmFtZSBlJyB2YWx1ZT1cIiR7aXRlbS5wZXJzb25zLm5hbWV9XCIgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgY2xhc3M9J2FjdGl2ZSBlJyB2YWx1ZT1cIiR7aXRlbS5wZXJzb25zLmFjdGl2ZX1cIiAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPSd0ZXh0JyBjbGFzcz0nYWdlIGUnIHZhbHVlPVwiJHtpdGVtLnBlcnNvbnMuYWdlfVwiIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nYnV0dG9ud3JhcCc+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtaWQ9XCIke2l0ZW0ucGVyc29ucy5pZH1cIiBjbGFzcz1cInNhdmVcIj5TYXZlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY2FuY2VsXCI+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIGApXG4gICAgICAgICAgICAgIHJlcygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICByZWooKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBwdXRPbmU6ICgpID0+IHtcbiAgICAgICQoJyNzaG93T25lJykub24oJ2NsaWNrJywgJy5zYXZlJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCBpZCA9ICQodGhpcykuZGF0YSgnaWQnKTtcbiAgICAgICAgY29uc29sZS5sb2coaWQpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gICQod2luZG93KS5vbignbG9hZCcsICgpID0+IHtcbiAgICBhcHAuaW5pdCgpO1xuICB9KTtcblxufSkod2luZG93LmpRdWVyeSk7XG4iXX0=
