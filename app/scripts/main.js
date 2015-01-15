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

$(document).ready( function() {

  
  //   $(this).find('#title').fadeIn(300);
  // }, function() {
  //   $(this).find('#title').fadeOut(100);

  //  $('#elementA').hover(function(){
  //    $('#elementB').addClass('active');
  //  },function(){
  //    $('#elementB').removeClass('active');
  //  });
});
