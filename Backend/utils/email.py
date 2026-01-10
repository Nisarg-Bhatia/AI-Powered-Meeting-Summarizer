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
