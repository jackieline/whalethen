const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const api = require('./placesApi.js');
const db = require('../database/');
const config = require('../webpack.config.js');
require('dotenv').config();

const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));
app.use(webpackHotMiddleware(compiler));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../client/`));

app.options('/', (request, response) => response.json('GET,POST,PUT,GET'));

app.get('/timeline/:timelineName/:timelineId', (request, response) => {
  db.getTimelineById(request.params.timelineId)
    .then(timeline => response.json(timeline))
    .tapCatch(err => console.error(err))
    .catch(() => response.status(409).end());
});

app.post('/timeline', ({ body }, response) => {
  db.addNewTimeline(body.timelineId, body.numberOfDays, body.timelineName)
    .then(() => response.sendStatus(200))
    .tapCatch(err => console.error(err))
    .catch(() => response.sendStatus(409));
});

app.post('/entry', ({ body }, response) => {
  db.addNewEvent(body.event, body.timelineId, body.day)
    .then(() => response.sendStatus(200))
    .tapCatch(err => console.error(err))
    .catch(() => response.sendStatus(409));
});

app.put('/entry', (request, response) => {
  db.updateVotes(request.body.timelineId, request.body.day, request.body.eventId, request.body.votes)
    .then(() => response.sendStatus(200))
    .tapCatch(err => console.error(err))
    .catch(() => response.sendStatus(409));
});

app.delete('/entry/:id', (request, response) => {
  // for removing an entry from the day model
  response.send('for removing an entry from the day model');
});

app.get('/search', (request, response) => {
  const { category, location } = request.query;
  // for triggering a search to the search api
  api.placesApi(location, category)
    .then((result) => {
      response.json(result);
    })
    .tapCatch(err => console.error(err))
    .catch(() => response.sendStatus(409));
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
