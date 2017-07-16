let express = require('express')
let bodyParser = require('body-parser')
let request = require('request')
let app = express()

const PORT = process.env.PORT || 3000
const FACEBOOK_ACCESS_TOKEN = 'EAAcIWBAzZCNUBADH1z1GD8N4SJcBXISib5TfmJ3zOFjhIwf3fJqhSq1CWSAvlDrWBlJhzCnWLnwv2n7CZBdDZCdYH0XPJaKZAshVZAJi1ZAEYxFJZBHGNBmNSZBOnxZAxii1IVU0veSePwI3NNmAyFPddkDZAwOSN7ZCtQZBFcZBkkLbRcAZDZD'
const VERIFY_TOKEN = 'okok'

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}!`)
})

app.get('/facebook', function (req, res) {
  console.log('query:', req.query);
  console.log('body:', req.body);
  if (req.query['hub.verify_token'] === 'okok') {
      res.send(req.query['hub.challenge']);
  } else {
      res.send('Error, wrong validation token');
  }
  res.send('hello facebook from GET');
})

app.post('/facebook', function (req, res) {
  console.log('query:', req.query);
  console.log('body:', req.body);
  let events = req.body.entry[0].messaging
  for (i = 0; i < events.length; i++) {
        let event = events[i]
        if (event.message) {
            if (event.message.text) {
                sendMessage(event.sender.id, { text: event.message.text })
            }
        }
   }
   res.sendStatus(200)
  //res.send('hello facebook from POST');
})

// generic function sending messages
function sendMessage(recipientId, message) {
    let options = {
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: recipientId },
            message: message,
        }
    }
    request(options, function (error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        }
        else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    })
}

app.get('/line', function (req, res) {
  console.log('query:', req.query);
  console.log('body:', req.body);
  res.send('hello line from GET');
})

app.post('/line', function (req, res) {
  console.log('query:', req.query);
  console.log('body:', req.body);
  res.send('hello line from POST');
})

app.get('/telegram', function (req, res) {
  console.log('query:', req.query);
  console.log('body:', req.body);
  res.send('hello telegram from GET');
})

app.post('/telegram', function (req, res) {
  console.log('query:', req.query);
  console.log('body:', req.body);
  res.send('hello telegram from POST');
})


app.listen(PORT, function () {
  console.log('Example app listening on port 3000!')
})
