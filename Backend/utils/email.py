import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from backend.auth_settings import settings

def send_password_reset_email(email: str, reset_token: str):
    """Send password reset email"""
    reset_url = f"{settings.FRONTEND_URL}/reset-password/{reset_token}"
    
    # Create message
    message = MIMEMultipart("alternative")
    message["Subject"] = "Password Reset Request - MeetSmart AI"
    message["From"] = settings.EMAIL_FROM
    message["To"] = email
    
    # HTML content
    html = f"""
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #10b981;">Password Reset Request</h1>
          <p>You requested a password reset for your MeetSmart AI account.</p>
          <p>Please click the button below to reset your password:</p>
          <div style="margin: 30px 0;">
            <a href="{reset_url}" 
               style="display: inline-block; padding: 12px 24px; background-color: #10b981; 
                      color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Reset Password
            </a>
          </div>
          <p style="color: #666;">This link will expire in 10 minutes.</p>
          <p style="color: #666;">If you didn't request this, please ignore this email.</p>
          <br>
          <p>Best regards,<br><strong>MeetSmart AI Team</strong></p>
        </div>
      </body>
    </html>
    """
    
    # Attach HTML content
    part = MIMEText(html, "html")
    message.attach(part)
    
    # Send email
    try:
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.sendmail(settings.EMAIL_FROM, email, message.as_string())
        print(f"📧 Password reset email sent to {email}")
    except Exception as e:
        print(f"❌ Failed to send email: {str(e)}")
        raise Exception("Failed to send password reset email")

def send_welcome_email(email: str, name: str):
    """Send welcome email to new user"""
    
    # Create message
    message = MIMEMultipart("alternative")
    message["Subject"] = "Hey {name}, welcome aboard!"
    message["From"] = settings.EMAIL_FROM
    message["To"] = email
    
    # HTML content
    html = f"""
    <html>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.7; color: #2c3e50;">
        <div style="max-width: 560px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #ffffff; padding: 35px 30px;">
            
            <h2 style="color: #1a1a1a; font-size: 24px; font-weight: 600; margin: 0 0 20px 0;">
              Hey {name} 👋
            </h2>
            
            <p style="margin: 0 0 16px 0; font-size: 15px; color: #4a5568;">
              Thanks for signing up! We're really glad you're here.
            </p>
            
            <p style="margin: 0 0 16px 0; font-size: 15px; color: #4a5568;">
              MeetSmart helps you get more out of your meetings — quick summaries, 
              action items you won't forget, and insights that actually matter.
            </p>
            
            <p style="margin: 0 0 20px 0; font-size: 15px; color: #4a5568;">
              Here's what you can do:
            </p>
            
            <ul style="margin: 0 0 24px 0; padding-left: 20px; font-size: 15px; color: #4a5568;">
              <li style="margin-bottom: 8px;">Get instant meeting summaries</li>
              <li style="margin-bottom: 8px;">Never miss an action item</li>
              <li style="margin-bottom: 8px;">Connect your calendar</li>
              <li style="margin-bottom: 8px;">Save time, stay organized</li>
            </ul>
            
            <div style="margin: 30px 0;">
              <a href="{settings.FRONTEND_URL}" 
                 style="display: inline-block; padding: 12px 28px; background-color: #10b981; 
                        color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 500;
                        font-size: 15px;">
                Jump in
              </a>
            </div>
            
            <p style="margin: 28px 0 0 0; font-size: 15px; color: #4a5568;">
              Questions? Just reply to this email.
            </p>
            
            <p style="margin: 24px 0 0 0; font-size: 15px; color: #4a5568;">
              Cheers,<br>
              The MeetSmart team
            </p>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; font-size: 13px; color: #a0aec0; text-align: center;">
                MeetSmart · 2026
              </p>
            </div>
            
          </div>
        </div>
      </body>
    </html>
    """
    
    # Attach HTML content
    part = MIMEText(html, "html")
    message.attach(part)
    
    # Send email
    try:
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.sendmail(settings.EMAIL_FROM, email, message.as_string())
        print(f"Welcome email sent to {email}")
        return True
    except Exception as e:
        print(f"Failed to send welcome email: {str(e)}")
        return False
