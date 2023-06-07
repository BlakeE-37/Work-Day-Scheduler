// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  $(".saveBtn").on("click", function () {
    var text = $(this).prev().val();
    var parent = $(this).parent().attr('id')
    localStorage.setItem(parent, text)
    console.log(text)
    console.log(parent)
  });
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // gets current hour
  var currentHour = dayjs().hour();

  // gets all elements with an id starting with 'hour-'
  var timeBlocks = $("[id^='hour-']")

  // llops through each element from above
  timeBlocks.each(function (index) {
    // gets the id of every element
    var hourNum = $(this).attr('id')
    // return just the hour from the id
    hourNum = hourNum.substr(5)
    // turn the string into an integer
    hourNum = parseInt(hourNum)

    // compare if the id hour is in past present or future and set the classes respectively
    if (currentHour > hourNum) {
      $(this).attr("class", "row time-block past")
    } else if (currentHour === hourNum) {
      $(this).attr("class", "row time-block present")
    } else if (currentHour < hourNum) {
      $(this).attr("class", "row time-block future")
    }
  })
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  for (i = 1; i <= 24; i++) {
    var hourId = 'hour-' + i
    var storageValue = localStorage.getItem(hourId)
    if (storageValue) {
      $('#' + hourId).children('textarea').text(storageValue)
    }
  }
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // get current day
  var day = dayjs().format('dddd, MMMM D')
  $('#currentDay').text(day)
  // TODO: Add code to display the current date in the header of the page.
});
