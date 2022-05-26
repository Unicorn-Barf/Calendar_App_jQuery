// display schdule upon loading page
displaySchedule();
// update card colors upon loading page
updateCards();


// Interval function to display the current Date and time
// runs every second to update seconds time value
setInterval(function () {
    $("#currentDay").text(moment().format("dddd MMM Do, YYYY h:mm:ss a"));
    },1000);

// Interval function to change tile colors for past present and future
// runs every 30 seconds
function updateCards() {
    setInterval(function () {
        // Use for loop to check current time's relation to card time
        let tileArr = $("[id=events]");
        for (i = 0; i < tileArr.length; i++) {
            // get moment hour in H a format then turn into integer
            let currentHour = parseInt(moment().format('H'));
            let hourId = $(tileArr[i]).parent().data('time');
            // check the current tile element's relation to current time
            if (hourId === currentHour) {
                $(tileArr[i]).parent().attr("data-when", "present");
            }
            else if (hourId < currentHour) {
                $(tileArr[i]).parent().attr("data-when", "past");
            }
            else {
                $(tileArr[i]).parent().attr("data-when", "future");
            }
        }
    }(), 30000);
};

// Add event listener to the table text input fields
$('.container').on("click", "#saveBtn", function (event) {
    let btnEl = event.target;
    // get value from input trim leading/trailing whitespaces
    let events = $('#events', $(this).closest("div.row")).val().trim();
    // save parent id for object key name
    let parentId = $(btnEl).closest("div.row").attr('id');
    // Call local storage function
    scheduleStore(parentId, events);        

});

// Local Storage function
function scheduleStore (parentId, events) {
    // define object
    let scheduleObj = JSON.parse(localStorage.getItem("mySchedule"));
    // if null, create an object
    if (scheduleObj === null) {
        scheduleObj = {};
    }
    // store key and value to schedule object
    scheduleObj[parentId] = events;
    // store schedule object to local storage
    localStorage.setItem("mySchedule", JSON.stringify(scheduleObj));
    // update schedule display
    displaySchedule();
}

// Function to display local storage data to calendar tiles
function displaySchedule () {
    let scheduleObj = JSON.parse(localStorage.getItem("mySchedule"));
    // if no local storage, end function
    if (scheduleObj === null) {
        return;
    }
    // loop through array of inputs to display event values onto calendar
    let tileArr = $("[id=events]");
    for (i=0; i<tileArr.length; i++) {
        // define hour key names using the grandparent div id attribute
        let hour = $(tileArr[i]).parent().parent().attr('id');
        if (scheduleObj[hour] !== null) {
            // change schedule input text values
            $(tileArr[i]).val(scheduleObj[hour]);
        };
    };
};