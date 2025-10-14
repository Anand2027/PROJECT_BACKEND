import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { BsXCircleFill } from 'react-icons/bs';
import { FaRobot } from 'react-icons/fa';

const ChatBot = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const messagesEndRef = useRef(null);
  const isGeneratingRef = useRef(false); // 🧠 Prevents multiple calls

  const toggleChat = () => setIsOpen((prev) => !prev);

  // 🧹 Auto scroll only once per message add
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const generateAnswer = async () => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || loading || isGeneratingRef.current) return;

    isGeneratingRef.current = true; // lock requests
    setLoading(true);

    const userMessage = { text: trimmedQuestion, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion('');

    try {
      const response = await axios.post('http://localhost:5003/api/chat', {
        question: trimmedQuestion,
      });

      const botReply = response?.data?.answer?.trim() || 'No response from bot';
      const botMessage = { text: botReply, sender: 'bot' };

      // ✅ Avoid overflow: use functional update cleanly
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { text: 'Something went wrong 😢', sender: 'bot' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      isGeneratingRef.current = false; // unlock request
    }
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <button
        onClick={toggleChat}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className={`fixed bottom-4 left-4 z-50 p-3 rounded-full text-white shadow-lg transition-all
          ${isOpen ? 'bg-purple-900' : 'bg-purple-700'}
          animate-lift
        `}
        style={{
          filter: 'drop-shadow(0 0 6px rgba(128, 0, 128, 0.7))',
          boxShadow: '0 0 8px 2px rgba(160, 32, 240, 0.7)',
          cursor: 'pointer',
        }}
      >
        {isOpen ? <BsXCircleFill size={22} /> : <FaRobot size={22} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-16 left-4 z-50 w-80 max-w-[90vw] h-[500px] flex flex-col bg-white border border-gray-300 rounded-xl shadow-lg">
          <div className="bg-purple-800 text-white text-center py-3 rounded-t-xl font-bold tracking-wide text-lg">
            🤖 jAIn AI
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[80%] px-4 py-2 rounded-lg text-sm break-words ${
                  msg.sender === 'user'
                    ? 'bg-amber-400 text-gray-900 self-end ml-auto text-right shadow-md'
                    : 'bg-purple-200 text-purple-900 self-start mr-auto text-left shadow-inner'
                }`}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}
            {loading && (
              <div className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg w-fit text-sm animate-pulse">
                Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              className="flex-1 p-2 border rounded text-sm"
              placeholder="Type your message..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && generateAnswer()}
            />
            <button
              onClick={generateAnswer}
              disabled={loading}
              className="bg-purple-700 text-white px-3 py-3 rounded hover:bg-purple-800 disabled:opacity-50 text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes lift {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-lift {
          animation: lift 2.5s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default ChatBot;
