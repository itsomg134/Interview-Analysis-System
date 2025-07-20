const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises; // Using promises version of fs for async operations
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all origins (adjust in production for security)
app.use(express.json()); // For parsing application/json

// --- Data Storage (for demonstration purposes, use a database in production) ---
let interviewHistory = []; // Stores past interview analysis data
let currentInterviewData = null; // Stores data for the currently displayed interview

// Initialize with some dummy data for demonstration
const initializeDummyData = async () => {
    // Dummy current interview data
    currentInterviewData = {
        title: "Interview with Sarah Johnson",
        position: "Software Engineer Position",
        date: "June 15, 2023",
        duration: "32 minutes",
        sentiment: {
            positive: 75,
            neutral: 15,
            negative: 10
        },
        improvementAreas: [
            "Reduce filler words (\"um\", \"uh\") - detected 23 times",
            "Use more quantifiable metrics in answers (only 3/8 responses included numbers)",
            "Practice STAR method for behavioral questions"
        ],
        commonQuestions: [
            "Tell me about yourself.",
            "Why are you interested in this position?",
            "What are your strengths and weaknesses?"
        ],
        transcript: "This is a simulated transcript for the current interview. It would contain the full text of the interview."
    };

    // Dummy history data (for HISTORY12.jpg)
    interviewHistory.push({
        id: 'history12',
        title: "Interview with John Doe",
        position: "Project Manager",
        date: "May 10, 2023",
        duration: "45 minutes",
        sentiment: {
            positive: 60,
            neutral: 25,
            negative: 15
        },
        improvementAreas: [
            "Improve clarity in explanations",
            "Work on time management during responses"
        ],
        commonQuestions: [
            "Describe a challenging project.",
            "How do you handle conflict?"
        ],
        transcript: "Transcript for John Doe's interview.",
        imagePath: '/images/HISTORY12.jpg' // Path to the image
    });
};

initializeDummyData();

// Serve static files (like your HISTORY12.jpg image)
app.use('/images', express.static(path.join(__dirname, 'images'))); // Create an 'images' folder in your backend

// --- API Endpoints ---

// GET /api/current-interview
// Returns the data for the currently displayed interview dashboard.
app.get('/api/current-interview', (req, res) => {
    if (currentInterviewData) {
        res.json(currentInterviewData);
    } else {
        res.status(404).json({ message: "No current interview data available." });
    }
});

// GET /api/history
// Returns the list of past interviews (for the history button).
app.get('/api/history', (req, res) => {
    res.json(interviewHistory.map(({ id, title, position, date, duration, imagePath }) => ({
        id,
        title,
        position,
        date,
        duration,
        imagePath // Include imagePath for the history display
    })));
});

// GET /api/history/:id
// Returns detailed data for a specific historical interview.
app.get('/api/history/:id', (req, res) => {
    const interviewId = req.params.id;
    const historicalInterview = interviewHistory.find(interview => interview.id === interviewId);
    if (historicalInterview) {
        res.json(historicalInterview);
    } else {
        res.status(404).json({ message: "Historical interview not found." });
    }
});

// POST /api/new-analysis
// Endpoint to simulate creating a new interview analysis.
// This will store the current data to history and prepare for a new 'current' interview.
app.post('/api/new-analysis', (req, res) => {
    if (currentInterviewData) {
        // Add the current interview data to history before clearing it
        // Generate a unique ID for the historical record (in a real app, this would be a DB ID)
        const newHistoryId = `interview-${Date.now()}`;
        interviewHistory.unshift({ ...currentInterviewData, id: newHistoryId, imagePath: null }); // Prepend to history, no image for new ones unless specifically added
    }

    // Simulate collecting new data for a new interview (empty it or set defaults)
    currentInterviewData = {
        title: "New Interview Analysis",
        position: "Pending Analysis",
        date: new Date().toLocaleDateString(),
        duration: "0 minutes",
        sentiment: { positive: 0, neutral: 0, negative: 0 },
        improvementAreas: [],
        commonQuestions: [],
        transcript: "Start a new interview to generate a transcript.",
        // You might have a status like 'recording' or 'analyzing'
    };
    res.status(200).json({ message: "Ready for new analysis. Previous data moved to history.", currentInterviewData });
});

// GET /api/youtube-skills
// Provides YouTube links for skill and practice.
app.get('/api/youtube-skills', (req, res) => {
    const youtubeLinks = [
        { name: "Spoken English Guru – Top 10 Interview Questions in Hindi & English", url: "https://www.youtube.com/results?search_query=Spoken+English+Guru+Top+10+Interview+Questions" },
        { name: "Invisible BABA – How to Introduce Yourself in a Job Interview (Hindi)", url: "https://www.youtube.com/results?search_query=Invisible+BABA+How+to+Introduce+Yourself" },
        { name: "Dheeru Talks – Top 13 Common Interview Questions in Hindi", url: "https://www.youtube.com/results?search_query=Dheeru+Talks+Top+13+Common+Interview+Questions" },
        { name: "Cine_vibestudio – Job Interview English Conversation with Hindi Explanation", url: "https://www.youtube.com/results?search_query=Cine_vibestudio+Job+Interview+English+Conversation" },
        { name: "Harihar Sir English Wale – Spoken English for Interviews", url: "https://www.youtube.com/results?search_query=Harihar+Sir+English+Wale+Spoken+English" },
        { name: "Dr Shiv Knowledge Hub – Self Introduction in Interview (Hindi + English)", url: "https://www.youtube.com/results?search_query=Dr+Shiv+Knowledge+Hub+Self+Introduction" },
        { name: "English Connection – Interview Tips and Practice", url: "https://www.youtube.com/results?search_query=English+Connection+Interview+Tips" },
        { name: "Dear Sir – Interview Preparation for Freshers", url: "https://www.youtube.com/results?search_query=Dear+Sir+Interview+Preparation" },
        { name: "Fluenta Institute – Spoken English & Interview Skills", url: "https://www.youtube.com/results?search_query=Fluenta+Institute+Spoken+English" },
        { name: "TS Madaan – Interview Skills & Personality Development", url: "https://www.youtube.com/results?search_query=TS+Madaan+Interview+Skills" }
    ];
    res.json(youtubeLinks);
});

// GET /api/pricing
// Provides a dummy URL for pricing.
app.get('/api/pricing', (req, res) => {
    res.json({ url: "https://www.example.com/pricing" }); // Replace with your actual pricing page
});

// GET /api/performance-resources
// Provides dummy additional data for performance resources.
app.get('/api/performance-resources', (req, res) => {
    const resources = [
        { title: "Article: Mastering Behavioral Interviews", url: "https://www.example.com/behavioral-interviews" },
        { title: "E-book: The Complete Guide to Job Interviews", url: "https://www.example.com/interview-guide" },
        { title: "Webinar: Acing Technical Interviews", url: "https://www.example.com/technical-webinar" }
    ];
    res.json(resources);
});

// POST /api/export-report
// Simulates exporting a report. In a real app, this would generate a PDF/DOCX.
app.post('/api/export-report', async (req, res) => {
    // In a real application, you would generate a PDF or other document here.
    // For this example, we'll just send a success message.
    console.log("Exporting report for the current dashboard data...");

    // Example: Create a dummy file to simulate download
    const filePath = path.join(__dirname, 'reports', 'interview_report.txt');
    try {
        await fs.mkdir(path.dirname(filePath), { recursive: true }); // Ensure directory exists
        await fs.writeFile(filePath, JSON.stringify(currentInterviewData, null, 2), 'utf8');
        res.download(filePath, 'Interview_Report.txt', (err) => {
            if (err) {
                console.error("Error downloading file:", err);
                res.status(500).json({ message: "Error generating report." });
            } else {
                console.log("Report downloaded successfully.");
                // Optionally, delete the file after download
                fs.unlink(filePath).catch(unlinkErr => console.error("Error deleting temp file:", unlinkErr));
            }
        });
    } catch (error) {
        console.error("Error creating report file:", error);
        res.status(500).json({ message: "Failed to generate report." });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Please create an 'images' directory in the same folder as server.js and place HISTORY12.jpg inside it.`);
});