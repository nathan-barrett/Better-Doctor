const apiKey = require('./../.env').apiKey;
export class Doctor{
  constructor(name, query) {
    this.name = name;
    this.query = query;
  }
}
export function afflictionCall(pushResults, userQuery) {
  const query = `query=${userQuery}`;
  const url = `https://api.betterdoctor.com/2016-03-01/doctors?${query}&location=or-portland&skip=0&limit=12&user_key=${apiKey}`;
  $.get(url).then(function(response){
    pushResults(response);
  }).catch(function(error) {
    alert("Looks like we came across this error: " + error);
  });
}

export function nameCall(pushResults, firstName, lastName) {
  let nameInput;
  if (firstName.length === 0) {
    nameInput = `name=${lastName}`;
  } else if (lastName === 0) {
    nameInput = `name=${firstName}`;
  } else {
   nameInput = `name=${firstName}%20${lastName}`;
  }
  const nameUrl = `https://api.betterdoctor.com/2016-03-01/doctors?${nameInput}&location=or-portland&skip=0&limit=12&user_key=${apiKey}`;
  $.get(nameUrl).then(function(response) {
    console.log(response);
    pushResults(response);
  }).catch(function(error) {
    const errMessage = "Looks like we can across this error: " + error + ", please reload page and try again";
    errResponse(errMessage);
  });
}
