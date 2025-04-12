import type { AIAction } from "@/components/editor/editor-custom/types";

export const LANGUAGES_OPTIONS_WITH_SUB = [
  {
    value: "en-us",
    label: "English (USA)?subtitle=English",
  },
  {
    value: "en-gb",
    label: "English (UK)?subtitle=English",
  },
  {
    value: "fr",
    label: "French?subtitle=Français",
  },
  {
    value: "fa",
    label: "Persian?subtitle=فارسی",
  },
  {
    value: "zh",
    label: "Chinese (Simplified)?subtitle=中文",
  },
  {
    value: "zh-tw",
    label: "Chinese (Traditional)?subtitle=繁體中文",
  },
  {
    value: "ar",
    label: "Arabic?subtitle=العربية",
  },
  {
    value: "de",
    label: "German?subtitle=Deutsch",
  },
  {
    value: "es",
    label: "Spanish?subtitle=Español",
  },
  {
    value: "it",
    label: "Italian?subtitle=Italiano",
  },
  {
    value: "pt",
    label: "Portuguese?subtitle=Português",
  },
  {
    value: "ru",
    label: "Russian?Русский",
  },
  {
    value: "ja",
    label: "Japanese?subtitle=日本語",
  },
  {
    value: "ko",
    label: "Korean?subtitle=한국어",
  },
  {
    value: "hi",
    label: "Hindi?subtitle=हिन्दी",
  },
  {
    value: "bn",
    label: "Bengali?subtitle=বাংলা",
  },
  {
    value: "id",
    label: "Indonesian?subtitle=Bahasa Indonesia",
  },
  {
    value: "tr",
    label: "Turkish?subtitle=Türkçe",
  },
  {
    value: "pl",
    label: "Polish?subtitle=Polski",
  },
  {
    value: "sv",
    label: "Swedish?subtitle=Svenska",
  },
  {
    value: "da",
    label: "Danish?subtitle=Dansk",
  },
  {
    value: "no",
    label: "Norwegian?subtitle=Norsk",
  },
  {
    value: "fi",
    label: "Finnish?subtitle=Suomi",
  },
  {
    value: "cs",
    label: "Czech?subtitle=Čeština",
  },
  {
    value: "sk",
    label: "Slovak?subtitle=Slovenčina",
  },
  {
    value: "nl",
    label: "Dutch?subtitle=Nederlands",
  },
  {
    value: "el",
    label: "Greek?subtitle=Ελληνικά",
  },
  {
    value: "th",
    label: "Thai?subtitle=ไทย",
  },
  {
    value: "he",
    label: "Hebrew?subtitle=עברית",
  },
  {
    value: "sw",
    label: "Swahili?subtitle=Kiswahili",
  },
  {
    value: "ta",
    label: "Tamil?subtitle=தமிழ்",
  },
  {
    value: "te",
    label: "Telugu?subtitle=తెలుగు",
  },
  {
    value: "ml",
    label: "Malayalam?subtitle=മലയാളം",
  },
  {
    value: "mr",
    label: "Marathi?subtitle=मराठी",
  },
  {
    value: "kn",
    label: "Kannada?subtitle=ಕನ್ನಡ",
  },
  {
    value: "gu",
    label: "Gujarati?subtitle=ગુજરાતી",
  },
  {
    value: "pa",
    label: "Punjabi?subtitle=ਪੰਜਾਬੀ",
  },
  {
    value: "vi",
    label: "Vietnamese?subtitle=Tiếng Việt",
  },
  {
    value: "ms",
    label: "Malay?subtitle=Bahasa Melayu",
  },
  {
    value: "sr",
    label: "Serbian?subtitle=Српски",
  },
  {
    value: "hr",
    label: "Croatian?subtitle=Hrvatski",
  },
  {
    value: "sq",
    label: "Albanian?subtitle=Shqip",
  },
  {
    value: "bs",
    label: "Bosnian?subtitle=Bosanski",
  },
  {
    value: "uk",
    label: "Ukrainian?subtitle=Українська",
  },
  {
    value: "ro",
    label: "Romanian?subtitle=Română",
  },
  {
    value: "hu",
    label: "Hungarian?subtitle=Magyar",
  },
  {
    value: "bg",
    label: "Bulgarian?subtitle=Български",
  },
  {
    value: "lt",
    label: "Lithuanian?subtitle=Lietuvių",
  },
  {
    value: "lv",
    label: "Latvian?subtitle=Latviešu",
  },
  {
    value: "et",
    label: "Estonian?subtitle=Eesti",
  },
  {
    value: "is",
    label: "Icelandic?subtitle=Íslenska",
  },
  {
    value: "cy",
    label: "Welsh?subtitle=Cymraeg",
  },
  {
    value: "eu",
    label: "Basque?subtitle=Euskara",
  },
  {
    value: "ca",
    label: "Catalan?subtitle=Català",
  },
  {
    value: "gl",
    label: "Galician?subtitle=Galego",
  },
  {
    value: "km",
    label: "Khmer?subtitle=ភាសាខ្មែរ",
  },
  {
    value: "my",
    label: "Burmese?subtitle=မြန်မာစာ",
  },
  {
    value: "la",
    label: "Latin?subtitle=Latina",
  },
  {
    value: "ne",
    label: "Nepali?subtitle=नेपाली",
  },
  {
    value: "si",
    label: "Sinhalese?subtitle=සිංහල",
  },
  {
    value: "am",
    label: "Amharic?subtitle=አማ���ኛ",
  },
  {
    value: "so",
    label: "Somali?subtitle=Soomaali",
  },
  {
    value: "lo",
    label: "Lao?subtitle=ລາວ",
  },
  {
    value: "haw",
    label: "Hawaiian?subtitle=ʻŌlelo Hawaiʻi",
  },
];
const LANGUAGES_OPTIONS = LANGUAGES_OPTIONS_WITH_SUB.map(
  l => l.label.split("?subtitle=")[0],
);

export const TONE_OPTIONS = [
  "Auto",
  "Professional",
  "Exciting",
  "Friendly",
  "Witty",
  "Humorous",
  "Convincing",
  "Empathetic",
  "Inspiring",
  "Supportive",
  "Trusting",
  "Playful",
  "Excited",
  "Positive",
  "Negative",
  "Engaging",
  "Worried",
  "Urgent",
  "Passionate",
  "Informative",
  "Funny",
  "Casual",
  "Sarcastic",
  "Dramatic",
];

export const aiActions: AIAction[] = [
  {
    id: "nemati-ai-quick-action-1",
    title: "Explain",
    titleI18n: "explain",
    icon: "lucide:book-copy",
    isPin: true,
    options: [],
    promptAction: "Explain Text:",
    promptType: "explainer_text",
  },
  {
    id: "nemati-ai-quick-action-121",
    title: "Rewrite",
    titleI18n: "rewrite",
    icon: "tabler:writing",
    isPin: true,
    options: [],
    promptAction: "Rewrite Text",
    promptType: "ai_writer",
  },
  {
    id: "nemati-ai-quick-action-2",
    title: "Translate",
    titleI18n: "translate",
    settingTitleI18n: "translate_to",
    isPin: false,
    options: LANGUAGES_OPTIONS,
    icon: "ri:translate",
    selectedOption: "French",
    promptAction: "Translate Text:",
    promptType: "translate_text",
    optionKey: "language",
  },
  {
    id: "nemati-ai-quick-action-3",
    title: "Summarize",
    titleI18n: "summarize",
    isPin: false,
    options: [],
    icon: "ooui:text-summary-ltr",
    promptAction: "Summarize Text:",
    promptType: "summarize_text",
  },
  {
    id: "nemati-ai-quick-action-4",
    title: "Make Shorter",
    titleI18n: "shorter",
    isPin: false,
    options: [],
    icon: "bi:sort-down",
    promptAction: "Make Text shorter:",
    promptType: "make_shorter",
  },
  {
    id: "nemati-ai-quick-action-5",
    title: "Make Longer",
    titleI18n: "longer",
    isPin: false,
    options: [],
    icon: "ant-design:expand-alt-outlined",
    promptAction: "Make Text longer:",
    promptType: "make_longer",
  },
  {
    id: "nemati-ai-quick-action-6",
    title: "Fix Grammar",
    titleI18n: "grammar",
    isPin: false,
    options: [],
    icon: "tabler:text-grammar",
    promptAction: "Fix Grammar:",
    promptType: "fix_grammar",
  },
  {
    id: "nemati-ai-quick-action-7",
    title: "Change Tone",
    titleI18n: "tone",
    settingTitleI18n: "tone_to",
    isPin: false,
    options: TONE_OPTIONS.slice(0, 7),
    icon: "hugeicons:ai-voice-generator",
    selectedOption: "Professional",
    promptAction: "Change Tone:",
    promptType: "change_tone",
  },
];
