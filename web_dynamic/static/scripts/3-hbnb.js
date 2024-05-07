// This line waits for the HTML document to be fully loaded before executing the enclosed code

$(document).ready(function() {
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: JSON.stringify({}),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function(data) {
      data.forEach(function(place) {
        var article = $('<article>');
        var titleBox = $('<div>').addClass('title_box');
        var h2 = $('<h2>').text(place.name);
        var priceByNight = $('<div>').addClass('price_by_night').text('$' + place.price_by_night);
        titleBox.append(h2, priceByNight);
        var information = $('<div>').addClass('information');
        var maxGuest = $('<div>').addClass('max_guest').text(place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : ''));
        var numberRooms = $('<div>').addClass('number_rooms').text(place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : ''));
        var numberBathrooms = $('<div>').addClass('number_bathrooms').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : ''));
        information.append(maxGuest, numberRooms, numberBathrooms);
        var description = $('<div>').addClass('description').text(place.description);
        article.append(titleBox, information, description);
        $('section.places').append(article);
      });
    }
  });
});

