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
  function errResponse(error) {
    const failureArray = ["./../../img/doctor1.jpg", "./../../img/doctor2.jpg", "./../../img/doctor3.jpg", "./../../img/doctor4.jpg", "./../../img/doctor5.jpg"];
    const randomPic = failureArray[Math.floor(Math.random() * failureArray.length)];
    $("#results").append(`<img src=${randomPic}>
                          <h3>${error}</h3>`);
  }
    function pushResults(response) {
      console.log(response);
    if (response.meta.count === 0) {
      const failureArray = ["./../../img/doctor1.jpg", "./../../img/doctor2.jpg", "./../../img/doctor3.jpg", "./../../img/doctor4.jpg", "./../../img/doctor5.jpg"];
      const randomPic = failureArray[Math.floor(Math.random() * failureArray.length)];
      $("#results").append(`<img src=${randomPic}>
                            <h3>Your search didnt find anything, please try again.</h3>`);
    } else {
      for(let i = 0; i < response.data.length; i++){
        let doctorNew = response.data[i].practices[0].accepts_new_patients;
        let number = response.data[i].practices[0].phones[0].number;
        console.log(number.substr(0,3);
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
          <p class="new-patients">${newPatientCheck()}</p>
          <p class="number">${number.substr(0,3)}-${number.substr(4,6)}-${number.substr(6)}</p>
          <p class="street-address">${response.data[i].practices[0].visit_address.street}</p>
          <p class="city-state">${response.data[i].practices[0].visit_address.city},  ${response.data[i].practices[0].visit_address.state} ${response.data[0].practices[0].visit_address.zip}</p>
        </div>`
        );
      }
    }
  }
});
