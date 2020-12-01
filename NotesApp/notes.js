const yargs = require("yargs");
const fs = require("fs");
const chalk = require("chalk");
const getNotes = () => {
  console.log(chalk.red.inverse("Here are the notes"));
  const notes = loadNotes();
  notes.forEach((note) => {
    console.log(chalk.green.inverse(note.title));
  });
};

const addNotes = (title, body) => {
  const notes = loadNotes();
  console.log(notes);
  const duplicatesNotes = notes.find((note) => note.title === title);
  if (!duplicatesNotes) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes);
  } else {
    console.log("Duplicate title found");
  }
};
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const data = dataBuffer.toString();
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};
const saveNotes = (notes) => {
  try {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync("notes.json", dataJSON);
  } catch (error) {}
};
const removeNotes = (title) => {
  const notes = loadNotes();
  const notesLeft = notes.filter((note) => note.title !== title);
  if (notes.length > notesLeft.length) {
    saveNotes(notesLeft);
  } else {
    console.log(chalk.red.inverse("Nothing was removed"));
  }
};
const readNotes = (title) => {
  const notes = loadNotes();
  debugger
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log(chalk.green.inverse(note.title));
  } else {
    console.log(chalk.red.inverse("Nothing was found"));
  }
};
module.exports = {
  addNotes,
  getNotes,
  removeNotes,
  readNotes,
};
