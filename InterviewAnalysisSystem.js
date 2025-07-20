import React, { useState } from 'react';
import Head from 'next/head';

const InterviewAnalysisSystem = () => {
    const [interviewData, setInterviewData] = useState([]);
    const [formData, setFormData] = useState({
        candidateName: '',
        interviewDate: '',
        interviewerName: '',
        technicalSkills: '',
        communicationSkills: '',
        problemSolvingSkills: '',
        overallFeedback: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setInterviewData([...interviewData, formData]);
        setFormData({
            candidateName: '',
            interviewDate: '',
            interviewerName: '',
            technicalSkills: '',
            communicationSkills: '',
            problemSolvingSkills: '',
            overallFeedback: '',
        });
    };

    return (
        <div>
            <Head>
                <title>Interview Analysis System</title>
                <meta name="description" content="A system to analyze and evaluate interviews" />
            </Head>
            <h1>Interview Analysis System</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="candidateName"
                    placeholder="Candidate Name"
                    value={formData.candidateName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="interviewDate"
                    value={formData.interviewDate}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="interviewerName"
                    placeholder="Interviewer Name"
                    value={formData.interviewerName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="technicalSkills"
                    placeholder="Technical Skills"
                    value={formData.technicalSkills}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="communicationSkills"
                    placeholder="Communication Skills"
                    value={formData.communicationSkills}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="problemSolvingSkills"
                    placeholder="Problem Solving Skills"
                    value={formData.problemSolvingSkills}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="overallFeedback"
                    placeholder="Overall Feedback"
                    value={formData.overallFeedback}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Submit</button>
            </form>
            <div>
                <h2>Interview Data</h2>
                {interviewData.length === 0 ? (
                    <p>No interview data available</p>
                ) : (
                    <ul>
                        {interviewData.map((data, index) => (
                            <li key={index}>
                                {data.candidateName} - {data.interviewDate} - {data.interviewerName}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default InterviewAnalysisSystem;