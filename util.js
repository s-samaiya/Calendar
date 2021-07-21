const fs = require("fs");
const chalk = require("chalk");

// Add function
const addEvent = (event, desc, date, time) => {
  const events = loadJSON();
  // if event name is unique direct insert into
  const sameEventName = events.filter((data) => data.event === event);
  const currentDate = Date.now();
  const eventCreated = new Date(currentDate).toLocaleString(
    "en-IN",
    "Pacific/Chatham"
  );
  // console.log(sameEventName);
  if (sameEventName.length === 0) {
    events.push({
      event,
      eventDesc: desc,
      date,
      time,
      eventCreated,
      status: "To be executed",
    });

    saveJSON(events);
    console.log(chalk.greenBright.bold("Event added"));
  }
  // if event name is not unique so search for Dates to be different
  if (sameEventName.length !== 0) {
    const sameEventDate = sameEventName.filter((data) => data.date === date);
    if (sameEventDate.length === 0) {
      events.push({
        event,
        eventDesc: desc,
        date,
        time,
        eventCreated,
        status: "To be executed",
      });

      saveJSON(events);
      console.log(
        chalk.yellow.bold("Event added with same name and dates are different")
      );
    } else {
      console.log(
        chalk.red.inverse("select another date or change event name")
      );
    }
  }

  // if date is same dont insert else insert...
};

// ! Remove function
const removeEvent = (event, date) => {
  const calanderJson = loadJSON();
  const newJSON = calanderJson.filter((data) => {
    if (data.date !== date || data.event !== event) {
      return data;
    }
  });
  if (newJSON.length === calanderJson.length) {
    console.log(chalk.red.bold.inverse("Event not found"));
  } else {
    saveJSON(newJSON);
    console.log(chalk.green.bold("Event removed"));
  }
};

const listEvent = (date) => {
  const calanderJson = loadJSON();
  const newJSON = calanderJson.filter((data) => data.date === date);
  if (newJSON.length) {
    console.log(newJSON);
  } else {
    console.log(chalk.yellow.bold("no event for particular date"));
  }
};

const loadJSON = () => {
  try {
    const currentBuffer = fs.readFileSync("calander.json");
    const jsonstring = currentBuffer.toString();
    return JSON.parse(jsonstring);
  } catch (err) {
    return [];
  }
};

const saveJSON = (finalJSON) => {
  const data = JSON.stringify(finalJSON);
  fs.writeFileSync("calander.json", data);
};

module.exports = {
  addEvent: addEvent,
  removeEvent: removeEvent,
  listEvent: listEvent,
};
