// DOM Elements
const quoteBox = document.querySelector('.quote-box');
const quoteText = document.querySelector('.quote-text');
const quoteAuthor = document.querySelector('.quote-author');
const generateBtn = document.querySelector('.generate-btn');
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const categoryBtns = document.querySelectorAll('.category-btn');
const themeOptions = document.querySelectorAll('.theme-option');
const languageSelect = document.getElementById('language-select');
const searchKeywords = document.querySelectorAll('.search-keyword');
const actionBtns = document.querySelectorAll('.action-btn');

// State
let currentQuote = null;
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let currentCategory = 'all';
let currentTheme = localStorage.getItem('theme') || 'light';

// API URL
const API_URL = 'https://api.quotable.io/quotes/random';

// Hindi quotes database
const hindiQuotes = [
    {
        text: "सफलता का रहस्य यह है कि आप जो कर रहे हैं उसे प्यार करें।",
        author: "महात्मा गांधी",
        category: "friendship"
    },
    {
        text: "उठो, जागो और तब तक मत रुको जब तक लक्ष्य प्राप्त न हो जाए।",
        author: "स्वामी विवेकानंद",
        category: "courage"
    },
    {
        text: "सपने वो नहीं होते जो आप सोते समय देखते हैं, सपने वो होते हैं जो आपको सोने नहीं देते।",
        author: "ए.पी.जे. अब्दुल कलाम",
        category: "dreams"
    },
    {
        text: "जीवन में सफलता के लिए दृढ़ संकल्प और कड़ी मेहनत आवश्यक है।",
        author: "अरस्तू",
        category: "peace"
    },
    {
        text: "हर चीज में कुछ सुंदरता होती है, लेकिन हर कोई इसे नहीं देख पाता।",
        author: "कन्फ्यूशियस",
        category: "peace"
    }
];

// English quotes database
const englishQuotes = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill"
    },
    {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
    },
    {
        text: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson"
    },
    {
        text: "Success is walking from failure to failure with no loss of enthusiasm.",
        author: "Winston Churchill"
    },
    {
        text: "The only limit to our realization of tomorrow will be our doubts of today.",
        author: "Franklin D. Roosevelt"
    },
    {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney"
    },
    {
        text: "Your time is limited, don't waste it living someone else's life.",
        author: "Steve Jobs"
    },
    {
        text: "If you can dream it, you can achieve it.",
        author: "Zig Ziglar"
    },
    {
        text: "The best way to predict the future is to create it.",
        author: "Peter Drucker"
    },
    {
        text: "Success is not the key to happiness. Happiness is the key to success.",
        author: "Albert Schweitzer"
    },
    {
        text: "The only person you are destined to become is the person you decide to be.",
        author: "Ralph Waldo Emerson"
    },
    {
        text: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
        author: "Roy T. Bennett"
    },
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    }
];

// Japanese quotes database
const japaneseQuotes = [
    {
        text: "夢は逃げない。逃げるのはいつも自分だ。",
        author: "高橋歩",
        category: "dreams"
    },
    {
        text: "失敗を恐れるな。失敗を恐れることは、挑戦を恐れることだ。",
        author: "本田宗一郎",
        category: "courage"
    },
    {
        text: "平和は心の中から始まる。",
        author: "ダライ・ラマ",
        category: "peace"
    },
    {
        text: "友情は人生の宝物だ。",
        author: "不明",
        category: "friendship"
    },
    {
        text: "愛はすべてを包み込む。",
        author: "不明",
        category: "love"
    }
];

// Nepali quotes database
const nepaliQuotes = [
    {
        text: "सपना देख्नु राम्रो हो, तर त्यसलाई पूरा गर्ने साहस पनि हुनुपर्छ।",
        author: "अज्ञात",
        category: "dreams"
    },
    {
        text: "साहस भनेको डर नभएको होइन, डरलाई जित्ने हो।",
        author: "अज्ञात",
        category: "courage"
    },
    {
        text: "शान्ति मनभित्रबाट सुरु हुन्छ।",
        author: "दलाई लामा",
        category: "peace"
    },
    {
        text: "मित्रता जीवनको सबैभन्दा महत्त्वपूर्ण सम्पत्ति हो।",
        author: "अज्ञात",
        category: "friendship"
    },
    {
        text: "प्रेम सबैलाई जोड्छ।",
        author: "अज्ञात",
        category: "love"
    }
];

// Popular Quotes
const popularQuotes = {
    english: [
        {
            text: "The only way to do great work is to love what you do.",
            author: "Steve Jobs"
        },
        {
            text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
            author: "Winston Churchill"
        },
        {
            text: "The future belongs to those who believe in the beauty of their dreams.",
            author: "Eleanor Roosevelt"
        },
        {
            text: "Don't watch the clock; do what it does. Keep going.",
            author: "Sam Levenson"
        },
        {
            text: "Life is what happens while you're busy making other plans.",
            author: "John Lennon"
        }
    ],
    hi: [
        {
            text: "सफलता का रहस्य यह है कि आप जो कर रहे हैं उसे प्यार करें।",
            author: "महात्मा गांधी"
        },
        {
            text: "उठो, जागो और तब तक मत रुको जब तक लक्ष्य प्राप्त न हो जाए।",
            author: "स्वामी विवेकानंद"
        },
        {
            text: "सपने वो नहीं होते जो आप सोते समय देखते हैं, सपने वो होते हैं जो आपको सोने नहीं देते।",
            author: "ए.पी.जे. अब्दुल कलाम"
        },
        {
            text: "जीवन में सफलता के लिए दृढ़ संकल्प और कड़ी मेहनत आवश्यक है।",
            author: "अरस्तू"
        },
        {
            text: "हर चीज में कुछ सुंदरता होती है, लेकिन हर कोई इसे नहीं देख पाता।",
            author: "कन्फ्यूशियस"
        }
    ],
    ja: [
        {
            text: "夢は逃げない。逃げるのはいつも自分だ。",
            author: "高橋歩"
        },
        {
            text: "失敗を恐れるな。失敗を恐れることは、挑戦を恐れることだ。",
            author: "本田宗一郎"
        },
        {
            text: "平和は心の中から始まる。",
            author: "ダライ・ラマ"
        },
        {
            text: "友情は人生の宝物だ。",
            author: "不明"
        },
        {
            text: "愛はすべてを包み込む。",
            author: "不明"
        }
    ],
    ne: [
        {
            text: "सपना देख्नु राम्रो हो, तर त्यसलाई पूरा गर्ने साहस पनि हुनुपर्छ।",
            author: "अज्ञात"
        },
        {
            text: "साहस भनेको डर नभएको होइन, डरलाई जित्ने हो।",
            author: "अज्ञात"
        },
        {
            text: "शान्ति मनभित्रबाट सुरु हुन्छ।",
            author: "दलाई लामा"
        },
        {
            text: "मित्रता जीवनको सबैभन्दा महत्त्वपूर्ण सम्पत्ति हो।",
            author: "अज्ञात"
        },
        {
            text: "प्रेम सबैलाई जोड्छ।",
            author: "अज्ञात"
        }
    ]
};

// Language translations
const translations = {
    en: {
        searchPlaceholder: "Search quotes...",
        generateBtn: "Generate New Quote",
        like: "Like",
        share: "Share",
        download: "Download",
        save: "Save",
        noQuotesFound: "No quotes found matching your search. Please try different keywords.",
        errorMessage: "Something went wrong. Please try again."
    },
    hi: {
        searchPlaceholder: "उद्धरण खोजें...",
        generateBtn: "नया उद्धरण बनाएं",
        like: "पसंद",
        share: "साझा करें",
        download: "डाउनलोड",
        save: "सहेजें",
        noQuotesFound: "कोई उद्धरण नहीं मिला। कृपया दूसरा शब्द आज़माएं।",
        errorMessage: "कुछ गड़बड़ी हो गई है। कृपया पुनः प्रयास करें।"
    },
    ja: {
        searchPlaceholder: "引用を検索...",
        generateBtn: "新しい引用を生成",
        like: "いいね",
        share: "共有",
        download: "ダウンロード",
        save: "保存",
        noQuotesFound: "検索に一致する引用が見つかりません。別のキーワードをお試しください。",
        errorMessage: "エラーが発生しました。もう一度お試しください。"
    },
    ne: {
        searchPlaceholder: "उद्धरण खोज्नुहोस्...",
        generateBtn: "नयाँ उद्धरण सिर्जना गर्नुहोस्",
        like: "मनपराउनु",
        share: "साझेदारी गर्नु",
        download: "डाउनलोड गर्नु",
        save: "बचत गर्नु",
        noQuotesFound: "तपाईंको खोजसँग मिल्ने उद्धरण फेला परेन। कृपया अर्को खोजशब्द प्रयास गर्नुहोस्।",
        errorMessage: "केही गडबडी भयो। कृपया पुनः प्रयास गर्नुहोस्।"
    },
    es: {
        searchPlaceholder: "Buscar citas...",
        searchKeywords: ["Motivación", "Éxito", "Vida"],
        download: "Descargar",
        share: "Compartir",
        like: "Me gusta",
        save: "Guardar",
        categories: {
            motivation: "Motivación",
            life: "Vida",
            happiness: "Felicidad",
            friendship: "Amistad",
            dreams: "Sueños",
            courage: "Valor",
            peace: "Paz"
        }
    },
    fr: {
        searchPlaceholder: "Rechercher des citations...",
        searchKeywords: ["Motivation", "Succès", "Vie"],
        download: "Télécharger",
        share: "Partager",
        like: "J'aime",
        save: "Enregistrer",
        categories: {
            motivation: "Motivation",
            life: "Vie",
            happiness: "Bonheur",
            friendship: "Amitié",
            dreams: "Rêves",
            courage: "Courage",
            peace: "Paix"
        }
    },
    de: {
        searchPlaceholder: "Zitate suchen...",
        searchKeywords: ["Motivation", "Erfolg", "Leben"],
        download: "Herunterladen",
        share: "Teilen",
        like: "Gefällt mir",
        save: "Speichern",
        categories: {
            motivation: "Motivation",
            life: "Leben",
            happiness: "Glück",
            friendship: "Freundschaft",
            dreams: "Träume",
            courage: "Mut",
            peace: "Frieden"
        }
    },
    ar: {
        searchPlaceholder: "البحث عن اقتباسات...",
        searchKeywords: ["تحفيز", "نجاح", "حياة"],
        download: "تحميل",
        share: "مشاركة",
        like: "إعجاب",
        save: "حفظ",
        categories: {
            motivation: "تحفيز",
            life: "حياة",
            happiness: "سعادة",
            friendship: "صداقة",
            dreams: "أحلام",
            courage: "شجاعة",
            peace: "سلام"
        }
    },
    zh: {
        searchPlaceholder: "搜索引文...",
        searchKeywords: ["动机", "成功", "生活"],
        download: "下载",
        share: "分享",
        like: "喜欢",
        save: "保存",
        categories: {
            motivation: "动机",
            life: "生活",
            happiness: "幸福",
            friendship: "友谊",
            dreams: "梦想",
            courage: "勇气",
            peace: "和平"
        }
    }
};

// Add translations for categories and FAQ
const categoryTranslations = {
    en: {
        all: "All",
        friendship: "Friendship",
        dreams: "Dreams",
        courage: "Courage",
        peace: "Peace",
        love: "Love",
        success: "Success",
        wisdom: "Wisdom",
        inspiration: "Inspiration",
        motivation: "Motivation",
        happiness: "Happiness",
        life: "Life",
        hope: "Hope",
        faith: "Faith",
        leadership: "Leadership",
        sad: "Sad",
        lifeLessons: "Life Lessons",
        funny: "Funny",
        generator: "Generator"
    },
    hi: {
        all: "सभी",
        friendship: "दोस्ती",
        dreams: "सपने",
        courage: "साहस",
        peace: "शांति",
        love: "प्रेम",
        success: "सफलता",
        wisdom: "ज्ञान",
        inspiration: "प्रेरणा",
        motivation: "प्रेरणादायक",
        happiness: "खुशी",
        life: "जीवन",
        hope: "आशा",
        faith: "विश्वास",
        leadership: "नेतृत्व",
        sad: "दुखद",
        lifeLessons: "जीवन के सबक",
        funny: "मजेदार",
        generator: "जनरेटर"
    },
    ja: {
        all: "すべて",
        friendship: "友情",
        dreams: "夢",
        courage: "勇気",
        peace: "平和",
        love: "愛",
        success: "成功",
        wisdom: "知恵",
        inspiration: "インスピレーション",
        motivation: "モチベーション",
        happiness: "幸せ",
        life: "人生",
        hope: "希望",
        faith: "信念",
        leadership: "リーダーシップ",
        sad: "悲しい",
        lifeLessons: "人生の教訓",
        funny: "面白い",
        generator: "ジェネレーター"
    },
    ne: {
        all: "सबै",
        friendship: "मित्रता",
        dreams: "सपना",
        courage: "साहस",
        peace: "शान्ति",
        love: "प्रेम",
        success: "सफलता",
        wisdom: "ज्ञान",
        inspiration: "प्रेरणा",
        motivation: "प्रेरणादायी",
        happiness: "खुशी",
        life: "जीवन",
        hope: "आशा",
        faith: "विश्वास",
        leadership: "नेतृत्व",
        sad: "दुःखद",
        lifeLessons: "जीवनका पाठहरू",
        funny: "मजाको",
        generator: "जेनेरेटर"
    }
};

const faqTranslations = {
    en: {
        title: "FAQ",
        items: [
            {
                question: "How do I generate a new quote?",
                answer: "There are several ways to get new quotes:",
                bullets: [
                    "Click the \"Generate New Quote\" button for a random quote",
                    "Use the search bar to find quotes by keywords or authors",
                    "Click on category buttons like \"Love\", \"Motivation\", \"Wisdom\", etc.",
                    "Use the language selector to get quotes in different languages"
                ]
            },
            {
                question: "How do I save and manage my favorite quotes?",
                answer: "Managing your favorite quotes is easy:",
                bullets: [
                    "Click the heart icon (♥) to like a quote",
                    "Use the bookmark icon to save quotes for later",
                    "Your liked and saved quotes are stored locally on your device",
                    "You can unlike or unsave quotes by clicking the same buttons again"
                ]
            },
            {
                question: "What languages are supported?",
                answer: "Currently, we support the following languages:",
                bullets: [
                    "English (English quotes and interface)",
                    "हिंदी (Hindi quotes and interface)",
                    "日本語 (Japanese quotes and interface)",
                    "नेपाली (Nepali quotes and interface)"
                ]
            }
        ]
    },
    hi: {
        title: "सामान्य प्रश्न",
        items: [
            {
                question: "मैं नया उद्धरण कैसे जनरेट करूं?",
                answer: "नए उद्धरण प्राप्त करने के कई तरीके हैं:",
                bullets: [
                    "रैंडम उद्धरण के लिए \"नया उद्धरण जनरेट करें\" बटन पर क्लिक करें",
                    "कीवर्ड या लेखक द्वारा उद्धरण खोजने के लिए सर्च बार का उपयोग करें",
                    "\"प्रेम\", \"प्रेरणा\", \"ज्ञान\" जैसे श्रेणी बटन पर क्लिक करें",
                    "विभिन्न भाषाओं में उद्धरण प्राप्त करने के लिए भाषा चयनकर्ता का उपयोग करें"
                ]
            },
            {
                question: "मैं अपने पसंदीदा उद्धरणों को कैसे सहेजूं और प्रबंधित करूं?",
                answer: "अपने पसंदीदा उद्धरणों का प्रबंधन करना आसान है:",
                bullets: [
                    "उद्धरण को पसंद करने के लिए हार्ट आइकन (♥) पर क्लिक करें",
                    "बाद के लिए उद्धरण सहेजने के लिए बुकमार्क आइकन का उपयोग करें",
                    "आपके पसंदीदा और सहेजे गए उद्धरण आपके डिवाइस पर स्थानीय रूप से संग्रहीत हैं",
                    "उन्हीं बटनहरूमा फेरि क्लिक गरेर उद्धरणहरूलाई अनलाइक वा अनसेभ गर्न सक्नुहुन्छ"
                ]
            },
            {
                question: "कौन सी भाषाएं समर्थित हैं?",
                answer: "वर्तमान में, हामी निम्न भाषाहरू समर्थन गर्छौं:",
                bullets: [
                    "अंग्रेजी (अंग्रेजी उद्धरण और इन्टरफेस)",
                    "हिन्दी (हिन्दी उद्धरण और इन्टरफेस)",
                    "जापानी (जापानी उद्धरण और इन्टरफेस)",
                    "नेपाली (नेपाली उद्धरण र इन्टरफेस)"
                ]
            }
        ]
    },
    ja: {
        title: "よくある質問",
        items: [
            {
                question: "新しい引用を生成するにはどうすればよいですか？",
                answer: "新しい引用を取得する方法はいくつかあります：",
                bullets: [
                    "ランダムな引用を取得するには「新しい引用を生成」ボタンをクリックします",
                    "キーワードや著者で引用を検索するには検索バーを使用します",
                    "「愛」、「モチベーション」、「知恵」などのカテゴリーボタンをクリックします",
                    "異なる言語で引用を取得するには言語セレクターを使用します"
                ]
            },
            {
                question: "お気に入りの引用を保存・管理するにはどうすればよいですか？",
                answer: "お気に入りの引用の管理は簡単です：",
                bullets: [
                    "ハートアイコン（♥）をクリックして引用をいいねします",
                    "ブックマークアイコンを使用して引用を後で保存します",
                    "いいねした引用と保存した引用はデバイスにローカルに保存されます",
                    "同じボタンを再度クリックすることで、いいねや保存を解除できます"
                ]
            },
            {
                question: "どの言語に対応していますか？",
                answer: "現在、以下の言語に対応しています：",
                bullets: [
                    "英語（英語の引用とインターフェース）",
                    "ヒンディー語（ヒンディー語の引用とインターフェース）",
                    "日本語（日本語の引用とインターフェース）",
                    "ネパール語（ネパール語の引用とインターフェース）"
                ]
            }
        ]
    },
    ne: {
        title: "बारम्बार सोधिने प्रश्नहरू",
        items: [
            {
                question: "मैले नयाँ उद्धरण कसरी जनरेट गर्न सक्छु?",
                answer: "नयाँ उद्धरणहरू प्राप्त गर्ने धेरै तरिकाहरू छन्:",
                bullets: [
                    "र्यान्डम उद्धरणको लागि \"नयाँ उद्धरण जनरेट गर्नुहोस्\" बटनमा क्लिक गर्नुहोस्",
                    "किवर्ड वा लेखकद्वारा उद्धरणहरू खोज्न खोज बार प्रयोग गर्नुहोस्",
                    "\"प्रेम\", \"प्रेरणा\", \"ज्ञान\" जस्ता श्रेणी बटनहरूमा क्लिक गर्नुहोस्",
                    "विभिन्न भाषाहरूमा उद्धरणहरू प्राप्त गर्न भाषा चयनकर्ता प्रयोग गर्नुहोस्"
                ]
            },
            {
                question: "मैले मेरो मनपर्ने उद्धरणहरू कसरी सेभ र व्यवस्थापन गर्न सक्छु?",
                answer: "तपाईंको मनपर्ने उद्धरणहरू व्यवस्थापन गर्न सजिलो छ:",
                bullets: [
                    "उद्धरणलाई मन पराउन हार्ट आइकन (♥) मा क्लिक गर्नुहोस्",
                    "पछिको लागि उद्धरण सेभ गर्न बुकमार्क आइकन प्रयोग गर्नुहोस्",
                    "तपाईंको मन परेका र सेभ गरिएका उद्धरणहरू तपाईंको डिभाइसमा स्थानीय रूपमा भण्डारण गरिन्छ",
                    "तपाईंले ती बटनहरूमा फेरि क्लिक गरेर उद्धरणहरूलाई अनलाइक वा अनसेभ गर्न सक्नुहुन्छ"
                ]
            },
            {
                question: "कुन भाषाहरू समर्थित छन्?",
                answer: "हाल, हामी निम्न भाषाहरू समर्थन गर्छौं:",
                bullets: [
                    "अंग्रेजी (अंग्रेजी उद्धरण र इन्टरफेस)",
                    "हिन्दी (हिन्दी उद्धरण र इन्टरफेस)",
                    "जापानी (जापानी उद्धरण र इन्टरफेस)",
                    "नेपाली (नेपाली उद्धरण र इन्टरफेस)"
                ]
            }
        ]
    }
};

// Initialize website
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing website...');
    
    // Make sure quote box is visible
    if (quoteBox) {
        quoteBox.classList.add('loaded');
    }
    
    // Generate initial quote immediately
    setTimeout(() => {
        generateQuote();
        console.log('Initial quote generated');
    }, 100);
    
    // Set up event listeners
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            console.log('Generate button clicked');
            generateQuote();
        });
    }
    
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            console.log('Language changed to:', e.target.value);
            generateQuote();
            updateLanguageUI(e.target.value);
        });
    }
    
    // Set initial theme
    if (currentTheme) {
        setTheme(currentTheme);
    }
    
    // Update UI elements
    updateFavoriteButton();
    updateLanguageUI(languageSelect.value);
});

// Theme Management
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    currentTheme = theme;
    localStorage.setItem('theme', theme);
    updateThemeOptions();
}

function updateThemeOptions() {
    themeOptions.forEach(option => {
        const theme = option.getAttribute('data-theme');
        if (theme === currentTheme) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

// Quote Generation
async function generateQuote() {
    const selectedLanguage = languageSelect.value;
    
    try {
        // Add loading states
        if (generateBtn) {
            generateBtn.classList.add('loading');
            generateBtn.disabled = true;
        }
        if (quoteBox) {
            quoteBox.classList.add('loading');
            quoteBox.classList.remove('fade-in');
        }

        // Select quotes based on language
        let quotes;
        switch(selectedLanguage) {
            case 'hi':
                quotes = hindiQuotes;
                break;
            case 'ja':
                quotes = japaneseQuotes;
                break;
            case 'ne':
                quotes = nepaliQuotes;
                break;
            default:
                quotes = englishQuotes;
        }

        // Add artificial delay for smooth animation
        await new Promise(resolve => setTimeout(resolve, 500));

        // Get a random quote that's different from the current one
        let newQuote;
        do {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            newQuote = quotes[randomIndex];
        } while (currentQuote && newQuote.text === currentQuote.text && quotes.length > 1);

        // Update current quote
        currentQuote = newQuote;

        // Remove loading states
        if (generateBtn) {
            generateBtn.classList.remove('loading');
            generateBtn.disabled = false;
        }
        if (quoteBox) {
            quoteBox.classList.remove('loading');
            quoteBox.classList.add('fade-out');
        }

        // Update the DOM with small delay for animation
        setTimeout(() => {
            if (quoteText) {
                quoteText.textContent = currentQuote.text;
            }
            if (quoteAuthor) {
                quoteAuthor.textContent = `- ${currentQuote.author}`;
            }

            // Add fade-in animation
            if (quoteBox) {
                quoteBox.classList.remove('fade-out');
                void quoteBox.offsetWidth; // Trigger reflow
                quoteBox.classList.add('fade-in');
            }

            // Update UI elements
            updateFavoriteButton();
        }, 300);

    } catch (error) {
        console.error('Error generating quote:', error);
        
        // Remove loading states
        if (generateBtn) {
            generateBtn.classList.remove('loading');
            generateBtn.disabled = false;
        }
        if (quoteBox) {
            quoteBox.classList.remove('loading');
        }

        // Show fallback quote
        const fallbackQuotes = {
            hi: {
                text: "जीवन एक यात्रा है, इसे खूबसूरत बनाएं।",
                author: "अज्ञात"
            },
            ja: {
                text: "人生は旅である。",
                author: "不明"
            },
            ne: {
                text: "जीवन एक यात्रा हो।",
                author: "अज्ञात"
            },
            en: {
                text: "Life is what happens while you're busy making other plans.",
                author: "John Lennon"
            }
        };

        const fallback = fallbackQuotes[selectedLanguage] || fallbackQuotes.en;
        
        if (quoteText) quoteText.textContent = fallback.text;
        if (quoteAuthor) quoteAuthor.textContent = `- ${fallback.author}`;
    }
}

// Search Functionality
async function searchQuotes() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedLanguage = languageSelect.value;
    
    if (!searchTerm) {
        generateQuote();
        return;
    }

    try {
        if (selectedLanguage === 'hi') {
            const results = hindiQuotes.filter(quote => 
                quote.text.toLowerCase().includes(searchTerm) || 
                quote.author.toLowerCase().includes(searchTerm)
            );
            
            if (results.length > 0) {
                const randomIndex = Math.floor(Math.random() * results.length);
                displayQuote(results[randomIndex]);
            } else {
                displayQuote({
                    text: "कोई उद्धरण नहीं मिला। कृपया दूसरा शब्द आज़माएं।",
                    author: "खोज परिणाम"
                });
            }
        } else {
            const response = await fetch(`${API_URL}?tags=${searchTerm}`);
            if (!response.ok) {
                throw new Error('Failed to fetch quotes');
            }
            const data = await response.json();
            
            if (data && data.content) {
                displayQuote({
                    text: data.content,
                    author: data.author
                });
            } else {
                // Fallback to local English quotes if API returns no results
                const results = englishQuotes.filter(quote => 
                    quote.text.toLowerCase().includes(searchTerm) || 
                    quote.author.toLowerCase().includes(searchTerm)
                );
                
                if (results.length > 0) {
                    const randomIndex = Math.floor(Math.random() * results.length);
                    displayQuote(results[randomIndex]);
                } else {
                    displayQuote({
                        text: "No quotes found matching your search. Please try different keywords.",
                        author: "Search Results"
                    });
                }
            }
        }
    } catch (error) {
        console.error('Search Error:', error);
        // Fallback to local quotes in case of API error
        const results = selectedLanguage === 'hi' ? hindiQuotes : englishQuotes;
        const filteredResults = results.filter(quote => 
            quote.text.toLowerCase().includes(searchTerm) || 
            quote.author.toLowerCase().includes(searchTerm)
        );
        
        if (filteredResults.length > 0) {
            const randomIndex = Math.floor(Math.random() * filteredResults.length);
            displayQuote(filteredResults[randomIndex]);
        } else {
            displayQuote({
                text: selectedLanguage === 'hi' 
                    ? "कुछ गड़बड़ी हो गई है। कृपया पुनः प्रयास करें।" 
                    : "Something went wrong. Please try again.",
                author: "Error"
            });
        }
    }
}

// Favorite Quotes
function toggleFavorite() {
    if (!currentQuote) return;
    
    const index = favorites.findIndex(fav => 
        fav.text === currentQuote.text && fav.author === currentQuote.author
    );
    
    if (index === -1) {
        favorites.push(currentQuote);
        showToast('Quote added to favorites!');
    } else {
        favorites.splice(index, 1);
        showToast('Quote removed from favorites!');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteButton();
}

function updateFavoriteButton() {
    const favoriteBtn = document.querySelector('.action-btn.like');
    if (!currentQuote) return;
    
    const isFavorite = favorites.some(fav => 
        fav.text === currentQuote.text && fav.author === currentQuote.author
    );
    
    favoriteBtn.innerHTML = isFavorite 
        ? '<i class="fas fa-heart"></i><span>Unlike</span>' 
        : '<i class="far fa-heart"></i><span>Like</span>';
}

// Share Quote
function shareQuote() {
    if (!currentQuote) return;
    
    const shareText = `"${currentQuote.text}" - ${currentQuote.author}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Quote Generator',
            text: shareText,
        }).catch(console.error);
    } else {
        navigator.clipboard.writeText(shareText).then(() => {
            showToast('Quote copied to clipboard!');
        });
    }
}

// Download Quote
function downloadQuote() {
    if (!currentQuote) return;
    
    const quoteText = currentQuote.text;
    const author = currentQuote.author;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 800;
    canvas.height = 400;
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = '30px Playfair Display';
    ctx.fillStyle = '#333333';
    ctx.textAlign = 'center';
    ctx.fillText(quoteText, canvas.width/2, canvas.height/2);
    
    ctx.font = '20px Poppins';
    ctx.fillText(`- ${author}`, canvas.width/2, canvas.height/2 + 50);
    
    const link = document.createElement('a');
    link.download = 'quote.png';
    link.href = canvas.toDataURL();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Save Quote
function saveQuote() {
    if (!currentQuote) return;
    
    const savedQuotes = JSON.parse(localStorage.getItem('savedQuotes') || '[]');
    savedQuotes.push(currentQuote);
    localStorage.setItem('savedQuotes', JSON.stringify(savedQuotes));
    
    showToast('Quote saved successfully!');
}

// Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// Event Listeners
generateBtn.addEventListener('click', generateQuote);
searchBtn.addEventListener('click', searchQuotes);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchQuotes();
    }
});

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;
        generateQuote();
    });
});

themeOptions.forEach(option => {
    option.addEventListener('click', () => {
        const theme = option.getAttribute('data-theme');
        setTheme(theme);
    });
});

searchKeywords.forEach(keyword => {
    keyword.addEventListener('click', () => {
        searchInput.value = keyword.textContent;
        searchQuotes();
    });
});

actionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.classList[1];
        switch (action) {
            case 'like':
                toggleFavorite();
                break;
            case 'share':
                shareQuote();
                break;
            case 'download':
                downloadQuote();
                break;
            case 'save':
                saveQuote();
                break;
        }
    });
});

languageSelect.addEventListener('change', () => {
    const selectedLanguage = languageSelect.value;
    updateLanguageUI(selectedLanguage);
    generateQuote();
    displayPopularQuotes();
});

// Update UI based on selected language
function updateLanguageUI(lang) {
    const elements = {
        searchPlaceholder: document.querySelector('.search-input'),
        generateBtn: document.querySelector('.generate-btn'),
        likeBtn: document.querySelector('.action-btn.like span'),
        shareBtn: document.querySelector('.action-btn.share span'),
        downloadBtn: document.querySelector('.action-btn.download span'),
        saveBtn: document.querySelector('.action-btn.save span')
    };

    const translation = translations[lang];
    
    if (elements.searchPlaceholder) elements.searchPlaceholder.placeholder = translation.searchPlaceholder;
    if (elements.generateBtn) elements.generateBtn.innerHTML = `<i class="fas fa-sync-alt"></i> ${translation.generateBtn}`;
    if (elements.likeBtn) elements.likeBtn.textContent = translation.like;
    if (elements.shareBtn) elements.shareBtn.textContent = translation.share;
    if (elements.downloadBtn) elements.downloadBtn.textContent = translation.download;
    if (elements.saveBtn) elements.saveBtn.textContent = translation.save;

    // Update category buttons
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        const category = btn.getAttribute('data-category');
        if (categoryTranslations[lang] && categoryTranslations[lang][category]) {
            btn.textContent = categoryTranslations[lang][category];
        }
    });

    // Update FAQ section
    const faqTitle = document.querySelector('.faq-section h2');
    const faqContainer = document.querySelector('.faq-container');
    
    if (faqTitle && faqContainer && faqTranslations[lang]) {
        // Update FAQ title
        faqTitle.textContent = faqTranslations[lang].title;
        
        // Update FAQ items
        const faqItems = faqTranslations[lang].items;
        faqContainer.innerHTML = faqItems.map(item => `
            <div class="faq-item">
                <div class="faq-question">
                    <h3>${item.question}</h3>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer">
                    <p>${item.answer}</p>
                    <ul>
                        ${item.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('');

        // Reattach event listeners to new FAQ items
        const newFaqItems = document.querySelectorAll('.faq-item');
        newFaqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                newFaqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                    }
                });
                
                item.classList.toggle('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = item.classList.contains('active') 
                    ? `${answer.scrollHeight}px` 
                    : '0';
            });
        });
    }
}

// Display Popular Quotes
function displayPopularQuotes() {
    const popularQuotesContainer = document.querySelector('.popular-quotes-container');
    const selectedLanguage = languageSelect.value;

    if (!popularQuotesContainer) {
        console.error('Popular quotes container not found');
        return;
    }

    // Clear existing quotes
    popularQuotesContainer.innerHTML = '';

    // Get quotes for selected language, fallback to English if not available
    let allQuotes;
    switch(selectedLanguage) {
        case 'hi':
            allQuotes = hindiQuotes;
            break;
        case 'ja':
            allQuotes = japaneseQuotes;
            break;
        case 'ne':
            allQuotes = nepaliQuotes;
            break;
        default:
            allQuotes = englishQuotes;
    }

    // Randomly select 5 different quotes
    const selectedQuotes = [];
    const tempQuotes = [...allQuotes]; // Create a copy of all quotes

    // Get 5 random quotes or all available quotes if less than 5
    const numQuotes = Math.min(5, tempQuotes.length);
    
    for(let i = 0; i < numQuotes; i++) {
        const randomIndex = Math.floor(Math.random() * tempQuotes.length);
        selectedQuotes.push(tempQuotes[randomIndex]);
        tempQuotes.splice(randomIndex, 1); // Remove selected quote to avoid duplicates
    }

    if (selectedQuotes.length === 0) {
        popularQuotesContainer.innerHTML = '<p>No popular quotes available for this language.</p>';
        return;
    }

    // Create and append quote elements with fade-in animation
    selectedQuotes.forEach(quote => {
        const quoteElement = document.createElement('div');
        quoteElement.className = 'popular-quote';
        quoteElement.innerHTML = `
            <div class="quote-content">
                <p class="quote-text">${quote.text}</p>
                <p class="quote-author">- ${quote.author}</p>
            </div>
        `;
        popularQuotesContainer.appendChild(quoteElement);
        
        // Trigger reflow for animation
        void quoteElement.offsetWidth;
        quoteElement.classList.add('fade-in');
    });
}

// Add event listener for the refresh button
document.addEventListener('DOMContentLoaded', () => {
    const refreshPopularBtn = document.querySelector('.refresh-popular-btn');
    if (refreshPopularBtn) {
        refreshPopularBtn.addEventListener('click', displayPopularQuotes);
    }
    
    // Display popular quotes initially
    displayPopularQuotes();
    
    // Update popular quotes when language changes
    languageSelect.addEventListener('change', () => {
        displayPopularQuotes();
    });
});

// FAQ Functionality
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            item.classList.toggle('active');
            
            // Add animation class
            const answer = item.querySelector('.faq-answer');
            answer.style.maxHeight = item.classList.contains('active') 
                ? `${answer.scrollHeight}px` 
                : '0';
        });
    });
}); 