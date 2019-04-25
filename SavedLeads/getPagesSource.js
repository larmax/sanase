var merged = [];
var timesRun = 0;
var sent = false;
// scrolling page to bottom in order to have all results visible
window.scrollTo(0,100000);
console.log('getpagesSource');

// this function checks whether the next button is disabled in order to not proceed to the next page if at the end of the results
function nextPageButtonDisabled(){
  let pageButtonsDisabled = false;
  //getting next page button from DOM
  var  pageButtons = document.getElementsByClassName('artdeco-table-next-btn');

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
  var namesTitleArr = [];
  var titlesAndCompaniesArr = [];
  var locationsArr = [];
  var titlesArr = [];
  var names = document.getElementsByTagName('h3');
  var titlesAndCompanies = document.getElementsByClassName('Sans-14px-black-75%-bold')
  var namesTitle = document.getElementsByClassName('artdeco-table-row unselected');
  console.log('names before', namesTitle);
  var titles = document.getElementsByClassName('ember1369')
  var locations = document.getElementsByClassName('result-lockup__misc-item')
  //for looking for results where company name and title is missing
  var missing = document.getElementsByClassName('t-sans t-16 t-black t-bold lists-detail__view-profile-name-link ember-view')

  var maybeMissingsArr = [];
  var missingLengths = [];
  var hasMissing = false
  var theMissings = [];


  console.log('names',names,'titlesAndCompanies', titlesAndCompanies,'locations',locations);


  //turning names in to an array...
  for(var i = 0; i < namesTitle.length; i++) {



    namesTitleArr.push(namesTitle[i].innerText+"".trim())

  }

  //turning locations into an array
  for (var i = 0; i < locations.length; i++) {

    locationsArr.push(locations[i].innerText.trim())
  }
  console.log('locationsArr ',locationsArr);

  //turning titles and comapnies into an array. they will separated later
  for(var i = 0; i < titlesAndCompanies.length; i++) {


    titlesAndCompaniesArr.push(titlesAndCompanies[i].innerHTML.trim())

  }

  console.log('titlesAndCompaniesArr',titlesAndCompaniesArr,"length",titlesAndCompaniesArr.length,'' );
  //separating companies into it's own array
  companiesArr = [];
  for (var i = 0; i < namesTitleArr.length; i++) {

    namesTitleArr[i] =  namesTitleArr[i].replace("3rd degree contact"," ").replace("In CRM Badge", "").replace("2nd degree contact"," ").replace("2nd"," ").replace("1st degree contact"," ").replace("1st"," ").replace(/(?:\r\n|\r|\n)/g, '*').replace("3rd"," ").replace("Saved"," ").replace("Add comment","  ").replace("* * * *","*").replace("*   *","*").replace("amp","&").replace("* *  * "," ").replace("**","*").replace(/\s/," ").replace("* * *","*").replace("* *","*").trim();

    console.log(namesTitleArr[i]);
    namesTitleArr[i] = namesTitleArr[i].slice(0,-10)
    namesTitleArr[i] = '\n' + namesTitleArr[i]
    namesTitleArr[i] = namesTitleArr[i].replace(/Go to.*? account page/g, '');
    res = namesTitleArr[i].split("*")
    console.log("res.length",res.length);
    if (res[2] === "CRM") {
      console.log("res",res, res.length);
      namesTitleArr[i] = "*" + res[0] +"*"+ res[1]+"*"+res[3]+"*"+res.slice(4).join("*");

    }else {
      console.log("goodlengthres");
    }
    namesTitleArr[i] = namesTitleArr[i].replace("* *","*").replace("** ","*").replace("*  *","*");
  }

  console.log("adding prefixes to results");
  //adding prefixes to results

  // namesTitleArr = namesArr.map(i => '\n * ' + i );
  // titlesArr = titlesArr.map(i => '* ' + i );
  // companiesArr = companiesArr.map(i => '* ' + i );
  // locationsArr = locationsArr.map(i => '* ' + i );
  //merging arrays into one
  console.log(namesTitleArr);
  //   const l = Math.min(namesArr.length, titlesArr.length, companiesArr.length, locationsArr.length);
  // const newMerged = ([].concat(...Array.from({ length: l }, (_, i) => [namesArr[i], titlesArr[i],companiesArr[i],locationsArr[i]]), namesArr.slice(l), titlesArr.slice(l), companiesArr.slice(l),locationsArr.slice(l)));
  // merged = newMerged;
  merged = namesTitleArr;
  // setting an optimal length for the merged array
  let optimalLength = 25;
  if(nextPageButtonDisabled) {
    optimalLength = 0;
    console.log('optimalLength',optimalLength);
  }
  // checking if everything is ok and proceeding to the next page
  if (merged.length >= optimalLength && started == true) {
    console.log('mergedlocal',merged);

    if (merged.length > 25 || !nextPageButtonDisabled()) {
      console.log('too long ');
      merged.length=25;

      console.log("sent 1",nextPageButtonDisabled());

      !sent ? chrome.runtime.sendMessage(merged) : console.log("already sent");
sent = true;
    } else if(!nextPageButtonDisabled()) {
      console.log("sent 2");

      !sent ? chrome.runtime.sendMessage(merged) : console.log("already sent");
    sent = true;
    }

    var nextButton = document.getElementsByClassName('artdeco-table-next-btn')
    console.log("CLICK!");
    nextButton[0].click();
    console.log('timesRun',timesRun);
    timesRun = 0;

    console.log('Everything seems to be good. Going to next page');


  }if (started === false) {

    console.log('merged ',merged);
    console.log('stopped');
  }if (merged.length >= optimalLength && nextPageButtonDisabled()) {
    console.log(merged,timesRun);
    console.log('nextButton disabled, should be end of results');

    if (merged.length > 25) {
      console.log('too long ');
      merged.length=25;
      merged.push('end');
      console.log("sent 3 end");
      !sent ? chrome.runtime.sendMessage(merged) : console.log("already sent");
        sent = true;
      dontStart = true;
    } else {

if (!sent) {
  chrome.runtime.sendMessage(merged)
}else {
  console.log("already sent");
}
if (nextPageButtonDisabled()) {
  merged.push("end");
  chrome.runtime.sendMessage(merged);
}else {
  console.log("not end");
}

  console.log("sent pageButtonsDisabled end");
        sent = true;
              console.log(sent);
      dontStart = true;
      started = false;
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
        console.log("sent 5 end");

      !sent ? chrome.runtime.sendMessage(merged) : console.log("already sent");
sent = true;
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
        setTimeout(function () {
            console.log("sent 6 end");
          !sent ? chrome.runtime.sendMessage(merged) : console.log("already sent");
          sent = true;

        }, 1000);

      }

      window.scrollTo(0,100000);
      setTimeout(function () {
        window.scrollTo(0,0);
        checkStart();
      }, 1500);


    }

  }
}
