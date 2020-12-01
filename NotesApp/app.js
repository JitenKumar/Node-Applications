const chalk = require("chalk");
const yargs = require("yargs");
const fs = require('fs');
const notes = require('./notes');
yargs.command({
  command: "add",
  describe: "Add a new Note",
  builder: {
    title: {
      describe: "New Title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "New Boyd",
      demandOption: true,
      type: "string",
    }
  },
  handler: (argv) => {
    notes.addNotes(argv.title,argv.body);
    
  },
});
yargs.command({
  command: "remove",
  describe: "removing a new Note",
  builder: {
    title: {
      describe: "New Title",
      demandOption: true,
      type: "string",
    }
  },
  handler: (argv) => {
    notes.removeNotes(argv.title);
  }
});
yargs.command({
  command: "list",
  describe: "listing a new Note",
  handler: () => {
    notes.getNotes();
  },
});
yargs.command({
  command: "read",
  describe: "read a new Note",
  builder: {
    title: {
      describe: "New Title",
      demandOption: true,
      type: "string",
    }
  },
  handler: (argv) => {
    notes.readNotes(argv.title);
  },
});

yargs.parse();
