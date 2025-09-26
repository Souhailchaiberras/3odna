// API Configuration
export const API_CONFIG = {
  // OpenAI Configuration
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY || '',
  OPENAI_API_URL: 'https://api.openai.com/v1/chat/completions',
  
  // Gemini Configuration
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY || '',
  GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
}

// Instructions for setting up API keys:
// 1. Create a .env file in the root directory
// 2. Add your API keys:
//    VITE_OPENAI_API_KEY=your_openai_api_key_here
//    VITE_GEMINI_API_KEY=your_gemini_api_key_here
// 3. Replace 'your_api_key_here' with your actual API keys
// 4. Restart your development server 