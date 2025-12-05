Prayer Times Viewer 🌙🕌

Overview
Prayer Times Viewer is a modern, responsive web app that displays daily prayer times for users around the world. It includes authentication, personalized settings, AI-powered prayer tips, and supports multiple countries with significant Muslim populations.

Features

User Authentication

Email/Password signup & login

Google and Facebook login via Firebase Authentication

Login/logout flow

Frontend

Responsive design for mobile and desktop

Clean, modern UI with rounded corners, shadows, and hover effects

City selection dropdown for prayer times

Supports popular Muslim countries: USA, Germany, Saudi Arabia, Dubai, Qatar, Egypt, Palestine, Ethiopia, and others

Backend & Database

Firestore database stores user info: email, name, selected city, and preferences

Prayer times data stored per city

Firebase Functions handle AI-powered prayer tips

AI Features

Get AI-generated tips based on your selected city and preferences

Powered by Google Gemini / Generative AI API

Deployment

Ready for deployment on Vercel

SPA routing ensures smooth navigation

Automatic updates from GitHub pushes

Setup Instructions

Clone the repository:

git clone https://github.com/usamaawol/prayertime2025.git


Install dependencies:

cd prayertime2025
npm install


Configure Firebase:

Add your firebaseConfig.js with your Firebase API key and settings.

Run the project locally:

npm start


Deploy to Vercel (or any preferred hosting):

Connect your GitHub repo to Vercel

Automatic deployment on push to main branch

Project Structure

/PrayerTime
├─ index.html        # Main HTML file
├─ style.css         # Stylesheet
├─ script.js         # JavaScript frontend logic
├─ firebaseConfig.js # Firebase configuration
├─ functions/        # Firebase Cloud Functions
└─ README.md         # Project documentation


Firebase Rules & Security

Ensure Firestore rules are set up properly for read/write access

Enable Google & Facebook sign-in in Firebase Authentication

Add your domain(s) to the authorized domains list

Contributing

Pull requests are welcome!

For major changes, please open an issue first.

License

MIT License

Contact

Developer: Usama Awol

GitHub: https://github.com/usamaawol/prayer_time_2025
