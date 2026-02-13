// ============================================
// NODE.JS EXPRESS BACKEND - server.js
// ============================================
// Run with: node server.js
// Make sure to install dependencies first:
// npm install express cors nodemailer body-parser
// ============================================

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// ===== CONFIGURATION =====
const EMAIL_CONFIG = {
  service: 'gmail', // or 'outlook', 'yahoo', etc.
  user: 'your-email@gmail.com', // CHANGE THIS!
  password: 'your-app-password', // CHANGE THIS! Use App Password for Gmail
  recipient: 'your-email@gmail.com' // Email to receive notifications
};

// Create data directory if it doesn't exist
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: EMAIL_CONFIG.service,
  auth: {
    user: EMAIL_CONFIG.user,
    pass: EMAIL_CONFIG.password
  }
});

// POST endpoint to receive quiz submissions
app.post('/submit', async (req, res) => {
  try {
    const data = req.body;
    
    // Add server timestamp
    data.serverTimestamp = new Date().toISOString();
    
    // Save to JSON file
    saveToJSON(data);
    
    // Send email notification
    await sendEmail(data);
    
    // Send success response
    res.json({ 
      status: 'success', 
      message: 'Your choices have been saved!' 
    });
    
  } catch (error) {
    console.error('Error processing submission:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Failed to save your choices' 
    });
  }
});

// Save data to JSON file
function saveToJSON(data) {
  const filename = path.join(DATA_DIR, 'responses.json');
  
  let responses = [];
  
  // Read existing data if file exists
  if (fs.existsSync(filename)) {
    const fileContent = fs.readFileSync(filename, 'utf8');
    responses = JSON.parse(fileContent);
  }
  
  // Add new response
  responses.push(data);
  
  // Write back to file
  fs.writeFileSync(filename, JSON.stringify(responses, null, 2));
  
  console.log('✅ Data saved to JSON file');
}

// Send email notification
async function sendEmail(data) {
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #ffeef8 0%, #ffe0f0 100%); padding: 30px; border-radius: 20px; }
          h1 { color: #ff1493; text-align: center; }
          .content { background: white; padding: 20px; border-radius: 15px; margin: 20px 0; }
          .choice-box { background: #ffeef8; padding: 15px; border-radius: 10px; margin: 15px 0; border-left: 4px solid #ff69b4; }
          .choice-box strong { color: #ff1493; }
          .info { background: white; padding: 15px; border-radius: 10px; margin: 20px 0; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>💖 Valentine's Day Quiz Results 💖</h1>
          
          <div class="content">
            <h2 style="color: #ff69b4;">Her Choices:</h2>
            
            <div class="choice-box">
              <strong>What describes our love:</strong><br>
              <span style="color: #333; font-size: 16px;">${data.choice1}</span>
            </div>
            
            <div class="choice-box">
              <strong>What makes her smile:</strong><br>
              <span style="color: #333; font-size: 16px;">${data.choice2}</span>
            </div>
            
            <div class="choice-box">
              <strong>Her perfect date:</strong><br>
              <span style="color: #333; font-size: 16px;">${data.choice3}</span>
            </div>
          </div>
          
          <div class="info">
            <p><strong>Completed at:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
            <p><strong>Server received:</strong> ${new Date(data.serverTimestamp).toLocaleString()}</p>
          </div>
          
          <p style="text-align: center; color: #ff1493; font-size: 18px; margin-top: 30px;">
            ❤️ Check your data/responses.json file for full details ❤️
          </p>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: EMAIL_CONFIG.user,
      to: EMAIL_CONFIG.recipient,
      subject: '💕 Valentine\'s Day Quiz Completed! 💕',
      html: htmlContent
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email notification sent');
    
  } catch (error) {
    console.error('❌ Error sending email:', error);
    // Don't throw error - continue even if email fails
  }
}

// GET endpoint to view all responses
app.get('/responses', (req, res) => {
  try {
    const filename = path.join(DATA_DIR, 'responses.json');
    
    if (fs.existsSync(filename)) {
      const fileContent = fs.readFileSync(filename, 'utf8');
      const responses = JSON.parse(fileContent);
      res.json({ 
        status: 'success', 
        count: responses.length,
        data: responses 
      });
    } else {
      res.json({ 
        status: 'success', 
        count: 0,
        data: [] 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.send('💕 Valentine\'s Day Quiz Backend is running! 💕');
});

// Start server
app.listen(PORT, () => {
  console.log('═══════════════════════════════════════');
  console.log('💖 Valentine\'s Day Quiz Server 💖');
  console.log('═══════════════════════════════════════');
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📊 View responses: http://localhost:${PORT}/responses`);
  console.log('═══════════════════════════════════════');
});

module.exports = app;
