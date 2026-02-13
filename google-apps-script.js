// ============================================
// GOOGLE APPS SCRIPT - BACKEND CODE
// ============================================
// Deploy this as a Web App in Google Apps Script
// 1. Go to script.google.com
// 2. Create new project
// 3. Paste this code
// 4. Deploy > New deployment > Web app
// 5. Set "Execute as: Me"
// 6. Set "Who has access: Anyone"
// 7. Copy the Web App URL to index.html
// ============================================

// Your email for notifications
const NOTIFICATION_EMAIL = 'your-email@gmail.com'; // CHANGE THIS!

// Google Sheet ID (create a new sheet and get ID from URL)
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // CHANGE THIS!

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Save to Google Sheet
    saveToSheet(data);
    
    // Send email notification
    sendEmailNotification(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error: ' + error);
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function saveToSheet(data) {
  try {
    // Open the spreadsheet
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Check if headers exist, if not create them
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Choice 1: What describes our love',
        'Choice 2: What makes you smile',
        'Choice 3: Perfect date',
        'User Agent'
      ]);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, 5);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#ff69b4');
      headerRange.setFontColor('#ffffff');
    }
    
    // Add the data
    sheet.appendRow([
      new Date(data.timestamp),
      data.choice1,
      data.choice2,
      data.choice3,
      data.userAgent
    ]);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, 5);
    
  } catch (error) {
    Logger.log('Error saving to sheet: ' + error);
    throw error;
  }
}

function sendEmailNotification(data) {
  try {
    const subject = '💕 Valentine\'s Day Quiz Completed! 💕';
    
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #ffeef8 0%, #ffe0f0 100%); padding: 30px; border-radius: 20px;">
        <h1 style="color: #ff1493; text-align: center;">💖 Valentine's Day Quiz Results 💖</h1>
        
        <div style="background: white; padding: 20px; border-radius: 15px; margin: 20px 0;">
          <h2 style="color: #ff69b4;">Her Choices:</h2>
          
          <div style="background: #ffeef8; padding: 15px; border-radius: 10px; margin: 15px 0; border-left: 4px solid #ff69b4;">
            <strong style="color: #ff1493;">What describes our love:</strong><br>
            <span style="color: #333; font-size: 16px;">${data.choice1}</span>
          </div>
          
          <div style="background: #ffeef8; padding: 15px; border-radius: 10px; margin: 15px 0; border-left: 4px solid #ff69b4;">
            <strong style="color: #ff1493;">What makes her smile:</strong><br>
            <span style="color: #333; font-size: 16px;">${data.choice2}</span>
          </div>
          
          <div style="background: #ffeef8; padding: 15px; border-radius: 10px; margin: 15px 0; border-left: 4px solid #ff69b4;">
            <strong style="color: #ff1493;">Her perfect date:</strong><br>
            <span style="color: #333; font-size: 16px;">${data.choice3}</span>
          </div>
        </div>
        
        <div style="background: white; padding: 15px; border-radius: 10px; margin: 20px 0;">
          <p style="color: #666; margin: 5px 0;"><strong>Completed at:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
        </div>
        
        <p style="text-align: center; color: #ff1493; font-size: 18px; margin-top: 30px;">
          ❤️ Check your Google Sheet for full details ❤️
        </p>
      </div>
    `;
    
    // Send email
    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: subject,
      htmlBody: htmlBody
    });
    
  } catch (error) {
    Logger.log('Error sending email: ' + error);
    // Don't throw error - continue even if email fails
  }
}

// For testing - can be removed in production
function doGet() {
  return ContentService
    .createTextOutput('Valentine\'s Day Quiz Backend is running! 💕')
    .setMimeType(ContentService.MimeType.TEXT);
}
