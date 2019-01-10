var merged = [];
var timesRun = 0;
 window.scrollTo(0,100000);
console.log('getpagesSource');
function nextPageButtonDisabled(){
  let pageButtonsDisabled = false;
  var  pageButtons = document.getElementsByClassName('search-results__pagination-next-button');

  console.log('pageButtons',pageButtons );
  for (var i = 0; i < pageButtons.length; i++) {
    pageButtonsDisabled = (pageButtons[i].disabled)
    console.log('pageButtonsDisabled',pageButtonsDisabled);

  }
  if (pageButtonsDisabled) {
    return true;
  }else {
    return false;
  }

}



var savedLeads = document.getElementsByClassName('search-nav--title Sans-16px-black-90%-bold-open align-self-center');
// savedLeads = savedLeads.innerText
console.log('savedLeads', savedLeads, savedLeads.length);
var started = false;
checkStart();

console.log('started?',started);


function checkStart(){
  console.log('checkStart');
timesRun++;
  var port = chrome.runtime.connect({name:"mycontentscript"});
  port.onMessage.addListener(function(message,sender){
    console.log('message', message.starter);
    if(message.starter === "start"){
   started = true;
      window.scrollTo(0,100000);
   console.log('started?', started);
    findNames();

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
     var maybeMissingsArr = [];
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
titlesArr = newTitlesArr;


if (companiesArr.length < 25) {
  for (var i = 0; i < missing.length; i++) {

  maybeMissingsArr.push(missing[i].innerText);
  }
  for (var i = 0; i < maybeMissingsArr.length; i++) {
if (!maybeMissingsArr[i].includes('at')) {
    console.log('hasMissing',namesArr[i])
    hasMissing = true;
    theMissings.push(i);
}
  }
  // var i = -1;
  // maybeMissingsArr.map(function(element){
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
    companiesArr[i].replace(theMissings[i], "unknown")
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
if (savedLeads.length === 1 ) {
optimalLength = 96;
console.log('optimalLength',optimalLength);
}else {
  optimalLength = 100;
  console.log('optimalLength',optimalLength);
}

if (merged.length >= optimalLength && started == true) {
  console.log('mergedlocal',merged);

 chrome.runtime.sendMessage(merged);
  var nextButton = document.getElementsByClassName('search-results__pagination-next-button')
  nextButton[0].click();
  console.log('timesRun',timesRun);
  timesRun = 0;
  console.log('Everything seems to be good. Going to next page');
  checkStart();
}if (started === false) {
console.log('merged ',merged);
console.log('stopped');
}

if (merged.length < optimalLength) {


  if (nextPageButtonDisabled() && merged.length >= 1 && timesRun >= 3 ) {
console.log(merged,timesRun);
    console.log('nextButton disabled, should be end of results');
     chrome.runtime.sendMessage(merged);
}else {
  console.log('WAIT not enough!', merged,timesRun);
setTimeout(function () {
checkStart();
}, 1500);


}

}
}
