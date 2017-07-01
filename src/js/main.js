(function($) {

  var app = {
    baseUrl: 'http://localhost:3001',
    init: function() {
      app.cancel();
      app.createOne();
      app.deleteOne();
      app.getAll();
      app.getOne();
      app.putOne();
    },
    cancel: () => {
      $('#showOne').on('click', '.cancel', (e) => {
        e.preventDefault();
        $('#showOne').empty().removeClass('active');
      });
    },
    createOne: () => {
      $('#create').on('click', (e) => {
        e.preventDefault();
        alert('This functionality coming soon.');
      });
    },
    deleteOne: () => {
      $('#showAll').on('click', '.delete', (e) => {
        e.preventDefault();
        alert('This functionality coming soon.');
      });
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
