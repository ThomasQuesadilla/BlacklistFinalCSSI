var basic = /\b(rape|suicide|suicidal|violence|violent|gun|guns|murder|commit suicide|rapist|blood)\b/gi;
var military = /\b(gunshots|terrorism|war|war on terror|casualty|explosion|bombing)\b/gi;
var alcohol = /\b(liqour|whiskey|drunk|beer|wine|alcohol|jack daniels|tequila|binge drinking|Lacquer|vodka)\b/gi;
var filters = {
  'basic' : basic,
  'military' : military,
  'alcohol' : alcohol
};

function matchFilters(selectedFilters, text) {
  for (filtername of selectedFilters) {
    if (text.match(filters[filtername])) {
      return true;
    }
  }
  return false;
}

function censor(redactionColor, checkedCategory, elements) {
  console.log('checkedCategory is set to ' + checkedCategory);
  selectedFilters = ('' + checkedCategory).split(',');

  for (var i = 0; i < elements.length; i++) {
      var element = elements[i];

      for (var j = 0; j < element.childNodes.length; j++) {
          var node = element.childNodes[j];

          if (node.nodeType === 3) {
              var text = node.nodeValue;

              if (matchFilters(selectedFilters, text)) {
                //if (node.offsetParent === null) continue;
                var replace = "<span style='background-color:"+ redactionColor + "; color:" + redactionColor + "'>"
                // if (redactionColor === 'white') {
                //    var replace = '<span style="background-color: white; color: white;">';
                //    console.log('it is white')
                //  }
                //  else {
                //   var replace = '<span style="background-color: black; color: black;">';
                //   console.log('it is black')
                // }
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
}


var elements = document.getElementsByTagName('*');

function runEverything() {
  chrome.storage.sync.get(
    'redactionColor',
    function(obj){
      var redactionColor = obj.redactionColor || 'white';
      console.log('redactionColor is set to ' + redactionColor);
      chrome.storage.sync.get(
        'checkedCategory',
        function(obj){
          censor(redactionColor, obj.checkedCategory, elements)
        });
    });
}

setInterval(runEverything, 1000);
