const Chat = require("../models/chat");

exports.createChat = async (req, res) => {
  
  const chat = await Chat.findOne({
    members: { $all: [req.body.senderId, req.body.receiverId] },
  })
  if(chat){
    return res.send('this chat exists')
  } 
  else{
    const newChat = new Chat({
      members: [req.body.senderId, req.body.receiverId],
    });
    try {
      const result = await newChat.save();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

exports.userChats = async (req, res) => {
  try {
    const chat = await Chat.find({
      members: { $in: [req.params.userId] },
    })
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.findChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    }).populate('user');
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json(error)
  }
};

