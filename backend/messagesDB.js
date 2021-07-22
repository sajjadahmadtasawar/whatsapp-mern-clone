import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  name: String,
  message: String,
  timestamp: String,
  received: Boolean,
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
