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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQSxTQUFBLEdBQUE7O0VBRUEsSUFBQSxNQUFBO0lBQ0EsU0FBQTtJQUNBLE1BQUEsV0FBQTtNQUNBLElBQUE7TUFDQSxJQUFBO01BQ0EsSUFBQTs7SUFFQSxRQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUE4QkEsUUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWtDQSxRQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFvQ0EsRUFBQSxRQUFBLEdBQUEsUUFBQTs7OztHQUlBLE9BQUE7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oJCkge1xuXG4gIHZhciBhcHAgPSB7XG4gICAgYmFzZVVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMScsXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICBhcHAuZ2V0QWxsKCk7XG4gICAgICBhcHAuZ2V0T25lKCk7XG4gICAgICBhcHAucHV0T25lKCk7XG4gICAgfSxcbiAgICBnZXRBbGw6ICgpID0+IHtcbiAgICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgXCJhY2NlcHRcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBvZGF0YT12ZXJib3NlXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICAgIHVybDogYCR7YXBwLmJhc2VVcmx9L3BlcnNvbnNgLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGl0ZW1zKSB7XG4gICAgICAgICAgICBpdGVtcy5wZXJzb25zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgJCgnI3Nob3dBbGwnKS5hcHBlbmQoYFxuICAgICAgICAgICAgICAgIDxsaSBjbGFzcz0nbGlzdGl0ZW0nPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nbmFtZSc+JHtpdGVtLm5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdhY3RpdmUnPiR7aXRlbS5hY3RpdmV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdhZ2UnPiR7aXRlbS5hZ2V9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtaWQ9XCIke2l0ZW0uaWR9XCIgY2xhc3M9XCJkZWxldGVcIj5EZWxldGU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1pZD1cIiR7aXRlbS5pZH1cImNsYXNzPVwiZWRpdFwiPkVkaXQ8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICBgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVzKCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvcjogKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICByZWooKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9LFxuICAgIGdldE9uZTogKCkgPT4ge1xuICAgICAgJCgnI3Nob3dBbGwnKS5vbignY2xpY2snLCAnLmVkaXQnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnI3Nob3dPbmUnKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIGxldCBpZCA9ICQodGhpcykuZGF0YSgnaWQnKTtcbiAgICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICBcImFjY2VwdFwiOiBcImFwcGxpY2F0aW9uL2pzb247IG9kYXRhPXZlcmJvc2VcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICAgICAgdXJsOiBgJHthcHAuYmFzZVVybH0vcGVyc29ucy8ke2lkfWAsXG4gICAgICAgICAgICBzdWNjZXNzOiAoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAkKCcjc2hvd09uZScpLmVtcHR5KCk7XG4gICAgICAgICAgICAgICQoJyNzaG93T25lJykuYXBwZW5kKGBcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9J3RoZW5hbWUnIHR5cGU9J3RleHQnIGNsYXNzPSduYW1lIGUnIHZhbHVlPScke2l0ZW0ucGVyc29ucy5uYW1lfScgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9J2lzYWN0aXZlJyB0eXBlPSd0ZXh0JyBjbGFzcz0nYWN0aXZlIGUnIHZhbHVlPScke2l0ZW0ucGVyc29ucy5hY3RpdmV9JyAvPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZD0ndGhlYWdlJyB0eXBlPSd0ZXh0JyBjbGFzcz0nYWdlIGUnIHZhbHVlPScke2l0ZW0ucGVyc29ucy5hZ2V9JyAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2J1dHRvbndyYXAnPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLWlkPVwiJHtpdGVtLnBlcnNvbnMuaWR9XCIgY2xhc3M9XCJzYXZlXCI+U2F2ZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNhbmNlbFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICBgKVxuICAgICAgICAgICAgICByZXMoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgcmVqKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgcHV0T25lOiAoKSA9PiB7XG4gICAgICAkKCcjc2hvd09uZScpLm9uKCdjbGljaycsICcuc2F2ZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgaWQgPSAkKHRoaXMpLmRhdGEoJ2lkJyk7XG4gICAgICAgIHZhciBib2R5ID0ge1xuICAgICAgICAgIGFjdGl2ZTogJCgnI2lzYWN0aXZlJykudmFsKCksXG4gICAgICAgICAgYWdlOiAkKCcjdGhlYWdlJykudmFsKCksXG4gICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgIG5hbWU6ICQoJyN0aGVuYW1lJykudmFsKClcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoYm9keSksXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgIFwiYWNjZXB0XCI6IFwiYXBwbGljYXRpb24vanNvbjsgb2RhdGE9dmVyYm9zZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZTogJ1BVVCcsXG4gICAgICAgICAgICB1cmw6IGAke2FwcC5iYXNlVXJsfS9wZXJzb25zLyR7aWR9YCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICQoJyNzaG93T25lJykuZW1wdHkoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICQoJyNzaG93QWxsJykuZW1wdHkoKTtcbiAgICAgICAgICAgICAgYXBwLmdldEFsbCgpO1xuICAgICAgICAgICAgICByZXMoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgcmVqKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICAkKHdpbmRvdykub24oJ2xvYWQnLCAoKSA9PiB7XG4gICAgYXBwLmluaXQoKTtcbiAgfSk7XG5cbn0pKHdpbmRvdy5qUXVlcnkpO1xuIl19
