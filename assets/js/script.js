var currentDay = $("#currentDay");
var blockEl = $("#block-container");
const now = moment().format("dddd, MMMM Do");
const currentHour = moment().format("H");
const hours = ['9','10','11','12','1','2','3','4','5'];
const worldTime = ['9','10','11','12','13','14','15','16','17'];
const period = ['AM','AM','AM','PM','PM','PM','PM','PM','PM'];



//Current day should be displayed at the top of the calendar
currentDay.text(now);

//Time blocks for standard business hours propogated below
$.each(hours, function(i, val) {
    var blockHourSlot = $(
    '<div class = "hour">txt</div>'
    );
    
    // console.log(worldTime[i]);
    if (currentHour > worldTime[i]) {
    var blockElEntry=  $(
        '<div id = "time-block" class = "past row ">Enter event</div>'
    );
    } else if (currentHour === worldTime[i])
    {  var blockElEntry=  $(
        '<div id = "time-block" class = "present row ">Enter event</div>'
    );
    } else {
        var blockElEntry = $('<div id = "time-block" class = "future row">Enter event</div>'

        )
    }
    
    var saveButton = $(
        '<button class ="saveBtn"><i>Save</i></button>'
    );    
    blockHourSlot.text(val + period[i]);
    blockEl.append(blockHourSlot);
    blockEl.append(blockElEntry);
    blockEl.append(saveButton);

});

// createTimeBlock;

//time blocks color-coded for past, present, or future

//click into time block and enter an event

function editEntry(){
    console.log('clicked entry')
}

$("#time-block").click(editEntry);

//save button for time block saves text in local storage
function saveEntry() {
    console.log("clicked save");
}

$(".saveBtn").click(saveEntry);