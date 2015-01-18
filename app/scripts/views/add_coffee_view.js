(function () {

  App.Views.AddCoffee = Parse.View.extend({

    events: {
      'submit #addCoffee' : 'addCoffee'
    },

    initialize: function () {
      this.render();
      $('#searchList').empty();
      $('#coffeeList').html(this.$el);
    },

    render: function () {
      this.$el.html($('#addTemp').html());
    },

    addCoffee: function (e) {
      e.preventDefault();

      var fileUploadControl = $("#profilePhotoFileUpload")[0];
      if (fileUploadControl.files.length > 0) {
        var file = fileUploadControl.files[0];
        var name = "photo.jpg";

        var parseFile = new Parse.File(name, file);
      }
      parseFile.save()

      var c = new App.Models.Coffee({
        city: $('#trip_city').val(),
        country: $('#trip_country').val(),
        picture: parseFile,
        content: $('#trip_content').val(),
        cost: $('#trip_cost').val()
      });

      c.save(null, {
        success: function () {
          App.coffees.add(c);
          App.router.navigate('', { trigger: true });
        }
      });

    }

  });

}());
