import React, { useEffect, useState } from 'react';
import Head from 'next/head';

const InterviewAnalysisSystem = () => {
  const [isAssistantMinimized, setIsAssistantMinimized] = useState(false);

  useEffect(() => {
    // Simulate waveform for audio player
    const generateWaveform = () => {
      const container = document.getElementById('waveform');
      if (!container) return;
      
      container.innerHTML = '';
      
      // Create canvas for waveform visualization
      const canvas = document.createElement('canvas');
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      container.appendChild(canvas);
      
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;
      
      // Draw waveform (simplified for demo)
      ctx.fillStyle = '#ddd';
      for(let i = 0; i < width; i += 8) {
        const randomHeight = Math.random() * (height - 20) + 10;
        ctx.fillRect(i, height/2 - randomHeight/2, 4, randomHeight);
      }
      
      // Draw progress indicator
      const progress = 0.35; // 35% progress
      ctx.fillStyle = '#3B82F6';
      for(let i = 0; i < width * progress; i += 8) {
        const randomHeight = Math.random() * (height - 20) + 10;
        ctx.fillRect(i, height/2 - randomHeight/2, 4, randomHeight);
      }
    };

    // Initialize waveform on load and window resize
    generateWaveform();
    window.addEventListener('resize', generateWaveform);

    // Cleanup
    return () => {
      window.removeEventListener('resize', generateWaveform);
    };
  }, []);

  useEffect(() => {
    // Simulate analysis - this would be replaced with real analysis logic
    const analyzeAnswers = () => {
      // In a real app, this would analyze the transcript and audio
      console.log('Analyzing interview responses...');
      
      // Update progress indicators
      document.querySelectorAll('.sentiment-bar').forEach(bar => {
        const targetWidth = bar.style.width.replace('%', '');
        let currentWidth = 0;
        const interval = setInterval(() => {
          if(currentWidth >= targetWidth) {
            clearInterval(interval);
          } else {
            currentWidth += 1;
            bar.style.width = currentWidth + '%';
          }
        }, 20);
      });
    };
    
    // Run analysis after a short delay (simulating processing time)
    const analysisTimeout = setTimeout(analyzeAnswers, 1500);
    
    return () => {
      clearTimeout(analysisTimeout);
    };
  }, []);

  const toggleAssistant = () => {
    setIsAssistantMinimized(!isAssistantMinimized);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Interview Analysis System</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    primary: {
                      50: '#f0f9ff',
                      100: '#e0f2fe',
                      200: '#bae6fd',
                      300: '#7dd3fc',
                      400: '#38bdf8',
                      500: '#0ea5e9',
                      600: '#0284c7',
                      700: '#0369a1',
                      800: '#075985',
                      900: '#0c4a6e',
                    },
                    secondary: {
                      50: '#f5f3ff',
                      100: '#ede9fe',
                      200: '#ddd6fe',
                      300: '#c4b5fd',
                      400: '#a78bfa',
                      500: '#8b5cf6',
                      600: '#7c3aed',
                      700: '#6d28d9',
                      800: '#5b21b6',
                      900: '#4c1d95',
                    }
                  }
                }
              }
            }
          `
        }} />
        <style dangerouslySetInnerHTML={{
          __html: `
            #waveform {
              background: #f8fafc;
              border-radius: 12px;
              height: 120px;
              margin: 16px 0;
            }
            .sentiment-bar {
              transition: width 0.5s ease-out;
            }
            .progress-ring__circle {
              transition: stroke-dashoffset 0.5s;
              transform: rotate(-90deg);
              transform-origin: 50% 50%;
            }
            .analysis-card {
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .analysis-card:hover {
              transform: translateY(-2px);
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            }
            .tooltip {
              visibility: visible;
              opacity: 1;
              transition: opacity 0.2s;
            }
            .chat-bubble {
              max-width: 80%;
              word-wrap: break-word;
            }
            #assistant-container {
              transition: all 0.3s ease;
            }
            .assistant-minimized {
              transform: translateY(calc(100% - 60px));
            }
            /* Added width utility classes for progress bars */
            .w-65p { width: 65% !important; }
            .w-24p { width: 24% !important; }
            .w-18p { width: 18% !important; }
            .w-15p { width: 15% !important; }
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.6; }
            }
            .animate-pulse {
              animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
          `
        }} />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" alt="Pikachu mascot icon" className="w-8 h-8" />
            <h1 className="text-xl font-bold text-gray-800">Interview Genius</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-primary-600 font-medium hover:text-primary-800">Dashboard</a>
            <a href="#" className="text-gray-500 hover:text-primary-600">History</a>
            <a href="#" className="text-gray-500 hover:text-primary-600">Performance</a>
            <a href="#" className="text-gray-500 hover:text-primary-600">Resources</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button type="button" className="md:hidden" aria-label="Open menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button className="hidden md:flex items-center px-3 py-1.5 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              New Analysis
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Status Bar */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Interview with Sarah Johnson</h2>
            <p className="text-sm text-gray-500">Software Engineer Position • June 15, 2023 • 32 minutes</p>
          </div>
          <div className="flex space-x-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Analysis Complete
            </span>
            <button className="flex items-center text-sm text-primary-600 hover:text-primary-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Scorecards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="analysis-card bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</h3>
                  <div className="relative w-8 h-8">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path className="text-gray-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" strokeDasharray="100, 100"/>
                      <path className="text-green-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" strokeDasharray="78, 100"/>
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-700">78%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600">Good confidence level but some hesitation detected</p>
              </div>
              
              <div className="analysis-card bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Clarity</h3>
                  <div className="relative w-8 h-8">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path className="text-gray-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" strokeDasharray="100, 100"/>
                      <path className="text-blue-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" strokeDasharray="85, 100"/>
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-700">85%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600">Clear speech with minimal filler words</p>
              </div>
              
              <div className="analysis-card bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Content</h3>
                  <div className="relative w-8 h-8">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path className="text-gray-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" strokeDasharray="100, 100"/>
                      <path className="text-purple-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" strokeDasharray="67, 100"/>
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-700">67%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600">Could use more specific examples</p>
              </div>
              
              <div className="analysis-card bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Sentiment</h3>
                  <div className="relative w-8 h-8">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path className="text-gray-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" strokeDasharray="100, 100"/>
                      <path className="text-yellow-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" strokeDasharray="72, 100"/>
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-700">72%</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600">Mostly positive throughout</p>
              </div>
            </div>

            {/* Recording Player */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-base font-medium text-gray-800">Interview Recording</h3>
              </div>
              <div className="p-4">
                <div id="waveform"></div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-3">
                    <button type="button" title="Play" className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center hover:bg-primary-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                    <button type="button" title="Rewind" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                    </button>
                    <button type="button" title="Fast Forward" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                    <span className="text-xs text-gray-500">02:18 / 32:47</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button type="button" title="Mute" className="text-gray-500 hover:text-primary-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072M12 6a7.975 7.975 0 015.657 2.343m0 0a7.975 7.975 0 010 11.313M12 18a7.975 7.975 0 01-5.657-2.343m0 0a7.975 7.975 0 010-11.313M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <button type="button" title="Settings" className="text-gray-500 hover:text-primary-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-World Questions Section */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-base font-medium text-gray-800">Common Interview Questions</h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {/* Question 1 */}
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-200 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">Tell me about yourself</h4>
                        <p className="text-sm text-gray-600 mt-1">Your answer: 2 minutes 34 seconds</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        82%
                      </span>
                    </div>
                    <div className="mt-3 bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r">
                      <div className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm text-gray-700">Good summary of experience but try to focus more on relevant skills for this position.</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Question 2 */}
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-200 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">Describe a challenging project</h4>
                        <p className="text-sm text-gray-600 mt-1">Your answer: 1 minute 48 seconds</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        65%
                      </span>
                    </div>
                    <div className="mt-3 bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded-r">
                      <div className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm text-gray-700">Answer lacked specific metrics. Try to quantify results (e.g., "improved performance by 40%").</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Question 3 */}
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-200 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">Why do you want this job?</h4>
                        <p className="text-sm text-gray-600 mt-1">Your answer: 1 minute 12 seconds</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        88%
                      </span>
                    </div>
                    <div className="mt-3 bg-green-50 border-l-4 border-green-500 p-3 rounded-r">
                      <div className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm text-gray-700">Excellent answer showing alignment with company values and role requirements.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Custom Question Analysis
                </button>
              </div>
            </div>

            {/* Transcript Section */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-base font-medium text-gray-800">Intelligent Transcript</h3>
                <div className="flex space-x-2">
                  <button className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200">
                    Speaker View
                  </button>
                  <button className="text-xs px-2.5 py-1 bg-primary-100 text-primary-700 rounded hover:bg-primary-200">
                    Analysis View
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-6">
                  {/* Transcript Item 1 */}
                  <div className="flex">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium text-sm">
                        I
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-800">Interviewer</span>
                        <span className="text-xs text-gray-500">02:14</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">Can you walk me through your experience with cloud infrastructure?</p>
                      <div className="mt-2 bg-blue-50 border-l-4 border-blue-500 p-2 rounded-r">
                        <p className="text-xs text-gray-700">Looking for specific technical details about AWS/Azure experience</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Transcript Item 2 */}
                  <div className="flex">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-medium text-sm">
                        Y
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-800">You</span>
                        <span className="text-xs text-gray-500">02:18</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">At my current role, I've worked extensively with AWS services like EC2, S3 and Lambda. I, uh, implemented a serverless architecture that reduced our operational costs by about 30%.</p>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-yellow-500 flex-shrink-0 mt-0.5 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <p className="text-xs text-gray-700">4 filler words detected ("uh") - practice eliminating these for more confidence</p>
                        </div>
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-green-500 flex-shrink-0 mt-0.5 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <p className="text-xs text-gray-700">Great specific example with measurable impact</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button className="mt-6 w-full text-center text-sm text-primary-600 font-medium hover:text-primary-800">
                  Show Full Transcript (32 exchanges)
                </button>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Performance Summary */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-base font-medium text-gray-800">Performance Summary</h3>
              </div>
              <div className="p-4">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Speaking Pace</h4>
                    <span className="text-xs font-medium text-primary-700 bg-primary-100 px-2 py-0.5 rounded">Moderate</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-primary-500 h-2 rounded-full w-65p"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Slow</span>
                    <span>Fast</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Keyword Density</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-700">Technical Skills</span>
                        <span className="text-gray-500">24%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-blue-500 h-1.5 rounded-full w-24p"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-700">Teamwork</span>
                        <span className="text-gray-500">18%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-green-500 h-1.5 rounded-full w-18p"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-700">Problem Solving</span>
                        <span className="text-gray-500">15%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-purple-500 h-1.5 rounded-full w-15p"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Improvement Areas</h4>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-xs text-gray-700">Reduce filler words ("um", "uh") - detected 23 times</p>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-xs text-gray-700">Use more quantifiable metrics in answers (only 3/8 responses included numbers)</p>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <p className="text-xs text-gray-700">Practice STAR method for behavioral questions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* AI Coach */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-base font-medium text-gray-800">AI Interview Coach</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
                  LIVE
                </span>
              </div>
              <div className="p-4">
                <div className="flex mb-4">
                  <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/977111c1-51ee-4108-8dff-eaef862c9d75.png" alt="AI Coach avatar - a friendly futuristic robot" className="w-10 h-10 rounded-full mr-3" />
                  <div className="flex-1 min-w-0">
                    <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none">
                      <p className="text-sm text-gray-800">Based on your interview, I've identified 3 key areas to work on. Would you like me to generate a personalized practice plan?</p>
                    </div>
                    <div className="flex justify-end mt-1.5 space-x-2">
                      <button className="text-xs px-2.5 py-1 bg-primary-100 text-primary-700 rounded hover:bg-primary-200">
                        Yes, please
                      </button>
                      <button className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200">
                        Later
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center p-2.5 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <p className="text-xs text-gray-700">Practice eliminating filler words using our speech exercises</p>
                  </div>
                  <div className="flex items-center p-2.5 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <p className="text-xs text-gray-700">Work on quantifying your achievements in answers</p>
                  </div>
                  <div className="flex items-center p-2.5 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <p className="text-xs text-gray-700">Mock interview focusing on behavioral questions</p>
                  </div>
                </div>
                
                <button className="mt-4 w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-medium rounded-lg hover:opacity-90">
                  Start Practice Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Interview Genius</h3>
              <p className="text-gray-300 text-sm">
                Elevate your interview performance with AI-powered analysis and coaching.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Dashboard</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Resources</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white text-sm">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/share/1aRVqhP8of/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://x.com/its_om_g_143?t=oEVBodOWs2XPGbW2RoalNA&s=09" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/its_om_g_763?igsh=ZmhianlxYXBqaXhu" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-gray-400">
            <p>© 2023 Interview Genius. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* AI Assistant */}
      <div id="assistant-container" className={`fixed bottom-6 right-6 w-80 bg-white rounded-t-xl shadow-xl border border-gray-200 overflow-hidden ${isAssistantMinimized ? 'assistant-minimized' : ''}`}>
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-3 flex justify-between items-center">
          <h3 className="text-white text-sm font-medium flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM12 9v6m0 0l3-3m-3 3l-3-3" />
            </svg>
            Interview Coach Assistant
          </h3>
          <div className="flex space-x-2">
            <button type="button" title="Minimize Assistant" className="text-white hover:text-gray-200" onClick={toggleAssistant}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
              </svg>
            </button>
            <button type="button" id="close-assistant" title="Close Assistant" className="text-white hover:text-gray-200" onClick={toggleAssistant}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-4 max-h-96 overflow-y-auto">
          <div className="space-y-4">
            {/* AI Message */}
            <div className="flex">
              <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/df88ee83-065c-4b1f-9604-ce42ff20c862.png" alt="AI Assistant avatar showing a friendly robot face" className="w-8 h-8 rounded-full mr-2 flex-shrink-0" />
              <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none chat-bubble">
                <p className="text-sm text-gray-800">Hi there! I'm your interview coach assistant. I can help you practice questions, analyze your responses, and give personalized feedback. What would you like to work on today?</p>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              <button className="text-xs px-2 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-left">
                <span className="font-medium">Behavioral Qs</span>
                <p className="text-gray-500 truncate">Practice STAR method</p>
              </button>
              <button className="text-xs px-2 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-left">
                <span className="font-medium">Tech Questions</span>
                <p className="text-gray-500 truncate">Drill system design</p>
              </button>
              <button className="text-xs px-2 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-left">
                <span className="font-medium">Weaknesses</span>
                <p className="text-gray-500 truncate">Improve filler words</p>
              </button>
              <button className="text-xs px-2 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-left">
                <span className="font-medium">Mock Interview</span>
                <p className="text-gray-500 truncate">Full practice session</p>
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 p-3 bg-gray-50">
          <div className="relative">
            <input type="text" placeholder="Ask me anything about interviews..." className="w-full pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500" />
            <button type="button" title="Send" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewAnalysisSystem;