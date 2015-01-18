(function () {

  App.Views.HomeView = Parse.View.extend({

    events: {},


    initialize: function () {
      this.render();

      $('#coffeeList').html(this.$el);
    },

    render: function () {
      this.$el.empty();
      $('#searchList').empty();
      $('#coffeeList').empty();
      $('.footer').removeClass('lower');
      this.$el.html($('#homeTemp').html());
    },



  });

}());
