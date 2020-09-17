var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
// variables
var formNote = document.querySelector("#saveNote");
var inputTitle = document.querySelector("#title");
var inputDescription = document.querySelector("#description");
var containerNotes = document.querySelector("#containerNotes");
var notes = [];
// Event Listeners:
var eventListeners = function () {
    formNote.addEventListener("submit", function (e) {
        e.preventDefault();
        var title = inputTitle.value;
        var description = inputDescription.value;
        var noteObject = {
            id: Date.now(),
            title: title,
            description: description
        };
        // Add notes to the new Array:
        notes = __spreadArrays(notes, [noteObject]);
        console.log(notes);
        createTemplateHTML();
        // Resetea el formulario
        formNote.reset();
    });
};
eventListeners();
var createTemplateHTML = function () {
    cleanHTML();
    if (notes.length > 0) {
        notes.forEach(function (note) {
            var containerNote = document.createElement("div");
            var titleNote = document.createElement("h2");
            var descriptionNote = document.createElement("p");
            titleNote.innerText = note.title;
            descriptionNote.innerText = note.description;
            containerNote.appendChild(titleNote);
            containerNote.appendChild(descriptionNote);
            containerNotes.appendChild(containerNote);
        });
    }
};
var cleanHTML = function () {
    while (containerNotes.firstChild) {
        containerNotes.removeChild(containerNotes.firstChild);
    }
};
