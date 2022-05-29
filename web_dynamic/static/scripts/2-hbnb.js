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
