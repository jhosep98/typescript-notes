"use strict";
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
            description: description,
        };
        // Add notes to the new Array:
        notes = __spreadArrays(notes, [noteObject]);
        console.log(notes);
        createTemplateHTML();
        // Resetea el formulario
        formNote.reset();
    });
    document.addEventListener("DOMContentLoaded", function () {
        notes = JSON.parse(localStorage.getItem("notes")) || [];
        console.log(notes);
        createTemplateHTML();
    });
};
eventListeners();
var createTemplateHTML = function () {
    cleanHTML();
    if (notes.length > 0) {
        notes.forEach(function (note) {
            // delete button
            var btnDelete = document.createElement("button");
            btnDelete.textContent = "Delete";
            btnDelete.classList.add("bg-red-500", "text-white", "font-bold", "py-2", "px-2", "rounded");
            btnDelete.onclick = function () { return deleteNote(note.id); };
            // container html
            var containerNote = document.createElement("div");
            var titleNote = document.createElement("h2");
            var descriptionNote = document.createElement("p");
            // Add class css
            containerNote.classList.add("bg-gray-200", "rounded-lg", "p-6", "m-6", "flex", "flex-col", "w-64", "h-64", "content-center", "justify-between");
            titleNote.classList.add("text-lg", "uppercase", "block", "mt-1", "text-lg", "leading-tight", "font-semibold", "text-gray-900", "hover:underline");
            descriptionNote.classList.add("text-gray-600", "my-3", "text-gray-600", "capitalize");
            titleNote.innerText = note.title;
            descriptionNote.innerText = note.description;
            containerNote.appendChild(titleNote);
            containerNote.appendChild(descriptionNote);
            containerNote.appendChild(btnDelete);
            containerNotes.appendChild(containerNote);
        });
    }
    syncUpStorage();
};
var cleanHTML = function () {
    while (containerNotes.firstChild) {
        containerNotes.removeChild(containerNotes.firstChild);
    }
};
var syncUpStorage = function () {
    return localStorage.setItem("notes", JSON.stringify(notes));
};
var deleteNote = function (id) {
    notes = notes.filter(function (note) { return note.id !== id; });
    createTemplateHTML();
};
