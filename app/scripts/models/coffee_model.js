
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
