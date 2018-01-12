import { Doctor, apiCall } from './../js/doctor.js';

$(document).ready(function(){
  $("form.doctor").submit(function(event) {
    event.preventDefault();
    const query = $("input#problem").val();
    let doctor = new Doctor("Nathan", query);
    apiCall(pushResults);
  });
    function pushResults(data) {
    console.log(data);
  }

});
