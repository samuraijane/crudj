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
        let _id = $(e.target).data('id');
        let promise = new Promise((res, rej) => {
          $.ajax({
            contentType: "application/json; charset=utf-8",
            data: {},
            headers: {
              "accept": "application/json; odata=verbose"
            },
            type: 'DELETE',
            url: `${app.baseUrl}/persons/${_id}`,
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
              app.getAllRecords();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQSxTQUFBLEdBQUE7O0VBRUEsSUFBQSxNQUFBO0lBQ0EsU0FBQTtJQUNBLE1BQUEsV0FBQTtNQUNBLElBQUE7TUFDQSxJQUFBO01BQ0EsSUFBQTtNQUNBLElBQUE7TUFDQSxJQUFBO01BQ0EsSUFBQTtNQUNBLElBQUE7O0lBRUEsUUFBQTs7O0lBR0EsV0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQStCQSxXQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUEyQkEsVUFBQTs7Ozs7O0lBTUEsZUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFzQ0EsUUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWtDQSxZQUFBOzs7Ozs7Ozs7Ozs7Ozs7SUFlQSxRQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFvQ0EsRUFBQSxRQUFBLEdBQUEsUUFBQTs7OztHQUlBLE9BQUE7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oJCkge1xuXG4gIHZhciBhcHAgPSB7XG4gICAgYmFzZVVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMScsXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICBhcHAuY3JlYXRlT25lKCk7XG4gICAgICBhcHAuZGVsZXRlT25lKCk7XG4gICAgICBhcHAuZG9DYW5jZWwoKTtcbiAgICAgIGFwcC5nZXRBbGxSZWNvcmRzKCk7XG4gICAgICBhcHAuZ2V0T25lKCk7XG4gICAgICBhcHAub3BlbkNyZWF0ZSgpO1xuICAgICAgYXBwLnB1dE9uZSgpO1xuICAgIH0sXG4gICAgY2FuY2VsOiAoKSA9PiB7XG4gICAgICAkKCcjc2hvd09uZScpLmVtcHR5KCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH0sXG4gICAgY3JlYXRlT25lOiAoKSA9PiB7XG4gICAgICAkKCcjc2hvd09uZScpLm9uKCdjbGljaycsICcuY3JlYXRlJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgYm9keSA9IHtcbiAgICAgICAgICBhY3RpdmU6ICQoJyNpc2FjdGl2ZScpLnZhbCgpLFxuICAgICAgICAgIGFnZTogJCgnI3RoZWFnZScpLnZhbCgpLFxuICAgICAgICAgIG5hbWU6ICQoJyN0aGVuYW1lJykudmFsKClcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoYm9keSksXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgIFwiYWNjZXB0XCI6IFwiYXBwbGljYXRpb24vanNvbjsgb2RhdGE9dmVyYm9zZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgdXJsOiBgJHthcHAuYmFzZVVybH0vcGVyc29uc2AsXG4gICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICBhcHAuZ2V0QWxsUmVjb3JkcygpO1xuICAgICAgICAgICAgICBhcHAuY2FuY2VsKCk7XG4gICAgICAgICAgICAgIHJlcygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICByZWooKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBkZWxldGVPbmU6ICgpID0+IHtcbiAgICAgICQoJyNzaG93QWxsJykub24oJ2NsaWNrJywgJy5kZWxldGUnLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCBfaWQgPSAkKGUudGFyZ2V0KS5kYXRhKCdpZCcpO1xuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICBjb250ZW50VHlwZTogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIsXG4gICAgICAgICAgICBkYXRhOiB7fSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgXCJhY2NlcHRcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBvZGF0YT12ZXJib3NlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0eXBlOiAnREVMRVRFJyxcbiAgICAgICAgICAgIHVybDogYCR7YXBwLmJhc2VVcmx9L3BlcnNvbnMvJHtfaWR9YCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgIGFwcC5nZXRBbGxSZWNvcmRzKCk7XG4gICAgICAgICAgICAgIGFwcC5jYW5jZWwoKTtcbiAgICAgICAgICAgICAgcmVzKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgIHJlaigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGRvQ2FuY2VsOiAoKSA9PiB7XG4gICAgICAkKCcjc2hvd09uZScpLm9uKCdjbGljaycsICcuY2FuY2VsJywgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBhcHAuY2FuY2VsKCk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGdldEFsbFJlY29yZHM6ICgpID0+IHtcbiAgICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgXCJhY2NlcHRcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBvZGF0YT12ZXJib3NlXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICAgIHVybDogYCR7YXBwLmJhc2VVcmx9L3BlcnNvbnNgLFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGl0ZW1zKSB7XG4gICAgICAgICAgICAkKCcjc2hvd0FsbCcpLmVtcHR5KCk7XG4gICAgICAgICAgICAkKCcjc2hvd0FsbCcpLmFwcGVuZChgXG4gICAgICAgICAgICAgIDxsaSBjbGFzcz1cImxpc3RpdGVtXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hbWUgaFwiPk5hbWU8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWN0aXZlIGhcIj5BY3RpdmU8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWdlIGhcIj5BZ2U8L2Rpdj5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIGApO1xuICAgICAgICAgICAgaXRlbXMucGVyc29ucy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICQoJyNzaG93QWxsJykuYXBwZW5kKGBcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3M9J2xpc3RpdGVtJz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J25hbWUnPiR7aXRlbS5uYW1lfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nYWN0aXZlJz4ke2l0ZW0uYWN0aXZlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nYWdlJz4ke2l0ZW0uYWdlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBkYXRhLWlkPVwiJHtpdGVtLmlkfVwiIGNsYXNzPVwiZGVsZXRlXCI+RGVsZXRlPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIGRhdGEtaWQ9XCIke2l0ZW0uaWR9XCJjbGFzcz1cImVkaXRcIj5FZGl0PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgYCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlcygpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3I6IChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgcmVqKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfSxcbiAgICBnZXRPbmU6ICgpID0+IHtcbiAgICAgICQoJyNzaG93QWxsJykub24oJ2NsaWNrJywgJy5lZGl0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJyNzaG93T25lJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICBsZXQgaWQgPSAkKHRoaXMpLmRhdGEoJ2lkJyk7XG4gICAgICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgXCJhY2NlcHRcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBvZGF0YT12ZXJib3NlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogYCR7YXBwLmJhc2VVcmx9L3BlcnNvbnMvJHtpZH1gLFxuICAgICAgICAgICAgc3VjY2VzczogKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgJCgnI3Nob3dPbmUnKS5lbXB0eSgpO1xuICAgICAgICAgICAgICAkKCcjc2hvd09uZScpLmFwcGVuZChgXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPSd0aGVuYW1lJyB0eXBlPSd0ZXh0JyBjbGFzcz0nbmFtZSBlJyB2YWx1ZT0nJHtpdGVtLnBlcnNvbnMubmFtZX0nIC8+XG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPSdpc2FjdGl2ZScgdHlwZT0ndGV4dCcgY2xhc3M9J2FjdGl2ZSBlJyB2YWx1ZT0nJHtpdGVtLnBlcnNvbnMuYWN0aXZlfScgLz5cbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9J3RoZWFnZScgdHlwZT0ndGV4dCcgY2xhc3M9J2FnZSBlJyB2YWx1ZT0nJHtpdGVtLnBlcnNvbnMuYWdlfScgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdidXR0b253cmFwJz5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gZGF0YS1pZD1cIiR7aXRlbS5wZXJzb25zLmlkfVwiIGNsYXNzPVwic2F2ZVwiPlNhdmU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJjYW5jZWxcIj5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgYClcbiAgICAgICAgICAgICAgcmVzKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgIHJlaigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIG9wZW5DcmVhdGU6ICgpID0+IHtcbiAgICAgICQoJyNvcGVuLWNyZWF0ZScpLm9uKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnI3Nob3dPbmUnKS5lbXB0eSgpO1xuICAgICAgICAkKCcjc2hvd09uZScpLmFwcGVuZChgXG4gICAgICAgICAgPGlucHV0IGlkPSd0aGVuYW1lJyB0eXBlPSd0ZXh0JyBjbGFzcz0nbmFtZSBlJyBwbGFjZWhvbGRlcj0nTmFtZScgLz5cbiAgICAgICAgICA8aW5wdXQgaWQ9J2lzYWN0aXZlJyB0eXBlPSd0ZXh0JyBjbGFzcz0nYWN0aXZlIGUnIHBsYWNlaG9sZGVyPSdBY3RpdmUnIC8+XG4gICAgICAgICAgPGlucHV0IGlkPSd0aGVhZ2UnIHR5cGU9J3RleHQnIGNsYXNzPSdhZ2UgZScgcGxhY2Vob2xkZXI9J0FnZScgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzPSdidXR0b253cmFwJz5cbiAgICAgICAgICAgIDxidXR0b24gZGF0YS1pZD1cInRiZFwiIGNsYXNzPVwiY3JlYXRlXCI+U2F2ZTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNhbmNlbFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgcHV0T25lOiAoKSA9PiB7XG4gICAgICAkKCcjc2hvd09uZScpLm9uKCdjbGljaycsICcuc2F2ZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgaWQgPSAkKHRoaXMpLmRhdGEoJ2lkJyk7XG4gICAgICAgIHZhciBib2R5ID0ge1xuICAgICAgICAgIGFjdGl2ZTogJCgnI2lzYWN0aXZlJykudmFsKCksXG4gICAgICAgICAgYWdlOiAkKCcjdGhlYWdlJykudmFsKCksXG4gICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgIG5hbWU6ICQoJyN0aGVuYW1lJykudmFsKClcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgY29udGVudFR5cGU6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoYm9keSksXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgIFwiYWNjZXB0XCI6IFwiYXBwbGljYXRpb24vanNvbjsgb2RhdGE9dmVyYm9zZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZTogJ1BVVCcsXG4gICAgICAgICAgICB1cmw6IGAke2FwcC5iYXNlVXJsfS9wZXJzb25zLyR7aWR9YCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICQoJyNzaG93T25lJykuZW1wdHkoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICQoJyNzaG93QWxsJykuZW1wdHkoKTtcbiAgICAgICAgICAgICAgYXBwLmdldEFsbFJlY29yZHMoKTtcbiAgICAgICAgICAgICAgcmVzKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgIHJlaigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgJCh3aW5kb3cpLm9uKCdsb2FkJywgKCkgPT4ge1xuICAgIGFwcC5pbml0KCk7XG4gIH0pO1xuXG59KSh3aW5kb3cualF1ZXJ5KTtcbiJdfQ==
