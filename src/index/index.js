'use strict';

/*
fetch('https://snekosnekstats.000webhostapp.com/data/women.csv')
  .then(data => console.log(data));
*/
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://snekosnekstats.000webhostapp.com/data/women.csv", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

