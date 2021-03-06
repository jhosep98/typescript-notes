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
    console.log(notes);
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
      btnDelete.classList.add(
        "bg-red-500",
        "text-white",
        "font-bold",
        "py-2",
        "px-2",
        "rounded"
      );
      btnDelete.onclick = () => deleteNote(note.id);
      // container html
      const containerNote = document.createElement("div") as HTMLDivElement;
      const titleNote = document.createElement("h2") as HTMLHeadingElement;
      const descriptionNote = document.createElement(
        "p"
      ) as HTMLParagraphElement;

      // Add class css

      containerNote.classList.add(
        "bg-gray-200",
        "rounded-lg",
        "p-6",
        "m-6",
        "flex",
        "flex-col",
        "w-64",
        "h-64",
        "content-center",
        "justify-between"
      );
      titleNote.classList.add(
        "text-lg",
        "uppercase",
        "block",
        "mt-1",
        "text-lg",
        "leading-tight",
        "font-semibold",
        "text-gray-900",
        "hover:underline"
      );
      descriptionNote.classList.add(
        "text-gray-600",
        "my-3",
        "text-gray-600",
        "capitalize"
      );

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
