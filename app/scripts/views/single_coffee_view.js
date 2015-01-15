(function () {

  App.Views.SingleCoffee = Parse.View.extend({

    tagName: 'ul',
    className: 'coffeeSingle',

    events: {
      'submit #updateCoffee' : 'updateCoffee',
      'click #delete' : 'deleteCoffee'
    },

    template: _.template($('#singleTemp').html()),

    initialize: function (options) {
      this.options = options;
      this.render();

      $('#coffeeForm').empty();

      // Get our Element On Our Page
      $('#coffeeList').html(this.$el);
    },

    render: function () {

      this.$el.empty();

      this.$el.html(this.template(this.options.coffee.toJSON()));

    },

    updateCoffee: function (e) {
      e.preventDefault();

      // Update our Model Instance
      this.options.coffee.set({
        city: $('#update_city').val(),
        country: $('#update_country').val(),
        rating: $('input[name="rating"]:checked').val()
      });

      // Save Instance
      this.options.coffee.save();

      // TODO - Check on promise
      App.router.navigate('', {trigger: true});

    },

    deleteCoffee: function (e) {
      e.preventDefault();

      // Remove Coffee
      this.options.coffee.destroy();

      // Go home ET
      App.router.navigate('', {trigger: true});

    }

  });

}());
