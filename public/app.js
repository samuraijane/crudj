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
            $('#showAll').append(`
              <li class="listitem">
                <div class="name h">Name</div>
                <div class="active h">Active</div>
                <div class="age h">Age</div>
              </li>
            `);
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
                <input id='thename' type='text' class='name e' value='${item.persons.name}' />
                <input id='isactive' type='text' class='active e' value='${item.persons.active}' />
                <input id='theage' type='text' class='age e' value='${item.persons.age}' />
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
        var body = {
          active: $('#isactive').val(),
          age: $('#theage').val(),
          id: id,
          name: $('#thename').val()
        };
        let promise = new Promise((res, rej) => {
          $.ajax({
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(body),
            headers: {
              "accept": "application/json; odata=verbose"
            },
            type: 'PUT',
            url: `${app.baseUrl}/persons/${id}`,
            success: (data) => {
              $('#showOne').empty().removeClass('active');
              $('#showAll').empty();
              app.getAll();
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
    }
  };

  $(window).on('load', () => {
    app.init();
  });

})(window.jQuery);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQSxTQUFBLEdBQUE7O0VBRUEsSUFBQSxNQUFBO0lBQ0EsU0FBQTtJQUNBLE1BQUEsV0FBQTtNQUNBLElBQUE7TUFDQSxJQUFBO01BQ0EsSUFBQTs7SUFFQSxRQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBcUNBLFFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFrQ0EsUUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBb0NBLEVBQUEsUUFBQSxHQUFBLFFBQUE7Ozs7R0FJQSxPQUFBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCQpIHtcblxuICB2YXIgYXBwID0ge1xuICAgIGJhc2VVcmw6ICdodHRwOi8vbG9jYWxob3N0OjMwMDEnLFxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgYXBwLmdldEFsbCgpO1xuICAgICAgYXBwLmdldE9uZSgpO1xuICAgICAgYXBwLnB1dE9uZSgpO1xuICAgIH0sXG4gICAgZ2V0QWxsOiAoKSA9PiB7XG4gICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIFwiYWNjZXB0XCI6IFwiYXBwbGljYXRpb24vanNvbjsgb2RhdGE9dmVyYm9zZVwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgICB1cmw6IGAke2FwcC5iYXNlVXJsfS9wZXJzb25zYCxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihpdGVtcykge1xuICAgICAgICAgICAgJCgnI3Nob3dBbGwnKS5hcHBlbmQoYFxuICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJsaXN0aXRlbVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYW1lIGhcIj5OYW1lPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFjdGl2ZSBoXCI+QWN0aXZlPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFnZSBoXCI+QWdlPC9kaXY+XG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICBgKTtcbiAgICAgICAgICAgIGl0ZW1zLnBlcnNvbnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAkKCcjc2hvd0FsbCcpLmFwcGVuZChgXG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzPSdsaXN0aXRlbSc+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSduYW1lJz4ke2l0ZW0ubmFtZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2FjdGl2ZSc+JHtpdGVtLmFjdGl2ZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2FnZSc+JHtpdGVtLmFnZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1pZD1cIiR7aXRlbS5pZH1cIiBjbGFzcz1cImRlbGV0ZVwiPkRlbGV0ZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLWlkPVwiJHtpdGVtLmlkfVwiY2xhc3M9XCJlZGl0XCI+RWRpdDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgIGApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXMoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yOiAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIHJlaigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH0sXG4gICAgZ2V0T25lOiAoKSA9PiB7XG4gICAgICAkKCcjc2hvd0FsbCcpLm9uKCdjbGljaycsICcuZWRpdCcsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCcjc2hvd09uZScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgbGV0IGlkID0gJCh0aGlzKS5kYXRhKCdpZCcpO1xuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgIFwiYWNjZXB0XCI6IFwiYXBwbGljYXRpb24vanNvbjsgb2RhdGE9dmVyYm9zZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICAgICAgICB1cmw6IGAke2FwcC5iYXNlVXJsfS9wZXJzb25zLyR7aWR9YCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICQoJyNzaG93T25lJykuZW1wdHkoKTtcbiAgICAgICAgICAgICAgJCgnI3Nob3dPbmUnKS5hcHBlbmQoYFxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZD0ndGhlbmFtZScgdHlwZT0ndGV4dCcgY2xhc3M9J25hbWUgZScgdmFsdWU9JyR7aXRlbS5wZXJzb25zLm5hbWV9JyAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZD0naXNhY3RpdmUnIHR5cGU9J3RleHQnIGNsYXNzPSdhY3RpdmUgZScgdmFsdWU9JyR7aXRlbS5wZXJzb25zLmFjdGl2ZX0nIC8+XG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPSd0aGVhZ2UnIHR5cGU9J3RleHQnIGNsYXNzPSdhZ2UgZScgdmFsdWU9JyR7aXRlbS5wZXJzb25zLmFnZX0nIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nYnV0dG9ud3JhcCc+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtaWQ9XCIke2l0ZW0ucGVyc29ucy5pZH1cIiBjbGFzcz1cInNhdmVcIj5TYXZlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY2FuY2VsXCI+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIGApXG4gICAgICAgICAgICAgIHJlcygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICByZWooKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBwdXRPbmU6ICgpID0+IHtcbiAgICAgICQoJyNzaG93T25lJykub24oJ2NsaWNrJywgJy5zYXZlJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCBpZCA9ICQodGhpcykuZGF0YSgnaWQnKTtcbiAgICAgICAgdmFyIGJvZHkgPSB7XG4gICAgICAgICAgYWN0aXZlOiAkKCcjaXNhY3RpdmUnKS52YWwoKSxcbiAgICAgICAgICBhZ2U6ICQoJyN0aGVhZ2UnKS52YWwoKSxcbiAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgbmFtZTogJCgnI3RoZW5hbWUnKS52YWwoKVxuICAgICAgICB9O1xuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShib2R5KSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgXCJhY2NlcHRcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBvZGF0YT12ZXJib3NlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0eXBlOiAnUFVUJyxcbiAgICAgICAgICAgIHVybDogYCR7YXBwLmJhc2VVcmx9L3BlcnNvbnMvJHtpZH1gLFxuICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgJCgnI3Nob3dPbmUnKS5lbXB0eSgpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgJCgnI3Nob3dBbGwnKS5lbXB0eSgpO1xuICAgICAgICAgICAgICBhcHAuZ2V0QWxsKCk7XG4gICAgICAgICAgICAgIHJlcygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICByZWooKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gICQod2luZG93KS5vbignbG9hZCcsICgpID0+IHtcbiAgICBhcHAuaW5pdCgpO1xuICB9KTtcblxufSkod2luZG93LmpRdWVyeSk7XG4iXX0=
