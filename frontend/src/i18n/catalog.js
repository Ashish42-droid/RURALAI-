/**
 * Translation catalogue.
 *
 * Flat dotted keys, one object per locale, no UI code anywhere in this file.
 *
 * ── Coverage, stated plainly ────────────────────────────────────────────────
 *
 * `en` is the reference and is complete. Every other locale is allowed to be
 * partial: anything absent falls back to English (see i18n/index.jsx), so a
 * half-translated locale renders readable English rather than a raw key. That
 * is what makes it safe to ship a language before it is finished.
 *
 * The strings translated first are the ones every user meets before they can
 * do anything else — the language gate, sign-in, navigation, roles, the risk
 * tiers and the common actions. Deep clinical screens follow as speakers
 * review them.
 *
 * ── Why the clinical vocabulary is handled carefully ────────────────────────
 *
 * Triage tiers are not ordinary UI copy. "Emergency" rendered as a word that
 * reads closer to "urgent" in another language changes what a health worker
 * does with a dying patient. Where a tier had an established Hindi rendering
 * already in the product (ReferralPanel), that wording is reused rather than
 * re-invented, and `reviewed: false` in languages.js marks every locale a
 * qualified speaker has not yet checked.
 */

export const CATALOG = {
  en: {
    'lang.title': 'Choose your language',
    'lang.subtitle': 'You can change this at any time.',
    'lang.continue': 'Continue',
    'lang.search': 'Search languages',
    'lang.unreviewed': 'This translation has not yet been checked by a qualified speaker. Clinical wording may be imperfect.',
    'lang.switch': 'Language',

    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.retry': 'Try again',
    'common.search': 'Search',
    'common.loading': 'Loading…',
    'common.confirm': 'Confirm',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.optional': 'Optional',
    'common.required': 'Required',
    'common.error': 'Something went wrong',
    'common.offline': 'This device is offline. Reconnect and try again.',

    'app.name': 'Rural Health Grid',
    'app.tagline': 'AI-assisted village clinic network',

    'nav.dashboard': 'Dashboard',
    'nav.title': 'Navigation',
    'nav.patients': 'Patient Register',
    'nav.register': 'Register Patient',
    'nav.admin': 'Administration',
    'nav.audit': 'Audit Trail',
    'status.online': 'Network online',
    'nav.queue': 'Case queue',
    'nav.notifications': 'Notifications',
    'nav.signout': 'Sign out',
    'nav.open': 'Open navigation',
    'nav.close': 'Close navigation',

    'role.doctor': 'Doctor',
    'role.assistant': 'Clinic Assistant',
    'role.admin': 'Administrator',

    'auth.signin': 'Staff Sign In',
    'auth.email': 'Email address',
    'auth.password': 'Your password',
    'auth.submit': 'Sign In',
    'auth.showPassword': 'Show password',
    'auth.hidePassword': 'Hide password',
    'auth.verifying': 'Verifying…',
    'auth.failed': 'Invalid email or password.',

    'tier.low': 'Low risk',
    'tier.moderate': 'Moderate risk',
    'tier.high': 'High risk',
    'tier.emergency': 'Emergency',

    'referral.call108': 'Call 108 — ambulance',
    'referral.directions': 'Start directions'
  },

  hi: {
    'lang.title': 'अपनी भाषा चुनें',
    'lang.subtitle': 'आप इसे कभी भी बदल सकते हैं।',
    'lang.continue': 'आगे बढ़ें',
    'lang.search': 'भाषा खोजें',
    'lang.unreviewed': 'इस अनुवाद की जाँच किसी योग्य वक्ता ने अभी नहीं की है। चिकित्सा शब्दावली में त्रुटि हो सकती है।',
    'lang.switch': 'भाषा',
    'common.save': 'सहेजें', 'common.cancel': 'रद्द करें', 'common.close': 'बंद करें',
    'common.back': 'पीछे', 'common.next': 'आगे', 'common.retry': 'फिर कोशिश करें',
    'common.search': 'खोजें', 'common.loading': 'लोड हो रहा है…', 'common.confirm': 'पुष्टि करें',
    'common.yes': 'हाँ', 'common.no': 'नहीं', 'common.optional': 'वैकल्पिक', 'common.required': 'आवश्यक',
    'common.error': 'कुछ गड़बड़ हुई', 'common.offline': 'यह डिवाइस ऑफ़लाइन है। दोबारा जुड़कर कोशिश करें।',
    'app.name': 'ग्रामीण स्वास्थ्य ग्रिड', 'app.tagline': 'एआई-सहायित ग्राम क्लिनिक नेटवर्क',
    'nav.dashboard': 'डैशबोर्ड', 'nav.title': 'नेविगेशन',
    'nav.patients': 'मरीज़ रजिस्टर', 'nav.register': 'नया मरीज़ दर्ज करें',
    'nav.admin': 'प्रशासन', 'nav.audit': 'ऑडिट रिकॉर्ड', 'status.online': 'नेटवर्क चालू है',
    'nav.queue': 'केस सूची',
    'nav.notifications': 'सूचनाएँ', 'nav.signout': 'साइन आउट',
    'nav.open': 'मेन्यू खोलें', 'nav.close': 'मेन्यू बंद करें',
    'role.doctor': 'डॉक्टर', 'role.assistant': 'क्लिनिक सहायक', 'role.admin': 'प्रशासक',
    'auth.signin': 'स्टाफ़ साइन इन', 'auth.email': 'ईमेल पता', 'auth.password': 'आपका पासवर्ड',
    'auth.submit': 'साइन इन करें', 'auth.showPassword': 'पासवर्ड दिखाएँ',
    'auth.hidePassword': 'पासवर्ड छिपाएँ', 'auth.verifying': 'जाँच हो रही है…',
    'auth.failed': 'ईमेल या पासवर्ड ग़लत है।',
    'tier.low': 'कम जोखिम', 'tier.moderate': 'मध्यम जोखिम', 'tier.high': 'उच्च जोखिम', 'tier.emergency': 'आपातकाल',
    'referral.call108': '108 पर कॉल करें — एम्बुलेंस', 'referral.directions': 'रास्ता देखें'
  },

  bn: {
    'lang.title': 'আপনার ভাষা বেছে নিন', 'lang.subtitle': 'আপনি যে কোনও সময় এটি বদলাতে পারেন।',
    'lang.continue': 'এগিয়ে যান', 'lang.search': 'ভাষা খুঁজুন',
    'lang.unreviewed': 'এই অনুবাদ এখনও কোনও দক্ষ বক্তা যাচাই করেননি। চিকিৎসা পরিভাষায় ভুল থাকতে পারে।',
    'lang.switch': 'ভাষা',
    'common.save': 'সংরক্ষণ', 'common.cancel': 'বাতিল', 'common.close': 'বন্ধ করুন',
    'common.back': 'পিছনে', 'common.next': 'পরবর্তী', 'common.retry': 'আবার চেষ্টা করুন',
    'common.search': 'খুঁজুন', 'common.loading': 'লোড হচ্ছে…', 'common.confirm': 'নিশ্চিত করুন',
    'common.yes': 'হ্যাঁ', 'common.no': 'না', 'common.optional': 'ঐচ্ছিক', 'common.required': 'আবশ্যক',
    'common.error': 'কিছু ভুল হয়েছে', 'common.offline': 'ডিভাইসটি অফলাইন। সংযোগ করে আবার চেষ্টা করুন।',
    'app.name': 'গ্রামীণ স্বাস্থ্য গ্রিড', 'app.tagline': 'এআই-সহায়ক গ্রাম ক্লিনিক নেটওয়ার্ক',
    'nav.dashboard': 'ড্যাশবোর্ড', 'nav.patients': 'রোগী', 'nav.queue': 'কেস তালিকা',
    'nav.notifications': 'বিজ্ঞপ্তি', 'nav.signout': 'সাইন আউট',
    'nav.open': 'মেনু খুলুন', 'nav.close': 'মেনু বন্ধ করুন',
    'role.doctor': 'ডাক্তার', 'role.assistant': 'ক্লিনিক সহকারী', 'role.admin': 'প্রশাসক',
    'auth.signin': 'কর্মী সাইন ইন', 'auth.email': 'ইমেল ঠিকানা', 'auth.password': 'আপনার পাসওয়ার্ড',
    'auth.submit': 'সাইন ইন', 'auth.showPassword': 'পাসওয়ার্ড দেখান',
    'auth.failed': 'ইমেল বা পাসওয়ার্ড ভুল।',
    'tier.low': 'কম ঝুঁকি', 'tier.moderate': 'মাঝারি ঝুঁকি', 'tier.high': 'উচ্চ ঝুঁকি', 'tier.emergency': 'জরুরি',
    'referral.call108': '১০৮ নম্বরে কল করুন — অ্যাম্বুলেন্স', 'referral.directions': 'পথ দেখুন'
  },

  te: {
    'lang.title': 'మీ భాషను ఎంచుకోండి', 'lang.subtitle': 'మీరు దీన్ని ఎప్పుడైనా మార్చవచ్చు.',
    'lang.continue': 'కొనసాగించు', 'lang.search': 'భాషలను వెతకండి',
    'lang.unreviewed': 'ఈ అనువాదాన్ని ఇంకా అర్హత గల వ్యక్తి తనిఖీ చేయలేదు. వైద్య పదజాలంలో పొరపాట్లు ఉండవచ్చు.',
    'lang.switch': 'భాష',
    'common.save': 'సేవ్', 'common.cancel': 'రద్దు', 'common.close': 'మూసివేయి',
    'common.back': 'వెనుకకు', 'common.next': 'తరువాత', 'common.retry': 'మళ్ళీ ప్రయత్నించండి',
    'common.search': 'వెతకండి', 'common.loading': 'లోడ్ అవుతోంది…', 'common.confirm': 'నిర్ధారించండి',
    'common.yes': 'అవును', 'common.no': 'కాదు', 'common.optional': 'ఐచ్ఛికం', 'common.required': 'తప్పనిసరి',
    'common.error': 'ఏదో పొరపాటు జరిగింది', 'common.offline': 'ఈ పరికరం ఆఫ్‌లైన్‌లో ఉంది. మళ్ళీ కనెక్ట్ చేసి ప్రయత్నించండి.',
    'app.name': 'గ్రామీణ ఆరోగ్య గ్రిడ్', 'app.tagline': 'AI-సహాయక గ్రామ క్లినిక్ నెట్‌వర్క్',
    'nav.dashboard': 'డాష్‌బోర్డ్', 'nav.patients': 'రోగులు', 'nav.queue': 'కేసుల జాబితా',
    'nav.notifications': 'నోటిఫికేషన్లు', 'nav.signout': 'సైన్ అవుట్',
    'nav.open': 'మెనూ తెరవండి', 'nav.close': 'మెనూ మూసివేయండి',
    'role.doctor': 'డాక్టర్', 'role.assistant': 'క్లినిక్ సహాయకుడు', 'role.admin': 'నిర్వాహకుడు',
    'auth.signin': 'సిబ్బంది సైన్ ఇన్', 'auth.email': 'ఇమెయిల్ చిరునామా', 'auth.password': 'మీ పాస్‌వర్డ్',
    'auth.submit': 'సైన్ ఇన్', 'auth.showPassword': 'పాస్‌వర్డ్ చూపించు',
    'auth.failed': 'ఇమెయిల్ లేదా పాస్‌వర్డ్ తప్పు.',
    'tier.low': 'తక్కువ ప్రమాదం', 'tier.moderate': 'మధ్యస్థ ప్రమాదం', 'tier.high': 'అధిక ప్రమాదం', 'tier.emergency': 'అత్యవసరం',
    'referral.call108': '108కి కాల్ చేయండి — అంబులెన్స్', 'referral.directions': 'దారి చూపించు'
  },

  mr: {
    'lang.title': 'तुमची भाषा निवडा', 'lang.subtitle': 'तुम्ही हे कधीही बदलू शकता.',
    'lang.continue': 'पुढे जा', 'lang.search': 'भाषा शोधा',
    'lang.unreviewed': 'या भाषांतराची तपासणी अद्याप पात्र व्यक्तीने केलेली नाही. वैद्यकीय शब्दांत चूक असू शकते.',
    'lang.switch': 'भाषा',
    'common.save': 'जतन करा', 'common.cancel': 'रद्द करा', 'common.close': 'बंद करा',
    'common.back': 'मागे', 'common.next': 'पुढे', 'common.retry': 'पुन्हा प्रयत्न करा',
    'common.search': 'शोधा', 'common.loading': 'लोड होत आहे…', 'common.confirm': 'निश्चित करा',
    'common.yes': 'होय', 'common.no': 'नाही', 'common.optional': 'ऐच्छिक', 'common.required': 'आवश्यक',
    'common.error': 'काहीतरी चूक झाली', 'common.offline': 'हे उपकरण ऑफलाइन आहे. पुन्हा जोडून प्रयत्न करा.',
    'app.name': 'ग्रामीण आरोग्य ग्रिड', 'app.tagline': 'एआय-सहाय्यित ग्राम क्लिनिक नेटवर्क',
    'nav.dashboard': 'डॅशबोर्ड', 'nav.patients': 'रुग्ण', 'nav.queue': 'केस यादी',
    'nav.notifications': 'सूचना', 'nav.signout': 'साइन आउट',
    'nav.open': 'मेनू उघडा', 'nav.close': 'मेनू बंद करा',
    'role.doctor': 'डॉक्टर', 'role.assistant': 'क्लिनिक सहाय्यक', 'role.admin': 'प्रशासक',
    'auth.signin': 'कर्मचारी साइन इन', 'auth.email': 'ईमेल पत्ता', 'auth.password': 'तुमचा पासवर्ड',
    'auth.submit': 'साइन इन करा', 'auth.showPassword': 'पासवर्ड दाखवा',
    'auth.failed': 'ईमेल किंवा पासवर्ड चुकीचा आहे.',
    'tier.low': 'कमी धोका', 'tier.moderate': 'मध्यम धोका', 'tier.high': 'उच्च धोका', 'tier.emergency': 'आणीबाणी',
    'referral.call108': '१०८ वर कॉल करा — रुग्णवाहिका', 'referral.directions': 'मार्ग दाखवा'
  },

  ta: {
    'lang.title': 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்', 'lang.subtitle': 'இதை எப்போது வேண்டுமானாலும் மாற்றலாம்.',
    'lang.continue': 'தொடரவும்', 'lang.search': 'மொழிகளைத் தேடு',
    'lang.unreviewed': 'இந்த மொழிபெயர்ப்பை இன்னும் தகுதியான ஒருவர் சரிபார்க்கவில்லை. மருத்துவச் சொற்களில் பிழை இருக்கலாம்.',
    'lang.switch': 'மொழி',
    'common.save': 'சேமி', 'common.cancel': 'ரத்து', 'common.close': 'மூடு',
    'common.back': 'பின்', 'common.next': 'அடுத்து', 'common.retry': 'மீண்டும் முயற்சிக்கவும்',
    'common.search': 'தேடு', 'common.loading': 'ஏற்றப்படுகிறது…', 'common.confirm': 'உறுதிப்படுத்து',
    'common.yes': 'ஆம்', 'common.no': 'இல்லை', 'common.optional': 'விருப்பத்தேர்வு', 'common.required': 'தேவை',
    'common.error': 'ஏதோ தவறு நடந்தது', 'common.offline': 'இந்தச் சாதனம் ஆஃப்லைனில் உள்ளது. மீண்டும் இணைத்து முயற்சிக்கவும்.',
    'app.name': 'கிராமப்புற சுகாதார வலையமைப்பு', 'app.tagline': 'AI-உதவி கிராம மருத்துவமனை வலையமைப்பு',
    'nav.dashboard': 'டாஷ்போர்டு', 'nav.patients': 'நோயாளிகள்', 'nav.queue': 'வழக்குப் பட்டியல்',
    'nav.notifications': 'அறிவிப்புகள்', 'nav.signout': 'வெளியேறு',
    'nav.open': 'மெனுவைத் திற', 'nav.close': 'மெனுவை மூடு',
    'role.doctor': 'மருத்துவர்', 'role.assistant': 'மருத்துவமனை உதவியாளர்', 'role.admin': 'நிர்வாகி',
    'auth.signin': 'ஊழியர் உள்நுழைவு', 'auth.email': 'மின்னஞ்சல் முகவரி', 'auth.password': 'உங்கள் கடவுச்சொல்',
    'auth.submit': 'உள்நுழை', 'auth.showPassword': 'கடவுச்சொல்லைக் காட்டு',
    'auth.failed': 'மின்னஞ்சல் அல்லது கடவுச்சொல் தவறு.',
    'tier.low': 'குறைந்த ஆபத்து', 'tier.moderate': 'மிதமான ஆபத்து', 'tier.high': 'அதிக ஆபத்து', 'tier.emergency': 'அவசரம்',
    'referral.call108': '108 ஐ அழைக்கவும் — ஆம்புலன்ஸ்', 'referral.directions': 'வழியைக் காட்டு'
  },

  gu: {
    'lang.title': 'તમારી ભાષા પસંદ કરો', 'lang.subtitle': 'તમે આ ગમે ત્યારે બદલી શકો છો.',
    'lang.continue': 'આગળ વધો', 'lang.search': 'ભાષા શોધો',
    'lang.unreviewed': 'આ અનુવાદ હજી કોઈ લાયક વ્યક્તિએ તપાસ્યો નથી. તબીબી શબ્દોમાં ભૂલ હોઈ શકે છે.',
    'lang.switch': 'ભાષા',
    'common.save': 'સાચવો', 'common.cancel': 'રદ કરો', 'common.close': 'બંધ કરો',
    'common.back': 'પાછળ', 'common.next': 'આગળ', 'common.retry': 'ફરી પ્રયાસ કરો',
    'common.search': 'શોધો', 'common.loading': 'લોડ થાય છે…', 'common.confirm': 'ખાતરી કરો',
    'common.yes': 'હા', 'common.no': 'ના', 'common.optional': 'વૈકલ્પિક', 'common.required': 'જરૂરી',
    'common.error': 'કંઈક ખોટું થયું', 'common.offline': 'આ ઉપકરણ ઑફલાઇન છે. ફરી જોડાઈને પ્રયાસ કરો.',
    'app.name': 'ગ્રામીણ આરોગ્ય ગ્રિડ', 'app.tagline': 'AI-સહાયિત ગ્રામ ક્લિનિક નેટવર્ક',
    'nav.dashboard': 'ડેશબોર્ડ', 'nav.patients': 'દર્દીઓ', 'nav.queue': 'કેસ યાદી',
    'nav.notifications': 'સૂચનાઓ', 'nav.signout': 'સાઇન આઉટ',
    'nav.open': 'મેનૂ ખોલો', 'nav.close': 'મેનૂ બંધ કરો',
    'role.doctor': 'ડૉક્ટર', 'role.assistant': 'ક્લિનિક સહાયક', 'role.admin': 'વ્યવસ્થાપક',
    'auth.signin': 'સ્ટાફ સાઇન ઇન', 'auth.email': 'ઇમેઇલ સરનામું', 'auth.password': 'તમારો પાસવર્ડ',
    'auth.submit': 'સાઇન ઇન', 'auth.showPassword': 'પાસવર્ડ બતાવો',
    'auth.failed': 'ઇમેઇલ અથવા પાસવર્ડ ખોટો છે.',
    'tier.low': 'ઓછું જોખમ', 'tier.moderate': 'મધ્યમ જોખમ', 'tier.high': 'ઊંચું જોખમ', 'tier.emergency': 'કટોકટી',
    'referral.call108': '108 પર કૉલ કરો — એમ્બ્યુલન્સ', 'referral.directions': 'રસ્તો બતાવો'
  },

  ur: {
    'lang.title': 'اپنی زبان منتخب کریں', 'lang.subtitle': 'آپ اسے کسی بھی وقت بدل سکتے ہیں۔',
    'lang.continue': 'آگے بڑھیں', 'lang.search': 'زبانیں تلاش کریں',
    'lang.unreviewed': 'اس ترجمے کی جانچ ابھی کسی اہل شخص نے نہیں کی۔ طبی الفاظ میں غلطی ہو سکتی ہے۔',
    'lang.switch': 'زبان',
    'common.save': 'محفوظ کریں', 'common.cancel': 'منسوخ کریں', 'common.close': 'بند کریں',
    'common.back': 'واپس', 'common.next': 'اگلا', 'common.retry': 'دوبارہ کوشش کریں',
    'common.search': 'تلاش کریں', 'common.loading': 'لوڈ ہو رہا ہے…', 'common.confirm': 'تصدیق کریں',
    'common.yes': 'ہاں', 'common.no': 'نہیں', 'common.optional': 'اختیاری', 'common.required': 'لازمی',
    'common.error': 'کچھ غلط ہو گیا', 'common.offline': 'یہ آلہ آف لائن ہے۔ دوبارہ جڑ کر کوشش کریں۔',
    'app.name': 'دیہی صحت گرڈ', 'app.tagline': 'اے آئی معاون گاؤں کلینک نیٹ ورک',
    'nav.dashboard': 'ڈیش بورڈ', 'nav.patients': 'مریض', 'nav.queue': 'کیس فہرست',
    'nav.notifications': 'اطلاعات', 'nav.signout': 'سائن آؤٹ',
    'nav.open': 'مینو کھولیں', 'nav.close': 'مینو بند کریں',
    'role.doctor': 'ڈاکٹر', 'role.assistant': 'کلینک اسسٹنٹ', 'role.admin': 'منتظم',
    'auth.signin': 'عملہ سائن ان', 'auth.email': 'ای میل پتہ', 'auth.password': 'آپ کا پاس ورڈ',
    'auth.submit': 'سائن ان', 'auth.showPassword': 'پاس ورڈ دکھائیں',
    'auth.failed': 'ای میل یا پاس ورڈ غلط ہے۔',
    'tier.low': 'کم خطرہ', 'tier.moderate': 'درمیانہ خطرہ', 'tier.high': 'زیادہ خطرہ', 'tier.emergency': 'ہنگامی',
    'referral.call108': '108 پر کال کریں — ایمبولینس', 'referral.directions': 'راستہ دکھائیں'
  },

  kn: {
    'lang.title': 'ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆರಿಸಿ', 'lang.subtitle': 'ನೀವು ಇದನ್ನು ಯಾವಾಗ ಬೇಕಾದರೂ ಬದಲಾಯಿಸಬಹುದು.',
    'lang.continue': 'ಮುಂದುವರಿಸಿ', 'lang.search': 'ಭಾಷೆಗಳನ್ನು ಹುಡುಕಿ',
    'lang.unreviewed': 'ಈ ಅನುವಾದವನ್ನು ಇನ್ನೂ ಅರ್ಹ ವ್ಯಕ್ತಿ ಪರಿಶೀಲಿಸಿಲ್ಲ. ವೈದ್ಯಕೀಯ ಪದಗಳಲ್ಲಿ ದೋಷವಿರಬಹುದು.',
    'lang.switch': 'ಭಾಷೆ',
    'common.save': 'ಉಳಿಸಿ', 'common.cancel': 'ರದ್ದುಮಾಡಿ', 'common.close': 'ಮುಚ್ಚಿ',
    'common.back': 'ಹಿಂದೆ', 'common.next': 'ಮುಂದೆ', 'common.retry': 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',
    'common.search': 'ಹುಡುಕಿ', 'common.loading': 'ಲೋಡ್ ಆಗುತ್ತಿದೆ…', 'common.confirm': 'ದೃಢೀಕರಿಸಿ',
    'common.yes': 'ಹೌದು', 'common.no': 'ಇಲ್ಲ', 'common.optional': 'ಐಚ್ಛಿಕ', 'common.required': 'ಅಗತ್ಯ',
    'common.error': 'ಏನೋ ತಪ್ಪಾಗಿದೆ', 'common.offline': 'ಈ ಸಾಧನ ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿದೆ. ಮತ್ತೆ ಸಂಪರ್ಕಿಸಿ ಪ್ರಯತ್ನಿಸಿ.',
    'app.name': 'ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ ಗ್ರಿಡ್', 'app.tagline': 'AI-ಸಹಾಯಿತ ಗ್ರಾಮ ಚಿಕಿತ್ಸಾಲಯ ಜಾಲ',
    'nav.dashboard': 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', 'nav.patients': 'ರೋಗಿಗಳು', 'nav.queue': 'ಪ್ರಕರಣ ಪಟ್ಟಿ',
    'nav.notifications': 'ಅಧಿಸೂಚನೆಗಳು', 'nav.signout': 'ಸೈನ್ ಔಟ್',
    'nav.open': 'ಮೆನು ತೆರೆಯಿರಿ', 'nav.close': 'ಮೆನು ಮುಚ್ಚಿ',
    'role.doctor': 'ವೈದ್ಯರು', 'role.assistant': 'ಚಿಕಿತ್ಸಾಲಯ ಸಹಾಯಕ', 'role.admin': 'ನಿರ್ವಾಹಕ',
    'auth.signin': 'ಸಿಬ್ಬಂದಿ ಸೈನ್ ಇನ್', 'auth.email': 'ಇಮೇಲ್ ವಿಳಾಸ', 'auth.password': 'ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್',
    'auth.submit': 'ಸೈನ್ ಇನ್', 'auth.showPassword': 'ಪಾಸ್‌ವರ್ಡ್ ತೋರಿಸಿ',
    'auth.failed': 'ಇಮೇಲ್ ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್ ತಪ್ಪಾಗಿದೆ.',
    'tier.low': 'ಕಡಿಮೆ ಅಪಾಯ', 'tier.moderate': 'ಮಧ್ಯಮ ಅಪಾಯ', 'tier.high': 'ಹೆಚ್ಚು ಅಪಾಯ', 'tier.emergency': 'ತುರ್ತು',
    'referral.call108': '108 ಗೆ ಕರೆ ಮಾಡಿ — ಆಂಬ್ಯುಲೆನ್ಸ್', 'referral.directions': 'ದಾರಿ ತೋರಿಸಿ'
  },

  or: {
    'lang.title': 'ଆପଣଙ୍କ ଭାଷା ବାଛନ୍ତୁ', 'lang.subtitle': 'ଆପଣ ଏହାକୁ ଯେକୌଣସି ସମୟରେ ବଦଳାଇ ପାରିବେ।',
    'lang.continue': 'ଆଗକୁ ଯାଆନ୍ତୁ', 'lang.search': 'ଭାଷା ଖୋଜନ୍ତୁ',
    'lang.unreviewed': 'ଏହି ଅନୁବାଦ ଏପର୍ଯ୍ୟନ୍ତ ଯୋଗ୍ୟ ବ୍ୟକ୍ତିଙ୍କ ଦ୍ୱାରା ଯାଞ୍ଚ ହୋଇନାହିଁ। ଚିକିତ୍ସା ଶବ୍ଦରେ ଭୁଲ ଥାଇପାରେ।',
    'lang.switch': 'ଭାଷା',
    'common.save': 'ସଞ୍ଚୟ', 'common.cancel': 'ବାତିଲ', 'common.close': 'ବନ୍ଦ କରନ୍ତୁ',
    'common.back': 'ପଛକୁ', 'common.next': 'ପରବର୍ତ୍ତୀ', 'common.retry': 'ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ',
    'common.search': 'ଖୋଜନ୍ତୁ', 'common.loading': 'ଲୋଡ୍ ହେଉଛି…', 'common.confirm': 'ନିଶ୍ଚିତ କରନ୍ତୁ',
    'common.yes': 'ହଁ', 'common.no': 'ନା', 'common.optional': 'ଐଚ୍ଛିକ', 'common.required': 'ଆବଶ୍ୟକ',
    'common.error': 'କିଛି ଭୁଲ ହେଲା', 'common.offline': 'ଏହି ଉପକରଣ ଅଫଲାଇନ। ପୁଣି ସଂଯୋଗ କରି ଚେଷ୍ଟା କରନ୍ତୁ।',
    'app.name': 'ଗ୍ରାମୀଣ ସ୍ୱାସ୍ଥ୍ୟ ଗ୍ରିଡ୍', 'app.tagline': 'AI-ସହାୟକ ଗ୍ରାମ କ୍ଲିନିକ୍ ନେଟୱାର୍କ',
    'nav.dashboard': 'ଡ୍ୟାସବୋର୍ଡ', 'nav.patients': 'ରୋଗୀ', 'nav.queue': 'କେସ୍ ତାଲିକା',
    'nav.notifications': 'ବିଜ୍ଞପ୍ତି', 'nav.signout': 'ସାଇନ୍ ଆଉଟ୍',
    'nav.open': 'ମେନୁ ଖୋଲନ୍ତୁ', 'nav.close': 'ମେନୁ ବନ୍ଦ କରନ୍ତୁ',
    'role.doctor': 'ଡାକ୍ତର', 'role.assistant': 'କ୍ଲିନିକ୍ ସହାୟକ', 'role.admin': 'ପ୍ରଶାସକ',
    'auth.signin': 'କର୍ମଚାରୀ ସାଇନ୍ ଇନ୍', 'auth.email': 'ଇମେଲ୍ ଠିକଣା', 'auth.password': 'ଆପଣଙ୍କ ପାସୱାର୍ଡ',
    'auth.submit': 'ସାଇନ୍ ଇନ୍', 'auth.showPassword': 'ପାସୱାର୍ଡ ଦେଖାନ୍ତୁ',
    'auth.failed': 'ଇମେଲ୍ କିମ୍ବା ପାସୱାର୍ଡ ଭୁଲ।',
    'tier.low': 'କମ୍ ବିପଦ', 'tier.moderate': 'ମଧ୍ୟମ ବିପଦ', 'tier.high': 'ଅଧିକ ବିପଦ', 'tier.emergency': 'ଜରୁରୀ',
    'referral.call108': '108 କୁ କଲ୍ କରନ୍ତୁ — ଆମ୍ବୁଲାନ୍ସ', 'referral.directions': 'ରାସ୍ତା ଦେଖାନ୍ତୁ'
  },

  ml: {
    'lang.title': 'നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക', 'lang.subtitle': 'ഇത് എപ്പോൾ വേണമെങ്കിലും മാറ്റാം.',
    'lang.continue': 'തുടരുക', 'lang.search': 'ഭാഷകൾ തിരയുക',
    'lang.unreviewed': 'ഈ വിവർത്തനം യോഗ്യതയുള്ള ഒരാൾ ഇതുവരെ പരിശോധിച്ചിട്ടില്ല. വൈദ്യശാസ്ത്ര പദങ്ങളിൽ പിശകുണ്ടാകാം.',
    'lang.switch': 'ഭാഷ',
    'common.save': 'സേവ് ചെയ്യുക', 'common.cancel': 'റദ്ദാക്കുക', 'common.close': 'അടയ്ക്കുക',
    'common.back': 'പിന്നോട്ട്', 'common.next': 'അടുത്തത്', 'common.retry': 'വീണ്ടും ശ്രമിക്കുക',
    'common.search': 'തിരയുക', 'common.loading': 'ലോഡ് ചെയ്യുന്നു…', 'common.confirm': 'സ്ഥിരീകരിക്കുക',
    'common.yes': 'അതെ', 'common.no': 'അല്ല', 'common.optional': 'ഐച്ഛികം', 'common.required': 'ആവശ്യമാണ്',
    'common.error': 'എന്തോ കുഴപ്പം സംഭവിച്ചു', 'common.offline': 'ഈ ഉപകരണം ഓഫ്‌ലൈനാണ്. വീണ്ടും ബന്ധിപ്പിച്ച് ശ്രമിക്കുക.',
    'app.name': 'ഗ്രാമീണ ആരോഗ്യ ഗ്രിഡ്', 'app.tagline': 'AI-സഹായ ഗ്രാമ ക്ലിനിക് ശൃംഖല',
    'nav.dashboard': 'ഡാഷ്‌ബോർഡ്', 'nav.patients': 'രോഗികൾ', 'nav.queue': 'കേസ് പട്ടിക',
    'nav.notifications': 'അറിയിപ്പുകൾ', 'nav.signout': 'സൈൻ ഔട്ട്',
    'nav.open': 'മെനു തുറക്കുക', 'nav.close': 'മെനു അടയ്ക്കുക',
    'role.doctor': 'ഡോക്ടർ', 'role.assistant': 'ക്ലിനിക് അസിസ്റ്റന്റ്', 'role.admin': 'അഡ്മിനിസ്ട്രേറ്റർ',
    'auth.signin': 'ജീവനക്കാരുടെ സൈൻ ഇൻ', 'auth.email': 'ഇമെയിൽ വിലാസം', 'auth.password': 'നിങ്ങളുടെ പാസ്‌വേഡ്',
    'auth.submit': 'സൈൻ ഇൻ', 'auth.showPassword': 'പാസ്‌വേഡ് കാണിക്കുക',
    'auth.failed': 'ഇമെയിലോ പാസ്‌വേഡോ തെറ്റാണ്.',
    'tier.low': 'കുറഞ്ഞ അപകടസാധ്യത', 'tier.moderate': 'ഇടത്തരം അപകടസാധ്യത', 'tier.high': 'ഉയർന്ന അപകടസാധ്യത', 'tier.emergency': 'അടിയന്തരം',
    'referral.call108': '108 ൽ വിളിക്കുക — ആംബുലൻസ്', 'referral.directions': 'വഴി കാണിക്കുക'
  },

  pa: {
    'lang.title': 'ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ', 'lang.subtitle': 'ਤੁਸੀਂ ਇਸਨੂੰ ਕਿਸੇ ਵੀ ਸਮੇਂ ਬਦਲ ਸਕਦੇ ਹੋ।',
    'lang.continue': 'ਅੱਗੇ ਵਧੋ', 'lang.search': 'ਭਾਸ਼ਾਵਾਂ ਲੱਭੋ',
    'lang.unreviewed': 'ਇਸ ਅਨੁਵਾਦ ਦੀ ਜਾਂਚ ਹਾਲੇ ਕਿਸੇ ਯੋਗ ਵਿਅਕਤੀ ਨੇ ਨਹੀਂ ਕੀਤੀ। ਡਾਕਟਰੀ ਸ਼ਬਦਾਂ ਵਿੱਚ ਗਲਤੀ ਹੋ ਸਕਦੀ ਹੈ।',
    'lang.switch': 'ਭਾਸ਼ਾ',
    'common.save': 'ਸੰਭਾਲੋ', 'common.cancel': 'ਰੱਦ ਕਰੋ', 'common.close': 'ਬੰਦ ਕਰੋ',
    'common.back': 'ਪਿੱਛੇ', 'common.next': 'ਅੱਗੇ', 'common.retry': 'ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ',
    'common.search': 'ਖੋਜੋ', 'common.loading': 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ…', 'common.confirm': 'ਪੁਸ਼ਟੀ ਕਰੋ',
    'common.yes': 'ਹਾਂ', 'common.no': 'ਨਹੀਂ', 'common.optional': 'ਵਿਕਲਪਿਕ', 'common.required': 'ਲੋੜੀਂਦਾ',
    'common.error': 'ਕੁਝ ਗਲਤ ਹੋਇਆ', 'common.offline': 'ਇਹ ਡਿਵਾਈਸ ਔਫਲਾਈਨ ਹੈ। ਦੁਬਾਰਾ ਜੁੜ ਕੇ ਕੋਸ਼ਿਸ਼ ਕਰੋ।',
    'app.name': 'ਪੇਂਡੂ ਸਿਹਤ ਗਰਿੱਡ', 'app.tagline': 'AI-ਸਹਾਇਤਾ ਪਿੰਡ ਕਲੀਨਿਕ ਨੈੱਟਵਰਕ',
    'nav.dashboard': 'ਡੈਸ਼ਬੋਰਡ', 'nav.patients': 'ਮਰੀਜ਼', 'nav.queue': 'ਕੇਸ ਸੂਚੀ',
    'nav.notifications': 'ਸੂਚਨਾਵਾਂ', 'nav.signout': 'ਸਾਈਨ ਆਊਟ',
    'nav.open': 'ਮੀਨੂ ਖੋਲ੍ਹੋ', 'nav.close': 'ਮੀਨੂ ਬੰਦ ਕਰੋ',
    'role.doctor': 'ਡਾਕਟਰ', 'role.assistant': 'ਕਲੀਨਿਕ ਸਹਾਇਕ', 'role.admin': 'ਪ੍ਰਸ਼ਾਸਕ',
    'auth.signin': 'ਸਟਾਫ਼ ਸਾਈਨ ਇਨ', 'auth.email': 'ਈਮੇਲ ਪਤਾ', 'auth.password': 'ਤੁਹਾਡਾ ਪਾਸਵਰਡ',
    'auth.submit': 'ਸਾਈਨ ਇਨ', 'auth.showPassword': 'ਪਾਸਵਰਡ ਦਿਖਾਓ',
    'auth.failed': 'ਈਮੇਲ ਜਾਂ ਪਾਸਵਰਡ ਗਲਤ ਹੈ।',
    'tier.low': 'ਘੱਟ ਜੋਖਮ', 'tier.moderate': 'ਦਰਮਿਆਨਾ ਜੋਖਮ', 'tier.high': 'ਵੱਧ ਜੋਖਮ', 'tier.emergency': 'ਐਮਰਜੈਂਸੀ',
    'referral.call108': '108 ਤੇ ਕਾਲ ਕਰੋ — ਐਂਬੂਲੈਂਸ', 'referral.directions': 'ਰਸਤਾ ਦਿਖਾਓ'
  },

  as: {
    'lang.title': 'আপোনাৰ ভাষা বাছনি কৰক', 'lang.subtitle': 'আপুনি ইয়াক যিকোনো সময়তে সলনি কৰিব পাৰে।',
    'lang.continue': 'আগবাঢ়ক', 'lang.search': 'ভাষা বিচাৰক',
    'lang.unreviewed': 'এই অনুবাদ এতিয়ালৈকে কোনো যোগ্য ব্যক্তিয়ে পৰীক্ষা কৰা নাই। চিকিৎসা শব্দত ভুল থাকিব পাৰে।',
    'lang.switch': 'ভাষা',
    'common.save': 'সংৰক্ষণ', 'common.cancel': 'বাতিল', 'common.close': 'বন্ধ কৰক',
    'common.back': 'পিছলৈ', 'common.next': 'পৰৱৰ্তী', 'common.retry': 'পুনৰ চেষ্টা কৰক',
    'common.search': 'বিচাৰক', 'common.loading': 'ল’ড হৈ আছে…', 'common.confirm': 'নিশ্চিত কৰক',
    'common.yes': 'হয়', 'common.no': 'নহয়', 'common.optional': 'ঐচ্ছিক', 'common.required': 'আৱশ্যক',
    'common.error': 'কিবা ভুল হ’ল', 'common.offline': 'এই ডিভাইচ অফলাইন। পুনৰ সংযোগ কৰি চেষ্টা কৰক।',
    'app.name': 'গ্ৰাম্য স্বাস্থ্য গ্ৰিড', 'app.tagline': 'AI-সহায়ক গাঁও ক্লিনিক নেটৱৰ্ক',
    'nav.dashboard': 'ডেছব’ৰ্ড', 'nav.patients': 'ৰোগী', 'nav.queue': 'কেছ তালিকা',
    'nav.notifications': 'জাননী', 'nav.signout': 'ছাইন আউট',
    'nav.open': 'মেনু খোলক', 'nav.close': 'মেনু বন্ধ কৰক',
    'role.doctor': 'ডাক্তৰ', 'role.assistant': 'ক্লিনিক সহায়ক', 'role.admin': 'প্ৰশাসক',
    'auth.signin': 'কৰ্মচাৰী ছাইন ইন', 'auth.email': 'ইমেইল ঠিকনা', 'auth.password': 'আপোনাৰ পাছৱৰ্ড',
    'auth.submit': 'ছাইন ইন', 'auth.showPassword': 'পাছৱৰ্ড দেখুৱাওক',
    'auth.failed': 'ইমেইল বা পাছৱৰ্ড ভুল।',
    'tier.low': 'কম বিপদ', 'tier.moderate': 'মধ্যম বিপদ', 'tier.high': 'অধিক বিপদ', 'tier.emergency': 'জৰুৰী',
    'referral.call108': '108 ত কল কৰক — এম্বুলেন্স', 'referral.directions': 'বাট দেখুৱাওক'
  },

  ne: {
    'lang.title': 'आफ्नो भाषा छान्नुहोस्', 'lang.subtitle': 'तपाईं यसलाई जुनसुकै बेला परिवर्तन गर्न सक्नुहुन्छ।',
    'lang.continue': 'अगाडि बढ्नुहोस्', 'lang.search': 'भाषा खोज्नुहोस्',
    'lang.unreviewed': 'यो अनुवाद अझै योग्य व्यक्तिले जाँचेको छैन। चिकित्सा शब्दमा त्रुटि हुन सक्छ।',
    'lang.switch': 'भाषा',
    'common.save': 'सुरक्षित गर्नुहोस्', 'common.cancel': 'रद्द गर्नुहोस्', 'common.close': 'बन्द गर्नुहोस्',
    'common.back': 'पछाडि', 'common.next': 'अर्को', 'common.retry': 'फेरि प्रयास गर्नुहोस्',
    'common.search': 'खोज्नुहोस्', 'common.loading': 'लोड हुँदैछ…', 'common.confirm': 'पुष्टि गर्नुहोस्',
    'common.yes': 'हो', 'common.no': 'होइन', 'common.optional': 'वैकल्पिक', 'common.required': 'आवश्यक',
    'common.error': 'केही गडबड भयो', 'common.offline': 'यो यन्त्र अफलाइन छ। पुनः जोडेर प्रयास गर्नुहोस्।',
    'app.name': 'ग्रामीण स्वास्थ्य ग्रिड', 'app.tagline': 'एआई-सहयोगी गाउँ क्लिनिक सञ्जाल',
    'nav.dashboard': 'ड्यासबोर्ड', 'nav.patients': 'बिरामी', 'nav.queue': 'केस सूची',
    'nav.notifications': 'सूचनाहरू', 'nav.signout': 'साइन आउट',
    'nav.open': 'मेनु खोल्नुहोस्', 'nav.close': 'मेनु बन्द गर्नुहोस्',
    'role.doctor': 'डाक्टर', 'role.assistant': 'क्लिनिक सहायक', 'role.admin': 'प्रशासक',
    'auth.signin': 'कर्मचारी साइन इन', 'auth.email': 'इमेल ठेगाना', 'auth.password': 'तपाईंको पासवर्ड',
    'auth.submit': 'साइन इन', 'auth.showPassword': 'पासवर्ड देखाउनुहोस्',
    'auth.failed': 'इमेल वा पासवर्ड गलत छ।',
    'tier.low': 'कम जोखिम', 'tier.moderate': 'मध्यम जोखिम', 'tier.high': 'उच्च जोखिम', 'tier.emergency': 'आपतकाल',
    'referral.call108': '१०८ मा कल गर्नुहोस् — एम्बुलेन्स', 'referral.directions': 'बाटो देखाउनुहोस्'
  },

  sa: {
    'lang.title': 'भवतः भाषां चिनोतु', 'lang.subtitle': 'भवान् एतत् कदापि परिवर्तयितुं शक्नोति।',
    'lang.continue': 'अग्रे गच्छतु', 'lang.search': 'भाषाः अन्विष्यतु',
    'lang.unreviewed': 'अस्य अनुवादस्य परीक्षणं योग्येन जनेन अद्यापि न कृतम्। चिकित्साशब्देषु दोषः स्यात्।',
    'lang.switch': 'भाषा',
    'common.save': 'रक्षतु', 'common.cancel': 'निरसतु', 'common.close': 'पिदधातु',
    'common.back': 'पृष्ठतः', 'common.next': 'अग्रिमम्', 'common.retry': 'पुनः प्रयततु',
    'common.search': 'अन्विष्यतु', 'common.loading': 'भार्यते…', 'common.confirm': 'निश्चिनोतु',
    'common.yes': 'आम्', 'common.no': 'न', 'common.optional': 'वैकल्पिकम्', 'common.required': 'आवश्यकम्',
    'common.error': 'किमपि दोषः अभवत्', 'common.offline': 'एतत् यन्त्रम् असंयुक्तम्। पुनः संयोज्य प्रयततु।',
    'app.name': 'ग्रामीण स्वास्थ्य जालम्', 'app.tagline': 'कृत्रिमबुद्धि-सहायकं ग्राम-चिकित्सालय-जालम्',
    'nav.dashboard': 'फलकम्', 'nav.patients': 'रोगिणः', 'nav.queue': 'प्रकरण-सूची',
    'nav.notifications': 'सूचनाः', 'nav.signout': 'निर्गच्छतु',
    'nav.open': 'सूचिं उद्घाटयतु', 'nav.close': 'सूचिं पिदधातु',
    'role.doctor': 'वैद्यः', 'role.assistant': 'चिकित्सालय-सहायकः', 'role.admin': 'प्रशासकः',
    'auth.signin': 'कर्मचारि-प्रवेशः', 'auth.email': 'विद्युत्पत्र-सङ्केतः', 'auth.password': 'भवतः गुप्तशब्दः',
    'auth.submit': 'प्रविशतु', 'auth.showPassword': 'गुप्तशब्दं दर्शयतु',
    'auth.failed': 'विद्युत्पत्रं गुप्तशब्दो वा अशुद्धः।',
    'tier.low': 'अल्पसङ्कटम्', 'tier.moderate': 'मध्यमसङ्कटम्', 'tier.high': 'उच्चसङ्कटम्', 'tier.emergency': 'आपत्कालः',
    'referral.call108': '१०८ इति आह्वयतु — रुग्णवाहिका', 'referral.directions': 'मार्गं दर्शयतु'
  },

  kok: {
    'lang.title': 'तुमची भास वेंचात', 'lang.subtitle': 'तुमी हें केन्नाय बदलूं शकतात.',
    'lang.continue': 'फुडें वचात', 'lang.search': 'भासो सोदात', 'lang.switch': 'भास',
    'lang.unreviewed': 'ह्या भाशांतराची तपासणी अजून पात्र मनशान केल्ली ना. वैजकी उतरांनी चूक आसूं येता.',
    'common.save': 'जतन करात', 'common.cancel': 'रद्द करात', 'common.close': 'बंद करात',
    'common.back': 'फाटीं', 'common.next': 'फुडलें', 'common.retry': 'परत यत्न करात',
    'common.search': 'सोदात', 'common.loading': 'लोड जाता…', 'common.confirm': 'खात्री करात',
    'common.yes': 'हय', 'common.no': 'ना', 'common.optional': 'ऐच्छीक', 'common.required': 'गरजेचें',
    'app.name': 'ग्रामीण भलायकी ग्रीड',
    'nav.dashboard': 'डॅशबोर्ड', 'nav.patients': 'पिडेस्त', 'nav.signout': 'सायन आवट',
    'role.doctor': 'दोतोर', 'role.assistant': 'क्लिनीक सहायक',
    'auth.signin': 'कर्मचारी सायन इन', 'auth.submit': 'सायन इन',
    'tier.low': 'उणो धोको', 'tier.moderate': 'मध्यम धोको', 'tier.high': 'चड धोको', 'tier.emergency': 'आणीबाणी'
  },

  mai: {
    'lang.title': 'अपन भाषा चुनू', 'lang.subtitle': 'अहाँ एकरा कहियो बदलि सकैत छी।',
    'lang.continue': 'आगू बढ़ू', 'lang.search': 'भाषा ताकू', 'lang.switch': 'भाषा',
    'lang.unreviewed': 'ई अनुवाद अखनि धरि कोनो योग्य व्यक्ति जाँच नहि केलक अछि। चिकित्सा शब्दमे गलती भऽ सकैत अछि।',
    'common.save': 'सहेजू', 'common.cancel': 'रद्द करू', 'common.close': 'बन्न करू',
    'common.back': 'पाछू', 'common.next': 'आगू', 'common.retry': 'फेर कोशिश करू',
    'common.search': 'ताकू', 'common.loading': 'लोड भऽ रहल अछि…', 'common.confirm': 'पुष्टि करू',
    'common.yes': 'हँ', 'common.no': 'नहि', 'common.optional': 'वैकल्पिक', 'common.required': 'आवश्यक',
    'app.name': 'ग्रामीण स्वास्थ्य ग्रिड',
    'nav.dashboard': 'डैशबोर्ड', 'nav.patients': 'रोगी', 'nav.signout': 'साइन आउट',
    'role.doctor': 'डाक्टर', 'role.assistant': 'क्लिनिक सहायक',
    'auth.signin': 'स्टाफ साइन इन', 'auth.submit': 'साइन इन',
    'tier.low': 'कम जोखिम', 'tier.moderate': 'मध्यम जोखिम', 'tier.high': 'उच्च जोखिम', 'tier.emergency': 'आपातकाल'
  },

  doi: {
    'lang.title': 'अपनी भाशा चुनो', 'lang.subtitle': 'तुस इसनूं कदी वी बदली सकदे ओ।',
    'lang.continue': 'अग्गें बधो', 'lang.search': 'भाशां तुप्पो', 'lang.switch': 'भाशा',
    'common.save': 'सैंभालो', 'common.cancel': 'रद्द करो', 'common.close': 'बंद करो',
    'common.back': 'पिच्छें', 'common.next': 'अग्गला', 'common.retry': 'फ्ही कोशिश करो',
    'common.yes': 'हां', 'common.no': 'नेईं',
    'app.name': 'ग्रामीण सेह्त ग्रिड',
    'nav.dashboard': 'डैशबोर्ड', 'nav.patients': 'मरीज', 'nav.signout': 'साइन आउट',
    'role.doctor': 'डाक्टर', 'role.assistant': 'क्लिनिक सहायक',
    'auth.signin': 'स्टाफ साइन इन', 'auth.submit': 'साइन इन',
    'tier.low': 'घट्ट खतरा', 'tier.moderate': 'दरमियाना खतरा', 'tier.high': 'बड़ा खतरा', 'tier.emergency': 'एमरजैंसी'
  },

  bho: {
    'lang.title': 'आपन भाषा चुनीं', 'lang.subtitle': 'रउआ एकरा कबो बदल सकेनी।',
    'lang.continue': 'आगे बढ़ीं', 'lang.search': 'भाषा खोजीं', 'lang.switch': 'भाषा',
    'common.save': 'सहेजीं', 'common.cancel': 'रद्द करीं', 'common.close': 'बंद करीं',
    'common.back': 'पीछे', 'common.next': 'अगिला', 'common.retry': 'फेर कोशिश करीं',
    'common.yes': 'हँ', 'common.no': 'ना', 'common.loading': 'लोड होत बा…',
    'app.name': 'ग्रामीण स्वास्थ्य ग्रिड',
    'nav.dashboard': 'डैशबोर्ड', 'nav.patients': 'मरीज', 'nav.signout': 'साइन आउट',
    'role.doctor': 'डाक्टर', 'role.assistant': 'क्लिनिक सहायक',
    'auth.signin': 'स्टाफ साइन इन', 'auth.submit': 'साइन इन',
    'tier.low': 'कम खतरा', 'tier.moderate': 'मध्यम खतरा', 'tier.high': 'ढेर खतरा', 'tier.emergency': 'आपातकाल'
  },

  awa: {
    'lang.title': 'आपन भाषा चुनौ', 'lang.subtitle': 'तुम एका कबहुँ बदल सकत हौ।',
    'lang.continue': 'आगे बढ़ौ', 'lang.search': 'भाषा खोजौ', 'lang.switch': 'भाषा',
    'common.save': 'सहेजौ', 'common.cancel': 'रद्द करौ', 'common.close': 'बंद करौ',
    'common.back': 'पाछे', 'common.next': 'अगला', 'common.yes': 'हाँ', 'common.no': 'नाहीं',
    'app.name': 'ग्रामीण स्वास्थ्य ग्रिड',
    'nav.dashboard': 'डैशबोर्ड', 'nav.patients': 'मरीज', 'nav.signout': 'साइन आउट',
    'role.doctor': 'डाक्टर', 'role.assistant': 'क्लिनिक सहायक',
    'auth.signin': 'स्टाफ साइन इन', 'auth.submit': 'साइन इन',
    'tier.low': 'कम खतरा', 'tier.moderate': 'मध्यम खतरा', 'tier.high': 'बहुत खतरा', 'tier.emergency': 'आपातकाल'
  },

  mag: {
    'lang.title': 'अपन भाषा चुनू', 'lang.continue': 'आगू बढ़ू', 'lang.switch': 'भाषा',
    'common.save': 'सहेजू', 'common.cancel': 'रद्द करू', 'common.close': 'बंद करू',
    'common.yes': 'हँ', 'common.no': 'नै',
    'app.name': 'ग्रामीण स्वास्थ्य ग्रिड',
    'nav.dashboard': 'डैशबोर्ड', 'nav.patients': 'मरीज', 'nav.signout': 'साइन आउट',
    'role.doctor': 'डाक्टर', 'role.assistant': 'क्लिनिक सहायक',
    'auth.signin': 'स्टाफ साइन इन', 'auth.submit': 'साइन इन',
    'tier.low': 'कम जोखिम', 'tier.moderate': 'मध्यम जोखिम', 'tier.high': 'ऊँच जोखिम', 'tier.emergency': 'आपातकाल'
  },

  raj: {
    'lang.title': 'आपरी भाषा चुणो', 'lang.continue': 'आगै बधो', 'lang.switch': 'भाषा',
    'common.save': 'सांभळो', 'common.cancel': 'रद्द करो', 'common.close': 'बंद करो',
    'common.yes': 'हाँ', 'common.no': 'कोनी',
    'app.name': 'ग्रामीण स्वास्थ्य ग्रिड',
    'nav.dashboard': 'डैशबोर्ड', 'nav.patients': 'बीमार', 'nav.signout': 'साइन आउट',
    'role.doctor': 'डाक्टर', 'role.assistant': 'क्लिनिक सहायक',
    'auth.signin': 'स्टाफ साइन इन', 'auth.submit': 'साइन इन',
    'tier.low': 'कम जोखम', 'tier.moderate': 'मध्यम जोखम', 'tier.high': 'ऊंचो जोखम', 'tier.emergency': 'आपातकाल'
  },

  hne: {
    'lang.title': 'अपन भाखा चुनव', 'lang.continue': 'आगू बढ़व', 'lang.switch': 'भाखा',
    'common.save': 'सहेजव', 'common.cancel': 'रद्द करव', 'common.close': 'बंद करव',
    'common.yes': 'हव', 'common.no': 'नइ',
    'app.name': 'ग्रामीण स्वास्थ्य ग्रिड',
    'nav.dashboard': 'डैशबोर्ड', 'nav.patients': 'बिमरहा', 'nav.signout': 'साइन आउट',
    'role.doctor': 'डाक्टर', 'role.assistant': 'क्लिनिक सहायक',
    'auth.signin': 'स्टाफ साइन इन', 'auth.submit': 'साइन इन',
    'tier.low': 'कम खतरा', 'tier.moderate': 'मध्यम खतरा', 'tier.high': 'जादा खतरा', 'tier.emergency': 'आपातकाल'
  },

  bgc: {
    'lang.title': 'अपणी भाषा चुणो', 'lang.continue': 'आगै बढ़ो', 'lang.switch': 'भाषा',
    'common.save': 'सहेजो', 'common.cancel': 'रद्द करो', 'common.close': 'बंद करो',
    'common.yes': 'हाँ', 'common.no': 'ना',
    'app.name': 'ग्रामीण स्वास्थ्य ग्रिड',
    'nav.dashboard': 'डैशबोर्ड', 'nav.patients': 'मरीज', 'nav.signout': 'साइन आउट',
    'role.doctor': 'डाक्टर', 'role.assistant': 'क्लिनिक सहायक',
    'auth.signin': 'स्टाफ साइन इन', 'auth.submit': 'साइन इन',
    'tier.low': 'कम खतरा', 'tier.moderate': 'मध्यम खतरा', 'tier.high': 'घणा खतरा', 'tier.emergency': 'आपातकाल'
  },

  sd: {
    'lang.title': 'پنهنجي ٻولي چونڊيو', 'lang.subtitle': 'توهان ان کي ڪنهن به وقت تبديل ڪري سگهو ٿا.',
    'lang.continue': 'اڳتي وڌو', 'lang.search': 'ٻوليون ڳوليو', 'lang.switch': 'ٻولي',
    'common.save': 'محفوظ ڪريو', 'common.cancel': 'منسوخ ڪريو', 'common.close': 'بند ڪريو',
    'common.back': 'پوئتي', 'common.next': 'اڳيون', 'common.yes': 'ها', 'common.no': 'نه',
    'app.name': 'ڳوٺاڻي صحت گرڊ',
    'nav.dashboard': 'ڊيش بورڊ', 'nav.patients': 'مريض', 'nav.signout': 'سائن آئوٽ',
    'role.doctor': 'ڊاڪٽر', 'role.assistant': 'ڪلينڪ اسسٽنٽ',
    'auth.signin': 'عملي جي سائن ان', 'auth.submit': 'سائن ان',
    'tier.low': 'گهٽ خطرو', 'tier.moderate': 'وچولو خطرو', 'tier.high': 'وڏو خطرو', 'tier.emergency': 'ايمرجنسي'
  },

  ks: {
    'lang.title': 'پنُن زبان ژارِو', 'lang.continue': 'اگر ٲسِو', 'lang.switch': 'زبان',
    'common.save': 'محفوظ کریو', 'common.cancel': 'منسوخ کریو', 'common.close': 'بند کریو',
    'common.yes': 'آہ', 'common.no': 'نہٕ',
    'app.name': 'دیہاتی صحت گرِڈ',
    'nav.dashboard': 'ڈیش بورڈ', 'nav.patients': 'مریض', 'nav.signout': 'سائن آوٹ',
    'role.doctor': 'ڈاکٹر', 'role.assistant': 'کلینک اسسٹنٹ',
    'auth.signin': 'اسٹاف سائن اِن', 'auth.submit': 'سائن اِن',
    'tier.low': 'کم خطرٕ', 'tier.moderate': 'درمیٲنہٕ خطرٕ', 'tier.high': 'زیادٕ خطرٕ', 'tier.emergency': 'ایمرجنسی'
  },

  brx: {
    'lang.title': 'नोंथांनि राव सायख', 'lang.continue': 'गिदिंआव थां', 'lang.switch': 'राव',
    'common.save': 'दोन', 'common.cancel': 'नेवसि', 'common.close': 'बन्द खालाम',
    'common.yes': 'नंगौ', 'common.no': 'नङा',
    'app.name': 'गामिनि दैहा गिरिड',
    'nav.dashboard': 'डेशबर्ड', 'nav.patients': 'बिरामि', 'nav.signout': 'साइन आउट',
    'role.doctor': 'डाक्टार', 'role.assistant': 'क्लिनिक मददगिरि',
    'auth.signin': 'स्टाफ साइन इन', 'auth.submit': 'साइन इन',
    'tier.low': 'खमै गोबां', 'tier.moderate': 'गेजेर', 'tier.high': 'गोबां', 'tier.emergency': 'आपातकाल'
  },

  mni: {
    'lang.title': 'ꯅꯍꯥꯛꯀꯤ ꯂꯣꯟ ꯈꯅꯕꯤꯌꯨ', 'lang.continue': 'ꯃꯈꯥ ꯆꯠꯄꯤꯌꯨ', 'lang.switch': 'ꯂꯣꯟ',
    'common.save': 'ꯊꯝꯃꯨ', 'common.cancel': 'ꯀꯛꯊꯠꯄ', 'common.close': 'ꯂꯣꯅꯕ',
    'common.yes': 'ꯍꯣꯏ', 'common.no': 'ꯅꯠꯇꯦ',
    'app.name': 'ꯈꯨꯅꯒꯤ ꯍꯀꯆꯥꯡ ꯒ꯭ꯔꯤꯗ',
    'nav.dashboard': 'ꯗꯦꯁꯕꯣꯔꯗ', 'nav.patients': 'ꯑꯅꯥꯕ', 'nav.signout': 'ꯁꯥꯏꯟ ꯑꯥꯎꯠ',
    'role.doctor': 'ꯗꯣꯛꯇꯔ', 'role.assistant': 'ꯛꯂꯤꯅꯤꯛ ꯃꯇꯦꯡ',
    'auth.signin': 'ꯁ꯭ꯇꯥꯐ ꯁꯥꯏꯟ ꯏꯟ', 'auth.submit': 'ꯁꯥꯏꯟ ꯏꯟ',
    'tier.emergency': 'ꯑꯀꯤꯕ'
  },

  sat: {
    'lang.title': 'ᱟᱢᱟᱜ ᱯᱟᱹᱨᱥᱤ ᱵᱟᱪᱷᱟᱣ ᱢᱮ', 'lang.continue': 'ᱟᱭᱩᱨ ᱪᱟᱞᱟᱜ ᱢᱮ', 'lang.switch': 'ᱯᱟᱹᱨᱥᱤ',
    'common.save': 'ᱥᱟᱸᱪᱟᱣ ᱢᱮ', 'common.cancel': 'ᱵᱟᱰᱟᱭ ᱢᱮ', 'common.close': 'ᱵᱚᱸᱫ ᱢᱮ',
    'common.yes': 'ᱦᱚᱭ', 'common.no': 'ᱵᱟᱝ',
    'app.name': 'ᱟᱴᱳ ᱦᱚᱲᱢᱚ ᱜᱨᱤᱰ',
    'nav.dashboard': 'ᱰᱮᱥᱵᱚᱨᱰ', 'nav.patients': 'ᱨᱩᱶᱟᱹᱨ', 'nav.signout': 'ᱥᱟᱭᱤᱱ ᱟᱩᱴ',
    'role.doctor': 'ᱰᱟᱠᱴᱟᱨ', 'role.assistant': 'ᱠᱞᱤᱱᱤᱠ ᱜᱚᱲᱚ',
    'auth.signin': 'ᱥᱴᱟᱯᱷ ᱥᱟᱭᱤᱱ ᱤᱱ', 'auth.submit': 'ᱥᱟᱭᱤᱱ ᱤᱱ',
    'tier.emergency': 'ᱡᱚᱨᱩᱨᱤ'
  },

  tcy: {
    'lang.title': 'ಈರೆನ ಬಾಸೆ ಆಯ್ಕೆ ಮಲ್ಪುಲೆ', 'lang.continue': 'ಮುಂದೆ ಪೋಲೆ', 'lang.switch': 'ಬಾಸೆ',
    'common.save': 'ಒರಿಪುಲೆ', 'common.cancel': 'ರದ್ದು ಮಲ್ಪುಲೆ', 'common.close': 'ಮುಚ್ಚುಲೆ',
    'common.yes': 'ಅಂದ್', 'common.no': 'ಇಜ್ಜಿ',
    'app.name': 'ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ ಗ್ರಿಡ್',
    'nav.dashboard': 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', 'nav.patients': 'ರೋಗಿಲು', 'nav.signout': 'ಸೈನ್ ಔಟ್',
    'role.doctor': 'ಡಾಕ್ಟರ್', 'role.assistant': 'ಕ್ಲಿನಿಕ್ ಸಹಾಯಕೆ',
    'auth.signin': 'ಸಿಬ್ಬಂದಿ ಸೈನ್ ಇನ್', 'auth.submit': 'ಸೈನ್ ಇನ್',
    'tier.emergency': 'ತುರ್ತು'
  },

  kha: {
    'lang.title': 'Jied ka ktien jong phi', 'lang.continue': 'Kdup', 'lang.switch': 'Ktien',
    'common.save': 'Buh', 'common.cancel': 'Bud', 'common.close': 'Khang',
    'common.yes': 'Haoid', 'common.no': 'Em',
    'app.name': 'Rural Health Grid',
    'nav.dashboard': 'Dashboard', 'nav.patients': 'Ki briew pang', 'nav.signout': 'Mihnoh',
    'role.doctor': 'Doctor', 'role.assistant': 'Nongiarap clinic',
    'auth.signin': 'Rung ha ka staff', 'auth.submit': 'Rung',
    'tier.emergency': 'Emergency'
  },

  lus: {
    'lang.title': 'I ṭawng thlang rawh', 'lang.continue': 'Kal zel', 'lang.switch': 'Ṭawng',
    'common.save': 'Dahchhawng', 'common.cancel': 'Bansan', 'common.close': 'Khar',
    'common.yes': 'Aw', 'common.no': 'Aih',
    'app.name': 'Rural Health Grid',
    'nav.dashboard': 'Dashboard', 'nav.patients': 'Damlote', 'nav.signout': 'Chhuahsan',
    'role.doctor': 'Doctor', 'role.assistant': 'Clinic ṭanpuitu',
    'auth.signin': 'Hnathawktute lut na', 'auth.submit': 'Lût',
    'tier.emergency': 'Emergency'
  }
};

/** Locales that have at least one string. Used by the selector for its badge. */
export const TRANSLATED = new Set(Object.keys(CATALOG));
