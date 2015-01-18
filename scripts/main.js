
(function () {

  App.Models.Coffee = Parse.Object.extend({

    className: 'Coffee',

    idAttribute: 'objectId',

    defaults: {
      rating: '',
      city: '',
      country: '',
      testing: true,
      content: '',
      cost: ''
    },

    initialize: function () {
      var t = this.get('name');
      //console.log(t + " has been added");
    }

  });

}());

(function () {

  App.Collections.Coffees = Parse.Collection.extend({
    model: App.Models.Coffee,
    comparator: function (model) {
      return -parseInt(model.get('rating'));
    }
  });

}());

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


(function () {

  App.Views.ListCoffee = Parse.View.extend({

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
      $('#coffeeList').html(this.$el);
      collection = App.coffees.models;



    },

    render: function () {
      var self = this;

      // Empty out
      this.$el.empty();
      $('#searchList').empty();
      $('.footer').removeClass('lower');

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

(function () {

  App.Views.BigCoffee = Parse.View.extend({

    tagName: 'ul',
    className: 'coffeeSingle',

    events: {

    },

    template: _.template($('#bigTemp').html()),

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

    }



  });

}());

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

console.log('The Iron Yard Rocks');

Parse.initialize("I16kkJEVSPkyioINGIffaWkvxfrpj0f7wtPkmltb", "kk9FtdAmGJNTIKkIfnQ3gMUAdBJYjRDDc6YVdcQu");

(function () {

  // Create Instance of Collection
  App.coffees = new App.Collections.Coffees();

  // Fetch any server-side coffees
  App.coffees.fetch().done( function () {

    App.router = new App.Routers.AppRouter();

  });


}());
var country;
var collection = App.coffees.models;

$('#filter').on('change', function (event){
  event.preventDefault();
  country = $('#filter').val();

  var results = _.filter(collection, function(x){ return x.attributes.country === country; });
   console.log(results);

   $('#searchList').empty();
   $('.footer').addClass('lower');
   $('#coffeeList').empty();

   var newresults = _.each(results, function (x){
    $('#searchList').append("<li class='filter_results'>" + "<a href='"+ '#/big/' + x.id +"' >"  + "<img src='" + x.attributes.picture._url + "'/>"+ "<h3 class='subtitle'>" + x.attributes.city + "</h3>" +   "</a>" + "</li>");

  });
});

////"<img class='resultpic'
/// "<img class='pic' src='" + x.attributes.picture + "'/>"

//_.filter(collection, function(x){ return x.attributes.city === nice; });
//// map code
