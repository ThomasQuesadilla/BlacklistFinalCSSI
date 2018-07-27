var colorPicker;
function update(picker) {
  colorPicker = picker;
    document.getElementById('hex-str').innerHTML = picker.toHEXString();
    document.getElementById('rgb-str').innerHTML = picker.toRGBString();

    document.getElementById('rgb').innerHTML =
        Math.round(picker.rgb[0]) + ', ' +
        Math.round(picker.rgb[1]) + ', ' +
        Math.round(picker.rgb[2]);

    document.getElementById('hsv').innerHTML =
        Math.round(picker.hsv[0]) + '&deg;, ' +
        Math.round(picker.hsv[1]) + '%, ' +
        Math.round(picker.hsv[2]) + '%';
}

function colorSelect(event) {
  if (event.target.value == "custom") {
    document.getElementById('colorStuff').style.display = "block";
    document.getElementById('colorPicker').jscolor.show()
  }
  else {
    document.getElementById('colorStuff').style.display = "none";
    document.getElementById('colorPicker').jscolor.hide()
  }
}

function save_options() {
  var choice = [];
  var color;
    if (document.getElementById('color-select').value == "custom") {
        color = colorPicker.toHEXString();
    } else {
        color = document.getElementById('color-select').value;
      }

  var feature = document.getElementsByName('feature[]');
//  var basic_check = document.getElementById("basic").checked;
//  var military_check = document.getElementById("military").checked;
//  var alcohol_check = document.getElementById("alcohol").checked;
  console.log(feature);
  for (x = 0; x < feature.length; x++){
    if (feature[x].checked) {
      console.log('x = ' + feature[x].value);
      choice.push(feature[x].value);
    }
  }
  chrome.storage.sync.set(
    {
      redactionColor: color,
      checkedCategory: choice, //thanks to Federick. He did the thing.
    },
    function() {
      // Update status to let user know options were saved.
      console.log('redactionColor is set to ' + color);
      console.log('checkedCategory is set to ' + choice);
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(
        function() {
          status.textContent = '';
        },
        750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'black out'
  chrome.storage.sync.get(
    'redactionColor',
    function(obj){
      console.log('redactionColor is set to ' + obj.redactionColor);
      document.getElementById('color-select').value = obj.redactionColor;
    });

  chrome.storage.sync.get('checkedCategory',
    function(obj){
      console.log('checkedCategory is set too ' + obj.checkedCategory);
      var features = document.getElementsByName('feature[]')
      console.log(features)
      for (x = 0; x < features.length; x++) {
        console.log(x)
        if (obj.checkedCategory.includes(features[x].value)){
          console.log(features[x].value + ' is selected')
          features[x].checked = true;
        } else {
          features[x].checked = false;
        }
      }
    });
  }

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('color-select').addEventListener('change', colorSelect);
document.getElementById('colorPicker').addEventListener("change", function(){update(this.jscolor)})
