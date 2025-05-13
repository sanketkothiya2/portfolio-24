# Portfolio Website with Email Notification

## Overview
This portfolio website includes a contact form with real-time email notifications. When a visitor submits the form, it sends an email to your Gmail account and an auto-reply to the visitor.

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Email Credentials
Create a `.env` file in the root directory with the following content:
```
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=your-app-password
PORT=5500
```

#### How to get an App Password for Gmail:
1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification if not already enabled
4. Go to "App passwords"
5. Create a new app password for "Mail" and "Other (Custom name)"
6. Copy the generated password and use it in your .env file

### 3. Start the Server
For development:
```bash
npm run dev
```

For production:
```bash
npm start
```

## Features
- Real-time form validation
- Instant email notification to the website owner
- Automatic confirmation email to the sender
- Responsive design

## Contact Form Flow
1. User fills out the contact form
2. Form is validated on the client-side
3. Data is sent to the backend API
4. Server sends email notification to you
5. Server sends confirmation email to the user
6. Success message displayed on the website

## Customization
You can customize the email templates in the server.js file to change the content of both the notification email and the auto-reply.

## Troubleshooting
- If emails are not being sent, check your .env file and make sure the credentials are correct
- Verify that you're using an app password and not your regular Gmail password
- Check if your Gmail has any security settings blocking the sending of emails

## Portfolio-Website
Portfolio website built using HTML5, CSS3, JavaScript, and jQuery.

<a href="https://jigarsable.netlify.app/" target="_blank">**Visit Now** 🚀</a>


## 📌 Tech Stack
[![HTML](https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white)](https://github.com/jigar-sable/Portfolio-Website/search?l=html)&nbsp;
[![CSS](https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white)](https://github.com/jigar-sable/Portfolio-Website/search?l=css)&nbsp;
[![JS](https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://github.com/jigar-sable/Portfolio-Website/search?l=javascript)
<img alt="jQuery" src="https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white"/>

### Extras : 
Particle.js, Typed.js, Tilt.js, Scroll Reveal, Tawk.to, Font Awesome and JSON

## 📌 Sneak Peek of Main Page 🙈 :
![mockup720](https://user-images.githubusercontent.com/64949957/124947013-1f682080-e02d-11eb-977e-df3bbd4fa838.png)
![ss](https://user-images.githubusercontent.com/64949957/159113640-d92665a8-f614-42b3-8456-66b97fc2e651.png)


<h2>📬 Contact</h2>

Feel free to reach me through the below handles if you'd like to contact me.

[![linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jigar-sablee)
[![instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/jigarsable.dev)
