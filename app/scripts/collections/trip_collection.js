(function () {

  App.Collections.Coffees = Parse.Collection.extend({
    model: App.Models.Coffee,
    comparator: function (model) {
      return -parseInt(model.get('rating'));
    }
  });

}());
