(function($) {

  var app = {
    baseUrl: 'http://localhost:3001',
    init: function() {
      app.createOne();
      app.deleteOne();
      app.doCancel();
      app.getAllRecords();
      app.getOne();
      app.openCreate();
      app.putOne();
    },
    cancel: () => {
      $('#showOne').empty().removeClass('active');
    },
    createOne: () => {
      $('#showOne').on('click', '.create', (e) => {
        e.preventDefault();
        var body = {
          active: $('#isactive').val(),
          age: $('#theage').val(),
          name: $('#thename').val()
        };
        let promise = new Promise((res, rej) => {
          $.ajax({
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(body),
            headers: {
              "accept": "application/json; odata=verbose"
            },
            type: 'POST',
            url: `${app.baseUrl}/persons`,
            success: (data) => {
              app.getAllRecords();
              app.cancel();
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
    deleteOne: () => {
      $('#showAll').on('click', '.delete', (e) => {
        e.preventDefault();
        alert('This functionality coming soon.');
      });
    },
    doCancel: () => {
      $('#showOne').on('click', '.cancel', (e) => {
        e.preventDefault();
        app.cancel();
      });
    },
    getAllRecords: () => {
      let promise = new Promise((res, rej) => {
        $.ajax({
          headers: {
            "accept": "application/json; odata=verbose"
          },
          type: 'GET',
          url: `${app.baseUrl}/persons`,
          success: function(items) {
            $('#showAll').empty();
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
    openCreate: () => {
      $('#open-create').on('click', (e) => {
        e.preventDefault();
        $('#showOne').empty();
        $('#showOne').append(`
          <input id='thename' type='text' class='name e' placeholder='Name' />
          <input id='isactive' type='text' class='active e' placeholder='Active' />
          <input id='theage' type='text' class='age e' placeholder='Age' />
          <div class='buttonwrap'>
            <button data-id="tbd" class="create">Save</button>
            <button class="cancel">Cancel</button>
          </div>
        `);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQSxTQUFBLEdBQUE7O0VBRUEsSUFBQSxNQUFBO0lBQ0EsU0FBQTtJQUNBLE1BQUEsV0FBQTtNQUNBLElBQUE7TUFDQSxJQUFBO01BQ0EsSUFBQTtNQUNBLElBQUE7TUFDQSxJQUFBO01BQ0EsSUFBQTtNQUNBLElBQUE7O0lBRUEsUUFBQTs7O0lBR0EsV0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQStCQSxXQUFBOzs7Ozs7SUFNQSxVQUFBOzs7Ozs7SUFNQSxlQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXNDQSxRQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBa0NBLFlBQUE7Ozs7Ozs7Ozs7Ozs7OztJQWVBLFFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQW9DQSxFQUFBLFFBQUEsR0FBQSxRQUFBOzs7O0dBSUEsT0FBQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigkKSB7XG5cbiAgdmFyIGFwcCA9IHtcbiAgICBiYXNlVXJsOiAnaHR0cDovL2xvY2FsaG9zdDozMDAxJyxcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgIGFwcC5jcmVhdGVPbmUoKTtcbiAgICAgIGFwcC5kZWxldGVPbmUoKTtcbiAgICAgIGFwcC5kb0NhbmNlbCgpO1xuICAgICAgYXBwLmdldEFsbFJlY29yZHMoKTtcbiAgICAgIGFwcC5nZXRPbmUoKTtcbiAgICAgIGFwcC5vcGVuQ3JlYXRlKCk7XG4gICAgICBhcHAucHV0T25lKCk7XG4gICAgfSxcbiAgICBjYW5jZWw6ICgpID0+IHtcbiAgICAgICQoJyNzaG93T25lJykuZW1wdHkoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgfSxcbiAgICBjcmVhdGVPbmU6ICgpID0+IHtcbiAgICAgICQoJyNzaG93T25lJykub24oJ2NsaWNrJywgJy5jcmVhdGUnLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciBib2R5ID0ge1xuICAgICAgICAgIGFjdGl2ZTogJCgnI2lzYWN0aXZlJykudmFsKCksXG4gICAgICAgICAgYWdlOiAkKCcjdGhlYWdlJykudmFsKCksXG4gICAgICAgICAgbmFtZTogJCgnI3RoZW5hbWUnKS52YWwoKVxuICAgICAgICB9O1xuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShib2R5KSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgXCJhY2NlcHRcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBvZGF0YT12ZXJib3NlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6IGAke2FwcC5iYXNlVXJsfS9wZXJzb25zYCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgIGFwcC5nZXRBbGxSZWNvcmRzKCk7XG4gICAgICAgICAgICAgIGFwcC5jYW5jZWwoKTtcbiAgICAgICAgICAgICAgcmVzKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgIHJlaigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGRlbGV0ZU9uZTogKCkgPT4ge1xuICAgICAgJCgnI3Nob3dBbGwnKS5vbignY2xpY2snLCAnLmRlbGV0ZScsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYWxlcnQoJ1RoaXMgZnVuY3Rpb25hbGl0eSBjb21pbmcgc29vbi4nKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZG9DYW5jZWw6ICgpID0+IHtcbiAgICAgICQoJyNzaG93T25lJykub24oJ2NsaWNrJywgJy5jYW5jZWwnLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGFwcC5jYW5jZWwoKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0QWxsUmVjb3JkczogKCkgPT4ge1xuICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBcImFjY2VwdFwiOiBcImFwcGxpY2F0aW9uL2pzb247IG9kYXRhPXZlcmJvc2VcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICAgICAgdXJsOiBgJHthcHAuYmFzZVVybH0vcGVyc29uc2AsXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oaXRlbXMpIHtcbiAgICAgICAgICAgICQoJyNzaG93QWxsJykuZW1wdHkoKTtcbiAgICAgICAgICAgICQoJyNzaG93QWxsJykuYXBwZW5kKGBcbiAgICAgICAgICAgICAgPGxpIGNsYXNzPVwibGlzdGl0ZW1cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmFtZSBoXCI+TmFtZTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhY3RpdmUgaFwiPkFjdGl2ZTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhZ2UgaFwiPkFnZTwvZGl2PlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgYCk7XG4gICAgICAgICAgICBpdGVtcy5wZXJzb25zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgJCgnI3Nob3dBbGwnKS5hcHBlbmQoYFxuICAgICAgICAgICAgICAgIDxsaSBjbGFzcz0nbGlzdGl0ZW0nPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nbmFtZSc+JHtpdGVtLm5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdhY3RpdmUnPiR7aXRlbS5hY3RpdmV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdhZ2UnPiR7aXRlbS5hZ2V9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtaWQ9XCIke2l0ZW0uaWR9XCIgY2xhc3M9XCJkZWxldGVcIj5EZWxldGU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1pZD1cIiR7aXRlbS5pZH1cImNsYXNzPVwiZWRpdFwiPkVkaXQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICBgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVzKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvcjogKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICByZWooKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9LFxuICAgIGdldE9uZTogKCkgPT4ge1xuICAgICAgJCgnI3Nob3dBbGwnKS5vbignY2xpY2snLCAnLmVkaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnI3Nob3dPbmUnKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIGxldCBpZCA9ICQodGhpcykuZGF0YSgnaWQnKTtcbiAgICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICBcImFjY2VwdFwiOiBcImFwcGxpY2F0aW9uL2pzb247IG9kYXRhPXZlcmJvc2VcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICAgICAgdXJsOiBgJHthcHAuYmFzZVVybH0vcGVyc29ucy8ke2lkfWAsXG4gICAgICAgICAgICBzdWNjZXNzOiAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAkKCcjc2hvd09uZScpLmVtcHR5KCk7XG4gICAgICAgICAgICAgICQoJyNzaG93T25lJykuYXBwZW5kKGBcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9J3RoZW5hbWUnIHR5cGU9J3RleHQnIGNsYXNzPSduYW1lIGUnIHZhbHVlPScke2l0ZW0ucGVyc29ucy5uYW1lfScgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9J2lzYWN0aXZlJyB0eXBlPSd0ZXh0JyBjbGFzcz0nYWN0aXZlIGUnIHZhbHVlPScke2l0ZW0ucGVyc29ucy5hY3RpdmV9JyAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZD0ndGhlYWdlJyB0eXBlPSd0ZXh0JyBjbGFzcz0nYWdlIGUnIHZhbHVlPScke2l0ZW0ucGVyc29ucy5hZ2V9JyAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2J1dHRvbndyYXAnPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLWlkPVwiJHtpdGVtLnBlcnNvbnMuaWR9XCIgY2xhc3M9XCJzYXZlXCI+U2F2ZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNhbmNlbFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICBgKVxuICAgICAgICAgICAgICByZXMoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgcmVqKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgb3BlbkNyZWF0ZTogKCkgPT4ge1xuICAgICAgJCgnI29wZW4tY3JlYXRlJykub24oJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCcjc2hvd09uZScpLmVtcHR5KCk7XG4gICAgICAgICQoJyNzaG93T25lJykuYXBwZW5kKGBcbiAgICAgICAgICA8aW5wdXQgaWQ9J3RoZW5hbWUnIHR5cGU9J3RleHQnIGNsYXNzPSduYW1lIGUnIHBsYWNlaG9sZGVyPSdOYW1lJyAvPlxuICAgICAgICAgIDxpbnB1dCBpZD0naXNhY3RpdmUnIHR5cGU9J3RleHQnIGNsYXNzPSdhY3RpdmUgZScgcGxhY2Vob2xkZXI9J0FjdGl2ZScgLz5cbiAgICAgICAgICA8aW5wdXQgaWQ9J3RoZWFnZScgdHlwZT0ndGV4dCcgY2xhc3M9J2FnZSBlJyBwbGFjZWhvbGRlcj0nQWdlJyAvPlxuICAgICAgICAgIDxkaXYgY2xhc3M9J2J1dHRvbndyYXAnPlxuICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLWlkPVwidGJkXCIgY2xhc3M9XCJjcmVhdGVcIj5TYXZlPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY2FuY2VsXCI+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIGApO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBwdXRPbmU6ICgpID0+IHtcbiAgICAgICQoJyNzaG93T25lJykub24oJ2NsaWNrJywgJy5zYXZlJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCBpZCA9ICQodGhpcykuZGF0YSgnaWQnKTtcbiAgICAgICAgdmFyIGJvZHkgPSB7XG4gICAgICAgICAgYWN0aXZlOiAkKCcjaXNhY3RpdmUnKS52YWwoKSxcbiAgICAgICAgICBhZ2U6ICQoJyN0aGVhZ2UnKS52YWwoKSxcbiAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgbmFtZTogJCgnI3RoZW5hbWUnKS52YWwoKVxuICAgICAgICB9O1xuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShib2R5KSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgXCJhY2NlcHRcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBvZGF0YT12ZXJib3NlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0eXBlOiAnUFVUJyxcbiAgICAgICAgICAgIHVybDogYCR7YXBwLmJhc2VVcmx9L3BlcnNvbnMvJHtpZH1gLFxuICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgJCgnI3Nob3dPbmUnKS5lbXB0eSgpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgJCgnI3Nob3dBbGwnKS5lbXB0eSgpO1xuICAgICAgICAgICAgICBhcHAuZ2V0QWxsKCk7XG4gICAgICAgICAgICAgIHJlcygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICByZWooKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gICQod2luZG93KS5vbignbG9hZCcsICgpID0+IHtcbiAgICBhcHAuaW5pdCgpO1xuICB9KTtcblxufSkod2luZG93LmpRdWVyeSk7XG4iXX0=
