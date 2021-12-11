var currentDay = $("#currentDay");
var blockEl = $("#block-container");
const now = moment().format("dddd, MMMM Do");
const currentHour = moment().format("H");
const hours = ['9','10','11','12','1','2','3','4','5'];
const worldTime = ['9','10','11','12','13','14','15','16','17'];
const period = ['AM','AM','AM','PM','PM','PM','PM','PM','PM'];
var entries ={};

//Current day should be displayed at the top of the calendar
currentDay.text(now);

//Time blocks for standard business hours propogated below
var createEntries = function(entryText){
  $.each(hours, function (i, val) {
    var blockHourSlot = $('<div class = "hour"></div>');
      blockHourSlot.text(val + period[i]);
      blockEl.append(blockHourSlot);
  
    // need to parse strings into number from array to make sure this works
      if (parseInt(currentHour) > worldTime[i]) {
      var blockElEntry = $(
        '<div class = "time-block past row time-block-item"><p id="entry-display"></p></div>')
        .text(entryText);
      blockEl.append(blockElEntry);
    } else if (parseInt(currentHour) == worldTime[i]) {
      var blockElEntry = $(
        '<div class = "time-block present row time-block-item"<p id="entry-display"></p></div>')
        .text(entryText);
      blockEl.append(blockElEntry);
    } else {
      var blockElEntry = $(
        '<div  class = "time-block future row time-block-item"><p id="entry-display"></p></div>')
        .text(entryText);
      blockEl.append(blockElEntry);
    }
    

    var saveButton = $('<button class ="saveBtn"><i>Save</i></button>');  
    blockEl.append(saveButton);
  });
}

// push text values for the new entries
var loadEntries = function() {
  if (!entries) {
    entries = {
    textValue: []
    };
  }

  $.each(entries, function(list, arr) {
    arr.forEach(function(entry) {
      createEntry(entry.text)
    })
  })
}


// createTimeBlock;

//time blocks color-coded for past, present, or future

//click into time block and enter an event

function editEntry(event){
    console.log(event.target);
    var textEntry = $(this)
    .text()
    .trim();

    //create text area 
    var textInput = $("<textarea>").val(textEntry);
    $(this).replaceWith(textInput);

    //focus textarea
    textInput.trigger("focus");
};

//process to save and reinstate as p
$(".time-block").on("blur", "textarea", function() {
  //get textarea value
  var textEntry = $(this).val();  

//part where p element is created and reinstated
var entryP= $("<p>")  
  .text(textEntry);

  entryP.attr("id", "entry-display")
$(this).replaceWith(entryP);

});

$(".time-block").on("click", "p", editEntry);

//save button for time block saves text in local storage
function saveEntry() {
  var displayText = 
  document.getElementById("entry-display").value;
  console.log(document.getElementById("entry-display").value);
  
  
  localStorage.setItem('entries', JSON.stringify(entries));
    console.log("clicked save");
};

//update entry arrary when button pushed
$(".saveBtn").click(function() {
  var entryText= $("#entry-display").val();

  createEntry(entryText);

  entries.push({
    textValue: entryText
  });

  saveEntry();
});

var displayText = localStorage.getItem("displayText");
  document.getElementById('entry-display').value = displayText;