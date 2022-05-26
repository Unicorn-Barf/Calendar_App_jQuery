// display schdule upon loading page
displaySchedule();
updateCards();


// Interval function to display the current Date and time
setInterval(function () {
    $("#currentDay").text(moment().format("dddd MMM Do, YYYY h:mm:ss a"));
    },1000);

// Interval function to change tile colors for past present and future
function updateCards() {
    setInterval(function () {
        // Use for loop to check current time's relation to card time
        let tileArr = $("[id=events]");
        for (i = 0; i < tileArr.length; i++) {
            // get moment hour in H a format
            let currentHour = parseInt(moment().format('H'));
            let hourId = $(tileArr[i]).parent().data('time');
            console.log(typeof currentHour, typeof hourId);
            // check if current tile element matches time
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
$('.container').on("click", "button", function (event) {
    let btnEl = event.target;
    // get value from input
    let events = $('#events', $(this).closest("div.row")).val().trim();
    // save parent id for storage
    let parentId = $(btnEl).parent().attr('id');
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
    scheduleObj[parentId] = events;
    localStorage.setItem("mySchedule", JSON.stringify(scheduleObj));
    // update schedule display
    displaySchedule();
}

// Function to display local storage date to calendar
function displaySchedule () {
    let scheduleObj = JSON.parse(localStorage.getItem("mySchedule"));
    // if no local storage, end function
    if (scheduleObj === null) {
        return;
    }

    // loop to display event values onto calendar
    let tileArr = $("[id=events]");
    for (i=0; i<tileArr.length; i++) {
        let hour = $(tileArr[i]).parent().parent().attr('id');
        if (scheduleObj[hour] !== null) {
            // change schedule input text values
            $(tileArr[i]).val(scheduleObj[hour]);
        };
    };
};