/* This java script  executed only when DOM is loaded */
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
});

