import React, { useEffect, useState } from "react";
import { FaPaperclip, FaPaperPlane } from "react-icons/fa";
import Escrow from "./Escrow";
import logo from "../../../assets/address.jpg";
import "../chat.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

const Chatdetails = () => {
  const [activeCategory, setActiveCategory] = useState("Thread");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const [loading, setLoading] = useState(true);
  const { jobId, chatId } = useParams();
  const [senderDet, setSenderDet] = useState();
  const [receiverDet, setReceiverDet] = useState();
  const [jobDet, setJobDet] = useState();
  const [senderId, setSenderId] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  let applicantId,
    isTalent = false;

  if (token) {
    const decodedToken = jwtDecode(token);
    applicantId = decodedToken.userId;
    isTalent = user.role === "Talent"; // Assuming 'role' defines if user is 'talent'
  }

  let userId;

  let userRole = user?.role;
  console.log("User Role:", userRole);

  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.userId;
  }

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/v1/chat/chatdetails/${jobId}/chat/${chatId}`
        );

        console.log("Fetched chat details:", response.data);

        // Extract wallet address and status
        setWalletAddress(response.data.walletAddress || "N/A");
        setStatus(response.data.status || "N/A");

        // Log wallet address and status
        console.log("Track Wallet Address:", response.data.walletAddress);
        console.log("Status:", response.data.status);

        const fetchedSenderId = response.data.sender;
        const fetchedReceiverId = response.data.receiver;

        // Log senderId and receiverId
        console.log("Sender ID:", fetchedSenderId);
        console.log("Receiver ID:", fetchedReceiverId);

        // Set senderId and receiverId in state
        setSenderId(fetchedSenderId);
        setReceiverId(fetchedReceiverId);

        // Check permission to view chat
        if (
          applicantId !== fetchedReceiverId &&
          applicantId !== fetchedSenderId
        ) {
          toast.error("You don't have permission to view this chat.");
          setTimeout(() => {
            navigate("/dashboard");
          }, 10);
          return; // Prevent further execution
        }

        // Fetch user details
        const userDetailsResponse = await axios.get(
          `${API_URL}/api/v1/user/userDetails`,
          {
            params: {
              senderId: fetchedSenderId,
              receiverId: fetchedReceiverId,
            },
          }
        );

        setReceiverDet(userDetailsResponse.data.receiver);
        setSenderDet(userDetailsResponse.data.sender);

        const jobDetailsResponse = await axios.get(
          `${API_URL}/api/v1/jobs/jobdetails/${jobId}`
        );
        console.log("Job Details:", jobDetailsResponse);
        setJobDet(jobDetailsResponse?.data);

        // Fetch all messages for the chat
        const chatMessagesResponse = await axios.get(
          `${API_URL}/api/v1/chat/getChatMessages/${jobId}`
        );
        console.log("Chat Messages:", chatMessagesResponse.data);

        setMessages(
          chatMessagesResponse.data.map((msg) => ({
            text: msg.message,
            sender: msg.sender === applicantId ? "self" : "other",
            createdAt: msg.createdAt,
            type: msg.type,
          }))
        );
      } catch (error) {
        console.error(
          "Error fetching chat details:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [API_URL, jobId, chatId, applicantId]);

  const timeSince = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval;

    if (seconds < 60) return `${seconds} seconds ago`;
    interval = Math.floor(seconds / 60);
    if (interval < 60) return `${interval} minutes ago`;
    interval = Math.floor(interval / 60);
    if (interval < 24) return `${interval} hours ago`;
    interval = Math.floor(interval / 24);
    if (interval < 30) return `${interval} days ago`;
    interval = Math.floor(interval / 30);
    if (interval < 12) return `${interval} months ago`;
    interval = Math.floor(interval / 12);
    return `${interval} years ago`;
  };

  const fetchJobType = async (jobId) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/chat/allchats/${userId}`
      );
      console.log("API Response:", response.data); // Log the entire API response

      const chat = response.data.find((chat) => chat.jobId === jobId);
      console.log("Found Chat jobType:", chat ? chat.jobType : "Unknown"); // Log the found chat's jobType

      return { jobType: chat ? chat.jobType : "Unknown" };
    } catch (error) {
      console.error("Error fetching jobType:", error);
      return { jobType: "Unknown" };
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() || mediaPreview) {
      // Fetch jobType from your API
      const { jobType } = await fetchJobType(jobId);

      const newMessage = {
        jobId: jobId,
        jobType: jobType, // Include jobType in the message payload
        sender: senderId,
        receiver: receiverId,
        message: inputMessage || mediaPreview, // Update this field name
        type: mediaType || "text",
        userRole, // Ensure userRole is included if needed
      };

      console.log("Sending message data:", newMessage); // Log the message data

      try {
        const response = await axios.post(
          `${API_URL}/api/v1/chat/sendMessage`,
          newMessage,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setMessages([...messages, response.data.chatMessage]);
          setInputMessage("");
          setMediaPreview(null);
        } else {
          console.error("Failed to send message", response.data);
        }
      } catch (error) {
        console.error(
          "Error sending message",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  const handleAttachMedia = (event) => {
    const file = event.target.files[0];
    if (file) {
      const mediaType = file.type.startsWith("image") ? "image" : "file";
      setMediaType(mediaType);

      const reader = new FileReader();
      reader.onload = () => {
        setMediaPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return <div>Loading job details...</div>;
  }

  return (
    <>
      <div className="col-lg-8">
        <div className="row">
          <div className="pagetitle">
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/dashboard/chat">Messages</a>
                </li>
                <li className="breadcrumb-item active">Thread</li>
              </ol>
            </nav>
          </div>
          <div className="chat-details-container">
            <div className="chat-section">
              <div className="sender-preview">
                <img src={logo} alt="profile" className="sender-image" />
                <div className="sender-details">
                  <span className="sender-name">
                    {isTalent ? receiverDet?.username : senderDet?.username}
                  </span>
                  <span className="sender-rating">⭐⭐⭐⭐⭐</span>
                  <div style={{ color: "whitesmoke" }} className="sender-job">
                    {jobDet?.jobTitle}
                  </div>
                </div>
                <a href={`/dashboard/gigdetails/${jobId}`}>
                  <button className="usbutton">More Details</button>
                </a>
              </div>
              <div className="progressexcrow">
                <Escrow
                  jobId={jobId}
                  chatId={chatId}
                  currentStatus={status}
                  userRole={user.role}
                  trackWalletAddress={walletAddress}
                />
                <br />
              </div>

              <div className="nav-toggle">
                {["Thread", "Files", "Images", "Links"].map((category) => (
                  <button
                    key={category}
                    className={activeCategory === category ? "active" : ""}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="chat-content">
                {activeCategory === "Thread" && (
                  <div className="chat-messages">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`message ${
                          message.sender === "self" ? "sent" : "received"
                        }`}
                      >
                        <img
                          src={logo}
                          alt="profile"
                          className="message-image"
                        />
                        <div className="message-content">
                          {message.type === "image" ? (
                            <img
                              src={message.text}
                              alt="sent media"
                              className="sent-media"
                            />
                          ) : (
                            <p> {message.text}</p>
                          )}
                          <span className="message-time">
                            {message.sender === "self" ? "You:" : ""}{" "}
                            {timeSince(message.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {activeCategory === "Files" && (
                  <div className="media-list">
                    {messages
                      .filter((msg) => msg.type === "file")
                      .map((file, index) => (
                        <div key={index} className="media-item">
                          {file.text}
                        </div>
                      ))}
                  </div>
                )}
                {activeCategory === "Images" && (
                  <div className="media-list">
                    {messages
                      .filter((msg) => msg.type === "image")
                      .map((image, index) => (
                        <img
                          key={index}
                          src={image.text}
                          alt="sent media"
                          className="media-item"
                        />
                      ))}
                  </div>
                )}
              </div>
              {activeCategory === "Thread" && (
                <div className="chat-input-container">
                  {mediaPreview && (
                    <div className="media-preview">
                      {mediaType === "image" ? (
                        <img
                          src={mediaPreview}
                          alt="preview"
                          className="preview-img"
                        />
                      ) : (
                        <p className="preview-file">{mediaPreview}</p>
                      )}
                    </div>
                  )}
                  <label htmlFor="attach-file" className="attach-icon">
                    <FaPaperclip />
                  </label>
                  <input
                    type="file"
                    id="attach-file"
                    style={{ display: "none" }}
                    onChange={handleAttachMedia}
                  />
                  <input
                    type="text"
                    placeholder="Type your message"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="chat-input"
                  />
                  <button onClick={handleSendMessage} className="usbutton">
                    <FaPaperPlane />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-4">
        {!isTalent && (
          <div className="card info-card revenue-card">
            <div className="card-body">
              <h5 className="card-title">Job Details:(customer)</h5>
              <h5 className="card-title">
                <i className="fas fa-map-marker-alt"></i> Madrid, Spain
              </h5>
              <h5 className="card-title">
                <i className="fas fa-clock"></i> Full time, Remote
              </h5>
              <h5 className="card-title">
                <i className="fas fa-dollar-sign"></i> 150
              </h5>
            </div>
          </div>
        )}
        {isTalent && (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Your Offer:(talent)</h5>
              <h5 className="card-title">
                <i className="fas fa-clock"></i> 2 days delivery
              </h5>
              <h5 className="card-title">
                <i className="fas fa-dollar-sign"></i> 150
              </h5>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Chatdetails;
