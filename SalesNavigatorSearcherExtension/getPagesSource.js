var merged = [];
var timesRun = 0;
// scrolling page to bottom in order to have all results visible
 window.scrollTo(0,100000);
console.log('getpagesSource');

// this function checks whether the next button is disabled in order to not proceed to the next page if at the end of the results
function nextPageButtonDisabled(){
  let pageButtonsDisabled = false;
  //getting next page button from DOM
  var  pageButtons = document.getElementsByClassName('search-results__pagination-next-button');

  console.log('pageButtons',pageButtons );
  // checking for disabled prop
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
// checking if this is a saved Leads / accounts page
var savedLeads = document.getElementsByClassName('search-nav--title Sans-16px-black-90%-bold-open align-self-center');
// savedLeads = savedLeads.innerText
console.log('savedLeads', savedLeads, savedLeads.length);
var started = false;
var dontStart = false;
//checking if popup.js has sent a  start message
checkStart();

console.log('started?',started);


function checkStart(){
  console.log('checkStart');
timesRun++;
//getting message from popup.js
  var port = chrome.runtime.connect({name:"mycontentscript"});
  port.onMessage.addListener(function(message,sender){
    console.log('message', message.starter);
    if(message.starter === "start" && !dontStart){
   started = true;
      window.scrollTo(0,100000);
   console.log('started?', started);
   // calling find names function
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
//for looking for results where company name and title is missing
  var missing = document.getElementsByClassName('search-results__result-container full-width')

     var maybeMissingsArr = [];
     var missingLengths = [];
     var hasMissing = false
     var theMissings = [];


  console.log('names',names,'titlesAndCompanies', titlesAndCompanies,'locations',locations);


//turning names in to an array...
  for(var i = 0; i < names.length; i++) {


    if (i > 5 && i < 55) {
      namesArr.push(names[i].innerHTML)
    }
  }
  console.log('namesArr before', namesArr);
  //turning locations into an array
  for (var i = 0; i < locations.length; i++) {

    locationsArr.push(locations[i].innerText)
  }
  console.log('locationsArr ',locationsArr);

  //turning titles and comapnies into an array. they will separated later
  for(var i = 0; i < titlesAndCompanies.length; i++) {


    titlesAndCompaniesArr.push(titlesAndCompanies[i].innerHTML)

  }

  console.log('titlesAndCompaniesArr',titlesAndCompaniesArr,"length",titlesAndCompaniesArr.length,'' );
//separating companies into it's own array
  companiesArr = [];
  for (var i = 0; i < titlesAndCompaniesArr.length; i++) {

    if (i > 2 || !titlesAndCompaniesArr[i].includes("<")) {
      console.log('works1');
                 titlesArr.push(titlesAndCompaniesArr[i])

    }
    if (titlesAndCompaniesArr[i].includes("Go to")) {

      companiesArr.push(titlesAndCompaniesArr[i])

    }

  }
//separating titles into it's own array
  console.log('titlesArr berfor',titlesArr,'companiesArr before',companiesArr);
  const regex = /(<([^>]+)>)/ig;
  const regex2 = /\r?\n|\r/g;
  for(var i=0; i < namesArr.length; i++){


if (!namesArr[i].includes('Profile result') && typeof namesArr[i] === 'undefined') {
  namesArr.splice(i, 1);
console.log('not a name',namesArr[i],i);
}else {
  console.log('is a name?',namesArr[i],i);
}
if (namesArr[i].includes('Premium Member')|| namesArr[i].includes('Premium Member') || namesArr[i].includes('<')) {
      console.log('includes premium member', namesArr[i]);
      namesArr.splice(i, 1);

}
  }
  for (var i = 0; i < namesArr.length; i++) {
    if (namesArr[i] === "") {
        namesArr.splice(i, 1);
        console.log('nothing here');
    }
    index = JSON.stringify(i + 1);

    namesArr[i] = namesArr[i].replace('Profile result -', index)


    console.log('Profile result - ', index,namesArr[i]);
      console.log('slicing',namesArr[i],typeof namesArr[i]);
      namesArr[i] = namesArr[i].slice(9);
        namesArr[i] = namesArr[i].slice(0,-5);
if (/^\s/.test(namesArr[i])) {
  console.log('slicing again',namesArr[i] );
    namesArr[i] = namesArr[i].slice(1);
}else {
  console.log('first indexok');
}
  namesArr[i] = namesArr[i].replace(/\s/,'* ')
if (!namesArr[i].match(/[a-z]/g)) {
  console.log(no alphanumerics!!,namesArr[i]);
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

//checking if result is missing company name and title and adding unknown for such results
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
//adding prefixes to results
 namesArr = namesArr.map(i => '\n * ' + i );
 titlesArr = titlesArr.map(i => '* ' + i );
 companiesArr = companiesArr.map(i => '* ' + i );
 locationsArr = locationsArr.map(i => '* ' + i );
//merging arrays into one
  const l = Math.min(namesArr.length, titlesArr.length, companiesArr.length, locationsArr.length);
const newMerged = ([].concat(...Array.from({ length: l }, (_, i) => [namesArr[i], titlesArr[i],companiesArr[i],locationsArr[i]]), namesArr.slice(l), titlesArr.slice(l), companiesArr.slice(l),locationsArr.slice(l)));
merged = newMerged;
// setting an optimal length for the merged array
let optimalLength = 0;
if (savedLeads.length === 1 ) {
optimalLength = 96;
console.log('optimalLength',optimalLength);
}else {
  optimalLength = 100;
  console.log('optimalLength',optimalLength);
}
// checking if everything is ok and proceeding to the next page
if (merged.length >= optimalLength && started == true) {
  console.log('mergedlocal',merged);

  if (merged.length > 100) {
    console.log('too long ');
      merged.length=100;
         chrome.runtime.sendMessage(merged);

  } else {
       chrome.runtime.sendMessage(merged);

  }

  var nextButton = document.getElementsByClassName('search-results__pagination-next-button')
  nextButton[0].click();
  console.log('timesRun',timesRun);
  timesRun = 0;
  console.log('Everything seems to be good. Going to next page');
  checkStart();

}if (started === false) {

console.log('merged ',merged);
console.log('stopped');
}if (merged.length >= optimalLength && nextPageButtonDisabled()) {
  console.log(merged,timesRun);
      console.log('nextButton disabled, should be end of results');

if (merged.length > 100) {
  console.log('too long ');
    merged.length=100;
        merged.push('end');
       chrome.runtime.sendMessage(merged);
       dontStart = true;
} else {
        merged.push('end');
     chrome.runtime.sendMessage(merged);
     dontStart = true;
}

}
// if the optimal length isn't met...
if (merged.length < optimalLength) {

//checking if this is the final page
  if (!nextPageButtonDisabled() && !merged.length >= 1 && !timesRun >= 3 ) {
console.log(merged,timesRun);
console.log('nextButton disabled, should be end of results');
    merged.push('end');
dontStart= true;
 chrome.runtime.sendMessage(merged);

}
// if enough results were found, trying again.
else {
  console.log('WAIT not enough!', merged,timesRun);
  if (timesRun < 5) {
      dontStart= false;
  }else {
    console.log('nextButton disabled, should be end of results');
        merged.push('end');
dontStart= true;
     chrome.runtime.sendMessage(merged);
  }

   window.scrollTo(0,100000);
setTimeout(function () {
checkStart();
}, 1500);


}

}
}
