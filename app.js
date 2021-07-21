const yargs = require("yargs");
const utils = require("./util.js");

// node app.js add --event="CF" --eventdesc="important" --date="10/10/2000" --time="10:00AM"
// command template

yargs.command({
  command: "add",
  describe: "Add an event",
  builder: {
    event: {
      describe: "Event title",
      demandOptions: true,
      type: "string",
    },
    eventDesc: {
      describe: "Event description",
      demandOptions: true,
      type: "string",
    },
    date: {
      describe: "Event date",
      demandOptions: true,
      type: "string",
    }, //todo: in front end change the arguments to date to dd/mm/yy seprately
    time: {
      //and time to hh/min/sec seprately
      describe: "Event time",
      demandOptions: true,
      type: "string",
    },
  },
  handler(argv) {
    utils.addEvent(argv.event, argv.eventDesc, argv.date, argv.time);
  },
});

yargs.command({
  command: "remove",
  describe: "remove an event",
  builder: {
    event: {
      describe: "Event title",
      demandOptions: true,
      type: "string",
    },
    date: {
      describe: "Event date",
      demandOptions: true,
      type: "string",
    },
  },
  handler(argv) {
    utils.removeEvent(argv.event, argv.date);
  },
});

yargs.command({
  command: "list-d",
  describe: "list all events for the same date",
  builder: {
    date: {
      describe: "Event date",
      demandOptions: true,
      type: "string",
    },
  },
  handler(argv) {
    utils.listEvent(argv.date);
  },
});

yargs.parse();
