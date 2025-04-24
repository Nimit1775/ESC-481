import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bot, User, Home, Send, Plus, Trash2, Menu, X, ChevronRight } from 'lucide-react';

const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [savedConversations, setSavedConversations] = useState([]);
    const [currentConversationId, setCurrentConversationId] = useState(null);
    const [currentConversationTitle, setCurrentConversationTitle] = useState('New Chat');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Load saved conversations from localStorage on component mount
    useEffect(() => {
        const savedChats = localStorage.getItem('savedConversations');
        if (savedChats) {
            setSavedConversations(JSON.parse(savedChats));
        }
    }, []);

    // Save current conversation to localStorage whenever it changes
    useEffect(() => {
        if (currentConversationId && chatHistory.length > 0) {
            const updatedConversations = savedConversations.map(conv => 
                conv.id === currentConversationId 
                    ? { ...conv, messages: chatHistory, lastUpdated: new Date().toISOString() }
                    : conv
            );
            setSavedConversations(updatedConversations);
            localStorage.setItem('savedConversations', JSON.stringify(updatedConversations));
        }
    }, [chatHistory]);

    // Save the conversations list to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('savedConversations', JSON.stringify(savedConversations));
    }, [savedConversations]);

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        // Create a new conversation if none exists
        if (!currentConversationId) {
            createNewConversation();
        }

        const userMessage = { role: 'user', content: message };
        setChatHistory(prev => [...prev, userMessage]);
        setMessage('');

        // Update conversation title if it's the first message
        if (chatHistory.length === 0) {
            const title = message.length > 30 ? `${message.substring(0, 30)}...` : message;
            setCurrentConversationTitle(title);
            
            // Update the title in saved conversations
            const updatedConversations = savedConversations.map(conv => 
                conv.id === currentConversationId 
                    ? { ...conv, title }
                    : conv
            );
            setSavedConversations(updatedConversations);
        }

        // Bot typing simulation
        setIsBotTyping(true);

        try {
            const response = await axios.post('https://esc-481.onrender.com/api/chatbot/chat', { message });
            const botMessage = { role: 'bot', content: response.data.response };

            // Simulate a small delay for the bot response
            setTimeout(() => {
                setChatHistory(prev => [...prev, botMessage]);
                setIsBotTyping(false);
            }, 1000);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage = { role: 'bot', content: "Error: Unable to get response from AI." };
            setChatHistory(prev => [...prev, errorMessage]);
            setIsBotTyping(false);
        }
    };

    const createNewConversation = () => {
        const newId = Date.now().toString();
        const newConversation = {
            id: newId,
            title: 'New Chat',
            messages: [],
            created: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
        };
        
        setSavedConversations(prev => [newConversation, ...prev]);
        setCurrentConversationId(newId);
        setCurrentConversationTitle('New Chat');
        setChatHistory([]);
    };

    const loadConversation = (id) => {
        const conversation = savedConversations.find(conv => conv.id === id);
        if (conversation) {
            setCurrentConversationId(id);
            setCurrentConversationTitle(conversation.title);
            setChatHistory(conversation.messages);
        }
    };

    const deleteConversation = (id, e) => {
        e.stopPropagation();
        const updatedConversations = savedConversations.filter(conv => conv.id !== id);
        setSavedConversations(updatedConversations);
        
        if (id === currentConversationId) {
            setCurrentConversationId(null);
            setCurrentConversationTitle('New Chat');
            setChatHistory([]);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="flex h-screen w-screen bg-gray-50">
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-gray-900 text-white transition-all duration-300 flex flex-col h-full`}>
                {sidebarOpen && (
                    <>
                        <div className="p-4">
                            <button 
                                onClick={createNewConversation}
                                className="w-full flex items-center justify-center gap-2 p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                            >
                                <Plus size={16} />
                                <span>New Chat</span>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {savedConversations.map(conversation => (
                                <div 
                                    key={conversation.id}
                                    onClick={() => loadConversation(conversation.id)}
                                    className={`flex items-center justify-between p-3 cursor-pointer hover:bg-gray-800 transition ${currentConversationId === conversation.id ? 'bg-gray-800' : ''}`}
                                >
                                    <div className="flex items-center space-x-2">
                                        <Bot size={16} />
                                        <div className="flex flex-col overflow-hidden">
                                            <span className="text-sm truncate">{conversation.title}</span>
                                            <span className="text-xs text-gray-400">{formatDate(conversation.lastUpdated)}</span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={(e) => deleteConversation(conversation.id, e)}
                                        className="p-1 hover:bg-gray-700 rounded"
                                    >
                                        <Trash2 size={14} className="text-gray-400 hover:text-red-400" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header with Toggle Sidebar and Home Button */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white font-bold p-4 flex items-center justify-between shadow-md">
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-md bg-white/20 hover:bg-white/30 transition"
                        >
                            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                        
                        <a 
                            href="/home" 
                            className="flex items-center justify-center p-2 rounded-md bg-white/20 hover:bg-white/30 transition"
                        >
                            <Home size={18} />
                        </a>
                    </div>
                    
                    {/* Title */}
                    <div className="flex items-center justify-center flex-grow">
                        <Bot className="w-6 h-6 mr-2" />
                        <span className="text-lg font-medium">{currentConversationTitle}</span>
                    </div>
                    
                    {/* Empty div for spacing */}
                    <div className="w-14"></div>
                </div>

                {/* Chat History */}
                <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
                    {chatHistory.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full">
                            <Bot size={48} className="text-purple-600 mb-4" />
                            <h2 className="text-2xl font-semibold text-gray-700 mb-2">How can I help you today?</h2>
                            <p className="text-center text-gray-500 max-w-md">Ask me anything or start a conversation!</p>
                        </div>
                    ) : (
                        chatHistory.map((chat, index) => (
                            <div
                                key={index}
                                className={`flex items-start ${
                                    chat.role === 'user' ? 'justify-end' : 'justify-start'
                                } mb-4`}
                            >
                                {chat.role === 'bot' && (
                                    <div className="bg-purple-100 p-2 rounded-full mr-2">
                                        <Bot className="w-5 h-5 text-purple-600" />
                                    </div>
                                )}
                                
                                <div
                                    className={`max-w-[75%] px-5 py-3 rounded-2xl shadow ${
                                        chat.role === 'user'
                                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-none'
                                            : 'bg-white text-gray-800 rounded-tl-none'
                                    }`}
                                >
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{chat.content}</p>
                                </div>
                                
                                {chat.role === 'user' && (
                                    <div className="bg-blue-100 p-2 rounded-full ml-2">
                                        <User className="w-5 h-5 text-blue-600" />
                                    </div>
                                )}
                            </div>
                        ))
                    )}

                    {/* Bot Typing Loader */}
                    {isBotTyping && (
                        <div className="flex items-center justify-start mb-4">
                            <div className="bg-purple-100 p-2 rounded-full mr-2">
                                <Bot className="w-5 h-5 text-purple-600" />
                            </div>
                            <div className="bg-white text-gray-800 px-5 py-3 rounded-2xl shadow rounded-tl-none">
                                <div className="flex items-center space-x-2 py-1">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-75"></div>
                                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce delay-150"></div>
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
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-3 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        className={`p-3 text-white rounded-full shadow-md transition duration-200 ${
                            message.trim() 
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90' 
                                : 'bg-gray-300 cursor-not-allowed'
                        }`}
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;