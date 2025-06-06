import React, { useState } from 'react';
import { 
  Clock, CheckCircle, ArrowRight, Calendar, Target, 
  MessageCircle, Users, Zap, Star, 
  Github, Twitter, Linkedin, Menu, X 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import  hero  from '../assets/hero.webp';
import two from '../assets/2nd.jpeg';
function LandingPage() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <AboutTeamSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md shadow-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex gap-3 items-center text-2xl font-bold text-indigo-600">
          <Clock className="h-8 w-8 text-indigo-500" />
          <a href="#">
            <span className="tracking-tight">FocusFlow</span>
          </a>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-700 hover:text-indigo-600 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
            Features
          </a>
          <a href="#about" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
            About
          </a>
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition-colors shadow-md"
          >
            Get Started
          </Link>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4">
          <nav className="flex flex-col space-y-4 px-6">
            <a 
              href="#features" 
              className="text-gray-700 hover:text-indigo-600 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#about" 
              className="text-gray-700 hover:text-indigo-600 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <Link
              to="/register"
              className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition-colors shadow-md text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 px-6">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Transform Procrastination into <span className="text-indigo-600">Productivity</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10">
            Breakthrough productivity tools powered by behavioral science to help you achieve your goals and beat procrastination.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/register"
              className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition-colors shadow-lg flex items-center justify-center"
            >
              Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href="#features"
              className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-full hover:bg-indigo-50 transition-colors"
            >
              Learn More
            </a>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start sm:space-x-6 space-y-4 sm:space-y-0 text-gray-600">
            {['Science-backed', '30-day Guarantee', '10,000+ Users'].map((feature, index) => (
              <div key={index} className="flex items-center justify-center lg:justify-start space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2">
          <img 
            src={two}
            alt="Productivity Dashboard" 
            className="rounded-xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: Target,
      title: 'Goal Setting',
      description: 'Set SMART goals and break them down into manageable tasks to make progress every day.'
    },
    {
      icon: Calendar,
      title: 'Habit Tracking',
      description: 'Build consistent habits with visual progress tracking and accountability features.'
    },
    {
      icon: Clock,
      title: 'Work Tracking ',
      description: 'Track your work patterns and identify areas for improvement with detailed analytics.'
    },
    {
      icon: MessageCircle,
      title: 'AI Productivity Chatbot',
      description: 'Get personalized productivity advice and motivation from our intelligent AI assistant.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Tools to Boost Productivity
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform provides cutting-edge tools to help you overcome procrastination and achieve your goals.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg p-6 text-center transform transition hover:scale-105"
            >
              <div className="bg-indigo-100 text-indigo-600 rounded-full p-4 inline-block mb-4">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <img 
            src={hero} 
            alt="Features overview" 
            className="mx-auto rounded-xl shadow-lg w-full max-w-4xl "
          />
        </div>
      </div>
    </section>
  );
}

function AboutTeamSection() {
  const teamMembers = [
    { name: 'Nimit Sodhani', position: 'Developer' },
    { name: 'Pradip Adhikary', position: ' ' },
    { name: 'Nandini kumari ', position: ' ' },
    { name: 'Sagnik Dey', position: ' ' },
    { name: 'Mrityunjoy Kundu', position: ' ' },
    { name: 'Satyam Anand ', position: ' ' }
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Innovative Team
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            A passionate group of professionals dedicated to helping you overcome procrastination and achieve your full potential.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg p-6 text-center transform transition hover:scale-105"
            >
              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-indigo-200 to-purple-300 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {member.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{member.name}</h3>
              <p className="text-gray-600">{member.position}</p>
              <div className="flex justify-center space-x-4 mt-4 text-gray-500">
                <Github className="h-5 w-5 hover:text-gray-700" />
                <Twitter className="h-5 w-5 hover:text-blue-500" />
                <Linkedin className="h-5 w-5 hover:text-blue-600" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToActionSection() {
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    // Redirect to register page after form submission
    window.location.href = '/register';
  };

  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Supercharge Your Productivity?
        </h2>
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Join thousands of high achievers who have transformed their lives with FocusFlow.
        </p>
        
        <div className="mb-10">
          <img 
            src="/api/placeholder/500/300" 
            alt="App showcase" 
            className="mx-auto rounded-xl shadow-lg"
          />
        </div>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row rounded-full bg-white p-1">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow px-4 py-3 text-gray-800 rounded-full sm:rounded-l-full sm:rounded-r-none focus:outline-none mb-2 sm:mb-0"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors"
            >
              Get Started
            </button>
          </div>
          <p className="mt-4 text-sm opacity-80">
            Start your free 14-day trial. No credit card required.
          </p>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-6 md:mb-0">
          <Clock className="h-8 w-8 text-indigo-500 mr-3" />
          <span className="text-2xl font-bold">FocusFlow</span>
        </div>
        <div className="flex space-x-6 mb-6 md:mb-0">
          <a href="#" className="hover:text-indigo-400">Privacy</a>
          <a href="#" className="hover:text-indigo-400">Terms</a>
          <a href="#" className="hover:text-indigo-400">Contact</a>
        </div>
        <div className="flex space-x-4">
          <Github className="h-6 w-6 hover:text-white" />
          <Twitter className="h-6 w-6 hover:text-blue-400" />
          <Linkedin className="h-6 w-6 hover:text-blue-500" />
        </div>
      </div>
      <div className="text-center mt-6 text-sm text-gray-500">
        © {new Date().getFullYear()} FocusFlow. All rights reserved.
      </div>
    </footer>
  );
}

export default LandingPage;