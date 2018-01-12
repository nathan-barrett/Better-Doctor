const apiKey = require('./../.env').apiKey;


export class Doctor{
  constructor(name, query) {
    this.name = name;
    this.query = query;
    this.url = apiKey;
    // this.first = first;
    // this.last = last;
  }
}
export function apiCall(pushResults) {
    const doctorInfo = [];
    const url = `https://api.betterdoctor.com/2016-03-01/doctors?query=cold&location=or-portland&skip=0&limit=10&user_key=${apiKey}`;
    $.get(url).then(function(response){
      console.log(response.data);
      const doctorName = response.data[0].profile.first_name + " " + response.data[0].profile.middle_name + ". " + response.data[0].profile.last_name +  " " + response.data[0].profile.title;
      const doctorAddress = response.data[0].practices[0].visit_address.street + " " + response.data[0].practices[0].visit_address.city + ", " + response.data[0].practices[0].visit_address.state + " " + response.data[0].practices[0].visit_address.zip;
      const doctorPhone = response.data[0].practices[0].phones[0].number;
      const doctorNew = response.data[0].practices[0].accepts_new_patients;
      const doctorImg = "<img src=" + response.data[0].profile.image_url + ">";
      function newPatientCheck() {
        if (doctorNew === true) {
          return "Currently accepting new patients.";
        } else {
          "Not currently accepting new patients.";
        }
      }
      console.log(doctorName, doctorAddress, doctorPhone, newPatientCheck(), doctorImg);
    }).catch(function(error) {
      console.log(error);
    });

}
