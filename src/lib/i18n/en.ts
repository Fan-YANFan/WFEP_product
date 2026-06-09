export const en: Translations = {
  meta: {
    siteDescription:
      "Find Hong Kong recyclable collection points, book door-to-door pickup, and manage your member account.",
  },
  common: {
    loading: "Loading…",
    previous: "Previous",
    next: "Next",
    remove: "Remove",
    search: "Search",
    back: "Back",
    backToHome: "← Back to home",
    lastUpdated: "Last updated",
    dataSource: "Data source",
    allRights: "All rights reserved.",
  },
  language: {
    label: "Language",
    en: "English",
    zh: "中文",
    switchTo: "Switch to Chinese",
    switchToEn: "Switch to English",
  },
  nav: {
    home: "Home",
    booking: "Book PickUp",
    myAccount: "My Account",
    login: "Log In / Sign In",
    openMenu: "Open menu",
  },
  footer: {
    tagline:
      "Find recycling points across Hong Kong, save favourites, and stay on top of local collection events — together for a cleaner city.",
    links: "Links",
    recyclingPoints: "Recycling points (HK)",
    terms: "Terms & Conditions",
    privacy: "Privacy Policy",
    cookies: "Cookie Policy",
    cookiePreferences: "Cookie preferences",
    contact: "Contact",
    disclaimer:
      "Recycling point data is provided by third-party open-data sources and may change without notice.",
  },
  home: {
    badge: "Hong Kong · Smart Recycling",
    titleLine1: "Recycling in HK",
    titleLine2: "Simplified.",
    subtitle:
      "Professional door-to-door collection. We weigh it, we pay it, you save the planet. Or use our explorer below to find public drop-off points.",
    cta: "Start Your First Pickup",
    feature1Title: "All 18 Districts",
    feature1Desc: "From Central to Yuen Long, our pickup fleet covers the whole territory.",
    feature2Title: "Verified Recycling",
    feature2Desc: "We partner with Green@Community to ensure 100% material recovery.",
    feature3Title: "Fair Pricing",
    feature3Desc: "Live weight-based calculation. No hidden transport fees.",
    explorerTitle: "Find Public Recyclable Collection Points",
    explorerDesc: "Prefer to drop it off yourself? Search public recycling bins across Hong Kong via the",
    explorerDescSuffix: ".",
    csdiPortal: "CSDI geoportal",
    dataNote:
      "Dataset layer: geotagging. Map explorer updates are irregular when locations change. This finder is for convenience only; verify details on site or via official channels.",
  },
  explorer: {
    searchAddress: "Search address",
    searchPlaceholder: "Street, building, area…",
    district: "District",
    allDistricts: "All districts",
    wasteType: "Waste type",
    nearMe: "Near me",
    clearNearby: "Clear nearby filter",
    nearMeHint: "Showing points within {km} km of your location.",
    noResults: "No results",
    showing: "Showing {start}–{end} of {total} points",
    requestFailed: "Request failed",
    apiError: "Could not reach the recycling points API.",
    geoUnsupported: "Geolocation is not supported in this browser.",
    geoDenied: "Location permission denied or unavailable.",
    hours: "Hours:",
    save: "Save",
    saved: "Saved",
    saveTitle: "Save to my account",
    removeBookmarkTitle: "Remove bookmark",
    openStreetMap: "OpenStreetMap",
    googleMaps: "Google Maps",
    wasteTypes: {
      Paper: "Paper",
      Metals: "Metals",
      Plastics: "Plastics",
      "Plastic Bottle": "Plastic Bottle",
      "Glass Bottle": "Glass Bottle",
      "Fluorescent Lamps": "Fluorescent Lamps",
      "Rechargeable Batteries": "Rechargeable Batteries",
      "Small Electrical Appliances": "Small Electrical Appliances",
      "Regulated Electrical Equipment": "Regulated Electrical Equipment",
      Clothes: "Clothes",
      "Tetra Pak": "Tetra Pak",
    },
  },
  booking: {
    back: "Back",
    title: "Schedule a Pickup",
    subtitle:
      "Fill in your location and material details. Your estimate uses our logistics pricing formula below.",
    fullName: "Full Name",
    namePlaceholder: "Chan Tai Man",
    phone: "WhatsApp / Phone Number",
    phonePlaceholder: "9123 4567",
    region: "Region / District",
    selectRegion: "Select your region",
    address: "Full Street Address & Unit",
    addressPlaceholder: "Flat B, 12/F, Silver Tower, Nathan Road",
    date: "Preferred Collection Date",
    material: "Primary Recycling Material",
    weight: "Estimated Weight (kg)",
    minWeight: "Min: 2 kg",
    maxWeight: "Max: 100 kg+",
    pricingTitle: "Pricing breakdown",
    pricingFormula: "Total Charge = Base Logistics Fee + (Weight × Rate per kg)",
    pricingFormulaNote: "Walk-up and remote-area surcharges are added below.",
    tunnelNote:
      "Base logistics fee includes fuel, driver time, and allowance for Western Harbour Crossing / Tai Lam Tunnel on regular routes.",
    baseLogisticsFee: "Base logistics fee",
    baseLogisticsNote:
      "Includes fuel, driver time, and tunnel toll allowance on standard logistics routes.",
    weightCharge: "Weight charge",
    weightChargeFormula: "{weight} kg × HK$ {rate}/kg",
    walkUpTitle: "Walk-up (Tong Lau) surcharge",
    walkUpDesc:
      "If the building has no elevator, or the lift does not stop on your floor, a staircase fee applies.",
    walkUpToggle: "Walk-up building — no lift access to my floor",
    floors: "Floors to climb",
    bagCount: "Bags / items",
    walkUpFee: "Staircase fee",
    walkUpRateNote:
      "Standard industry range: HK$200–500 per floor, per bag/item. Quote uses HK$350 midpoint.",
    remoteAreaTitle: "Distance / remote area surcharge",
    remoteAreaDesc:
      "Extra fuel and travel time for outer New Territories, Lantau, and other remote locations.",
    remoteAreas: {
      none: "Standard urban route (no surcharge)",
      moderate: "Outer New Territories (+HK$50)",
      standard: "Sai Kung, Cyberport, Discovery Bay (+HK$100)",
      remote: "Deep Yuen Long villages, Lantau Island (+HK$150)",
    },
    totalCharge: "Estimated total charge",
    submit: "Confirm Logistics Request",
    confirmed: "Booking Confirmed!",
    confirmedBody:
      "Thank you, {name}. Our logistics team will text you at {phone} to confirm your slot on {date}.",
    estWeight: "Estimated weight:",
    estTotalCharge: "Estimated total charge:",
    backHome: "Back to Homepage",
    regions: [
      "Hong Kong Island (Central & Western, Wan Chai, Eastern, Southern)",
      "Kowloon (Yau Tsim Mong, Sham Shui Po, Kowloon City, Wong Tai Sin, Kwun Tong)",
      "New Territories (Kwai Tsing, Tsuen Wan, Tuen Mun, Yuen Long, North, Tai Po, Sha Tin, Sai Kung, Islands)",
    ],
    materials: {
      plastics: "Plastics",
      paper: "Paper/Cardboard",
      metals: "Metals (Aluminium/Steel)",
      ewaste: "E-Waste / Small Appliances",
    },
    perKg: "/kg",
  },
  login: {
    loginTitle: "Log In",
    signupTitle: "Sign Up",
    loginDesc: "Access your order history, saved recycling points, and event reminders.",
    signupDesc: "Create a member account to track orders and save recycling locations.",
    email: "Email address",
    password: "Password",
    submitLogin: "Log In",
    submitSignup: "Create account",
    pleaseWait: "Please wait…",
    noAccount: "Don't have an account?",
    hasAccount: "Already a member?",
    signupLink: "Sign Up",
    loginLink: "Log In",
    errors: {
      required: "Email and password are required.",
      notFound: "No account found. Please sign up first.",
      wrongPassword: "Incorrect password.",
      shortPassword: "Password must be at least 6 characters.",
      exists: "An account with this email already exists. Please log in.",
      generic: "Something went wrong.",
    },
  },
  account: {
    memberArea: "Member area",
    welcome: "Welcome back",
    logout: "Log out",
    orderHistory: "Order history",
    orderDesc: "Review your past pickups and booking status.",
    noOrders: "No orders yet.",
    orderCol: "Order",
    dateCol: "Date",
    itemsCol: "Items",
    totalCol: "Total",
    statusCol: "Status",
    savedPoints: "Saved recycling points",
    savedDesc: "Bookmarks from the recycling finder.",
    browsePoints: "Browse points →",
    noBookmarks:
      "No saved points yet. Browse recycling locations on the home page and bookmark your favourites.",
    removeBookmark: "Remove bookmark",
    reminders: "Recycling event reminders",
    remindersDesc: "Set reminders for community recycling drives, e-waste collection days, and other events.",
    eventName: "Event name",
    eventPlaceholder: "e.g. Central district e-waste drive",
    date: "Date",
    notes: "Notes (optional)",
    notesPlaceholder: "Location, time, what to bring…",
    addReminder: "Add reminder",
    noReminders: "No reminders set yet.",
  },
  cookies: {
    title: "Cookie settings",
    body: "We use cookies to run our site, understand usage, and personalize offers. You can accept all, reject non-essential cookies, or customize your choices. See our",
    bodySuffix: ".",
    policyLink: "Cookie Policy",
    necessary: "Strictly necessary",
    necessaryDesc: "Required for checkout, security, and preferences.",
    analytics: "Analytics",
    analyticsDesc: "Helps us improve pages and measure performance.",
    marketing: "Marketing",
    marketingDesc: "Personalized content and promotional emails.",
    acceptAll: "Accept all",
    reject: "Reject non-essential",
    save: "Save preferences",
    customize: "Customize",
    dialogLabel: "Cookie consent",
  },
};

export type Translations = {
  meta: { siteDescription: string };
  common: {
    loading: string;
    previous: string;
    next: string;
    remove: string;
    search: string;
    back: string;
    backToHome: string;
    lastUpdated: string;
    dataSource: string;
    allRights: string;
  };
  language: {
    label: string;
    en: string;
    zh: string;
    switchTo: string;
    switchToEn: string;
  };
  nav: {
    home: string;
    booking: string;
    myAccount: string;
    login: string;
    openMenu: string;
  };
  footer: {
    tagline: string;
    links: string;
    recyclingPoints: string;
    terms: string;
    privacy: string;
    cookies: string;
    cookiePreferences: string;
    contact: string;
    disclaimer: string;
  };
  home: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    cta: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    explorerTitle: string;
    explorerDesc: string;
    explorerDescSuffix: string;
    csdiPortal: string;
    dataNote: string;
  };
  explorer: {
    searchAddress: string;
    searchPlaceholder: string;
    district: string;
    allDistricts: string;
    wasteType: string;
    nearMe: string;
    clearNearby: string;
    nearMeHint: string;
    noResults: string;
    showing: string;
    requestFailed: string;
    apiError: string;
    geoUnsupported: string;
    geoDenied: string;
    hours: string;
    save: string;
    saved: string;
    saveTitle: string;
    removeBookmarkTitle: string;
    openStreetMap: string;
    googleMaps: string;
    wasteTypes: Record<string, string>;
  };
  booking: {
    back: string;
    title: string;
    subtitle: string;
    fullName: string;
    namePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    region: string;
    selectRegion: string;
    address: string;
    addressPlaceholder: string;
    date: string;
    material: string;
    weight: string;
    minWeight: string;
    maxWeight: string;
    pricingTitle: string;
    pricingFormula: string;
    pricingFormulaNote: string;
    tunnelNote: string;
    baseLogisticsFee: string;
    baseLogisticsNote: string;
    weightCharge: string;
    weightChargeFormula: string;
    walkUpTitle: string;
    walkUpDesc: string;
    walkUpToggle: string;
    floors: string;
    bagCount: string;
    walkUpFee: string;
    walkUpRateNote: string;
    remoteAreaTitle: string;
    remoteAreaDesc: string;
    remoteAreas: Record<string, string>;
    totalCharge: string;
    submit: string;
    confirmed: string;
    confirmedBody: string;
    estWeight: string;
    estTotalCharge: string;
    backHome: string;
    regions: readonly string[];
    materials: Record<string, string>;
    perKg: string;
  };
  login: {
    loginTitle: string;
    signupTitle: string;
    loginDesc: string;
    signupDesc: string;
    email: string;
    password: string;
    submitLogin: string;
    submitSignup: string;
    pleaseWait: string;
    noAccount: string;
    hasAccount: string;
    signupLink: string;
    loginLink: string;
    errors: {
      required: string;
      notFound: string;
      wrongPassword: string;
      shortPassword: string;
      exists: string;
      generic: string;
    };
  };
  account: {
    memberArea: string;
    welcome: string;
    logout: string;
    orderHistory: string;
    orderDesc: string;
    noOrders: string;
    orderCol: string;
    dateCol: string;
    itemsCol: string;
    totalCol: string;
    statusCol: string;
    savedPoints: string;
    savedDesc: string;
    browsePoints: string;
    noBookmarks: string;
    removeBookmark: string;
    reminders: string;
    remindersDesc: string;
    eventName: string;
    eventPlaceholder: string;
    date: string;
    notes: string;
    notesPlaceholder: string;
    addReminder: string;
    noReminders: string;
  };
  cookies: {
    title: string;
    body: string;
    bodySuffix: string;
    policyLink: string;
    necessary: string;
    necessaryDesc: string;
    analytics: string;
    analyticsDesc: string;
    marketing: string;
    marketingDesc: string;
    acceptAll: string;
    reject: string;
    save: string;
    customize: string;
    dialogLabel: string;
  };
};
