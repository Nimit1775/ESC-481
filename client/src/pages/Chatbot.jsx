import React, { useState } from 'react';
import axios from 'axios';
import { Bot, User, Home } from 'lucide-react'; // Added Home icon

const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isBotTyping, setIsBotTyping] = useState(false);

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = { role: 'user', content: message };
        setChatHistory((prev) => [...prev, userMessage]);
        setMessage('');

        // Bot typing simulation
        setIsBotTyping(true);

        try {
            const response = await axios.post('https://esc-481.onrender.com/api/chatbot/chat', { message });
            const botMessage = { role: 'bot', content: response.data.response };

            // Simulate a small delay for the bot response
            setTimeout(() => {
                setChatHistory((prev) => [...prev, botMessage]);
                setIsBotTyping(false);
            }, 1000);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage = { role: 'bot', content: "Error: Unable to get response from AI." };
            setChatHistory((prev) => [...prev, errorMessage]);
            setIsBotTyping(false);
        }
    };

    return (
        <div className="flex flex-col h-screen w-screen bg-gray-50">
            {/* Header with Home Button */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl font-bold p-4 flex items-center justify-between">
                {/* Home Button */}
                <a 
                    href="/home" 
                    className="flex items-center justify-center p-2 rounded-md bg-white/20 hover:bg-white/30 transition duration-200"
                >
                    <Home className="w-5 h-5 text-white" />
                </a>
                
                {/* Title */}
                <div className="flex items-center justify-center flex-grow">
                    <Bot className="w-6 h-6 mr-2" />
                    Chatbot Assistant
                </div>
                
                {/* Empty div for spacing */}
                <div className="w-8"></div>
            </div>

            {/* Chat History */}
            <div className="flex-1 p-4 overflow-y-auto">
                {chatHistory.length === 0 ? (
                    <p className="text-center text-gray-500">Start the conversation!</p>
                ) : (
                    chatHistory.map((chat, index) => (
                        <div
                            key={index}
                            className={`flex items-start ${
                                chat.role === 'user' ? 'justify-end' : 'justify-start'
                            } mb-3`}
                        >
                            {chat.role === 'bot' && (
                                <Bot className="w-6 h-6 mr-2 text-purple-600" />
                            )}
                            {chat.role === 'user' && (
                                <User className="w-6 h-6 mr-2 text-blue-500" />
                            )}
                            <div
                                className={`max-w-[75%] px-4 py-3 rounded-lg shadow-md ${
                                    chat.role === 'user'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-gray-800'
                                }`}
                            >
                                <strong className="block mb-1 text-sm">
                                    {chat.role === 'user' ? 'You' : 'Bot'}
                                </strong>
                                <p className="text-sm leading-relaxed">{chat.content}</p>
                            </div>
                        </div>
                    ))
                )}

                {/* Bot Typing Loader */}
                {isBotTyping && (
                    <div className="flex items-center justify-start mb-3">
                        <Bot className="w-6 h-6 mr-2 text-purple-600" />
                        <div className="bg-gray-200 text-gray-800 px-4 py-3 rounded-lg shadow-md max-w-[75%]">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="flex items-center gap-3 p-4 bg-white border-t border-gray-200">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                    onClick={handleSendMessage}
                    className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md hover:opacity-90 transition duration-200"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chatbot;