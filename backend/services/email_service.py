import os
import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any, Optional

logger = logging.getLogger("alertnex.email")

class EmailService:
    @staticmethod
    def get_smtp_config() -> Dict[str, Any]:
        return {
            "enabled": os.getenv("SMTP_ENABLED", "true").lower() in ("true", "1", "yes"),
            "host": os.getenv("SMTP_HOST", "smtp.gmail.com"),
            "port": int(os.getenv("SMTP_PORT", "587")),
            "username": os.getenv("SMTP_USERNAME", ""),
            "password": os.getenv("SMTP_PASSWORD", ""),
            "from_email": os.getenv("SMTP_FROM_EMAIL", os.getenv("SMTP_USERNAME", "alertnex.disaster.mgmt@gmail.com")),
            "from_name": os.getenv("SMTP_FROM_NAME", "AlertNex Disaster Early Warning")
        }

    @classmethod
    def send_emergency_email(
        cls,
        recipient_email: str,
        alert_title: str,
        risk_level: str,
        risk_score: float,
        location: str,
        potential_impact: str,
        recommended_action: str,
        emergency_corridor: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Sends an official disaster early warning HTML email to a real recipient.
        """
        cfg = cls.get_smtp_config()

        if not recipient_email or "@" not in recipient_email:
            return {
                "success": False,
                "error": "Invalid recipient email address provided."
            }

        # Check if credentials are set
        if not cfg["username"] or not cfg["password"]:
            return {
                "success": False,
                "error": "SMTP credentials not configured. Please provide SMTP_USERNAME and SMTP_PASSWORD in backend/.env (e.g. Gmail address & 16-character App Password).",
                "simulated": True
            }

        # Color mapping for risk level
        badge_color = "#ef4444" if risk_level == "CRITICAL" else ("#f97316" if risk_level == "HIGH" else "#f59e0b")

        # Create HTML email
        subject = f"🚨 [{risk_level} ALERT] Landslide Early Warning: {location} (Risk Score: {risk_score}%)"

        html_body = f"""
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0b192c; color: #f8fafc; margin: 0; padding: 20px; }}
            .container {{ max-width: 600px; margin: 0 auto; background-color: #10243e; border: 1px solid #1e426d; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.5); }}
            .header {{ background: linear-gradient(135deg, #0b192c 0%, #152e4d 100%); padding: 24px; border-bottom: 2px solid {badge_color}; }}
            .brand {{ font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; }}
            .brand span {{ color: #f97316; }}
            .sub {{ font-size: 11px; color: #94a3b8; text-transform: uppercase; margin-top: 4px; }}
            .content {{ padding: 24px; }}
            .alert-banner {{ background-color: rgba(239, 68, 68, 0.15); border-left: 4px solid {badge_color}; padding: 16px; border-radius: 6px; margin-bottom: 20px; }}
            .risk-tag {{ display: inline-block; background-color: {badge_color}; color: #ffffff; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: bold; text-transform: uppercase; }}
            .title {{ font-size: 18px; font-weight: bold; color: #ffffff; margin: 8px 0 4px; }}
            .detail-row {{ margin-bottom: 14px; font-size: 13px; line-height: 1.5; }}
            .detail-label {{ font-weight: bold; color: #cbd5e1; text-transform: uppercase; font-size: 11px; }}
            .detail-val {{ color: #f1f5f9; margin-top: 2px; }}
            .emergency-box {{ background-color: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; border-radius: 8px; padding: 14px; margin-top: 20px; }}
            .footer {{ background-color: #07111e; padding: 16px 24px; font-size: 11px; color: #64748b; text-align: center; border-top: 1px solid #1e426d; }}
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="brand">Alert<span>Nex</span> Early Warning System</div>
              <div class="sub">Ministry of Development of North Eastern Region (MDoNER) | SIH26001</div>
            </div>
            
            <div class="content">
              <div class="alert-banner">
                <span class="risk-tag">{risk_level} RISK • {risk_score}% PROBABILITY</span>
                <div class="title">{alert_title}</div>
                <div style="font-size: 12px; color: #fca5a5;">Sector: {location}</div>
              </div>

              <div class="detail-row">
                <div class="detail-label">Potential Infrastructure Impact:</div>
                <div class="detail-val">{potential_impact}</div>
              </div>

              <div class="detail-row">
                <div class="detail-label">Recommended Response Action:</div>
                <div class="detail-val">{recommended_action}</div>
              </div>

              {f'''
              <div class="emergency-box">
                <div style="color: #34d399; font-weight: bold; font-size: 11px; text-transform: uppercase;">SUGGESTED EMERGENCY DETOUR CORRIDOR:</div>
                <div style="color: #ffffff; font-size: 13px; font-weight: 600; margin-top: 4px;">{emergency_corridor}</div>
                <div style="color: #cbd5e1; font-size: 11px; margin-top: 2px;">Decision-Support recommendation for medical evacuation and relief convoys.</div>
              </div>
              ''' if emergency_corridor else ''}
            </div>

            <div class="footer">
              This automated emergency advisory was generated by AlertNex Decision-Support System.<br>
              Smart India Hackathon 2026 | Team AlertNex (Lead: Ayush Kumar)
            </div>
          </div>
        </body>
        </html>
        """

        plain_text = f"""
        AlertNex Early Warning Advisory [{risk_level} RISK - {risk_score}%]
        Location: {location}
        Title: {alert_title}
        Potential Impact: {potential_impact}
        Recommended Action: {recommended_action}
        Alternative Route: {emergency_corridor or 'Refer to dashboard'}
        
        --
        Ministry of Development of North Eastern Region (MDoNER) | SIH26001
        Team AlertNex
        """

        try:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = subject
            msg["From"] = f"{cfg['from_name']} <{cfg['from_email']}>"
            msg["To"] = recipient_email

            msg.attach(MIMEText(plain_text, "plain"))
            msg.attach(MIMEText(html_body, "html"))

            logger.info(f"Connecting to SMTP server {cfg['host']}:{cfg['port']}...")
            server = smtplib.SMTP(cfg["host"], cfg["port"], timeout=15)
            server.starttls()
            server.login(cfg["username"], cfg["password"])
            server.sendmail(cfg["from_email"], [recipient_email], msg.as_string())
            server.quit()

            logger.info(f"Emergency email successfully sent to {recipient_email}")
            return {
                "success": True,
                "recipient": recipient_email,
                "subject": subject,
                "message": f"Emergency alert email successfully delivered to {recipient_email}!"
            }

        except Exception as e:
            logger.error(f"SMTP error sending email to {recipient_email}: {e}")
            return {
                "success": False,
                "error": f"Failed to send email via SMTP: {str(e)}"
            }
