# LearnFlow — AI-Empowered Student Productivity & Future-Skills Platform

**One-line:** LearnFlow helps students set goals, generate personalized study plans with AI, complete micro-challenges, and track progress — all in one flow.  

---

## 🧠 Project Overview  
LearnFlow is an AI-powered web app that acts as a personalized mentor for students.  
You set a goal (e.g., *“Learn Python in 4 weeks”*), and LearnFlow automatically creates a week-by-week roadmap, micro-tasks, and a progress dashboard.  

You earn badges for completing milestones, visualize your learning journey, and stay consistent through gamified challenges.

---


## ✨ Core Features (MVP)
- ✅ Create an account or log in  
- 🎯 Enter a learning goal & timeframe  
- 🤖 AI Mentor: auto-generate weekly learning plan with resources  
- 📋 Micro-challenges & quick quizzes  
- 🏅 Earn skill badges and view progress analytics  
- 📊 Dashboard: track weekly consistency and achievements  
- 🌍 Shareable public profile  

*(Stretch goals: peer challenges, daily streaks, reminders)*

---

## 🛠️ Tech Stack
| Layer | Technologies |
|:--|:--|
| **Frontend** | HTML5, Tailwind CSS, Vue.js (or Vanilla JS) |
| **Backend** | Node.js (Express) |
| **AI Service** | Python (FastAPI + OpenAI API) |
| **Database** | PostgreSQL / Supabase |
| **Analytics** | Chart.js |
| **Deployment** | Vercel (frontend), Render/Railway (backend) |

---

## ⚙️ Architecture Overview
```
Frontend (Vercel)
   ↓ REST / WebSocket
Backend (Express)
   ↓
AI Service (FastAPI + OpenAI)
   ↓
Database (Supabase / PostgreSQL)
```
- The backend handles user auth, goal CRUD, badges, and analytics.  
- The AI service generates structured plans from natural-language goals.  
- Supabase stores users, goals, and progress.  

---

## 🚀 Quickstart — Local Setup

### Prerequisites
- Node.js ≥ 18  
- Python ≥ 3.10  
- PostgreSQL or Supabase account  
- OpenAI API Key  

### 1️⃣ Clone Repository
```bash
git clone https://github.com/yourusername/learnflow.git
cd learnflow
```

### 2️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
# build: npm run build
```

### 3️⃣ Backend Setup
```bash
cd ../backend
npm install
npm run dev
```
Backend runs on `http://localhost:4000`

### 4️⃣ AI Service Setup
```bash
cd ../ai-service
python -m venv venv
source venv/bin/activate   # (Windows: venv\Scripts\activate)
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 5️⃣ Database
- Create a Supabase project.  
- Copy the connection string and keys.  
- Import schema from `/db/schema.sql`.

---

## 🔐 Environment Variables

### Backend `.env`
```
PORT=4000
DATABASE_URL=postgres://user:pass@host:5432/dbname
JWT_SECRET=your_secret
AI_SERVICE_URL=http://localhost:8000
SUPABASE_URL=https://xyz.supabase.co
SUPABASE_KEY=public-anon-key
```

### AI Service `.env`
```
OPENAI_API_KEY=sk-xxxx
MODEL=gpt-4o-mini
MAX_TOKENS=800
```

---

## 🧩 Example API Endpoints

### Backend (Express)
| Method | Endpoint | Description |
|:--|:--|:--|
| POST | `/api/auth/register` | Create user |
| POST | `/api/auth/login` | Login |
| POST | `/api/goals` | Create learning goal |
| POST | `/api/goals/:id/generate-plan` | Generate plan via AI |
| GET | `/api/goals/:id` | Fetch goal and weekly plan |
| POST | `/api/tasks/:taskId/complete` | Mark task complete |
| GET | `/api/dashboard` | Progress summary |

### AI Service (FastAPI)
`POST /generate-plan`  
Request:
```json
{ "goal": "Learn Python", "timeframe_weeks": 4, "level": "beginner" }
```
Response:
```json
{
  "weeklyPlan": [
    { "week": 1, "tasks": ["Install Python", "Learn syntax", "Write first script"] }
  ]
}
```

---

## ☁️ Deployment
1. Deploy **frontend** → [Vercel](https://vercel.com)  
2. Deploy **backend** → [Render](https://render.com) or [Railway](https://railway.app)  
3. Deploy **AI service** → Render / Heroku  
4. Connect **Supabase** for DB and auth  
5. Update environment variables accordingly  

---

## 🎥 Hackathon Demo Tips
1. **Hook:** “Students know what they want to learn but not *how* to start.”  
2. **Demo Flow (1 min):**
   - Step 1: Enter “Learn Python in 4 weeks”.  
   - Step 2: AI instantly builds a 4-week roadmap.  
   - Step 3: Show micro-challenge completion + badge unlock.  
   - Step 4: Display progress dashboard.  
3. **Close with:** “LearnFlow helps students stay consistent — from goal to growth.”  

---

## 🚧 Future / Stretch Goals
- Google Calendar integration  
- Peer study rooms (real-time sync)  
- AI chat mentor inside dashboard  
- Gamified streaks / token rewards  
- Mobile PWA  

---

## 🤝 Contributing
1. Fork this repo  
2. Create branch `feature/your-feature`  
3. Commit + push  
4. Open PR with short explanation  

---

## 📄 License & Contact
**License:** MIT  
**Repo:** [github.com/yourusername/learnflow](https://github.com/yourusername/learnflow)  
**Contact:** youremail@example.com | @yourhandle  

---

## 🧾 Devpost Submission Snippet
**Title:** LearnFlow — Your Personal AI Mentor for Smarter Learning  
**Tagline:** AI that transforms goals into structured study flows with gamified motivation.  
**Problem:** Students struggle with consistency and structured learning.  
**Solution:** LearnFlow creates personalized weekly plans and visual progress dashboards.  
**Tech:** OpenAI API, FastAPI, Node.js, Vue.js, Tailwind, Supabase.  
**Demo:** [learnflow.vercel.app](https://learnflow.vercel.app)
