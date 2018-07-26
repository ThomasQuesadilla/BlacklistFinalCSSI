// Saves options to chrome.storage
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
  }
  else {
    document.getElementById('colorStuff').style.display = "none";
  }
}

function save_options() {
  var color;
  if (document.getElementById('color-select').value == "custom") {
    color = colorPicker.toHEXString();
  } else {
    color = document.getElementById('color-select').value;
  }
  chrome.storage.sync.set({
    redactionColor: color,
  }, function() {
    // Update status to let user know options were saved.
    console.log('redactionColor is set to ' + String(color));
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'black out'
  chrome.storage.sync.get('redactionColor', function(obj){
    console.log('redactionColor is set to ' + obj.redactionColor);
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('color-select').addEventListener('change', colorSelect);
document.getElementById('colorPicker').addEventListener("change", function(){update(this.jscolor)})
