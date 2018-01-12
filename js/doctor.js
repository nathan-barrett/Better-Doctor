const apiKey = require('./../.env').apiKey;
// import { pushResults } from './../doctor-interface.js';


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
    console.log(apiKey);
    const url = `https://api.betterdoctor.com/2016-03-01/doctors?query=cold&location=or-portland&skip=0&limit=10&user_key=${apiKey}`;
    $.get(url).then(function(data){
      pushResults(data);
    }).catch(function(error) {
      console.log(error);
    });

}
