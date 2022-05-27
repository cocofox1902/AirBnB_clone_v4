$(document).ready(function  () {
  const amencheck = {};
  $('.amenities .popover input').change(function () {
    if ($(this).is(':checked')) {
      amencheck[$(this).data('id')] = $(this).data('name');
    } else if ($(this).is(':not(:checked)')) {
      delete amencheck[$(this).data('id')];
    }
    $('.amenities h4').text(Object.values(amencheck).join(', '));
    if (values.length === 0) $('.amenities h4').html('&nbsp;');
  });

  $.get('http://127.0.0.1:5001/api/v1/status/', function(data) {
    if (data.status == 'OK') {
      $('#api_status').addClass('available');
    }
    else {
      $('#api_status').removeClass('available');
    }
  });

call();

function call() {
  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    data: JSON.stringify({ amenities: Object.keys(amencheck) }),
    dataType: 'json',
    contentType: 'application/json',
    success: function(places) {
      $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:5001/api/v1/users/',
        data: '{}',
        dataType: 'json',
        contentType: 'application/json',
        success: function (users) {
          amenities_post(places, users);
        }
      });
    }
  });
}

function amenities_post(places, users) {
  let usergave = '';
  places.forEach(place => {
    usergave = '';
    users.forEach(user => {
      if (user.id === place.user_id) {
        usergave = user.first_name + ' ' + user.last_name;
      }
    });
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
      <div class="number_rooms">${place.number_rooms} Bedroom${rooms}</div>
      <div class="number_bathrooms">${place.number_bathrooms} Bathroom${bathrooms}</div>
    </div>
    <div class="user">
      <b>Owner:</b> ${usergave} 
    </div>
    <div class="description">
      ${place.description}
    </div>
    </article>`;
    $('.places').append(html);
  });
}

$('button').click(function (interraction) {
  interraction.preventDefault();
  $('article').remove();
  call();
});
});
