type Lang = "en" | "ta";

const dict = {
  en: {
    "brand.tag": "Your city. Your voice.",
    "nav.file": "File a complaint",
    "nav.track": "Track status",
    "nav.admin": "Officials",
    "hero.eyebrow": "Civic grievance portal",
    "hero.title": "Report a problem in your neighbourhood.",
    "hero.lead":
      "Potholes, water supply, broken streetlights, uncleared garbage — tell us what's wrong and where. You'll get a tracking ID to follow every update.",
    "hero.step1": "Describe the issue",
    "hero.step2": "Get a tracking ID",
    "hero.step3": "Follow progress",
    "form.title": "New complaint",
    "form.name": "Your name",
    "form.phone": "Phone number",
    "form.category": "Category",
    "form.area": "Area / Street / Landmark",
    "form.areaHint": "e.g. 4th Cross, Anna Nagar, near the bus stop",
    "form.description": "What is the problem?",
    "form.descriptionHint": "At least 10 characters. Include how long it has been happening.",
    "form.submit": "Submit complaint",
    "form.submitting": "Submitting…",
    "form.privacy": "Your name and phone are shared only with officials handling the complaint.",
    "cat.roads": "Roads & potholes",
    "cat.water": "Water supply",
    "cat.electricity": "Electricity",
    "cat.garbage": "Garbage collection",
    "cat.drainage": "Drainage & sewage",
    "cat.streetlights": "Streetlights",
    "cat.public_transport": "Public transport",
    "cat.other": "Other",
    "cat.choose": "Choose a category",
    "success.title": "Complaint registered",
    "success.body": "Save this tracking ID. You'll need it to check the status.",
    "success.copy": "Copy ID",
    "success.copied": "Copied!",
    "success.track": "Track this complaint",
    "success.another": "File another",
    "track.title": "Track your complaint",
    "track.lead": "Enter the tracking ID you received when you filed the complaint.",
    "track.placeholder": "NC-XXXXXXXX",
    "track.button": "Check status",
    "track.notFound": "No complaint found with that ID. Please check and try again.",
    "track.filed": "Filed on",
    "track.updated": "Last updated",
    "track.note": "Note from officials",
    "status.submitted": "Submitted",
    "status.in_progress": "In progress",
    "status.resolved": "Resolved",
    "status.rejected": "Rejected",
    "admin.title": "Officials' desk",
    "admin.lead": "Sign in with your official account to review and update complaints.",
    "admin.email": "Email",
    "admin.password": "Password",
    "admin.login": "Sign in",
    "admin.logout": "Sign out",
    "admin.badLogin": "Invalid email or password.",
    "admin.notAdmin": "This account does not have official access. Ask the site owner to grant the admin role.",
    "admin.noIdentity": "Sign-in is not available yet on this site.",
    "admin.forgot": "Forgot password?",
    "admin.forgotSent": "If that account exists, a reset link has been sent. Enter your email above first.",
    "admin.setPassword": "Set your password",
    "admin.setPasswordLead": "Choose a password for your official account (at least 8 characters).",
    "admin.newPassword": "New password",
    "admin.savePassword": "Save password",
    "admin.allStatus": "All statuses",
    "admin.allCategories": "All categories",
    "admin.refresh": "Refresh",
    "admin.empty": "No complaints match these filters.",
    "admin.notePlaceholder": "Add a note visible to the citizen",
    "admin.save": "Save",
    "admin.saved": "Saved",
    "admin.total": "Total",
    "admin.contact": "Contact",
    "error.generic": "Something went wrong. Please try again.",
    "error.invalid_phone": "Please enter a valid phone number.",
    "error.missing_fields": "Please fill in all fields (description needs at least 10 characters).",
    "footer.text": "NammaComplaint — a civic grievance portal for every neighbourhood.",
  },
  ta: {
    "brand.tag": "உங்கள் நகரம். உங்கள் குரல்.",
    "nav.file": "புகார் அளிக்க",
    "nav.track": "நிலையை அறிய",
    "nav.admin": "அதிகாரிகள்",
    "hero.eyebrow": "குடிமக்கள் குறைதீர்ப்பு தளம்",
    "hero.title": "உங்கள் பகுதியில் உள்ள பிரச்சனையைத் தெரிவியுங்கள்.",
    "hero.lead":
      "சாலைக் குழிகள், குடிநீர் விநியோகம், பழுதான தெருவிளக்குகள், அகற்றப்படாத குப்பை — என்ன பிரச்சனை, எங்கே என்று சொல்லுங்கள். ஒவ்வொரு முன்னேற்றத்தையும் அறிய ஒரு கண்காணிப்பு எண் வழங்கப்படும்.",
    "hero.step1": "பிரச்சனையை விவரியுங்கள்",
    "hero.step2": "கண்காணிப்பு எண் பெறுங்கள்",
    "hero.step3": "முன்னேற்றத்தைப் பாருங்கள்",
    "form.title": "புதிய புகார்",
    "form.name": "உங்கள் பெயர்",
    "form.phone": "தொலைபேசி எண்",
    "form.category": "வகை",
    "form.area": "பகுதி / தெரு / அடையாளம்",
    "form.areaHint": "எ.கா. 4வது குறுக்குத் தெரு, அண்ணா நகர், பேருந்து நிறுத்தம் அருகில்",
    "form.description": "பிரச்சனை என்ன?",
    "form.descriptionHint": "குறைந்தது 10 எழுத்துகள். எவ்வளவு காலமாக உள்ளது என்பதையும் குறிப்பிடவும்.",
    "form.submit": "புகாரைச் சமர்ப்பிக்கவும்",
    "form.submitting": "சமர்ப்பிக்கப்படுகிறது…",
    "form.privacy": "உங்கள் பெயர் மற்றும் தொலைபேசி எண் புகாரைக் கையாளும் அதிகாரிகளுடன் மட்டுமே பகிரப்படும்.",
    "cat.roads": "சாலைகள் & குழிகள்",
    "cat.water": "குடிநீர் விநியோகம்",
    "cat.electricity": "மின்சாரம்",
    "cat.garbage": "குப்பை சேகரிப்பு",
    "cat.drainage": "வடிகால் & கழிவுநீர்",
    "cat.streetlights": "தெருவிளக்குகள்",
    "cat.public_transport": "பொதுப் போக்குவரத்து",
    "cat.other": "மற்றவை",
    "cat.choose": "வகையைத் தேர்ந்தெடுக்கவும்",
    "success.title": "புகார் பதிவு செய்யப்பட்டது",
    "success.body": "இந்தக் கண்காணிப்பு எண்ணைச் சேமித்து வைக்கவும். நிலையை அறிய இது தேவைப்படும்.",
    "success.copy": "எண்ணை நகலெடு",
    "success.copied": "நகலெடுக்கப்பட்டது!",
    "success.track": "இந்தப் புகாரைக் கண்காணிக்க",
    "success.another": "மற்றொரு புகார்",
    "track.title": "உங்கள் புகாரைக் கண்காணிக்கவும்",
    "track.lead": "புகார் அளித்தபோது பெற்ற கண்காணிப்பு எண்ணை உள்ளிடவும்.",
    "track.placeholder": "NC-XXXXXXXX",
    "track.button": "நிலையைப் பார்க்க",
    "track.notFound": "இந்த எண்ணில் புகார் எதுவும் இல்லை. சரிபார்த்து மீண்டும் முயற்சிக்கவும்.",
    "track.filed": "பதிவு செய்த நாள்",
    "track.updated": "கடைசியாகப் புதுப்பித்தது",
    "track.note": "அதிகாரிகளின் குறிப்பு",
    "status.submitted": "சமர்ப்பிக்கப்பட்டது",
    "status.in_progress": "நடவடிக்கையில்",
    "status.resolved": "தீர்க்கப்பட்டது",
    "status.rejected": "நிராகரிக்கப்பட்டது",
    "admin.title": "அதிகாரிகள் மேசை",
    "admin.lead": "புகார்களைப் பார்வையிட்டுப் புதுப்பிக்க உங்கள் அதிகாரப்பூர்வக் கணக்கில் உள்நுழையவும்.",
    "admin.email": "மின்னஞ்சல்",
    "admin.password": "கடவுச்சொல்",
    "admin.login": "உள்நுழை",
    "admin.logout": "வெளியேறு",
    "admin.badLogin": "தவறான மின்னஞ்சல் அல்லது கடவுச்சொல்.",
    "admin.notAdmin": "இந்தக் கணக்கிற்கு அதிகாரி அணுகல் இல்லை. நிர்வாகி பங்கை வழங்க தள உரிமையாளரைக் கேளுங்கள்.",
    "admin.noIdentity": "இந்தத் தளத்தில் உள்நுழைவு இன்னும் கிடைக்கவில்லை.",
    "admin.forgot": "கடவுச்சொல் மறந்துவிட்டதா?",
    "admin.forgotSent": "அந்தக் கணக்கு இருந்தால், மீட்டமைப்பு இணைப்பு அனுப்பப்பட்டுள்ளது. முதலில் மேலே மின்னஞ்சலை உள்ளிடவும்.",
    "admin.setPassword": "உங்கள் கடவுச்சொல்லை அமைக்கவும்",
    "admin.setPasswordLead": "உங்கள் அதிகாரப்பூர்வக் கணக்கிற்கு ஒரு கடவுச்சொல்லைத் தேர்ந்தெடுக்கவும் (குறைந்தது 8 எழுத்துகள்).",
    "admin.newPassword": "புதிய கடவுச்சொல்",
    "admin.savePassword": "கடவுச்சொல்லைச் சேமி",
    "admin.allStatus": "அனைத்து நிலைகளும்",
    "admin.allCategories": "அனைத்து வகைகளும்",
    "admin.refresh": "புதுப்பி",
    "admin.empty": "இந்த வடிகட்டிகளுக்குப் பொருந்தும் புகார்கள் இல்லை.",
    "admin.notePlaceholder": "குடிமகனுக்குத் தெரியும் குறிப்பைச் சேர்க்கவும்",
    "admin.save": "சேமி",
    "admin.saved": "சேமிக்கப்பட்டது",
    "admin.total": "மொத்தம்",
    "admin.contact": "தொடர்பு",
    "error.generic": "ஏதோ தவறு நடந்தது. மீண்டும் முயற்சிக்கவும்.",
    "error.invalid_phone": "சரியான தொலைபேசி எண்ணை உள்ளிடவும்.",
    "error.missing_fields": "அனைத்துப் புலங்களையும் நிரப்பவும் (விவரம் குறைந்தது 10 எழுத்துகள்).",
    "footer.text": "நம்ம புகார் — ஒவ்வொரு பகுதிக்குமான குடிமக்கள் குறைதீர்ப்பு தளம்.",
  },
} satisfies Record<Lang, Record<string, string>>;

export type Key = keyof (typeof dict)["en"];

const listeners: Array<() => void> = [];
let lang: Lang = localStorage.getItem("nc-lang") === "ta" ? "ta" : "en";

export function t(key: Key | string): string {
  return (dict[lang] as Record<string, string>)[key] ?? (dict.en as Record<string, string>)[key] ?? key;
}

export function getLang() {
  return lang;
}

export function locale() {
  return lang === "ta" ? "ta-IN" : "en-IN";
}

export function onLangChange(fn: () => void) {
  listeners.push(fn);
}

export function applyTranslations(root: ParentNode = document) {
  document.documentElement.lang = lang;
  root.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n!);
  });
  root.querySelectorAll<HTMLInputElement>("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder!);
  });
  document.querySelectorAll<HTMLButtonElement>("[data-lang]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
  });
}

export function initI18n() {
  document.querySelectorAll<HTMLButtonElement>("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      lang = btn.dataset.lang === "ta" ? "ta" : "en";
      localStorage.setItem("nc-lang", lang);
      applyTranslations();
      listeners.forEach((fn) => fn());
    });
  });
  applyTranslations();
}

export function formatDate(value: string) {
  return new Date(value).toLocaleString(locale(), { dateStyle: "medium", timeStyle: "short" });
}
