import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "te";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navbar
    "nav.about": "About",
    "nav.features": "Features",

    // Hero
    "hero.badge": "AI-Powered Telugu Assistant",
    "hero.title": "తెలుగు AI for Everyone",
    "hero.subtitle": "Understand government schemes, hospital documents, legal notices, and local services instantly in simple Telugu.",
    "hero.chat1": "నమస్కారం! మీ ప్రభుత్వ పత్రాలను సులభమైన తెలుగులో వివరించగలను. ఏదైనా పత్రాన్ని అప్‌లోడ్ చేయండి.",
    "hero.chat2": "ఆయుష్మాన్ భారత్ పథకం గురించి చెప్పండి",

    // Features
    "features.title": "Powerful Features",
    "features.subtitle": "AI-powered tools designed specifically for Telugu-speaking communities",
    "features.govt": "Government Scheme Explainer",
    "features.govt.desc": "Instantly understand complex government schemes and policies in simple Telugu language.",
    "features.voice": "Telugu Voice Responses",
    "features.voice.desc": "Listen to explanations in natural Telugu voice for better accessibility.",
    "features.chat": "Conversational AI Chat",
    "features.chat.desc": "Ask questions naturally and get instant, contextual answers in Telugu.",
    "features.pdf": "PDF Understanding",
    "features.pdf.desc": "Upload any document and get simple explanations in your local Telugu dialect.",
    "features.dialect": "Dialect-Friendly Summaries",
    "features.dialect.desc": "Respects regional variations and explains in the Telugu you speak at home.",
    "features.hospital": "Hospital Document Explainer",
    "features.hospital.desc": "Understand medical prescriptions and healthcare documents easily.",
    "features.agriculture": "Agriculture Update Simplifier",
    "features.agriculture.desc": "Get simplified agricultural schemes and rural welfare programs.",
    "features.save": "Save & History",
    "features.save.desc": "Access your conversation history and saved explanations anytime.",

    // How It Works (home section)
    "how.title": "How It Works",
    "how.subtitle": "Three simple steps to understand any document in Telugu",
    "how.step1": "Upload Documents",
    "how.step1.desc": "Share any PDF, government notice, hospital prescription, or English webpage",
    "how.step1.item1": "PDF Files",
    "how.step1.item2": "Government Notices",
    "how.step1.item3": "Hospital Prescriptions",
    "how.step1.item4": "Web Pages",
    "how.step2": "AI Processing",
    "how.step2.desc": "Our multi-model AI extracts, translates, and simplifies complex information",
    "how.step2.item1": "Extract Text",
    "how.step2.item2": "Translate to Telugu",
    "how.step2.item3": "Simplify Language",
    "how.step2.item4": "Generate Voice",
    "how.step3": "Get Easy Telugu Explanations",
    "how.step3.desc": "Receive conversational answers you can read, hear, and save for later",
    "how.step3.item1": "Conversational Chat",
    "how.step3.item2": "Voice Playback",
    "how.step3.item3": "Save History",

    // Footer
    "footer.tagline": "Built for Telugu communities",
    "footer.copyright": "© 2026 TeluguLens AI. Empowering Telugu speakers with AI technology.",

    // About
    "about.badge": "About TeluguLens AI",
    "about.title": "Empowering Telugu Communities",
    "about.desc": "TeluguLens AI helps Telugu-speaking users easily understand government schemes, hospital documents, legal notices, agriculture updates, and English documents using AI-powered Telugu explanations, voice responses, and conversational chat.",
    "about.point1": "AI-powered explanations in simple Telugu",
    "about.point2": "Real-time voice and text responses",
    "about.point3": "Supports all Telugu dialects",

    // Features Page
    "featuresPage.title": "Explore Features",
    "featuresPage.subtitle": "Click on any feature to learn more about how it works",
    "featuresPage.learnMore": "Learn more →",

    // How It Works Page
    "howPage.title": "How It Works",
    "howPage.subtitle": "Five simple steps to understand any document in Telugu",
    "howPage.step1": "Upload Document",
    "howPage.step1.desc": "Share any PDF, government notice, hospital prescription, or web content",
    "howPage.step2": "AI Extracts & Translates",
    "howPage.step2.desc": "Advanced AI extracts text and translates to Telugu automatically",
    "howPage.step3": "Telugu Simplification",
    "howPage.step3.desc": "Complex information is simplified into easy-to-understand Telugu",
    "howPage.step4": "Voice + Chat Response",
    "howPage.step4.desc": "Receive explanations in both text and natural Telugu voice",
    "howPage.step5": "Save & Access Anytime",
    "howPage.step5.desc": "Your conversation history is saved for future reference",

    // Common
    "common.backToFeatures": "Back to Features",

    // Government Scheme Feature
    "govt.title": "Government Scheme Explainer",
    "govt.subtitle": "Transform complex government documents into simple, understandable Telugu explanations",
    "govt.whatItDoes": "What it does",
    "govt.whatItDoes.desc": "Converts complex government scheme documents, eligibility criteria, and application processes into clear, simple Telugu that anyone can understand.",
    "govt.howItWorks": "How it works",
    "govt.howItWorks.step1": "Upload government document or paste scheme details",
    "govt.howItWorks.step2": "AI analyzes and extracts key information",
    "govt.howItWorks.step3": "Translates to simple, conversational Telugu",
    "govt.howItWorks.step4": "Ask follow-up questions for clarification",

    // Voice Responses Feature
    "voice.title": "Telugu Voice Responses",
    "voice.subtitle": "Listen to natural Telugu voice explanations for better accessibility",
    "voice.natural": "Natural Voice",
    "voice.natural.desc": "High-quality, natural-sounding Telugu voice synthesis that speaks explanations clearly and naturally.",
    "voice.accessibility": "Accessibility First",
    "voice.accessibility.desc": "Perfect for users who prefer listening, have visual impairments, or are multitasking.",

    // Conversational Chat Feature
    "chat.title": "Conversational AI Chat",
    "chat.subtitle": "Ask questions naturally and get instant Telugu responses",
    "chat.contextAware": "Context-Aware",
    "chat.contextAware.desc": "Remembers conversation history",
    "chat.naturalLang": "Natural Language",
    "chat.naturalLang.desc": "Understands casual Telugu",
    "chat.instant": "Instant Responses",
    "chat.instant.desc": "Fast, real-time answers",

    // PDF Understanding Feature
    "pdfFeature.title": "PDF Understanding",
    "pdfFeature.subtitle": "Upload any PDF and get instant Telugu explanations",
    "pdfFeature.smart": "Smart Extraction",
    "pdfFeature.smart.desc": "Advanced AI extracts text from PDFs, including scanned documents and images.",
    "pdfFeature.anyLang": "Any Language",
    "pdfFeature.anyLang.desc": "Upload documents in English, Hindi, or Telugu - all converted to simple Telugu.",

    // Dialect Friendly Feature
    "dialectFeature.title": "Dialect-Friendly Summaries",
    "dialectFeature.subtitle": "Respects regional variations and speaks the Telugu you know",
    "dialectFeature.feelsLike": "Feels Like Home",
    "dialectFeature.feelsLike.desc": "TeluguLens AI adapts to your regional dialect, making explanations feel natural and familiar - just like talking to someone from your village or city.",

    // Hospital Documents Feature
    "hospital.title": "Hospital Document Explainer",
    "hospital.subtitle": "Understand medical prescriptions and healthcare documents in simple Telugu",
    "hospital.medical": "Medical Terms",
    "hospital.medical.desc": "Complex terms simplified",
    "hospital.dosage": "Dosage Instructions",
    "hospital.dosage.desc": "Clear Telugu instructions",
    "hospital.safety": "Safety Info",
    "hospital.safety.desc": "Important warnings explained",

    // Agriculture Feature
    "agri.title": "Agriculture Update Simplifier",
    "agri.subtitle": "Understand agricultural schemes and rural welfare programs easily",
    "agri.crop": "Crop Subsidies",
    "agri.crop.desc": "రైతు భరోసా, రైతు బంధు పథకాల వివరాలు",
    "agri.irrigation": "Irrigation Schemes",
    "agri.irrigation.desc": "నీటి సౌకర్యాల గురించి తెలియజేయడం",
    "agri.modern": "Modern Rural-Tech Platform",
    "agri.modern.desc": "Bridging the gap between government agricultural schemes and Telugu-speaking farmers",

    // Save & History Feature
    "saveFeature.title": "Save & History",
    "saveFeature.subtitle": "Access your conversation history and saved explanations anytime",
    "saveFeature.organized": "Organized Archive",
    "saveFeature.organized.desc": "All your past conversations, documents, and explanations organized chronologically.",
    "saveFeature.quick": "Quick Access",
    "saveFeature.quick.desc": "Search and revisit any previous explanation or document with one click.",
  },
  te: {
    // Navbar
    "nav.about": "మా గురించి",
    "nav.features": "ఫీచర్లు",

    // Hero
    "hero.badge": "AI శక్తితో కూడిన తెలుగు సహాయకుడు",
    "hero.title": "అందరికీ తెలుగు AI",
    "hero.subtitle": "ప్రభుత్వ పథకాలు, ఆసుపత్రి పత్రాలు, చట్టపరమైన నోటీసులు మరియు స్థానిక సేవలను తక్షణమే సులభమైన తెలుగులో అర్థం చేసుకోండి.",
    "hero.chat1": "నమస్కారం! మీ ప్రభుత్వ పత్రాలను సులభమైన తెలుగులో వివరించగలను. ఏదైనా పత్రాన్ని అప్‌లోడ్ చేయండి.",
    "hero.chat2": "ఆయుష్మాన్ భారత్ పథకం గురించి చెప్పండి",

    // Features
    "features.title": "శక్తివంతమైన ఫీచర్లు",
    "features.subtitle": "తెలుగు మాట్లాడే సమాజాల కోసం ప్రత్యేకంగా రూపొందించిన AI సాధనాలు",
    "features.govt": "ప్రభుత్వ పథకాల వివరణ",
    "features.govt.desc": "సంక్లిష్టమైన ప్రభుత్వ పథకాలు మరియు విధానాలను సులభమైన తెలుగు భాషలో తక్షణమే అర్థం చేసుకోండి.",
    "features.voice": "తెలుగు వాయిస్ ప్రతిస్పందనలు",
    "features.voice.desc": "మెరుగైన ప్రాప్యత కోసం సహజమైన తెలుగు వాయిస్‌లో వివరణలను వినండి.",
    "features.chat": "సంభాషణ AI చాట్",
    "features.chat.desc": "సహజంగా ప్రశ్నలు అడగండి మరియు తెలుగులో తక్షణ సందర్భోచిత సమాధానాలను పొందండి.",
    "features.pdf": "PDF అవగాహన",
    "features.pdf.desc": "ఏదైనా డాక్యుమెంట్‌ను అప్‌లోడ్ చేయండి మరియు మీ స్థానిక తెలుగు మాండలికంలో సులభమైన వివరణలను పొందండి.",
    "features.dialect": "మాండలిక-స్నేహపూర్వక సారాంశాలు",
    "features.dialect.desc": "ప్రాంతీయ వ్యత్యాసాలను గౌరవిస్తుంది మరియు మీరు ఇంట్లో మాట్లాడే తెలుగులో వివరిస్తుంది.",
    "features.hospital": "ఆసుపత్రి పత్రాల వివరణకర్త",
    "features.hospital.desc": "వైద్య ప్రిస్క్రిప్షన్లు మరియు ఆరోగ్య సంరక్షణ పత్రాలను సులభంగా అర్థం చేసుకోండి.",
    "features.agriculture": "వ్యవసాయ అప్‌డేట్ సరళీకరణ",
    "features.agriculture.desc": "సరళీకృత వ్యవసాయ పథకాలు మరియు గ్రామీణ సంక్షేమ కార్యక్రమాలను పొందండి.",
    "features.save": "సేవ్ & హిస్టరీ",
    "features.save.desc": "మీ సంభాషణ చరిత్ర మరియు సేవ్ చేసిన వివరణలను ఎప్పుడైనా యాక్సెస్ చేయండి.",

    // How It Works
    "how.title": "ఇది ఎలా పనిచేస్తుంది",
    "how.subtitle": "ఏదైనా డాక్యుమెంట్‌ను తెలుగులో అర్థం చేసుకోవడానికి మూడు సులభ దశలు",
    "how.step1": "డాక్యుమెంట్‌లను అప్‌లోడ్ చేయండి",
    "how.step1.desc": "ఏదైనా PDF, ప్రభుత్వ నోటీసు, ఆసుపత్రి ప్రిస్క్రిప్షన్ లేదా ఇంగ్లీష్ వెబ్‌పేజీని షేర్ చేయండి",
    "how.step1.item1": "PDF ఫైల్స్",
    "how.step1.item2": "ప్రభుత్వ నోటీసులు",
    "how.step1.item3": "ఆసుపత్రి ప్రిస్క్రిప్షన్లు",
    "how.step1.item4": "వెబ్ పేజీలు",
    "how.step2": "AI ప్రాసెసింగ్",
    "how.step2.desc": "మా మల్టీ-మోడల్ AI సంక్లిష్ట సమాచారాన్ని సంగ్రహిస్తుంది, అనువదిస్తుంది మరియు సరళీకరిస్తుంది",
    "how.step2.item1": "టెక్స్ట్ సంగ్రహించండి",
    "how.step2.item2": "తెలుగులోకి అనువదించండి",
    "how.step2.item3": "భాషను సరళీకరించండి",
    "how.step2.item4": "వాయిస్ ఉత్పత్తి చేయండి",
    "how.step3": "సులభమైన తెలుగు వివరణలను పొందండి",
    "how.step3.desc": "మీరు చదువుకోగల, వినగల మరియు తర్వాత సేవ్ చేసుకోగల సంభాషణ సమాధానాలను అందుకోండి",
    "how.step3.item1": "సంభాషణ చాట్",
    "how.step3.item2": "వాయిస్ ప్లేబ్యాక్",
    "how.step3.item3": "హిస్టరీ సేవ్ చేయండి",

    // Footer
    "footer.tagline": "తెలుగు సమాజాల కోసం నిర్మించబడింది",
    "footer.copyright": "© 2026 TeluguLens AI. తెలుగు మాట్లాడే వారికి AI సాంకేతికతతో శక్తినిస్తోంది.",

    // About
    "about.badge": "TeluguLens AI గురించి",
    "about.title": "తెలుగు సమాజాలకు శక్తినివ్వడం",
    "about.desc": "TeluguLens AI తెలుగు మాట్లాడే వినియోగదారులకు ప్రభుత్వ పథకాలు, ఆసుపత్రి పత్రాలు, చట్టపరమైన నోటీసులు, వ్యవసాయ అప్‌డేట్‌లు మరియు ఇంగ్లీష్ పత్రాలను AI-శక్తితో కూడిన తెలుగు వివరణలు, వాయిస్ ప్రతిస్పందనలు మరియు సంభాషణ చాట్‌ను ఉపయోగించి సులభంగా అర్థం చేసుకోవడంలో సహాయపడుతుంది.",
    "about.point1": "సులభమైన తెలుగులో AI-శక్తితో కూడిన వివరణలు",
    "about.point2": "నిజ-సమయ వాయిస్ మరియు టెక్స్ట్ ప్రతిస్పందనలు",
    "about.point3": "అన్ని తెలుగు మాండలికాలకు మద్దతు",

    // Features Page
    "featuresPage.title": "ఫీచర్లను అన్వేషించండి",
    "featuresPage.subtitle": "ఇది ఎలా పనిచేస్తుందో తెలుసుకోవడానికి ఏదైనా ఫీచర్‌పై క్లిక్ చేయండి",
    "featuresPage.learnMore": "మరింత తెలుసుకోండి →",

    // How It Works Page
    "howPage.title": "ఇది ఎలా పనిచేస్తుంది",
    "howPage.subtitle": "ఏదైనా డాక్యుమెంట్‌ను తెలుగులో అర్థం చేసుకోవడానికి ఐదు సులభ దశలు",
    "howPage.step1": "డాక్యుమెంట్ అప్‌లోడ్ చేయండి",
    "howPage.step1.desc": "ఏదైనా PDF, ప్రభుత్వ నోటీసు, ఆసుపత్రి ప్రిస్క్రిప్షన్ లేదా వెబ్ కంటెంట్‌ను షేర్ చేయండి",
    "howPage.step2": "AI సంగ్రహిస్తుంది & అనువదిస్తుంది",
    "howPage.step2.desc": "అధునాతన AI టెక్స్ట్‌ను సంగ్రహిస్తుంది మరియు స్వయంచాలకంగా తెలుగులోకి అనువదిస్తుంది",
    "howPage.step3": "తెలుగు సరళీకరణ",
    "howPage.step3.desc": "సంక్లిష్ట సమాచారం సులభంగా అర్థమయ్యే తెలుగులోకి సరళీకరించబడుతుంది",
    "howPage.step4": "వాయిస్ + చాట్ ప్రతిస్పందన",
    "howPage.step4.desc": "టెక్స్ట్ మరియు సహజమైన తెలుగు వాయిస్ రెండింటిలో వివరణలను అందుకోండి",
    "howPage.step5": "సేవ్ చేసి ఎప్పుడైనా యాక్సెస్ చేయండి",
    "howPage.step5.desc": "మీ సంభాషణ చరిత్ర భవిష్యత్తు సూచన కోసం సేవ్ చేయబడుతుంది",

    // Common
    "common.backToFeatures": "ఫీచర్లకు తిరిగి వెళ్ళండి",

    // Government Scheme Feature
    "govt.title": "ప్రభుత్వ పథకాల వివరణ",
    "govt.subtitle": "సంక్లిష్టమైన ప్రభుత్వ పత్రాలను సులభమైన, అర్థమయ్యే తెలుగు వివరణలుగా మార్చండి",
    "govt.whatItDoes": "ఇది ఏమి చేస్తుంది",
    "govt.whatItDoes.desc": "సంక్లిష్టమైన ప్రభుత్వ పథక పత్రాలు, అర్హత ప్రమాణాలు మరియు దరఖాస్తు ప్రక్రియలను ఎవరైనా అర్థం చేసుకోగల స్పష్టమైన, సులభమైన తెలుగులోకి మారుస్తుంది.",
    "govt.howItWorks": "ఇది ఎలా పనిచేస్తుంది",
    "govt.howItWorks.step1": "ప్రభుత్వ పత్రాన్ని అప్‌లోడ్ చేయండి లేదా పథక వివరాలను పేస్ట్ చేయండి",
    "govt.howItWorks.step2": "AI విశ్లేషిస్తుంది మరియు ముఖ్య సమాచారాన్ని సంగ్రహిస్తుంది",
    "govt.howItWorks.step3": "సులభమైన, సంభాషణ తెలుగులోకి అనువదిస్తుంది",
    "govt.howItWorks.step4": "స్పష్టత కోసం తదుపరి ప్రశ్నలు అడగండి",

    // Voice Responses Feature
    "voice.title": "తెలుగు వాయిస్ ప్రతిస్పందనలు",
    "voice.subtitle": "మెరుగైన ప్రాప్యత కోసం సహజమైన తెలుగు వాయిస్ వివరణలను వినండి",
    "voice.natural": "సహజ వాయిస్",
    "voice.natural.desc": "స్పష్టంగా మరియు సహజంగా వివరణలను మాట్లాడే అధిక-నాణ్యత, సహజంగా వినిపించే తెలుగు వాయిస్ సింథసిస్.",
    "voice.accessibility": "ప్రాప్యత మొదటిది",
    "voice.accessibility.desc": "వినడానికి ఇష్టపడే, దృష్టి లోపాలు ఉన్న లేదా బహుళ పనులు చేస్తున్న వినియోగదారులకు అనువైనది.",

    // Conversational Chat Feature
    "chat.title": "సంభాషణ AI చాట్",
    "chat.subtitle": "సహజంగా ప్రశ్నలు అడగండి మరియు తక్షణ తెలుగు ప్రతిస్పందనలను పొందండి",
    "chat.contextAware": "సందర్భ-అవగాహన",
    "chat.contextAware.desc": "సంభాషణ చరిత్రను గుర్తుంచుకుంటుంది",
    "chat.naturalLang": "సహజ భాష",
    "chat.naturalLang.desc": "సాధారణ తెలుగును అర్థం చేసుకుంటుంది",
    "chat.instant": "తక్షణ ప్రతిస్పందనలు",
    "chat.instant.desc": "వేగవంతమైన, నిజ-సమయ సమాధానాలు",

    // PDF Understanding Feature
    "pdfFeature.title": "PDF అవగాహన",
    "pdfFeature.subtitle": "ఏదైనా PDF ను అప్‌లోడ్ చేయండి మరియు తక్షణ తెలుగు వివరణలను పొందండి",
    "pdfFeature.smart": "స్మార్ట్ సంగ్రహణ",
    "pdfFeature.smart.desc": "అధునాతన AI స్కాన్ చేసిన పత్రాలు మరియు చిత్రాలతో సహా PDF ల నుండి టెక్స్ట్‌ను సంగ్రహిస్తుంది.",
    "pdfFeature.anyLang": "ఏ భాష అయినా",
    "pdfFeature.anyLang.desc": "ఇంగ్లీష్, హిందీ లేదా తెలుగులో పత్రాలను అప్‌లోడ్ చేయండి - అన్నీ సులభమైన తెలుగులోకి మార్చబడతాయి.",

    // Dialect Friendly Feature
    "dialectFeature.title": "మాండలిక-స్నేహపూర్వక సారాంశాలు",
    "dialectFeature.subtitle": "ప్రాంతీయ వ్యత్యాసాలను గౌరవిస్తుంది మరియు మీకు తెలిసిన తెలుగును మాట్లాడుతుంది",
    "dialectFeature.feelsLike": "ఇంటిలా అనిపిస్తుంది",
    "dialectFeature.feelsLike.desc": "TeluguLens AI మీ ప్రాంతీయ మాండలికానికి అనుగుణంగా ఉంటుంది, వివరణలను సహజంగా మరియు సుపరిచితంగా అనిపించేలా చేస్తుంది - మీ గ్రామం లేదా నగరం నుండి ఎవరితోనైనా మాట్లాడినట్లుగా.",

    // Hospital Documents Feature
    "hospital.title": "ఆసుపత్రి పత్రాల వివరణకర్త",
    "hospital.subtitle": "వైద్య ప్రిస్క్రిప్షన్లు మరియు ఆరోగ్య సంరక్షణ పత్రాలను సులభమైన తెలుగులో అర్థం చేసుకోండి",
    "hospital.medical": "వైద్య పదాలు",
    "hospital.medical.desc": "సంక్లిష్ట పదాలు సరళీకరించబడ్డాయి",
    "hospital.dosage": "మోతాదు సూచనలు",
    "hospital.dosage.desc": "స్పష్టమైన తెలుగు సూచనలు",
    "hospital.safety": "భద్రతా సమాచారం",
    "hospital.safety.desc": "ముఖ్యమైన హెచ్చరికలు వివరించబడ్డాయి",

    // Agriculture Feature
    "agri.title": "వ్యవసాయ అప్‌డేట్ సరళీకరణ",
    "agri.subtitle": "వ్యవసాయ పథకాలు మరియు గ్రామీణ సంక్షేమ కార్యక్రమాలను సులభంగా అర్థం చేసుకోండి",
    "agri.crop": "పంట సబ్సిడీలు",
    "agri.crop.desc": "రైతు భరోసా, రైతు బంధు పథకాల వివరాలు",
    "agri.irrigation": "నీటిపారుదల పథకాలు",
    "agri.irrigation.desc": "నీటి సౌకర్యాల గురించి తెలియజేయడం",
    "agri.modern": "ఆధునిక గ్రామీణ-సాంకేతిక వేదిక",
    "agri.modern.desc": "ప్రభుత్వ వ్యవసాయ పథకాలు మరియు తెలుగు మాట్లాడే రైతుల మధ్య అంతరాన్ని తగ్గించడం",

    // Save & History Feature
    "saveFeature.title": "సేవ్ & హిస్టరీ",
    "saveFeature.subtitle": "మీ సంభాషణ చరిత్ర మరియు సేవ్ చేసిన వివరణలను ఎప్పుడైనా యాక్సెస్ చేయండి",
    "saveFeature.organized": "వ్యవస్థీకృత ఆర్కైవ్",
    "saveFeature.organized.desc": "మీ గత సంభాషణలు, పత్రాలు మరియు వివరణలన్నీ కాలక్రమానుసారంగా వ్యవస్థీకరించబడ్డాయి.",
    "saveFeature.quick": "త్వరిత ప్రాప్యత",
    "saveFeature.quick.desc": "ఏదైనా మునుపటి వివరణ లేదా పత్రాన్ని ఒక క్లిక్‌తో శోధించండి మరియు మళ్లీ చూడండి.",
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "te" : "en"));
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
