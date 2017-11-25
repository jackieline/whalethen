const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./placesApi.js');
const db = require('../database/');

const app = express();

app.use(express.static(`${__dirname}/../client/`));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.options('/', (request, response) => response.json('GET,POST,PUT,GET'));

app.get('/timeline/:timelineId', (request, response) => {
  // get route with based on timeline id endpoint. Should
  // allow for the access to the id tag via req.params as
  // shown in the current response
  response.send(request.params);
});

app.post('/entry', (request, response) => {
  // for adding an extry to a day model
  response.send('for adding an extry to a day model');
});

app.put('/entry', (request, response) => {
  // for editing a day entry in day model
  response.send('for editing a day entry in day model');
});

app.delete('/entry/:id', (request, response) => {
  // for removing an entry from the day model
  response.send('for removing an entry from the day model');
});

app.get('/search', (request, response) => {
  // for triggering a search to the search api
  api.placesApi('chicago', 'food')
    .then(result => response.json(result))
    .catch(err => console.error(err));
});


const port = 1128;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
