import os
import logging
from typing import Dict, Any, Optional

logger = logging.getLogger("alertnex.sms")


class SMSService:
    """
    SMS Alert Service for AlertNex Emergency Warning System.

    Supports two modes:
    1. REAL SMS via Twilio (when TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER are set)
    2. SIMULATION mode (logs SMS content for hackathon demo when no credentials configured)

    For Indian SMS gateways (Fast2SMS, MSG91, Textlocal), 
    the architecture is plug-and-play — simply swap the send method.
    """

    @staticmethod
    def get_sms_config() -> Dict[str, Any]:
        return {
            "enabled": os.getenv("SMS_ENABLED", "true").lower() in ("true", "1", "yes"),
            "provider": os.getenv("SMS_PROVIDER", "twilio"),  # twilio | fast2sms | simulation
            "twilio_sid": os.getenv("TWILIO_ACCOUNT_SID", ""),
            "twilio_token": os.getenv("TWILIO_AUTH_TOKEN", ""),
            "twilio_from": os.getenv("TWILIO_FROM_NUMBER", ""),
        }

    @classmethod
    def send_emergency_sms(
        cls,
        recipient_phone: str,
        alert_title: str,
        risk_level: str,
        risk_score: float,
        location: str,
        recommended_action: str,
        emergency_corridor: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Send an emergency SMS alert to a phone number.
        Falls back to simulation mode if Twilio is not configured.
        """
        cfg = cls.get_sms_config()

        if not recipient_phone or len(recipient_phone) < 10:
            return {
                "success": False,
                "error": "Invalid phone number. Please provide a valid phone number with country code (e.g., +91XXXXXXXXXX)."
            }

        # Ensure phone has country code
        phone = recipient_phone.strip()
        if not phone.startswith("+"):
            phone = "+91" + phone  # Default to India country code

        # Build SMS message (160 char limit awareness)
        sms_body = (
            f"🚨 ALERTNEX {risk_level} WARNING\n"
            f"Location: {location}\n"
            f"Risk: {risk_score}%\n"
            f"{alert_title}\n"
            f"Action: {recommended_action}\n"
        )
        if emergency_corridor:
            sms_body += f"Alt Route: {emergency_corridor}\n"
        sms_body += "— AlertNex MDoNER SIH26001"

        # Check if Twilio credentials are available
        if cfg["twilio_sid"] and cfg["twilio_token"] and cfg["twilio_from"]:
            return cls._send_via_twilio(cfg, phone, sms_body)
        else:
            return cls._send_simulated(phone, sms_body, risk_level, risk_score, location)

    @classmethod
    def _send_via_twilio(cls, cfg: Dict, phone: str, body: str) -> Dict[str, Any]:
        """Real SMS delivery via Twilio API."""
        try:
            from twilio.rest import Client

            client = Client(cfg["twilio_sid"], cfg["twilio_token"])
            message = client.messages.create(
                body=body,
                from_=cfg["twilio_from"],
                to=phone
            )

            logger.info(f"SMS sent to {phone} via Twilio. SID: {message.sid}")
            return {
                "success": True,
                "provider": "twilio",
                "recipient": phone,
                "message_sid": message.sid,
                "message": f"Emergency SMS successfully delivered to {phone} via Twilio!"
            }

        except ImportError:
            logger.error("Twilio package not installed. Run: pip install twilio")
            return {
                "success": False,
                "error": "Twilio library not installed. Run: pip install twilio"
            }
        except Exception as e:
            logger.error(f"Twilio SMS error: {e}")
            return {
                "success": False,
                "error": f"Failed to send SMS via Twilio: {str(e)}"
            }

    @classmethod
    def _send_simulated(cls, phone: str, body: str, risk_level: str, risk_score: float, location: str) -> Dict[str, Any]:
        """
        Simulation mode for SIH hackathon demo.
        Logs the SMS that would be sent and returns success.
        """
        logger.info(f"[SIMULATED SMS] To: {phone} | Body: {body}")
        return {
            "success": True,
            "provider": "simulation",
            "simulated": True,
            "recipient": phone,
            "sms_body": body,
            "message": (
                f"SMS alert simulated for {phone}. "
                f"In production, this integrates with Twilio / C-DOT / NDMA CAP gateway for real delivery. "
                f"Alert: {risk_level} risk ({risk_score}%) at {location}."
            ),
            "production_note": "Configure TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_FROM_NUMBER in .env for real SMS delivery."
        }
