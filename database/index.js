const mongoose = require('mongoose');
const Promise = require('bluebird');
const mongo = require('mongodb');
require('dotenv').config();

Promise.promisifyAll(mongoose);
Promise.promisifyAll(mongo);

mongoose.connect(process.env.DATABASE, { useMongoClient: true });
const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

const eventSchema = mongoose.Schema({
  name: String,
  address: String,
  rating: String,
  votes: { type: Number, default: 0 },
});

const daySchema = mongoose.Schema({
  day: Number,
  timelineId: String,
  timelineName: String,
  events: [eventSchema],
});

const Day = mongoose.model('Day', daySchema);
const Event = mongoose.model('Event', eventSchema);

const updateVotes = (timelineId, day, eventId, votes) => {
  return Day.findAsync({
    day,
    timelineId,
  })
    .then((results) => {
      const event = results[0].events.id(eventId)
      event.votes = votes;
      return results[0].saveAsync(((err) => {
        if (err) {
          console.error(err);
        }
      }));
    });
};

const addNewTimeline = (timelineId, numberOfDays, timelineName) => {
  const timeline = [];
  for (let day = 1; day <= numberOfDays; day += 1) {
    const newDay = new Day({ day, timelineId, timelineName });
    timeline.push(newDay);
  }
  return Promise.map(timeline, day => day.saveAsync());
};

const getTimelineById = (timelineId) => {
  return Day.findAsync({ timelineId })
    .then(results => results.sort((a, b) => a.day - b.day));
};

const getTimelineByName = timelineName => Day.findAsync({ timelineName });

const addEventToDay = (event, timelineId, day) => {
  return Day.findOneAsync({ timelineId, day })
    .tap(model => model.events.push(event))
    .then(model => model.saveAsync())
    .catch(err => console.error(err));
};

const addNewEvent = (event, timelineId, day, timelineName) => {
  const newEvent = new Event(event);
  return newEvent.saveAsync()
    .then(result => addEventToDay(result, timelineId, day, timelineName));
};

module.exports.getTimelineById = getTimelineById;
module.exports.getTimelineByName = getTimelineByName;
module.exports.addNewTimeline = addNewTimeline;
module.exports.addNewEvent = addNewEvent;
module.exports.addEventToDay = addEventToDay;
module.exports.updateVotes = updateVotes;
