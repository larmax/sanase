var merged = [];
 window.scrollTo(0,100000);
console.log('getPagesSource');
var savedLeads = document.getElementsByClassName('search-nav--title Sans-16px-black-90%-bold-open align-self-center');
// savedLeads = savedLeads.innerText
console.log('savedLeads', savedLeads, savedLeads.length);
function checkType(){

  console.log('savedLeads?',savedLeads);
  if (savedLeads.includes == 'Saved leads') {
    console.log('yes');
return true;
}else {
  console.log('no');
  return false
}
}

var started = false;
console.log('started?',started);


function checkStart(){
  var port = chrome.runtime.connect({name:"mycontentscript"});
  port.onMessage.addListener(function(message,sender){
    console.log('message', message.starter);
    if(message.starter === "start"){
   started = true;
    findNames();
        console.log('started?', started);
    }else {
  console.log('stopped');
    }
  });

}




function findNames() {
  merged = [];
  var namesArr = [];
  var titlesAndCompaniesArr = [];
  var locationsArr = [];
  var titlesArr = [];
  var names = document.getElementsByTagName('h3');
  var titlesAndCompanies = document.getElementsByClassName('Sans-14px-black-75%-bold')
  var locations = document.getElementsByClassName('result-lockup__misc-item')

  var missing = document.getElementsByClassName('search-results__result-container full-width')
     var missingsArr = [];
     var missingLengths = [];
     var hasMissing = false
     var theMissings = [];


  console.log('names',names,'titlesAndCompanies', titlesAndCompanies,'locations',locations);



  for(var i = 0; i < names.length; i++) {

    if (i > 5 && i < 31) {
      namesArr.push(names[i].innerHTML)
    }

  }
  for (var i = 0; i < locations.length; i++) {

    locationsArr.push(locations[i].innerText)
  }
  console.log('locationsArr ',locationsArr);


  for(var i = 0; i < titlesAndCompanies.length; i++) {


    titlesAndCompaniesArr.push(titlesAndCompanies[i].innerHTML)

  }

  console.log('titlesAndCompaniesArr',titlesAndCompaniesArr,"length",titlesAndCompaniesArr.length,'' );

  companiesArr = [];
  let exprssion = null;
  for (var i = 0; i < titlesAndCompaniesArr.length; i++) {

    if (i > 2 || !titlesAndCompaniesArr[i].includes("<")) {
      console.log('works1');
                 titlesArr.push(titlesAndCompaniesArr[i])

    }
    if (titlesAndCompaniesArr[i].includes("Go to")) {

      companiesArr.push(titlesAndCompaniesArr[i])

    }

  }

  console.log('titlesArr berfor',titlesArr,'companiesArr before',companiesArr);
  const regex = /(<([^>]+)>)/ig;
  const regex2 = /\r?\n|\r/g;
  for(var i=0; i < namesArr.length; i++){

index = JSON.stringify(i);

    namesArr[i] = namesArr[i].replace('Profile result - ', index)

    if (namesArr[i].includes('Premium Member')) {
      console.log('includes premium member');
      namesArr.splice(i, 1);


    }
  }
  console.log('namesArr after ',namesArr);
  for(var i=0; i < titlesArr.length; i++){


    titlesArr[i] = titlesArr[i]
    .replace(regex, "")
    .replace('amp;','')
    .replace(regex2,'Go to');
    console.log(i,titlesArr[i]);

}
console.log('titlesArr in between', titlesArr);
let newTitlesArr = [];
for (var i = 0; i < titlesArr.length; i++) {

  if (titlesArr[i].includes('Go to')) {

console.log('includes Go to',i,titlesArr[i]);
}else {
  newTitlesArr.push(titlesArr[i]);
  console.log('no include go to ',i,newTitlesArr[i]);
}
}
console.log('newTitlesArr', newTitlesArr);
titlesArr = titlesArr.filter(a => a !== 'Go to')


if (companiesArr.length < 25) {
  for (var i = 0; i < missing.length; i++) {

  missingsArr.push(missing[i].innerText);
  }
  for (var i = 0; i < missingsArr.length; i++) {
if (!missingsArr[i].includes('at')) {
    theMissings.push(missingsArr[i]);
}
  }
  // var i = -1;
  // missingsArr.map(function(element){
  // i++;
  // console.log(i,' length',element.length);
  // missingLengths.push(element.length);
  // if (element.length < 278) {
  //   theMissings.push(i);
  //   hasMissing = true;
  //
  //   console.log('hasMissing',namesArr[i]);
  // }
  // });



}


  for(var i=0; i < companiesArr.length; i++){
    companiesArr[i] = companiesArr[i].replace(regex, "").replace(/(\r\n|\n|\r|)/gm, "").replace(/\Go to.*/,'').replace('                  ','').replace('                          ','');
}

if (hasMissing) {
  for (var i = 0; i < theMissings.length; i++) {
    console.log('splicing titles',theMissings);
  titlesArr.splice(theMissings[i], 0, 'unknown');
  }

}
if (hasMissing) {
    for (var i = 0; i < theMissings.length; i++) {
      console.log('splicing companies',theMissings);
  companiesArr.splice(theMissings[i], 0, 'unknown');

    }
}
  console.log('titlesArr after',titlesArr,'companiesArr after',companiesArr, 'namesArr after', namesArr, 'locationsArr after', locationsArr);
console.log('started?',started);
  const l = Math.min(namesArr.length, titlesArr.length, companiesArr.length, locationsArr.length);
const newMerged = ([].concat(...Array.from({ length: l }, (_, i) => [namesArr[i], titlesArr[i],companiesArr[i],locationsArr[i]]), namesArr.slice(l), titlesArr.slice(l), companiesArr.slice(l),locationsArr.slice(l)));
merged = newMerged;

let optimalLength = 0;
if (savedLeads === 1 ) {
optimalLength = 96;
}else {
  optimalLength = 100;
}

if (merged.length >= optimalLength && started == true) {
  console.log('mergedlocal',merged);
  var nextButton = document.getElementsByClassName('search-results__pagination-next-button')
  nextButton[0].click();
  console.log('going to next page');
  return merged;
}if (started === false) {
console.log('merged ',merged);
console.log('stopped');
return merged;
}

if (merged.length < optimalLength) {

  console.log('WAIT not enough!', merged);
}
}
    setTimeout(function(){

       window.scrollTo(0,100000);
    checkStart();
    },4000 );


// setTimeout(function(){    window.scrollTo(0,100000);
//  var nextButton = document.getElementsByClassName('search-results__pagination-next-button')
//  if (typeof nextButton == 'undefined') {
// console.log('WAIT');
// setTimeout(function(){
// },2000 );
//  }
//   setTimeout(function(){
//       window.scrollTo(0,100000);
//
//   }, 1000);
//
// }, 4000);
//
