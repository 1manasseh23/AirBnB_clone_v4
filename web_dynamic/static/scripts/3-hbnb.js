// This line waits for the HTML document to be fully loaded before executing the enclosed code

$(document).ready(function() {
	const selectedAmenities = {};

	$('input[type="checkbox"]').change(function() {
		const amenityId = $(this).data('id');
		const amenityName = $(this).data('name');

		if (this.checked) {
			selectedAmenities[amenityId] = amenityName;
		} else {
			delete selectedAmenities[amenityId];
		}

		updateAmenitiesDisplay();
	});

	function updateAmenitiesDisplay() {
		const amenitiesList = Object.values(selectedAmenities).join(', ');
		$('.Amenities h4').text(`Selected Amenities: ${amenitiesList}`);
	}

	$.ajax({
		method: 'GET',
		url: 'http://0.0.0.0:5001/api/v1/status/',
		success: function(data){
			if (data.status === 'OK'){
				$('div#api_status').addClass('available');
			} else {
				$('div#api_status').removeClass('available');
			}
		}
	});

	$.ajax({
		type: 'POST',
		url: 'http://0.0.0.0:5001/api/v1/places_search',
		data: JSON.stringify({}),
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		success: function(data) {
			data.forEach(function(place) {
				let article = $('<article>');
				let titleBox = $('<div>').addClass('title_box');
				let h2 = $('<h2>').text(place.name);
				let priceByNight = $('<div>').addClass('price_by_night').text('$' + place.price_by_night);
				titleBox.append(h2, priceByNight);
				let information = $('<div>').addClass('information');
				let maxGuest = $('<div>').addClass('max_guest').text(place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : ''));
				let numberRooms = $('<div>').addClass('number_rooms').text(place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : ''));
				let numberBathrooms = $('<div>').addClass('number_bathrooms').text(place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : ''));
				information.append(maxGuest, numberRooms, numberBathrooms);
				let description = $('<div>').addClass('description').text(place.description);
				article.append(titleBox, information, description);
				$('section.places').append(article);
			});
		}
	});
});

