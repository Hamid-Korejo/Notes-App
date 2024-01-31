let remove = document.querySelector("p img");
let notes = document.querySelectorAll(".input-box");
let notesContainer = document.querySelector(".notes-container");
let createButton = document.querySelector(".btn");

function showNotes() {
  try {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    if (storedNotes) {
      notesContainer.innerHTML = ""; // Clear previous notes
      storedNotes.forEach(note => {
        const noteElement = document.createElement("p");
        noteElement.className = "input-box";
        noteElement.textContent = note.content;
        noteElement.contentEditable = true;

        const deleteIcon = document.createElement("img");
        deleteIcon.src = "assests/delete.png";
        noteElement.appendChild(deleteIcon);

        notesContainer.appendChild(noteElement);
      });
    }
  } catch (error) {
    console.error("Error retrieving notes from local storage:", error);
  }
}

function updateStorage() {
  try {
    const notes = Array.from(notesContainer.querySelectorAll(".input-box"))
      .map(note => ({ content: note.textContent }));
    localStorage.setItem("notes", JSON.stringify(notes));
  } catch (error) {
    console.error("Error saving notes to local storage:", error);
  }
}

createButton.addEventListener("click", () => {
  const newNote = document.createElement("p");
  newNote.className = "input-box";
  newNote.contentEditable = true;

  const deleteIcon = document.createElement("img");
  deleteIcon.src = "./assests/delete.png";
  newNote.appendChild(deleteIcon);

  notesContainer.appendChild(newNote);
  updateStorage();
});

notesContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    e.target.parentElement.remove();
    updateStorage();
  } else if (e.target.tagName === "P") {
    e.target.addEventListener("keyup", updateStorage);
  }
});

showNotes();