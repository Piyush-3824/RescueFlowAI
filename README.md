# 🚨 RescueFlow AI

> **From Incident Detection to Intelligent Emergency Response**

RescueFlow AI is an AI-powered Emergency Response & Incident Management Platform designed to automate emergency reporting, incident analysis, responder notification, and live monitoring. The platform enables organizations to respond to accidents faster by leveraging Artificial Intelligence, real-time communication, and location intelligence.

---

# 📖 Overview

Every second matters during an emergency.

Industries such as manufacturing, construction, mining, logistics, healthcare, educational institutions, and smart cities often experience delays in emergency response due to manual reporting processes.

Traditional workflows require someone to:

- Identify the incident
- Call emergency services
- Explain the situation
- Share the location
- Inform supervisors
- Document the incident

These manual steps consume valuable time, increasing the risk of injuries, fatalities, equipment damage, and operational downtime.

RescueFlow AI streamlines this process by automatically understanding an incident and coordinating the response using AI.

---

# 🎯 Problem Statement

Emergency response systems today are largely reactive and depend heavily on manual communication.

Common challenges include:

- Delayed incident reporting
- Inaccurate or incomplete information
- Difficulty determining severity
- Slow emergency dispatch
- Lack of centralized incident tracking
- Poor communication between responders
- Manual incident documentation

These inefficiencies often lead to slower response times and increased operational risks.

---

# 💡 Solution

RescueFlow AI provides an intelligent platform capable of analyzing incidents submitted through multiple input formats.

Users can report an emergency using:

- 📷 Image
- 🎥 Video
- 🎤 Voice Recording
- 📝 Text Description

The AI instantly processes the input, identifies the incident, estimates its severity, captures the location, recommends appropriate emergency services, generates reports, and updates a live monitoring dashboard.

---

# ✨ Key Features

## 🤖 AI Incident Detection

Analyze uploaded images, videos, voice transcripts, or text descriptions using AI.

Automatically identifies:

- Fire
- Road Accident
- Construction Accident
- Factory Accident
- Electrical Hazard
- Chemical Spill
- Medical Emergency
- Equipment Failure
- Workplace Injury
- Other emergency situations

---

## 📊 Severity Assessment

AI estimates the seriousness of every incident.

Severity Levels:

- Low
- Medium
- High
- Critical

Each prediction includes a confidence score.

---

## 📍 Intelligent Location Detection

Automatically captures:

- GPS Coordinates
- User Location
- Incident Address
- Interactive Map View

---

## 🚑 Emergency Response Recommendation

Based on the detected emergency, RescueFlow AI recommends the most appropriate responders.

Examples include:

- Ambulance
- Fire Department
- Police
- Factory Safety Team
- Security Personnel
- Disaster Response Teams

---

## 📢 Smart Notification System

Instantly notifies relevant personnel through:

- SMS
- Email
- Push Notifications
- Voice Calls

Notification includes:

- Incident type
- Severity
- Location
- Timestamp
- Brief AI summary

---

## 📋 AI Incident Report Generation

Automatically generates structured reports containing:

- Incident ID
- Date & Time
- Incident Type
- Severity
- Location
- AI Analysis
- Recommended Response
- Current Status

Reports can be stored for auditing and compliance.

---

## 📈 Live Monitoring Dashboard

Track incidents in real time.

Dashboard displays:

- Active incidents
- Resolved incidents
- Severity distribution
- Incident timeline
- Response status
- Incident location
- Assigned responders

---

# 👥 Target Users

RescueFlow AI is designed for:

- Manufacturing Industries
- Construction Companies
- Mining Operations
- Warehouses
- Logistics Companies
- Educational Institutions
- Hospitals
- Corporate Campuses
- Smart Cities
- Government Agencies
- Public Safety Organizations

---

# 🔄 System Workflow

```
User Reports Incident
        │
        ▼
Upload Image / Video / Voice / Text
        │
        ▼
AI Analysis Engine
        │
        ├── Detect Incident
        ├── Estimate Severity
        ├── Generate Description
        ├── Calculate Confidence
        ▼
Capture GPS Location
        │
        ▼
Recommend Emergency Services
        │
        ▼
Send Notifications
        │
        ▼
Generate Incident Report
        │
        ▼
Update Live Dashboard
```

---

# 🛠 Technology Stack

## Frontend

- Next.js
- Framer Motion
- Tailwind CSS
- shadcn/ui


---

## Backend

-Fast API (python)

---

## AI

- Google Gemini API
- OpenAI Whisper API

Capabilities:

- Image Understanding
- Text Analysis
- Incident Classification
- Severity Prediction
- Response Recommendation

---

## Database

- Supabase PostgreSQL

---

## APIs & Services

- Google Maps API
- OpenAI Whisper API

---

# 📂 Project Structure

```
RescueFlow-AI
│
├── frontend
│   ├── src
│   ├── pages
│   ├── components
│   ├── hooks
│   ├── services
│   ├── assets
│   └── utils
│
├── backend
│   ├── api
│   ├── controllers
│   ├── routes
│   ├── services
│   ├── models
│   ├── utils
│   └── app.py
│
├── docs
│
├── README.md
├── SPEC.md
├── CLAUDE.md
├── .env.example
└── requirements.txt
```

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/your-username/RescueFlow-AI.git

cd RescueFlow-AI
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## Backend Setup

```bash
cd backend

pip install -r requirements.txt

python app.py
```

Backend runs on:

```
http://localhost:5000
```

---

# 🔑 Environment Variables

Create a `.env` file.

```
GEMINI_API_KEY=
FIREBASE_API_KEY=
GOOGLE_MAPS_API_KEY=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
EMAIL_SERVICE_API_KEY=
```

Never commit API keys or secrets to version control.

---

# 📊 Future Enhancements

- Live CCTV integration
- Drone-assisted emergency monitoring
- IoT sensor integration
- Predictive accident analytics
- Offline emergency reporting
- Multilingual AI support
- Wearable device integration
- Role-based access control
- Analytics dashboard
- Mobile application
- Voice-controlled emergency reporting

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push your branch.
5. Open a Pull Request.

Please follow the project's coding standards and maintain clear documentation.

---

# 👨‍💻 Authors

Developed by the RescueFlow AI Team.

---

# 🌟 Vision

Our vision is to transform emergency response by enabling AI-assisted incident detection, intelligent dispatch, and real-time coordination. RescueFlow AI aims to reduce response times, improve situational awareness, and support safer workplaces and communities through automation and data-driven decision-making.
