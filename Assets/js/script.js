
// Interval function to display the current Date and time
setInterval(function () {
    $("#currentDay").text(moment().format("MMM Do, YYYY h:mm:ss a"));
    },1000);