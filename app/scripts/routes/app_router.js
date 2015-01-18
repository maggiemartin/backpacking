
(function () {

  App.Routers.AppRouter = Parse.Router.extend({

    initialize: function () {
      // Light the Fire
      Parse.history.start();
    },

    routes: {
      'about' : 'about',
      '':'allList',
      'edit/:coffeeID' : 'editCoffee',
      'big/:coffeeID' :'bigCoffee',
      'add' : 'addCoffee',
      'sort/:sortby' : 'allList'
    },

    about: function () {
      new App.Views.HomeView();

    },
    allList: function (sortby){
      new App.Views.ListCoffee({ collection: App.coffees, showTwitter: false, sort: sortby });
    },

    bigCoffee: function (coffeeID) {
      var c = App.coffees.get(coffeeID);
      new App.Views.BigCoffee({ coffee: c });
    },
    editCoffee: function (coffeeID) {

      var c = App.coffees.get(coffeeID);
      new App.Views.SingleCoffee({ coffee: c });
    },

    addCoffee: function () {

      new App.Views.AddCoffee();

    }

  });

}());
