export interface AITool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  website: string;
  fullDescription: string;
  howToUseSteps: string[];
  pros: string[];
  cons: string[];
  faqs: { question: string; answer: string }[];
  
  // Optional field for research text from DB
  researchText?: string;
}

export const AI_TOOLS: AITool[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'Conversational AI by OpenAI.',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    category: 'Text',
    website: 'https://chat.openai.com',
    fullDescription: 'ChatGPT is a conversational AI developed by OpenAI...',
    howToUseSteps: ['Go to https://chat.openai.com', 'Sign in', 'Start typing your question'],
    pros: ['Conversational AI', 'Wide variety of tasks'],
    cons: ['Sometimes inaccurate', 'Requires internet'],
    faqs: [
      { question: 'Is ChatGPT free?', answer: 'Yes, there is a free tier.' },
      { question: 'Can it generate code?', answer: 'Yes, it supports code generation.' }
    ]
  },
  {
    id: 'gemini',
    name: 'Gemini',
    description: 'Google generative AI.',
    icon: 'src/assets/google-gemini-icon.png',
    category: 'Text',
    website: 'https://gemini.google.com',
    fullDescription: 'Gemini is Google\'s multimodal generative AI...',
    howToUseSteps: ['Visit https://gemini.google.com', 'Sign in with Google account', 'Start interacting'],
    pros: ['Multimodal', 'Integrated with Google'],
    cons: ['Newer ecosystem'],
    faqs: [
      { question: 'Is Gemini free?', answer: 'Yes, free and paid tiers are available.' }
    ]
  },
  // ➕ Add other tools similarly as needed
];
