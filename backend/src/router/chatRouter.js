const express=require('express');
const Chat = require('../models/Chat');
const FullTimeJob = require('../models/FullTimeJob'); 
const FreelanceJob = require('../models/FreelancingJob');
const PostGig = require('../models/postgig');
const router=express.Router();



router.get('/getAllchats', async (req, res) => {
    try {
        const chat= await Chat.find({})
        return res.status(200).json(chat);
    } catch (error) {
        console.error("Error fetching jobs:", error.message);
        return res.status(500).json({ msg: "Error occurred while fetching gigs", error: error.message });
    }
});



router.get('/chatdetails/:jobId/chat/:chatId', async (req, res) => {
    const jobId = req.params.jobId;
    const chatId=req.params.chatId;
  
    try {
      const chat = await Chat.findById(chatId)
      console.log(chat)
      if (chat) {
        return res.status(200).json(chat);
      }
  
 
      return res.status(404).json({ message: "Chat not found" });
  
    } catch (error) {
      console.error('Error fetching job details:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
  
  router.get("/chatdetails", async (req, res) => {
    const { jobId } = req.query;
    try {
      const chatData = await Chat.find({ jobId: jobId });
      console.log(chatData);
      if (chatData.length > 0) { 
        return res.status(200).json(chatData);
      }
      return res.status(404).json({ message: "ChatId not found" });
    } catch (error) {
      console.error('Error fetching Chat details:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });

  router.get("/allchats/:userId", async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Fetch chats involving the user
      const findChats = await Chat.find({
        $or: [{ receiver: userId }, { sender: userId }]
      })
        .sort({ createdAt: -1 })
        .populate("sender", "username")
        .populate("receiver", "username");
  
      // Helper function to populate job title based on job type
      const populateJobTitle = async (chat) => {
        switch (chat.jobType) {
          case "FullTimeJob":
            const fullTimeJob = await FullTimeJob.findById(chat.jobId);
            return fullTimeJob ? fullTimeJob.jobTitle : null;
          case "FreelanceJob":
            const freelanceJob = await FreelanceJob.findById(chat.jobId);
            return freelanceJob ? freelanceJob.jobTitle : null;
          case "GigJob":
            const gigJob = await PostGig.findById(chat.jobId);
            return gigJob ? gigJob.jobTitle : null;
          default:
            return null;
        }
      };
  
      // Populate job titles for each chat
      const chatsWithJobTitles = await Promise.all(
        findChats.map(async (chat) => {
          const jobTitle = await populateJobTitle(chat);
          return { ...chat.toObject(), jobTitle };
        })
      );
  
      res.status(200).json(chatsWithJobTitles);
    } catch (error) {
      console.error("Error fetching chats:", error);
      res.status(500).json({ message: "Error fetching chats" });
    }
  });
  

  module.exports=router;