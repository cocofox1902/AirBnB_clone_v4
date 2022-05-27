$(document).ready(function  () {
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
