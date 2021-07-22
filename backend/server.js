import express from 'express';
import mongoose from 'mongoose';
import Pusher from 'pusher';
import Message from './messagesDB.js';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
const database_url =
  'mongodb+srv://sajjad:Sajjad1987@cluster0.vid3f.mongodb.net/whatsapp-mern-clone?retryWrites=true&w=majority';

const pusher = new Pusher({
  appId: '1209942',
  key: '78289be55f1a5ba3062b',
  secret: 'bcfdc957fd3bcfebc695',
  cluster: 'eu',
  useTLS: true,
});

mongoose.connect(database_url, {
  useCreateIndex: true,
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('database is opened');

  const dbCollection = db.collection('messages');
  const changeStream = dbCollection.watch();

  changeStream.on('change', (change) => {
    console.log(change);

    if ((change.operationType = 'insert')) {
      const data = change.fullDocument;
      pusher.trigger('messages', 'inserted', {
        name: data.name,
        message: data.message,
        timestamp: data.timestamp,
        received: data.received,
      });
    } else {
      console.log('pusher error occured');
    }
  });
});

app.get('/messages/sync', (req, res) => {
  Message.find((err, data) => {
    if (err) {
      res.status(500).send('error occured');
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/messages/new', (req, res) => {
  const messagedb = req.body;

  Message.create(messagedb, (err, data) => {
    if (err) {
      res.status(500).send('error occured');
    } else {
      res.status(201).send(data);
    }
  });
});

app.get('/', (req, res) => {
  res.send('this is the homepage');
});

// app.post('/message/new',(req,res)=>{
//     const messagedb = req.body

const Port = process.env.PORT || 9000;
app.listen(Port, () => console.log('server is running'));
