var merged = [];
var back = document.getElementsByClassName('userProfilePage')[0];
console.log(back);
if (typeof back !== 'undefined') {
back.remove();
}
nextButton = document.getElementsByClassName('notLastPage')[0];

console.log('nextButton',nextButton);
nextButton2 = document.getElementsByTagName('a')[0];
console.log('nextButton2',nextButton2);



// this function checks whether the next button is disabled in order to not proceed to the next page if at the end of the results
function nextPageButtonDisabled(){

}
var started = false;

//checking if popup.js has sent a  start message
checkStart();

console.log('started?',started);

let dontStart = false;
function checkStart(memberCompaniesArr){
  console.log('checkStart');
//getting message from popup.js
  var port = chrome.runtime.connect({name:"mycontentscript"});
  port.onMessage.addListener(function(message,sender){
    console.log('message', message.starter);
    if (message.starter === "stop" ) {
      dontStart = true;
    }
    if(!dontStart){
   started = true;
      window.scrollTo(0,100000);
   console.log('started?', started);
   // calling findMemberCompanies function
    findMemberCompanies();

    }else {
  console.log('stopped');
  memberCompaniesArr.push('end')
  console.log(memberCompaniesArr,'end');
  chrome.runtime.sendMessage(memberCompaniesArr);
    }
  });

}

function findMemberCompanies() {

  var memberCompaniesArr = [];
  var memberCompanies = document.getElementsByClassName('chatterUserGuestBadge');




//turning memberCompanies in to an array...
  for(var i = 0; i < memberCompanies.length; i++) {

      memberCompaniesArr.push(memberCompanies[i].innerHTML)

   }

   let newMemberCompaniesArr = [];
   for (var i = 0; i < memberCompaniesArr.length; i++) {
     console.log(memberCompaniesArr[i]);
     if (memberCompaniesArr[i] !== '(Customer)' && memberCompaniesArr[i] !== '(Salesforce)'&& memberCompaniesArr[i] !== '(Private)' ){
       console.log('adding to new',memberCompaniesArr[i]);
       console.log(memberCompaniesArr[i] !== '(Customer)' );
       newMemberCompaniesArr.push('\n *' + memberCompaniesArr[i]);
     }
   }
memberCompaniesArr = newMemberCompaniesArr;
console.log('memberCompaniesArr',memberCompaniesArr);
if (memberCompaniesArr.length < 1) {
  console.log('nothing found');
}else {
  chrome.runtime.sendMessage(memberCompaniesArr);
  console.log('seems ok going to next page');

  setTimeout(function(){ checkStart(memberCompaniesArr);}, 3000);
}

 var targBtn     = document.querySelector (".next");
 console.log(targBtn);
 var clickEvent  = document.createEvent ('MouseEvents');
 clickEvent.initEvent ('click', true, true);
 targBtn.dispatchEvent (clickEvent);
if (nextButton.style.display == 'none') {
  dontStart = true;
memberCompaniesArr.push('end');
console.log('end of results',nextButton.style.display);
  chrome.runtime.sendMessage(memberCompaniesArr);
}else {
  document.getElementsByClassName('notLastPage')[0].click();
  setTimeout(function(){ checkStart(memberCompaniesArr);}, 3000);
}


}
