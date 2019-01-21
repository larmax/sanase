function findNames(html) {

  var inputs = document.getElementsByTagName('h3');
  console.log('inputs',inputs);
  for(var i = 0; i < inputs.length; i++) {


          console.log('this',inputs[i].innerHTML);

  }

}
