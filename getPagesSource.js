
function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;
    }
    return findNames(html);


}
function findNames(html) {
var namesArr = [];
var titlesAndCompaniesArr = [];
var locationsArr = [];
  var names = document.getElementsByTagName('h3');
var titlesAndCompanies = document.getElementsByClassName('Sans-14px-black-75%-bold')
var locations = document.getElementsByClassName('result-lockup__misc-item')

  console.log('names',names,'titlesAndCompanies', titlesAndCompanies,'locations',locations);
  for(var i = 0; i < names.length; i++) {

          locationsArr.push(locations[i].innerHTML)
          namesArr.push(names[i].innerHTML)
  
  }
  console.log('locationsArr',locationsArr);
  for(var i = 0; i < titlesAndCompanies.length; i++) {

      titlesAndCompaniesArr.push(titlesAndCompanies[i].innerHTML)

  }

console.log('titlesAndCompaniesArr',titlesAndCompaniesArr,"length",titlesAndCompaniesArr.length,'' );
titlesArr = [];
companiesArr = [];
for (var i = 0; i < titlesAndCompaniesArr.length; i++) {
  if (titlesAndCompaniesArr[i].includes("<b>")) {
titlesArr.push(titlesAndCompaniesArr[i])

  }
  if (titlesAndCompaniesArr[i].includes("Go to")) {
companiesArr.push(titlesAndCompaniesArr[i])

  }

}

console.log('titlesArr berfor',titlesArr,'companiesArr before',companiesArr);
var regex = /(<([^>]+)>)/ig;
for(var i=0;i<titlesArr.length;i++){
  namesArr[i] = namesArr[i].replace('Profile result - ', 'name: ')
     titlesArr[i] = titlesArr[i].replace(regex, "").replace('amp;','');
      companiesArr[i] = companiesArr[i].replace(regex, "").replace(/(\r\n|\n|\r|)/gm, "").replace(/\Go to.*/,'');

  }

console.log('titlesArr after',titlesArr,'companiesArr before',companiesArr);
  const l = Math.min(namesArr.length, titlesArr.length, companiesArr.length, locationsArr.length);
  const merged = [].concat(...Array.from({ length: l }, (_, i) => [namesArr[i], titlesArr[i],companiesArr[i],locationsArr[i]]), namesArr.slice(l), titlesArr.slice(l), companiesArr.slice(l),locationsArr.slice(l));
return merged;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});
