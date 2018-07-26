var redactionColor;

function censor() {
  var elements = document.getElementsByTagName('*');
  chrome.storage.sync.get('redactionColor', function(obj){
    redactionColor = String(obj.redactionColor) || 'black';
    console.log('redactionColor is set to ' + redactionColor);

  //var color = document.getElementById('color').value;

  for (var i = 0; i < elements.length; i++) {
      var element = elements[i];

      for (var j = 0; j < element.childNodes.length; j++) {
          var node = element.childNodes[j];

          if (node.nodeType === 3) {
              var text = node.nodeValue;

              if (text.match(/rape|suicide|suicidal|violence|violent|gun|guns|murder|commit suicide|rapist|blood/gi)) {

                var replace = "<span style='background-color:"+ redactionColor + "; color:" + redactionColor + "'>"
                // <!--background-color: " + redactionColor + ";-->
                 // if (redactionColor === 'white') {
                 //   var replace = '<span style="background-color: white; color: white;">';
                 //   console.log('it is white')
                 // }
                 // else {
                 //  var replace = '<span style="background-color: black; color: black;">';
                 //  console.log('it is black')
                 //     }
                for (var i = 0; i < text.length; i++) {
                  replace += 'X';
                }
                replace +='</span>';

                var newNode = document.createElement('span');
                newNode.innerHTML = replace;

                element.replaceChild(newNode, element.childNodes[j]);


              }
          }
      }
  }
});}
console.log(redactionColor)
 censor();
 setInterval(censor, 1000);
// function popUp() {
//     if (confirm("Press a button!")) {
//       } else {
//         txt = "You pressed Cancel!";
//         }
//
// }
