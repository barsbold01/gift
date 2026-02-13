# 💕 Valentine's Day Interactive Quiz - Complete Setup Guide 💕

## 📁 File Structure
```
valentines-quiz/
├── index.html                  # Main website file
├── google-apps-script.js       # Backend Option A: Google Apps Script
├── server.js                   # Backend Option B: Node.js Express
├── package.json                # Node.js dependencies
└── README.md                   # This file
```

---

## 🚀 QUICK START (3 Easy Steps)

### Step 1: Choose Your Backend Option

You have 2 options for the backend:
- **Option A: Google Apps Script** (Recommended - Easier, Free, No Server Needed)
- **Option B: Node.js Server** (For advanced users with coding experience)

### Step 2: Setup Backend (Choose ONE)

#### ✅ OPTION A: Google Apps Script Setup (RECOMMENDED)

1. **Create a Google Sheet:**
   - Go to https://sheets.google.com
   - Create a new blank spreadsheet
   - Name it "Valentine's Quiz Responses"
   - Copy the Sheet ID from the URL (the long string between /d/ and /edit)
     Example URL: `https://docs.google.com/spreadsheets/d/ABC123XYZ/edit`
     Sheet ID is: `ABC123XYZ`

2. **Create Google Apps Script:**
   - Go to https://script.google.com
   - Click "New Project"
   - Delete any existing code
   - Copy and paste ALL code from `google-apps-script.js`
   - **IMPORTANT: Update these lines:**
     ```javascript
     const NOTIFICATION_EMAIL = 'your-email@gmail.com'; // Your email
     const SHEET_ID = 'ABC123XYZ'; // Your Sheet ID from step 1
     ```

3. **Deploy the Script:**
   - Click "Deploy" → "New deployment"
   - Click the gear icon ⚙️ next to "Select type"
   - Choose "Web app"
   - Fill in:
     - Description: "Valentine Quiz Backend"
     - Execute as: **Me**
     - Who has access: **Anyone**
   - Click "Deploy"
   - **IMPORTANT:** Copy the Web App URL (looks like: https://script.google.com/macros/s/...)

4. **Update index.html:**
   - Open `index.html` in a text editor
   - Find this line (around line 450):
     ```javascript
     const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
     ```
   - Replace with your Web App URL:
     ```javascript
     const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_URL_HERE';
     ```
   - Make sure this is set to true:
     ```javascript
     const USE_GOOGLE_SCRIPT = true;
     ```

5. **Test the Script:**
   - In Google Apps Script, click "Deploy" → "Test deployments"
   - Click the web app URL
   - You should see: "Valentine's Day Quiz Backend is running! 💕"

✅ **DONE!** Your backend is ready!

---

#### ⚙️ OPTION B: Node.js Server Setup (ADVANCED)

1. **Prerequisites:**
   - Install Node.js from https://nodejs.org (v14 or higher)
   - Install npm (comes with Node.js)

2. **Setup Email (Gmail):**
   - Go to your Google Account settings
   - Enable 2-factor authentication
   - Generate an App Password:
     - Go to: https://myaccount.google.com/apppasswords
     - Select "Mail" and "Other (Custom name)"
     - Name it "Valentine Quiz"
     - Copy the 16-character password

3. **Configure Server:**
   - Open `server.js`
   - Update EMAIL_CONFIG:
     ```javascript
     const EMAIL_CONFIG = {
       service: 'gmail',
       user: 'your-actual-email@gmail.com',
       password: 'your-16-char-app-password',
       recipient: 'your-actual-email@gmail.com'
     };
     ```

4. **Install Dependencies:**
   ```bash
   npm install
   ```

5. **Start Server:**
   ```bash
   npm start
   ```
   You should see:
   ```
   💖 Valentine's Day Quiz Server 💖
   ✅ Server running on http://localhost:3000
   ```

6. **Update index.html:**
   - Open `index.html`
   - Find this line:
     ```javascript
     const USE_GOOGLE_SCRIPT = true;
     ```
   - Change to:
     ```javascript
     const USE_GOOGLE_SCRIPT = false;
     ```

✅ **DONE!** Your server is running!

---

### Step 3: Deploy the Website

#### 📱 Option 1: Test Locally (Quick Test)

1. Open `index.html` directly in your web browser
2. Or use a simple HTTP server:
   ```bash
   # If you have Python installed:
   python -m http.server 8000
   # Then open: http://localhost:8000
   ```

#### 🌐 Option 2: Deploy to GitHub Pages (FREE & EASY)

1. **Create GitHub Repository:**
   - Go to https://github.com
   - Click "New repository"
   - Name it: `valentines-quiz` (or any name)
   - Make it **Private** (so it's secret!)
   - Click "Create repository"

2. **Upload Files:**
   - Click "uploading an existing file"
   - Drag and drop `index.html`
   - Click "Commit changes"

3. **Enable GitHub Pages:**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: Select "main" branch
   - Click "Save"
   - Wait 2-3 minutes
   - Your site will be live at: `https://YOUR-USERNAME.github.io/valentines-quiz/`

4. **Share the Link:**
   - Copy the URL
   - Send it to your girlfriend! 💕

#### 🚀 Option 3: Deploy to Netlify (ALTERNATIVE)

1. Go to https://netlify.com
2. Sign up for free
3. Drag and drop `index.html` to Netlify
4. Get your custom URL instantly!

---

## 🎨 CUSTOMIZATION GUIDE

### Change Images:

The website uses Unsplash images. To replace with your own:

1. Find the image URLs in `index.html`
2. Look for lines like:
   ```html
   <img src="https://images.unsplash.com/photo-..." alt="Adventure" class="option-image">
   ```
3. Replace with your own image URLs or local files:
   ```html
   <img src="your-image.jpg" alt="Adventure" class="option-image">
   ```

### Change Questions & Options:

Edit the HTML content in each screen section:
- Screen 1 starts at `<!-- Screen 1: First Selection -->`
- Screen 2 starts at `<!-- Screen 2: Second Selection -->`
- Screen 3 starts at `<!-- Screen 3: Third Selection -->`

### Change Colors:

Edit the CSS at the top of `index.html`:
```css
background: linear-gradient(135deg, #ffeef8 0%, #ffe0f0 50%, #ffd6eb 100%);
/* Change these hex colors to your preference */
```

### Add Background Music:

1. Add an MP3 file to your project
2. Update the audio tag in `index.html`:
   ```html
   <audio id="bg-music" loop>
       <source src="romantic-music.mp3" type="audio/mpeg">
   </audio>
   ```
3. The music control button will work automatically!

---

## 📊 View Responses

### If using Google Apps Script:
- Open your Google Sheet
- All responses will appear automatically
- Each row = one submission

### If using Node.js:
- Check `data/responses.json` file
- Or visit: `http://localhost:3000/responses`
- View formatted JSON with all submissions

---

## 🐛 TROUBLESHOOTING

### Problem: "Choices not saving"
**Solution:**
- Check browser console (F12) for errors
- Make sure you updated the GOOGLE_SCRIPT_URL or backend URL
- For Google Script: Redeploy as "New deployment"

### Problem: "CORS error" (if using Node.js)
**Solution:**
- Server must be running (`npm start`)
- Check firewall/antivirus isn't blocking port 3000

### Problem: "Email not sending"
**Google Script:**
- Gmail might block the first email - check spam folder
- Try sending a test email from the script editor

**Node.js:**
- Make sure you're using App Password, not regular password
- Check email credentials are correct

### Problem: "Website looks broken on mobile"
**Solution:**
- The site is responsive, but test on real device
- Clear browser cache
- Try different browser

---

## 🔒 PRIVACY & SECURITY

### Google Apps Script:
- Make the Google Sheet PRIVATE
- Don't share the Sheet ID publicly
- Only you can access the responses

### Node.js:
- Never commit `server.js` with real passwords to GitHub
- Use environment variables in production
- Keep the data folder secure

---

## 💡 TIPS FOR SUCCESS

1. **Test Before Sending:**
   - Go through the entire quiz yourself first
   - Make sure all screens work
   - Verify you receive the email/data

2. **Mobile Preview:**
   - Most people will view on phone
   - Test on mobile before sharing

3. **Timing:**
   - Send the link at a romantic moment
   - Valentine's Day morning is perfect!

4. **Backup Plan:**
   - Keep screenshots of the website
   - Save responses manually if needed

---

## 📱 SHARING THE LINK

Once deployed, you can:
- Text the link directly
- Create a QR code (use qr-code-generator.com)
- Put it in a romantic card
- Send via WhatsApp/Messenger

**Example Message:**
```
Hey babe! 💕
I made something special for you...
Click here: [your-link]
Love you! ❤️
```

---

## ✨ WHAT HAPPENS WHEN SHE COMPLETES IT

1. She goes through 3 screens of choices
2. Sees a beautiful final message
3. Her choices are displayed
4. **You receive:**
   - Email notification with all her choices
   - Data saved in Google Sheet or JSON file
   - Timestamp of when she completed it

---

## 🎯 NEXT STEPS

1. Choose your backend (Option A recommended)
2. Follow setup steps carefully
3. Test the website yourself
4. Deploy to GitHub Pages or Netlify
5. Send the link to your girlfriend!

---

## ❤️ ADDITIONAL FEATURES YOU CAN ADD

- Add more questions/screens
- Include photos of you two
- Add a video message
- Create a photo gallery
- Add countdown timer
- Include love letters

---

## 📞 SUPPORT

If you need help:
1. Check browser console for errors (F12)
2. Review the troubleshooting section
3. Make sure all URLs are updated correctly
4. Test each component separately

---

**Good luck and Happy Valentine's Day! 💕**

Made with ❤️ for your special someone
