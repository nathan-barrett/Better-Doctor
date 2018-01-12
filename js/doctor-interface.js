import { Doctor, afflictionCall, nameCall } from './../js/doctor.js';

$(document).ready(function(){
  $("form.search-select").submit(function(event){
    event.preventDefault();
    const formSelect = $("select#search").val();
    $("form.search-select").addClass("hidden");
    console.log(formSelect);
    if (formSelect === "Affliction") {
      $("form.affliction").toggleClass("hidden");
    } else {
      $("form.doctor-name").toggleClass("hidden");
    }
  });
  $("form.affliction").submit(function(event) {
    event.preventDefault();
    const query = $("input#problem").val();
    let doctor = new Doctor("Nathan", query);
    $("div#results").empty();
    afflictionCall(pushResults, query);
        // $("#problem").val(" ");
  });
  $("form.doctor-name").submit(function(event) {
    event.preventDefault();
    const firstName = $("#first-name").val();
    const lastName = $("#last-name").val();
    console.log(firstName.length);
    $("div#results").empty();
    nameCall(pushResults, firstName, lastName);
  });
    function pushResults(response) {
      console.log(response);
    if (response.meta.count === 0) {
      alert("it looks like your search didnt receive any results, please reload page and try again.");
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
