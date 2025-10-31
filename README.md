# HighDelite Travel Experiences 🌎

An immersive travel experience booking platform showcasing unique adventures across India. Built with modern web technologies and a focus on user experience.

## 🚀 Features

- 📱 Fully responsive design
- 🔍 Real-time search functionality
- 🎯 Detailed experience pages
- 💳 Seamless booking process
- ✨ Interactive UI elements
- 🔄 Loading states and error handling

## 🛠️ Tech Stack

### Frontend
- ⚛️ React (Vite)
- 🎨 Tailwind CSS
- 🛣️ React Router
- 🔄 Axios
- 📱 Responsive Design

### Backend
- 🚀 Node.js
- ⚡ Express.js
- 🗃️ MongoDB
- 🔐 Mongoose
- 🌐 CORS enabled

## 🏗️ Project Structure

```
HighDelite/
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   └── assets/       # Static assets
│   └── public/           # Public assets
└── backend/              # Node.js backend
    ├── data/            # Sample data
    └── models/          # MongoDB schemas
```

## 🌟 Key Components

- `Navbar`: Navigation and search functionality
- `ExperienceCard`: Display travel experiences
- `CheckoutForm`: Booking form with validation
- `ResultPage`: Booking confirmation display

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
\`\`\`

2. Install frontend dependencies:
\`\`\`bash
cd frontend
npm install
\`\`\`

3. Install backend dependencies:
\`\`\`bash
cd backend
npm install
\`\`\`

4. Create a .env file in the backend directory:
\`\`\`env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
\`\`\`

### Running the Application

1. Start the backend server:
\`\`\`bash
cd backend
npm start
\`\`\`

2. Start the frontend development server:
\`\`\`bash
cd frontend
npm run dev
\`\`\`

The application will be available at `http://localhost:5173`

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - 📱 Mobile: < 768px
  - 💻 Tablet: 768px - 1024px
  - 🖥️ Desktop: > 1024px

## ⭐ Experience Features

- Duration & pricing details
- Location information
- High-quality images
- Detailed descriptions
- Booking functionality
- Real-time availability

## 🔒 API Endpoints

- `GET /api/experiences`: List all experiences
- `GET /api/experiences/:id`: Get experience details
- `POST /api/bookings`: Create new booking

## 💫 Future Enhancements

- [ ] User authentication
- [ ] Payment gateway integration
- [ ] Review & rating system
- [ ] Personal dashboard
- [ ] Booking management
- [ ] Email notifications

## 📜 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👏 Acknowledgments

- Design inspiration from modern travel platforms
- Icons from Heroicons
- Images sourced from verified providers

---
Built with ❤️ using React & Node.js