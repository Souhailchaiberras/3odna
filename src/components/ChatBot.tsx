import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card } from './ui/card'
import { Send, X, Bot, User, Settings, Zap } from 'lucide-react'
import { API_CONFIG } from '../config/api'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [useAI, setUseAI] = useState(false)
  const [aiProvider, setAiProvider] = useState<'openai' | 'gemini'>('openai')
  const [openaiKey, setOpenaiKey] = useState(API_CONFIG.OPENAI_API_KEY)
  const [geminiKey, setGeminiKey] = useState(API_CONFIG.GEMINI_API_KEY)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Bonjour! Je suis votre assistant personnel. Posez-moi des questions sur Souhail!",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Knowledge base about the user
  const knowledgeBase = {
    'qui es-tu': 'Je suis Souhail, un développeur passionné par la technologie et l\'innovation.',
    'about me': 'Je suis Souhail, un développeur full-stack passionné par la création d\'applications web modernes et innovantes.',
    'qui est souhail': 'Souhail est un développeur talentueux spécialisé dans React, TypeScript, et les technologies web modernes.',
    'skills': 'Mes compétences incluent React, TypeScript, Node.js, Python, et bien d\'autres technologies web.',
    'compétences': 'Je maîtrise React, TypeScript, Node.js, Python, et de nombreuses autres technologies web.',
    'projets': 'J\'ai développé plusieurs projets innovants, notamment des applications de tourisme IA, des plateformes d\'exploration, et des applications d\'évaluation.',
    'projects': 'Mes projets incluent des applications de tourisme IA, des plateformes d\'exploration, et des applications d\'évaluation.',
    'expérience': 'J\'ai une expérience solide dans le développement web et mobile, avec un focus sur les technologies modernes.',
    'experience': 'I have solid experience in web and mobile development, with a focus on modern technologies.',
    'contact': 'Vous pouvez me contacter via LinkedIn, GitHub, ou par email.',
    'linkedin': 'Mon profil LinkedIn est disponible dans la section Hero de mon portfolio.',
    'github': 'Mon GitHub est accessible via les liens dans la section Hero.',
    'email': 'Vous pouvez me contacter par email via les liens dans mon portfolio.',
    'formation': 'J\'ai une formation en informatique et développement web.',
    'education': 'I have a background in computer science and web development.',
    'passion': 'Je suis passionné par la technologie, l\'innovation, et la création d\'applications qui améliorent la vie des utilisateurs.',
    'intérêts': 'Mes intérêts incluent l\'IA, le développement web, et les nouvelles technologies.',
    'interests': 'My interests include AI, web development, and new technologies.',
    'technologies': 'Je travaille avec React, TypeScript, Node.js, Python, et de nombreuses autres technologies.',
    'tech': 'I work with React, TypeScript, Node.js, Python, and many other technologies.',
    'cv': 'Mon CV est disponible en téléchargement dans la section Hero de mon portfolio.',
    'resume': 'My resume is available for download in the Hero section of my portfolio.',
    'aide': 'Je peux vous parler de mes compétences, projets, expérience, et bien plus encore. Posez-moi une question!',
    'help': 'I can tell you about my skills, projects, experience, and much more. Ask me a question!',
    'bonjour': 'Bonjour! Comment puis-je vous aider?',
    'hello': 'Hello! How can I help you?',
    'salut': 'Salut! Posez-moi des questions sur Souhail!',
    'hi': 'Hi! Ask me questions about Souhail!'
  }

  // OpenAI API Integration
  const callOpenAI = async (message: string): Promise<string> => {
    try {
      console.log('Calling OpenAI API with key:', openaiKey ? 'Key provided' : 'No key')
      
      const response = await fetch(API_CONFIG.OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'Tu es un assistant personnel pour Souhail, un développeur web. Réponds en français de manière amicale et professionnelle. Si on te pose des questions sur Souhail, utilise les informations suivantes: Il est développeur full-stack, spécialisé en React, TypeScript, Node.js, Python. Il a créé des projets de tourisme IA, des plateformes d\'exploration, et des applications d\'évaluation. Il est passionné par la technologie et l\'innovation.'
            },
            {
              role: 'user',
              content: message
            }
          ],
          max_tokens: 150,
          temperature: 0.7
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('OpenAI API error:', response.status, errorText)
        throw new Error(`OpenAI API request failed: ${response.status}`)
      }

      const data = await response.json()
      console.log('OpenAI API response:', data)
      return data.choices[0].message.content
    } catch (error) {
      console.error('OpenAI API error:', error)
      return getLocalResponse(message)
    }
  }

  // Gemini API Integration
  const callGemini = async (message: string): Promise<string> => {
    try {
      console.log('Calling Gemini API with key:', geminiKey ? 'Key provided' : 'No key')
      
      const response = await fetch(`${API_CONFIG.GEMINI_API_URL}?key=${geminiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Tu es un assistant personnel pour Souhail, un développeur web. Réponds en français de manière amicale et professionnelle. Si on te pose des questions sur Souhail, utilise les informations suivantes: Il est développeur full-stack, spécialisé en React, TypeScript, Node.js, Python. Il a créé des projets de tourisme IA, des plateformes d'exploration, et des applications d'évaluation. Il est passionné par la technologie et l'innovation.

Question de l'utilisateur: ${message}`
                }
              ]
            }
          ]
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Gemini API error:', response.status, errorText)
        throw new Error(`Gemini API request failed: ${response.status}`)
      }

      const data = await response.json()
      console.log('Gemini API response:', data)
      return data.candidates[0].content.parts[0].text
    } catch (error) {
      console.error('Gemini API error:', error)
      return getLocalResponse(message)
    }
  }

  const getLocalResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Check for exact matches first
    for (const [key, response] of Object.entries(knowledgeBase)) {
      if (lowerMessage.includes(key.toLowerCase())) {
        return response
      }
    }

    // Check for partial matches
    if (lowerMessage.includes('compétence') || lowerMessage.includes('skill')) {
      return 'Mes compétences incluent React, TypeScript, Node.js, Python, et bien d\'autres technologies web modernes.'
    }
    
    if (lowerMessage.includes('projet') || lowerMessage.includes('project')) {
      return 'J\'ai développé plusieurs projets innovants, notamment des applications de tourisme IA, des plateformes d\'exploration, et des applications d\'évaluation.'
    }
    
    if (lowerMessage.includes('expérience') || lowerMessage.includes('experience')) {
      return 'J\'ai une expérience solide dans le développement web et mobile, avec un focus sur les technologies modernes et l\'innovation.'
    }

    // Default response
    return "Je ne suis pas sûr de comprendre. Pouvez-vous reformuler votre question? Je peux vous parler de mes compétences, projets, expérience, ou formation."
  }

  const getResponse = async (userMessage: string): Promise<string> => {
    if (!useAI) {
      console.log('Using local response mode')
      return getLocalResponse(userMessage)
    }

    const currentKey = aiProvider === 'openai' ? openaiKey : geminiKey
    if (!currentKey) {
      console.log('No API key provided, using local response')
      return getLocalResponse(userMessage)
    }

    console.log(`Using ${aiProvider} API`)
    if (aiProvider === 'openai') {
      return await callOpenAI(userMessage)
    } else {
      return await callGemini(userMessage)
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Get response (AI or local)
    const response = await getResponse(inputValue)
    
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg text-white"
        >
          {isOpen ? <X size={24} /> : <Bot size={24} />}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-40"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bot size={20} />
                  <h3 className="font-semibold text-white">Assistant Personnel</h3>
                </div>
                <Button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-1 bg-white/20 hover:bg-white/30 text-white"
                  size="sm"
                >
                  <Settings size={16} />
                </Button>
              </div>
              <p className="text-sm text-white opacity-90">
                {useAI ? `🤖 ${aiProvider === 'openai' ? 'OpenAI' : 'Gemini'} Powered` : '💬 Local Mode'} - Posez-moi des questions sur Souhail
              </p>
            </div>

            {/* Settings Panel */}
            {showSettings && (
              <motion.div
                className="p-4 bg-gray-50 border-b border-gray-200"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="useAI"
                      checked={useAI}
                      onChange={(e) => setUseAI(e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="useAI" className="text-sm font-medium text-gray-700">
                      Utiliser l'IA
                    </label>
                  </div>
                  
                  {useAI && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Fournisseur IA:
                        </label>
                        <div className="flex space-x-2">
                          <label className="flex items-center space-x-1">
                            <input
                              type="radio"
                              name="aiProvider"
                              value="openai"
                              checked={aiProvider === 'openai'}
                              onChange={(e) => setAiProvider(e.target.value as 'openai' | 'gemini')}
                              className="rounded"
                            />
                            <span className="text-sm">OpenAI</span>
                          </label>
                          <label className="flex items-center space-x-1">
                            <input
                              type="radio"
                              name="aiProvider"
                              value="gemini"
                              checked={aiProvider === 'gemini'}
                              onChange={(e) => setAiProvider(e.target.value as 'openai' | 'gemini')}
                              className="rounded"
                            />
                            <span className="text-sm">Gemini</span>
                          </label>
                        </div>
                      </div>

                      {aiProvider === 'openai' && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            Clé API OpenAI:
                          </label>
                          <Input
                            type="password"
                            value={openaiKey}
                            onChange={(e) => setOpenaiKey(e.target.value)}
                            placeholder="sk-..."
                            className="text-sm"
                          />
                          <p className="text-xs text-gray-500">
                            🔑 Clé actuelle: {openaiKey ? '✅ Fournie' : '❌ Manquante'}
                          </p>
                        </div>
                      )}

                      {aiProvider === 'gemini' && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            Clé API Gemini:
                          </label>
                          <Input
                            type="password"
                            value={geminiKey}
                            onChange={(e) => setGeminiKey(e.target.value)}
                            placeholder="AIza..."
                            className="text-sm"
                          />
                          <p className="text-xs text-gray-500">
                            🔑 Clé actuelle: {geminiKey ? '✅ Fournie' : '❌ Manquante'}
                          </p>
                        </div>
                      )}

                      <p className="text-xs text-blue-600">
                        💡 Ou ajoutez vos clés dans le fichier .env:
                        <br />
                        VITE_OPENAI_API_KEY=sk-... (pour OpenAI)
                        <br />
                        VITE_GEMINI_API_KEY=AIza... (pour Gemini)
                      </p>
                    </>
                  )}
                </div>
              </motion.div>
            )}

            {/* Messages */}
            <div className="flex-1 p-4 h-64 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className={`flex items-start space-x-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                        message.isUser 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                          : 'bg-gradient-to-r from-gray-500 to-gray-600'
                      }`}>
                        {message.isUser ? <User size={16} /> : <Bot size={16} />}
                      </div>
                      <Card className={`p-3 ${
                        message.isUser 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                          : 'bg-white text-gray-800 border border-gray-200'
                      }`}>
                        <p className="text-sm font-medium">{message.text}</p>
                      </Card>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-500 to-gray-600 flex items-center justify-center">
                        <Bot size={16} className="text-white" />
                      </div>
                      <Card className="p-3 bg-white border border-gray-200">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </Card>
                    </div>
                  </motion.div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Posez votre question..."
                  className="flex-1 text-gray-800 placeholder-gray-500 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  style={{ color: '#1f2937' }}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot 