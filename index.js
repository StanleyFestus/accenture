const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const Axios = require('axios');

const app = express();

app.use(cors({
  origin: 'http://localhost:3036'
}));

app.use(bodyParser.json(),
bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Working properly',
    success: true
  })
})

// Respond to api call - places
app.get('/api/places', async (req, res) => {
  let result;

  try {
    result = await Axios({
      url: 'http://open-api.myhelsinki.fi/v1/places/',
      method: 'get'
    });
  } catch (err) {
    console.log(err, 'Something went wrong')
  }

  let mappedFirms = result.data.data.map(function(firms){
    return {
      id: firms['id'],
      name: firms['name'],
      location: firms['location'],
      opening_hours: firms['opening_hours']
    }
  });
  
  
  if(mappedFirms){
  res.status(200).send(mappedFirms)
  }
  
  else {
    res.status(404).send({
      status: 404,
      error: 'Something went wrong'
    })
  }
})


// Handle all other exceptions
app.get('/api/*', (req, res, next) => {
  res.status(404).send({
    status: 404,
    error: 'Not Found'
  })
})

if (['production'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
