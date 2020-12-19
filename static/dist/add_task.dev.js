"use strict";

function handleResponse(response) {
  // TODO: Mit Bootstrap einheitlich gestallten
  // (wie Frontend-Validation)
  console.log(response);
  document.getElementById("name").style.borderColor = "#ced4da";
  document.getElementById("dueByDate").style.borderColor = "#ced4da";
  document.getElementById("createdBy").style.borderColor = "#ced4da";
  document.getElementById("assignee").style.borderColor = "#ced4da";
  document.getElementById("description").style.borderColor = "#ced4da";
  document.getElementById("error-text-name").innerHTML = "";
  document.getElementById("error-text-dueByDate").innerHTML = "";
  document.getElementById("error-text-createdBy").innerHTML = "";
  document.getElementById("error-text-assignee").innerHTML = "";
  document.getElementById("error-text-description").innerHTML = "";
  response = JSON.parse(response);

  if (response.includes("success")) {
    window.open("/?success=" + true, "_self");
  }

  response.forEach(function (message) {
    switch (message) {
      case "nameEmpty":
        document.getElementById("name").style.borderColor = "#FF0000";
        document.getElementById("error-text-name").innerHTML = "Field must not be empty";
        break;

      case "dueByDateEmpty":
        document.getElementById("dueByDate").style.borderColor = "#FF0000";
        document.getElementById("error-text-dueByDate").innerHTML = "Field must not be empty";
        break;

      case "dueByDateInvalid":
        document.getElementById("dueByDate").style.borderColor = "#FF0000";
        document.getElementById("error-text-dueByDate").innerHTML = "Date format is invalid";
        break;

      case "dueByDateInPast":
        document.getElementById("dueByDate").style.borderColor = "#FF0000";
        document.getElementById("error-text-dueByDate").innerHTML = "Date must not be set in the past";
        break;

      case "createdByEmpty":
        document.getElementById("createdBy").style.borderColor = "#FF0000";
        document.getElementById("error-text-createdBy").innerHTML = "Field must not be empty";
        break;

      case "assigneeEmpty":
        document.getElementById("assignee").style.borderColor = "#FF0000";
        document.getElementById("error-text-assignee").innerHTML = "Field must not be empty";
        break;

      case "descriptionEmpty":
        document.getElementById("description").style.borderColor = "#FF0000";
        document.getElementById("error-text-description").innerHTML = "Field must not be empty";
        break;

      default:
        console.error("An unknown error has accured");
    }
  });
}

function addTask() {
  var name = document.getElementById('name').value;
  var dueByDate = document.getElementById('dueByDate').value;
  var createdBy = document.getElementById('createdBy').value;
  var assignee = document.getElementById('assignee').value;
  var description = document.getElementById('description').value;
  var jsonBody = {
    'name': name,
    'dueByDate': dueByDate.toString().replaceAll("-", ""),
    'createdBy': createdBy,
    'assignee': assignee,
    'description': description
  };
  var request = new XMLHttpRequest();
  request.open("POST", "api/tasks", true);
  request.setRequestHeader("Content-Type", "application/json");

  request.onreadystatechange = function () {
    if (request.readyState === 4) {
      handleResponse(request.response);
    }
  };

  var data = JSON.stringify(jsonBody);
  request.send(data);
}

var addTaskButton = document.getElementById('add-task-button');
addTaskButton.addEventListener('click', function (event) {
  event.preventDefault();
  addTask();
});