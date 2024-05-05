/* This java script  executed only when DOM is loaded

$(document).ready(function() {
    let amenities = {};

    $('input[type="checkbox"]').change(function() {
        let amenityId = $(this).data('id');
        let amenityName = $(this).data('name');

        if ($(this).is(':checked')) {
            amenities[amenityId] = amenityName;
        } else {
            delete amenities[amenityId];
        }

        let amenitiesList = Object.values(amenities).join(', ');
        $('div.Amenities h4').text(amenitiesList);
    });
});
*/


// Wait for the DOM to be fully loaded
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
});

