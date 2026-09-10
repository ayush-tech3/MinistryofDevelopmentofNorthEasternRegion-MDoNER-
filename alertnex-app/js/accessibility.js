/**
 * AlertNex - Inclusive Voice & Visual Accessibility Module
 * Designed for citizens with low literacy, visual impairment, and field reporting
 * Smart India Hackathon 2026 | PS ID: SIH26001
 * Ministry of Development of North Eastern Region (MDoNER)
 * Team: AlertNex (Leader: Ayush Kumar)
 */

const AlertNexAccessibility = {
  selectedLang: "hi-IN", // Default Hindi for vernacular assistance, switchable to en-IN, bn-IN/as-IN
  isSpeaking: false,
  isListening: false,
  speechRecognition: null,
  currentUtterance: null,

  // Vernacular translations & voice dictionary
  translations: {
    "hi-IN": {
      langName: "हिन्दी (Hindi)",
      welcome: "अलर्टनेक्स में आपका स्वागत है। उत्तर-पूर्वी क्षेत्र का पूर्व चेतावनी और आपदा प्रबंधन पोर्टल।",
      listening: "सुन रहे हैं... कृपया बोलिए...",
      speechNotSupported: "आपके ब्राउज़र में वॉयस रिकग्निशन उपलब्ध नहीं है। कृपया नया ब्राउज़र इस्तेमाल करें।",
      sosSuccess: "आपका आपातकालीन अलर्ट दर्ज हो गया है। स्थान जीपीएस द्वारा रिकॉर्ड कर लिया गया है।",
      listeningHelp: "आप बोल सकते हैं जैसे: 'चेरापूंजी में भूस्खलन हुआ है और रास्ता बंद हो गया है'",
      stopAudio: "ऑडियो रोकें",
      listenPage: "पेज की जानकारी सुनें",
      voiceReportBtn: "🎙️ बोलकर रिपोर्ट करें",
      visualModeTitle: "सरल चित्र आपातकालीन रिपोर्टिंग (1-Click Visual SOS)",
      visualModeSub: "बिना लिखे या पढ़े सिर्फ तस्वीर छूकर तुरंत सहायता और अलर्ट भेजें",
      cards: {
        landslide: "भूस्खलन / पहाड़ खिसकना",
        roadblock: "सड़क / पुल अवरुद्ध",
        flood: "बाढ़ / भारी जलभराव",
        crack: "जमीन में दरार / खतरा",
        medical: "आपातकालीन मेडिकल सहायता"
      }
    },
    "en-IN": {
      langName: "English",
      welcome: "Welcome to AlertNex. Early warning and landslide monitoring decision support system for North Eastern Region.",
      listening: "Listening... Please speak your emergency details...",
      speechNotSupported: "Voice recognition is not supported in this browser.",
      sosSuccess: "Emergency SOS incident report has been submitted successfully with GPS coordinates.",
      listeningHelp: "You can speak e.g. 'Active landslide near Cherrapunji highway road blocked'",
      stopAudio: "Stop Voice",
      listenPage: "Listen to Page Summary",
      voiceReportBtn: "🎙️ Report by Voice",
      visualModeTitle: "1-Click Visual Emergency SOS (No Typing Needed)",
      visualModeSub: "Tap any hazard icon to instantly dispatch verified geo-tagged emergency alerts",
      cards: {
        landslide: "Active Landslide",
        roadblock: "Road / Bridge Blockage",
        flood: "Flash Flood / Waterlogging",
        crack: "Ground Crack / Slump",
        medical: "Urgent Medical Rescue"
      }
    },
    "bn-IN": {
      langName: "বাংলা / অসমীয়া (Regional)",
      welcome: "অ্যালার্টনেক্স-এ স্বাগতম। উত্তর-পূর্বাঞ্চলের ভূমিধস ও দুর্যোগ ব্যবস্থাপনা পোর্টাল।",
      listening: "শুনছি... দয়া করে আপনার সমস্যার কথা বলুন...",
      speechNotSupported: "আপনার ব্রাউজারে ভয়েস সাপোর্ট নেই।",
      sosSuccess: "জরুরী সতর্কতা সফলভাবে রিপোর্ট করা হয়েছে। জিপিএস অবস্থান নেওয়া হয়েছে।",
      listeningHelp: "আপনি বলতে পারেন: 'চেরাপুঞ্জিতে ভূমিধস হয়েছে, রাস্তা বন্ধ'",
      stopAudio: "অডিও বন্ধ করুন",
      listenPage: "পৃষ্ঠা শুনুন",
      voiceReportBtn: "🎙️ মুখে বলে রিপোর্ট করুন",
      visualModeTitle: "সহজ ভিজ্যুয়াল এসওএস মোড",
      visualModeSub: "লিখতে বা পড়তে না জানলেও শুধু ছবিতে ক্লিক করে বিপদ সংকেত পাঠান",
      cards: {
        landslide: "ভূমিধস / মাটি ধসা",
        roadblock: "রাস্তা বন্ধ / ব্রিজ ক্ষতিগ্রস্ত",
        flood: "বন্যা / ভারী জল জমা",
        crack: "মাটিতে ফাটল",
        medical: "জরুরী চিকিৎসা সহায়তা"
      }
    }
  },

  init() {
    this.setupSpeechRecognition();
    this.injectAccessibilityUI();
    this.bindEvents();
    console.log("AlertNex Accessibility & Voice Engine Initialized.");
  },

  // ─── Setup Web Speech Recognition ──────────────────────────────────────────
  setupSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.speechRecognition = new SpeechRecognition();
      this.speechRecognition.continuous = false;
      this.speechRecognition.interimResults = true;
      this.speechRecognition.lang = this.selectedLang;

      this.speechRecognition.onstart = () => {
        this.isListening = true;
        this.updateVoiceMicUI(true);
      };

      this.speechRecognition.onresult = (event) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const recognizedText = finalTranscript || interimTranscript;
        this.handleVoiceTranscription(recognizedText, Boolean(finalTranscript));
      };

      this.speechRecognition.onerror = (event) => {
        console.warn("Speech recognition error:", event.error);
        this.isListening = false;
        this.updateVoiceMicUI(false);
      };

      this.speechRecognition.onend = () => {
        this.isListening = false;
        this.updateVoiceMicUI(false);
      };
    }
  },

  setLanguage(langCode) {
    this.selectedLang = langCode;
    if (this.speechRecognition) {
      this.speechRecognition.lang = langCode;
    }
    const t = this.translations[this.selectedLang] || this.translations["hi-IN"];
    if (window.AlertNexApp) {
      AlertNexApp.showToast(`भाषा बदली गई / Language set to: ${t.langName}`);
    }
    this.speak(t.welcome);
  },

  // ─── Text-to-Speech Engine ────────────────────────────────────────────────
  speak(text, onComplete) {
    if (!("speechSynthesis" in window)) {
      if (window.AlertNexApp) AlertNexApp.showToast("Text-to-speech is not supported on this device.");
      return;
    }

    this.stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.selectedLang;
    utterance.rate = 0.95; // Slightly slower for crisp clear comprehension
    utterance.pitch = 1.0;

    // Pick best available voice
    const voices = window.speechSynthesis.getVoices();
    const langPrefix = this.selectedLang.split("-")[0];
    const matchVoice = voices.find(v => v.lang.startsWith(langPrefix) || v.lang.startsWith("hi") || v.lang.startsWith("en-IN"));
    if (matchVoice) {
      utterance.voice = matchVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.currentUtterance = utterance;
      this.updateAudioIndicator(true, text);
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      this.updateAudioIndicator(false);
      if (onComplete) onComplete();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.updateAudioIndicator(false);
    };

    window.speechSynthesis.speak(utterance);
  },

  stopSpeaking() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.updateAudioIndicator(false);
  },

  // ─── Speak Specific Alert ─────────────────────────────────────────────────
  speakAlert(alertId) {
    const alert = (window.AlertNexData && AlertNexData.alerts) 
      ? AlertNexData.alerts.find(a => a.id === alertId) 
      : null;

    if (!alert) return;

    let speechText = "";
    if (this.selectedLang === "hi-IN") {
      speechText = `चेतावनी! ${alert.level} जोखिम अलर्ट। शीर्षक: ${alert.title}। स्थान: ${alert.location}। प्रभाव: ${alert.impact}। सुरक्षा निर्देश: ${alert.action}`;
    } else if (this.selectedLang === "bn-IN") {
      speechText = `সতর্কতা! ${alert.level} ঝুঁকি অ্যালার্ট। স্থান: ${alert.location}। সতর্কতা প্রভাব: ${alert.impact}। নির্দেশাবলী: ${alert.action}`;
    } else {
      speechText = `Warning! ${alert.level} level risk alert for ${alert.location}. Title: ${alert.title}. Impact: ${alert.impact}. Recommended Standard Operating Procedure: ${alert.action}`;
    }

    if (window.AlertNexAlerts && AlertNexAlerts.playEmergencyChime) {
      AlertNexAlerts.playEmergencyChime();
    }

    this.speak(speechText);
  },

  // ─── Read Current Page Summary ────────────────────────────────────────────
  readCurrentPageSummary() {
    const currentView = window.AlertNexApp ? AlertNexApp.activeView : "landing";
    let summaryText = "";

    if (this.selectedLang === "hi-IN") {
      switch (currentView) {
        case "landing":
          summaryText = "अलर्टनेक्स लैंडिंग पोर्टल। यहाँ आप पूर्व चेतावनी डैशबोर्ड देख सकते हैं, नक्शा देख सकते हैं, और बोलकर या फोटो छूकर कोई भी खतरा रिपोर्ट कर सकते हैं।";
          break;
        case "dashboard":
          summaryText = "प्राधिकरण कमांड डैशबोर्ड। पूर्वोत्तर के 8 राज्यों की वास्तविक समय निगरानी। 6 सक्रिय अलर्ट और 4 उच्च जोखिम वाले क्षेत्र सक्रिय हैं।";
          break;
        case "map":
          summaryText = "लाइव जीआईएस जोखिम मानचित्र। चेरापूंजी, आइजोल और चुराचांदपुर क्षेत्र उच्च जोखिम पर हैं। भारी वर्षा दर्ज की गई है।";
          break;
        case "alerts":
          summaryText = "अलर्ट और चेतावनी केंद्र। 6 सक्रिय बुलेटिन उपलब्ध हैं। चेरापूंजी और एनएच 206 पर क्रिटिकल अलर्ट जारी किया गया है।";
          break;
        case "reporting":
          summaryText = "आपदा रिपोर्टिंग पृष्ठ। आप नीचे दिए गए माइक बटन को दबाकर बोलकर या सरल चित्र वाले बटन दबाकर रिपोर्ट दर्ज कर सकते हैं।";
          break;
        case "connectivity":
          summaryText = "सड़क व गांव कनेक्टिविटी प्रभाव विश्लेषण। एनएच 206 पर अवरोध का जोखिम है और मवलिनदेप गांव कटने की संभावना है।";
          break;
        default:
          summaryText = "अलर्टनेक्स आपदा प्रबंधन प्रणाली। पूर्वोत्तर भारत के लिए एआई आधारित पूर्व चेतावनी मंच।";
      }
    } else {
      switch (currentView) {
        case "landing":
          summaryText = "AlertNex Landing Portal. An AI-powered early warning platform for landslide monitoring in Northeast India. Use the voice and visual buttons to report hazards.";
          break;
        case "dashboard":
          summaryText = "Authority Command Dashboard. Real-time telemetry monitoring 8 North Eastern states with 6 active alerts and 4 high-risk monitoring zones.";
          break;
        case "map":
          summaryText = "Live GIS Risk Map. Visualizing slope stability, sensor stations, rainfall, and vulnerable hill corridors.";
          break;
        case "alerts":
          summaryText = "Alerts and Early Warning Notification Center. 6 active bulletins dispatched across NH corridors.";
          break;
        case "reporting":
          summaryText = "Field and Citizen Hazard Reporting. You can report hazards by speaking into the microphone or using 1-click pictorial SOS buttons.";
          break;
        default:
          summaryText = "AlertNex Disaster Monitoring and Decision Support System.";
      }
    }

    this.speak(summaryText);
  },

  // ─── Voice Recording / Speech-to-Text Handler ──────────────────────────────
  toggleVoiceReporting() {
    if (this.isListening) {
      if (this.speechRecognition) this.speechRecognition.stop();
      this.isListening = false;
      this.updateVoiceMicUI(false);
      return;
    }

    if (!this.speechRecognition) {
      const t = this.translations[this.selectedLang] || this.translations["hi-IN"];
      alert(t.speechNotSupported);
      return;
    }

    try {
      this.speechRecognition.lang = this.selectedLang;
      this.speechRecognition.start();
      const t = this.translations[this.selectedLang] || this.translations["hi-IN"];
      if (window.AlertNexApp) AlertNexApp.showToast(t.listening);
    } catch (e) {
      console.warn("Speech recognition start issue:", e);
    }
  },

  handleVoiceTranscription(transcriptText, isFinal) {
    const liveVoiceBox = document.getElementById("liveVoiceTranscriptBox");
    const reportDesc = document.getElementById("reportDescription");
    const locationInput = document.getElementById("reportLocationName");
    const incidentTypeSelect = document.getElementById("incidentType");
    const severitySelect = document.getElementById("reportSeverity");

    if (liveVoiceBox) {
      liveVoiceBox.textContent = `🎙️ "${transcriptText}"`;
      liveVoiceBox.style.display = "block";
    }

    if (reportDesc) {
      reportDesc.value = transcriptText;
    }

    // Smart Keyword Auto-Fill
    const lower = transcriptText.toLowerCase();

    // Auto-detect Incident Type
    if (incidentTypeSelect) {
      if (lower.includes("landslide") || lower.includes("भूस्खलन") || lower.includes("पहाड़") || lower.includes("dhosa")) {
        incidentTypeSelect.value = "Landslide";
      } else if (lower.includes("crack") || lower.includes("दरार") || lower.includes("fissure")) {
        incidentTypeSelect.value = "Ground Crack";
      } else if (lower.includes("road") || lower.includes("रास्ता") || lower.includes("सड़क") || lower.includes("blocked") || lower.includes("band")) {
        incidentTypeSelect.value = "Road Blockage";
      } else if (lower.includes("rock") || lower.includes("पत्थर") || lower.includes("chattan")) {
        incidentTypeSelect.value = "Rockfall";
      } else if (lower.includes("slope") || lower.includes("ढलान")) {
        incidentTypeSelect.value = "Dangerous Slope";
      }
    }

    // Auto-detect Severity
    if (severitySelect) {
      if (lower.includes("danger") || lower.includes("खतरा") || lower.includes("critical") || lower.includes("emergency") || lower.includes("bada")) {
        severitySelect.value = "Critical";
      } else if (lower.includes("high") || lower.includes("भारी") || lower.includes("zyada")) {
        severitySelect.value = "High";
      }
    }

    // Auto-detect Location mentions
    if (locationInput && (!locationInput.value || locationInput.value.includes("Km 18"))) {
      if (lower.includes("cherrapunji") || lower.includes("चेरापूंजी")) {
        locationInput.value = "Cherrapunji Hill Road Sector";
      } else if (lower.includes("shillong") || lower.includes("शिलांग")) {
        locationInput.value = "Shillong Escarpment Route";
      } else if (lower.includes("aizawl") || lower.includes("आइजोल")) {
        locationInput.value = "Aizawl Cliff Corridor";
      } else if (lower.includes("gangtok") || lower.includes("गंगटोक")) {
        locationInput.value = "Gangtok-Nathula Highway";
      }
    }

    if (isFinal) {
      // Auto acquire GPS coordinates if not already set
      const geoBtn = document.getElementById("btnGetGeolocation");
      if (geoBtn) geoBtn.click();

      if (window.AlertNexApp) {
        AlertNexApp.showToast("✓ Voice recognized and form populated! Ready to submit.");
      }
      this.speak(this.selectedLang === "hi-IN" ? "आपकी आवाज दर्ज कर ली गई है। विवरण फॉर्म में भर दिया गया है।" : "Voice details captured into report form.");
    }
  },

  // ─── 1-Click Visual Emergency SOS ──────────────────────────────────────────
  triggerVisualSOS(hazardType, defaultSeverity, hazardTitle) {
    if (window.AlertNexAlerts && AlertNexAlerts.playEmergencyChime) {
      AlertNexAlerts.playEmergencyChime();
    }

    const reportId = `SOS-VISUAL-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReport = {
      id: reportId,
      reporterType: "Citizen",
      reporterName: "Voice/Visual Citizen SOS",
      incidentType: hazardType,
      severity: defaultSeverity || "Critical",
      locationName: "Cherrapunji Escarpment (Auto-GPS Detected)",
      lat: 25.2980 + (Math.random() * 0.01 - 0.005),
      lng: 91.5815 + (Math.random() * 0.01 - 0.005),
      description: `[1-CLICK VISUAL SOS]: ${hazardTitle}. Citizen pressed visual quick alert button. Immediate verification initiated.`,
      image: "assets/ner_hero.jpg",
      timestamp: "Just now",
      status: "PENDING",
      syncStatus: "Synced",
      offlineStored: false
    };

    // Add to global memory & indexedDB
    if (window.AlertNexData && AlertNexData.incidentReports) {
      AlertNexData.incidentReports.unshift(newReport);
      AlertNexData.kpiStats.reportsToday += 1;
    }

    if (window.AlertNexDB) {
      AlertNexDB.add(newReport);
    }

    if (window.AlertNexMap) {
      AlertNexMap.renderFieldReportPins();
    }

    if (window.AlertNexReporting) {
      AlertNexReporting.renderReportsList();
    }

    this.closeVisualSOSModal();

    const t = this.translations[this.selectedLang] || this.translations["hi-IN"];
    if (window.AlertNexApp) {
      AlertNexApp.showToast(`🚨 [1-CLICK SOS DISPATCHED]: ${hazardTitle} recorded at current GPS!`);
    }

    this.speak(t.sosSuccess);
  },

  openVisualSOSModal() {
    const modal = document.getElementById("visualSOSModal");
    if (modal) modal.classList.add("active");
    this.speak(this.selectedLang === "hi-IN" ? "सरल चित्र आपातकालीन मोड। जिस खतरे की रिपोर्ट करनी है, उस तस्वीर को छूएं।" : "Visual SOS Mode. Tap any picture to dispatch emergency alert.");
  },

  closeVisualSOSModal() {
    const modal = document.getElementById("visualSOSModal");
    if (modal) modal.classList.remove("active");
  },

  // ─── Play IVRS Voice Demonstration ─────────────────────────────────────────
  playIVRDemo() {
    const ivrText = (this.selectedLang === "hi-IN")
      ? "नमस्कार। यह पूर्वोत्तर विकास मंत्रालय (MDoNER) की आपदा हेल्पलाइन १८००-अलर्ट-नेक्स है। भूस्खलन की रिपोर्ट के लिए १ दबाएं, मार्ग अवरोध के लिए २ दबाएं, या सीधे बोलकर अपनी समस्या बताएं।"
      : "Welcome to Ministry of DoNER Emergency Voice Helpline 1800-ALERT-NER. Press 1 for active landslide, press 2 for road obstruction, or simply speak to record your message.";

    if (window.AlertNexAlerts && AlertNexAlerts.playEmergencyChime) {
      AlertNexAlerts.playEmergencyChime();
    }
    this.speak(ivrText);
  },

  // ─── UI Updates & Injections ──────────────────────────────────────────────
  updateVoiceMicUI(isRecording) {
    const micBtns = document.querySelectorAll(".btn-voice-mic");
    micBtns.forEach(btn => {
      if (isRecording) {
        btn.classList.add("recording");
        btn.innerHTML = `
          <span class="pulse-dot red" style="display:inline-block; margin-right:6px;"></span>
          <span>सुन रहे हैं... (Recording Voice)</span>
        `;
      } else {
        btn.classList.remove("recording");
        btn.innerHTML = `
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
          <span>🎙️ बोलकर रिपोर्ट करें / Speak Hazard</span>
        `;
      }
    });
  },

  updateAudioIndicator(isPlaying, text = "") {
    const bar = document.getElementById("globalVoicePlayingBar");
    if (!bar) return;
    if (isPlaying) {
      bar.classList.add("active");
      const textEl = document.getElementById("voicePlayingText");
      if (textEl) textEl.textContent = text.length > 90 ? text.substring(0, 90) + "..." : text;
    } else {
      bar.classList.remove("active");
    }
  },

  injectAccessibilityUI() {
    // 1. Add Floating Accessibility Assistant Widget
    if (!document.getElementById("accessibilityFloatingWidget")) {
      const widget = document.createElement("div");
      widget.id = "accessibilityFloatingWidget";
      widget.className = "accessibility-floating-widget";
      widget.innerHTML = `
        <div class="access-pill" id="accessMainToggleBtn" title="Voice & Visual Accessibility (सहायता)">
          <span class="access-icon-pulse">🔊</span>
          <span class="access-pill-label">आवाज़ और सहायता (Audio/Voice)</span>
        </div>

        <div class="access-dropdown-panel" id="accessDropdownPanel">
          <div class="access-header">
            <div style="font-weight:700; color:var(--text-main); font-size:0.92rem; display:flex; align-items:center; gap:6px;">
              <span>♿ Inclusive Voice &amp; Visual Access</span>
            </div>
            <button class="access-close-btn" id="accessCloseDropdown">✕</button>
          </div>

          <div class="access-body">
            <div class="access-field-group">
              <label style="font-size:0.75rem; font-weight:700; color:var(--text-secondary); text-transform:uppercase;">सहायता भाषा / Voice Language</label>
              <select id="accessLangSelector" class="form-control" style="font-size:0.85rem; padding:6px 10px; height:auto;">
                <option value="hi-IN" selected>🇮🇳 हिन्दी (Hindi Voice)</option>
                <option value="en-IN">🇬🇧 English (Indian Accent)</option>
                <option value="bn-IN">🇮🇳 বাংলা / অসমীয়া (Regional)</option>
              </select>
            </div>

            <div class="access-action-grid">
              <button class="btn btn-primary btn-sm access-action-btn" id="btnAccessListenPage">
                <span>🔊</span>
                <span>पेज सुनकर समझें<br><small style="opacity:0.8;">Listen Page</small></span>
              </button>

              <button class="btn btn-danger btn-sm access-action-btn" id="btnAccessVisualSOS">
                <span>🖼️</span>
                <span>सरल चित्र SOS<br><small style="opacity:0.8;">Visual 1-Click</small></span>
              </button>

              <button class="btn btn-secondary btn-sm access-action-btn" id="btnAccessVoiceReport">
                <span>🎙️</span>
                <span>बोलकर रिपोर्ट करें<br><small style="opacity:0.8;">Speak Hazard</small></span>
              </button>

              <button class="btn btn-secondary btn-sm access-action-btn" id="btnAccessIVR">
                <span>📞</span>
                <span>IVRS वॉयस हेल्पलाइन<br><small style="opacity:0.8;">Toll-Free Demo</small></span>
              </button>
            </div>

            <div style="font-size:0.73rem; color:var(--text-muted); line-height:1.4; margin-top:6px; border-top:1px solid var(--border-main); padding-top:6px;">
              💡 यह सुविधा उन नागरिकों के लिए है जो पढ़-लिख नहीं सकते या जिन्हें देखने/टाइप करने में परेशानी है।
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(widget);
    }

    // 2. Global Voice Playing Wave Bar
    if (!document.getElementById("globalVoicePlayingBar")) {
      const bar = document.createElement("div");
      bar.id = "globalVoicePlayingBar";
      bar.className = "voice-playing-bar";
      bar.innerHTML = `
        <div class="voice-wave-anim">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
        <div class="voice-playing-info">
          <span style="font-size:0.75rem; font-weight:700; color:#10b981; text-transform:uppercase;">🔊 बोलकर सुनाया जा रहा है (Speaking)</span>
          <div id="voicePlayingText" style="font-size:0.85rem; font-weight:600; color:var(--text-main); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">...</div>
        </div>
        <button class="btn btn-secondary btn-sm" id="btnStopGlobalVoice" style="padding:4px 10px; font-size:0.75rem;">
          ⏹ रोकें (Stop)
        </button>
      `;
      document.body.appendChild(bar);
    }

    // 3. Inject Visual SOS Modal into Body
    if (!document.getElementById("visualSOSModal")) {
      const modal = document.createElement("div");
      modal.id = "visualSOSModal";
      modal.className = "modal-backdrop";
      modal.innerHTML = `
        <div class="modal-box" style="max-width:680px; border:2px solid #ef4444; box-shadow:0 20px 40px rgba(239,68,68,0.25);">
          <div class="modal-header" style="background:rgba(239,68,68,0.1); border-bottom:1px solid rgba(239,68,68,0.2);">
            <div>
              <div class="modal-title" style="color:#ef4444; display:flex; align-items:center; gap:8px;">
                <span style="font-size:1.4rem;">🚨</span>
                <span>सरल चित्र आपातकालीन रिपोर्टिंग (1-Click Visual SOS)</span>
              </div>
              <p style="font-size:0.82rem; color:var(--text-secondary); margin:2px 0 0 0;">
                बिना पढ़े या लिखे, सिर्फ नीचे दिए गए चित्र को दबाएं — आपका अलर्ट GPS सहित तुरंत दर्ज हो जाएगा।
              </p>
            </div>
            <button class="modal-close" onclick="AlertNexAccessibility.closeVisualSOSModal()">&times;</button>
          </div>

          <div class="modal-body" style="padding:20px;">
            <div class="visual-sos-grid">
              <!-- Tile 1: Landslide -->
              <div class="visual-sos-tile red" onclick="AlertNexAccessibility.triggerVisualSOS('Landslide', 'Critical', 'भारी भूस्खलन / पहाड़ खिसकना (Landslide)')">
                <div class="sos-icon">⛰️💥</div>
                <div class="sos-name">भूस्खलन (Landslide)</div>
                <div class="sos-desc">पहाड़ या मिट्टी खिसकना</div>
              </div>

              <!-- Tile 2: Road Blockage -->
              <div class="visual-sos-tile orange" onclick="AlertNexAccessibility.triggerVisualSOS('Road Blockage', 'High', 'रास्ता / सड़क अवरुद्ध (Road Blocked)')">
                <div class="sos-icon">🚧🚗</div>
                <div class="sos-name">रास्ता बंद (Road Block)</div>
                <div class="sos-desc">मलबे से सड़क या पुल बंद</div>
              </div>

              <!-- Tile 3: Flood -->
              <div class="visual-sos-tile blue" onclick="AlertNexAccessibility.triggerVisualSOS('Dangerous Slope', 'Critical', 'बाढ़ / भारी जलभराव (Flash Flood)')">
                <div class="sos-icon">🌊⚠️</div>
                <div class="sos-name">बाढ़ / पानी (Flood)</div>
                <div class="sos-desc">तेज पानी का बहाव व कीचड़</div>
              </div>

              <!-- Tile 4: Ground Crack -->
              <div class="visual-sos-tile yellow" onclick="AlertNexAccessibility.triggerVisualSOS('Ground Crack', 'High', 'जमीन में बड़ी दरार (Ground Fissure)')">
                <div class="sos-icon">🏚️⚡</div>
                <div class="sos-name">जमीन में दरार (Crack)</div>
                <div class="sos-desc">मकान या सड़क में गहरी दरारें</div>
              </div>

              <!-- Tile 5: Rockfall -->
              <div class="visual-sos-tile amber" onclick="AlertNexAccessibility.triggerVisualSOS('Rockfall', 'High', 'चट्टान गिरना (Rockfall)')">
                <div class="sos-icon">🪨⚠️</div>
                <div class="sos-name">चट्टान गिरना (Rockfall)</div>
                <div class="sos-desc">ऊपर से बड़े पत्थर गिरना</div>
              </div>

              <!-- Tile 6: Urgent Medical -->
              <div class="visual-sos-tile purple" onclick="AlertNexAccessibility.triggerVisualSOS('Other', 'Critical', 'आपातकालीन मेडिकल व जान का खतरा (Medical Emergency)')">
                <div class="sos-icon">🚑🆘</div>
                <div class="sos-name">मेडिकल मदद (Medical SOS)</div>
                <div class="sos-desc">लोग फंसे हैं / तुरंत बचाव चाहिए</div>
              </div>
            </div>

            <div style="margin-top:16px; background:var(--bg-card-subtle); border:1px solid var(--border-main); border-radius:8px; padding:12px; display:flex; align-items:center; justify-content:space-between;">
              <div style="font-size:0.8rem; color:var(--text-secondary);">
                📍 <strong>GPS लोकेशन:</strong> स्वचालित रूप से ली जा रही है (25.2980° N, 91.5815° E)
              </div>
              <button class="btn btn-secondary btn-sm" onclick="AlertNexAccessibility.playIVRDemo()">
                📞 टोल-फ्री 1800-ALERT सुनें
              </button>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary btn-sm" onclick="AlertNexAccessibility.closeVisualSOSModal()">बंद करें (Close)</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
  },

  bindEvents() {
    // Toggle dropdown
    const toggleBtn = document.getElementById("accessMainToggleBtn");
    const panel = document.getElementById("accessDropdownPanel");
    const closeBtn = document.getElementById("accessCloseDropdown");

    if (toggleBtn && panel) {
      toggleBtn.addEventListener("click", () => {
        panel.classList.toggle("active");
      });
    }

    if (closeBtn && panel) {
      closeBtn.addEventListener("click", () => {
        panel.classList.remove("active");
      });
    }

    // Language selector
    const langSelect = document.getElementById("accessLangSelector");
    if (langSelect) {
      langSelect.addEventListener("change", (e) => {
        this.setLanguage(e.target.value);
      });
    }

    // Actions
    const btnListen = document.getElementById("btnAccessListenPage");
    if (btnListen) {
      btnListen.addEventListener("click", () => {
        this.readCurrentPageSummary();
        if (panel) panel.classList.remove("active");
      });
    }

    const btnVisualSOS = document.getElementById("btnAccessVisualSOS");
    if (btnVisualSOS) {
      btnVisualSOS.addEventListener("click", () => {
        this.openVisualSOSModal();
        if (panel) panel.classList.remove("active");
      });
    }

    const btnVoiceReport = document.getElementById("btnAccessVoiceReport");
    if (btnVoiceReport) {
      btnVoiceReport.addEventListener("click", () => {
        if (window.AlertNexApp) AlertNexApp.switchView("reporting");
        if (panel) panel.classList.remove("active");
        setTimeout(() => this.toggleVoiceReporting(), 400);
      });
    }

    const btnIVR = document.getElementById("btnAccessIVR");
    if (btnIVR) {
      btnIVR.addEventListener("click", () => {
        this.playIVRDemo();
        if (panel) panel.classList.remove("active");
      });
    }

    const stopGlobalBtn = document.getElementById("btnStopGlobalVoice");
    if (stopGlobalBtn) {
      stopGlobalBtn.addEventListener("click", () => {
        this.stopSpeaking();
      });
    }
  }
};

// Auto initialize on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => AlertNexAccessibility.init());
} else {
  AlertNexAccessibility.init();
}
