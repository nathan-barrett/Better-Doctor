import { Doctor, apiCall } from './../js/doctor.js';

$(document).ready(function(){
  $("form.doctor").submit(function(event) {
    event.preventDefault();
    const query = $("input#problem").val();
    let doctor = new Doctor("Nathan", query);
    apiCall(pushResults, query);
  });
    function pushResults(response, array) {
    if (response.meta.count === 0) {
      alert("it looks like your search didnt receive any results");
    } else {
      for(let i = 0; i < response.data.length; i++){
        let doctorNew = response.data[i].practices[0].accepts_new_patients;
        function newPatientCheck() {
          if ( doctorNew === true) {
            return "Currently accepting new patients.";
          } else {
            return "Not currently accepting new patients.";
          }
        }
        $("#results").append(
        `<div class="doctor col-md-4">
          <h2 class="name">
          ${response.data[i].profile.first_name}  ${response.data[i].profile.last_name}</h2>
          <img class="image" src=${response.data[i].profile.image_url}>
          <p class="new-patients">${newPatientCheck()}
          <p class="street-address">${response.data[i].practices[0].visit_address.street}</p>
          <p class="city-state">${response.data[i].practices[0].visit_address.city},  ${response.data[i].practices[0].visit_address.state} ${response.data[0].practices[0].visit_address.zip}</p>
        </div>`
        );
      }
    }
  }
});
