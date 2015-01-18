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
