(function () {

  App.Models.Trip = Parse.Object.extend({

    className: 'Coffee',

    idAttribute: 'objectId',

    defaults: {
      name: '',
      brand: '',
      comments: '',
      rating: '',
      testing: true
    },

    initialize: function () {
      var t = this.get('name');
      //console.log(t + " has been added");
    }

  });

}());

(function () {

  App.Collections.Trips = Parse.Collection.extend({
    model: App.Models.Coffee,
    comparator: function (model) {
      return -parseInt(model.get('rating'));
    }
  });

}());

(function () {

  App.Views.AddTrip = Parse.View.extend({

    events: {
      'submit #addCoffee' : 'addCoffee'
    },

    initialize: function () {
      this.render();

      $('#tripList').html(this.$el);
    },

    render: function () {
      this.$el.html($('#addTemp').html());
    },

    addCoffee: function (e) {
      e.preventDefault();

      var c = new App.Models.Trip({
        name: $('#coffee_name').val(),
        brand: $('#coffee_brand').val()
      });

      c.save(null, {
        success: function () {
          App.trips.add(c);
          App.router.navigate('', { trigger: true });
        }
      });

    }

  });

}());

(function () {

  App.Views.ListTrips = Parse.View.extend({

    tagName: 'ul',
    className: 'allCoffees',

    events: {},

    template: _.template($('#listTemp').html()),

    initialize: function (options) {

      this.options = options;

      this.render();

      this.collection.off();
      this.collection.on('sync', this.render, this);

      // Get our Element On Our Page
      $('#tripList').html(this.$el);



    },

    render: function () {
      var self = this;

      // Empty out
      this.$el.empty();

      // Sorting On The Fly
      if (this.options.sort != undefined) {
        // Setting up a localized collection to sort by our sort param
        var local_collection = this.collection.sortBy( function (model) {
          return model.get(self.options.sort);
        });
        _.each(local_collection, function (c) {
          self.$el.append(self.template(c.toJSON()));
        })
      } else {
        // Sort from our default comparator in our collection constructor
        this.collection.sort();
        this.collection.each(function (c) {
          self.$el.append(self.template(c.toJSON()));
        });
      }


      if (this.options.showTwitter) {
        $('.hero-unit h1 a').html('Twitter');
      } else {
        $('.hero-unit h1 a').html('Coffee Snob');
      }
      return this;
    }

  });

}());

(function () {

  App.Views.SingleTrip = Parse.View.extend({

    tagName: 'ul',
    className: 'coffeeSingle',

    events: {
      'submit #updateTrip' : 'updateTrip',
      'click #delete' : 'deleteTrip'
    },

    template: _.template($('#singleTemp').html()),

    initialize: function (options) {
      this.options = options;
      this.render();

      $('#coffeeForm').empty();

      // Get our Element On Our Page
      $('#tripList').html(this.$el);
    },

    render: function () {

      this.$el.empty();

      this.$el.html(this.template(this.options.coffee.toJSON()));

    },

    updateTrip: function (e) {
      e.preventDefault();

      // Update our Model Instance
      this.options.trip.set({
        name: $('#update_name').val(),
        brand: $('#update_brand').val(),
        rating: $('input[name="rating"]:checked').val()
      });

      // Save Instance
      this.options.trip.save();

      //T - Check on promise
      App.router.navigate('', {trigger: true});

    },

    deleteTrip: function (e) {
      e.preventDefault();

      // Remove Coffee
      this.options.coffee.destroy();

      // Go home ET
      App.router.navigate('', {trigger: true});

    }

  });

}());

(function () {

  App.Routers.AppRouter = Parse.Router.extend({

    initialize: function () {
      // Light the Fire
      Parse.history.start();
    },

    routes: {
      '' : 'home',
      'edit/:coffeeID' : 'editCoffee',
      'add' : 'addCoffee',
      'sort/:sortby' : 'home'
    },

    home: function (sortby) {
      new App.Views.ListCoffee({ collection: App.trips, showTwitter: false, sort: sortby });
    },

    editCoffee: function (coffeeID) {

      var c = App.trips.get(coffeeID);
      new App.Views.SingleCoffee({ trip: c });
    },

    addCoffee: function () {

      new App.Views.AddCoffee();

    }

  });

}());

console.log('The Iron Yard Rocks');

// Parse.initialize("hjvre0d6NncFPdITirawPg3CgauMhiUDdBnfPy92", "SjMOm2L5dTAyDj2WUx7XWZloPBxCsBs3uCoJpBrJ");
Parse.initialize("I16kkJEVSPkyioINGIffaWkvxfrpj0f7wtPkmltb", "kk9FtdAmGJNTIKkIfnQ3gMUAdBJYjRDDc6YVdcQu");

(function () {

  // Create Instance of Collection
  App.coffees = new App.Collections.Trips();

  // Fetch any server-side coffees
  App.trips.fetch().done( function () {

    App.router = new App.Routers.AppRouter();

  });


}());
