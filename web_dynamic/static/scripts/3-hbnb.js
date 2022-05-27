$(document).ready(function () {
  const amencheck = {};
  $('.amenities .popover input').change(function () {
    if ($(this).is(':checked')) {
      amencheck[$(this).attr('data-name')] = $(this).attr('data-id');
    } else if ($(this).is(':not(:checked)')) {
      delete amencheck[$(this).attr('data-name')];
    }
    $('.amenities h4').text(Object.keys(amencheck).sort().join(', '));
  });
});

$(document).ready(function () {
  $.get('http://127.0.0.1:5001/api/v1/status/', function (data) {
    if (data.status == 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});

$.ajax({
  type: 'POST',
  url: 'http://127.0.0.1:5001/api/v1/places_search/',
  data: '{}',
  dataType: 'json',
  contentType: 'application/json',
  success: function (places) {
    places.forEach(place => {
      const guest = (place.max_guest !== 1) ? 's' : '';
      const rooms = (place.number_rooms !== 1) ? 's' : '';
      const bathrooms = (place.number_bathrooms !== 1) ? 's' : '';
      const html = `<article>
      <div class="title_box">
        <h2>${place.name}</h2>
        <div class="price_by_night">$${place.price_by_night}</div>
      </div>
      <div class="information">
        <div class="max_guest">${place.max_guest} Guest${guest}</div>
        <div class="number_rooms">${place.number_rooms}
          Bedroom${rooms}</div>
        <div class="number_bathrooms">${place.number_bathrooms}
          Bathroom${bathrooms}</div>
      </div>
      <div class="user">
        
      </div>
      <div class="description">
        ${place.description}
      </div>
    </article>`;
      $('.places').append(html);
    });
  }
});
