// variables
const formNote = document.querySelector("#saveNote") as HTMLFormElement;
const inputTitle = document.querySelector("#title") as HTMLInputElement;
const inputDescription = document.querySelector(
  "#description"
) as HTMLInputElement;
const containerNotes = document.querySelector(
  "#containerNotes"
) as HTMLDivElement;
let notes: any[] = [];

interface INoteType {
  id: number;
  title: string;
  description: string;
}

// Event Listeners:
const eventListeners = () => {
  formNote.addEventListener("submit", (e) => {
    e.preventDefault();

    const title: string = inputTitle.value;
    const description: string = inputDescription.value;

    const noteObject: INoteType = {
      id: Date.now(),
      title,
      description,
    };

    // Add notes to the new Array:
    notes = [...notes, noteObject];
    console.log(notes);

    createTemplateHTML();

    // Resetea el formulario
    formNote.reset();
  });

  document.addEventListener("DOMContentLoaded", () => {
    notes = JSON.parse(localStorage.getItem("notes")) || [];
    createTemplateHTML();
  });
};

eventListeners();

const createTemplateHTML = () => {
  cleanHTML();
  if (notes.length > 0) {
    notes.forEach((note) => {
      // delete button
      const btnDelete = document.createElement("button") as HTMLButtonElement;
      btnDelete.textContent = "Delete";

      btnDelete.onclick = () => deleteNote(note.id);
      // container html
      const containerNote = document.createElement("div") as HTMLDivElement;
      const titleNote = document.createElement("h2") as HTMLHeadingElement;
      const descriptionNote = document.createElement(
        "p"
      ) as HTMLParagraphElement;

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

const cleanHTML = () => {
  while (containerNotes.firstChild) {
    containerNotes.removeChild(containerNotes.firstChild);
  }
};

const syncUpStorage = () =>
  localStorage.setItem("notes", JSON.stringify(notes));

const deleteNote = (id: number) => {
  notes = notes.filter((note) => note.id !== id);
  createTemplateHTML();
};
