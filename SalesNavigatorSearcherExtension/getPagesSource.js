var merged = [];
// function DOMtoString(document_root) {
//
//   var html = '',
//   node = document_root.firstChild;
//   while (node) {
//     switch (node.nodeType) {
//       case Node.ELEMENT_NODE:
//       html += node.outerHTML;
//       break;
//       case Node.TEXT_NODE:
//       html += node.nodeValue;
//       break;
//       case Node.CDATA_SECTION_NODE:
//       html += '<![CDATA[' + node.nodeValue + ']]>';
//       break;
//       case Node.COMMENT_NODE:
//       html += '<!--' + node.nodeValue + '-->';
//       break;
//       case Node.DOCUMENT_TYPE_NODE:
//       // (X)HTML documents are identified by public identifiers
//       html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
//       break;
//     }
//     node = node.nextSibling;
//   }
//   return findNames(html);
//
//
// }

function findNames() {
  var namesArr = [];
  var titlesAndCompaniesArr = [];
  var locationsArr = [];
  var titlesArr = [];
  var names = document.getElementsByTagName('h3');
  var titlesAndCompanies = document.getElementsByClassName('Sans-14px-black-75%-bold')
  var locations = document.getElementsByClassName('result-lockup__misc-item')
  var titles = document.getElementsByTagName('span')
  var missing = document.getElementsByClassName('inline-flex vertical-align-middle')
  console.log('titles',titles);
  console.log('names',names,'titlesAndCompanies', titlesAndCompanies,'locations',locations);

  var missings = []
for (var i = 0; i < missing.length; i++) {
  console.log(i);
missings.push(missing[i].innerText);
console.log('missings',i,missings);
}
  for(var i = 0; i < names.length; i++) {

    if (i > 5 && i < 31) {
      namesArr.push(names[i].innerHTML)
    }

  }
  for (var i = 0; i < locations.length; i++) {

    locationsArr.push(locations[i])
  }
  console.log('locationsArr ',locationsArr);


  for(var i = 0; i < titlesAndCompanies.length; i++) {
checkForMissing(missing);
    titlesAndCompaniesArr.push(titlesAndCompanies[i].innerHTML)

  }

  console.log('titlesAndCompaniesArr',titlesAndCompaniesArr,"length",titlesAndCompaniesArr.length,'' );

  companiesArr = [];
  for (var i = 0; i < titlesAndCompaniesArr.length; i++) {

    if (!titlesAndCompaniesArr[i].includes("<") && i > 2) {

      titlesArr.push(titlesAndCompaniesArr[i])

    }
    if (titlesAndCompaniesArr[i].includes("Go to")) {

      companiesArr.push(titlesAndCompaniesArr[i])

    }

  }

  console.log('titlesArr berfor',titlesArr,'companiesArr before',companiesArr);
  var regex = /(<([^>]+)>)/ig;
  for(var i=0; i < namesArr.length; i++){

index = JSON.stringify(i);

    namesArr[i] = namesArr[i].replace('Profile result - ', index)


  }
  console.log('namesArr before ',namesArr);
  for(var i=0; i < titlesArr.length; i++){


    titlesArr[i] = titlesArr[i].replace(regex, "").replace('amp;','');

  }
  for(var i=0; i < companiesArr.length; i++){


    companiesArr[i] = companiesArr[i].replace(regex, "").replace(/(\r\n|\n|\r|)/gm, "").replace(/\Go to.*/,'').replace('                  ','').replace('                          ','');

  }

  // for (var i = 0; i < namesArr.length; i++) {
  //
  // if (namesArr.length > titlesArr.length) {
  //   console.log('namesArr length titlesArr length',namesArr.length, titlesArr.length);
  //   console.log('splicing names', namesArr[i]);
  // titlesArr.splice(i,0,'unknown ')
  // companiesArr.splice(i,0,'unknown ')
  //   locationsArr.splice(i,0,'unknown ')
  // }
  // }

  console.log('titlesArr after',titlesArr,'companiesArr after',companiesArr, 'namesArr after', namesArr, 'locationsArr after', locationsArr);
  const l = Math.min(namesArr.length, titlesArr.length, companiesArr.length, locationsArr.length);



  const  localMerged = ([].concat(...Array.from({ length: l }, (_, i) => [namesArr[i], titlesArr[i],companiesArr[i],locationsArr[i]]), namesArr.slice(l), titlesArr.slice(l), companiesArr.slice(l),locationsArr.slice(l)));




if (!localMerged.length >= 100) {
  console.log('mergedlocal',localMerged);
  var nextButton = document.getElementsByClassName('search-results__pagination-next-button')
  nextButton[0].click();



  return localMerged;

}else {
  console.log('WAIT not enough!', localMerged);
    setTimeout(function(){

       window.scrollTo(0,100000);
        findNames();
    },4000 );

}

}

 setTimeout(function(){    window.scrollTo(0,100000);
  var nextButton = document.getElementsByClassName('search-results__pagination-next-button')
  if (typeof nextButton == 'undefined') {
console.log('WAIT');
 setTimeout(function(){
 },2000 );
  }
   setTimeout(function(){
       window.scrollTo(0,100000);
        chrome.runtime.sendMessage(findNames());
   }, 1000);

 }, 4000);

 function checkForMissing(missing){


 }
