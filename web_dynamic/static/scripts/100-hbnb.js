$(document).ready(function () {
    const amenitiesid = [];
    const amenitiescheck = [];
    const citiesid = [];
    const citiescheck = [];
    const statesid = [];
    const statescheck = [];
    $('.amenities .popover input').change(function () {
      if ($(this).is(':checked')) {
        amenitiescheck.push($(this).data('name'));
        amenitiesid.push($(this).data('id'));
      } else {
        amenitiescheck.splice(amenitiescheck.indexOf($(this).data('name')), 1);
        amenitiesid.splice(amenitiesid.indexOf($(this).data('id')), 1);
      }
      if (amenitiescheck.length > 0) {
        $('.amenities h4').text(amenitiescheck.join(', '));
      } else {
        $('.amenities h4').html('&nbsp;');
      }
    });
    $('.popover li ul li input').change(function () {
      if ($(this).is(':checked')) {
        citiescheck.push($(this).data('name'));
        citiesid.push($(this).data('id'));
      } else {
        citiescheck.splice(citiescheck.indexOf($(this).data('name')), 1);
        citiesid.splice(citiesid.indexOf($(this).data('id')), 1);
      }
    });
  
    $('.popover h2 input').change(function () {
      if ($(this).is(':checked')) {
        statescheck.push($(this).data('name'));
        statesid.push($(this).data('id'));
      } else {
        statescheck.splice(statescheck.indexOf($(this).data('name')), 1);
        statesid.splice(statesid.indexOf($(this).data('id')), 1);
      }
    });
  
    $('.popover input').change(function () {
      const allLocations = citiescheck.concat(statescheck);
      if (allLocations.length > 0) {
        $('.locations h4').text(allLocations.join(', '));
      } else {
        $('.locations h4').html('&nbsp;');
      }
    });
  
    $.get('http://127.0.0.1:5001/api/v1/status', function(data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
  
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:5001/api/v1/places_search',
      data: '{}',
      dataType: 'json',
      contentType: 'application/json',
      success: function(data) {
        console.log(data);
        data.map( function(place) {
          const html = `<article>
          <div class='title_box'>
            <h2>${place.name}</h2>
              <div class='price_by_night'>$${place.price_by_night}</div>
          </div>
          <div class='information'>
            <div class='max_guest'>${place.max_guest} Guest</div>
            <div class='number_rooms'>${place.number_rooms} Bedroom</div>
            <div class='number_bathrooms'>${place.number_bathrooms} Bathroom</div>
          </div>
          <div class='description'>${place.description}</div>
        </article>`;
          $('.places').append(html);
        });
      },
    });
  
    $('button').click(() => {
      $('.places').empty();
      $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:5001/api/v1/places_search',
        data: JSON.stringify({
          amenities: amenitiesid,
          states: statesid,
          cities: citiesid,
        }),
        dataType: 'json',
        contentType: 'application/json',
        success: function(data) {
          data.map( function(place) {
            const html = `<article>
          <div class='title_box'>
            <h2>${place.name}</h2>
              <div class='price_by_night'>$${place.price_by_night}</div>
          </div>
          <div class='information'>
            <div class='max_guest'>${place.max_guest} Guest</div>
            <div class='number_rooms'>${place.number_rooms} Bedroom</div>
            <div class='number_bathrooms'>${place.number_bathrooms} Bathroom</div>
          </div>
          <div class='description'>${place.description}</div>
        </article>`;
            $('.places').append(html);
          });
        },
      });
    });
  });