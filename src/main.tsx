import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { trackVisitor } from './lib/tracker'

// Fire visitor tracker silently — does not block rendering
trackVisitor();

createRoot(document.getElementById("root")!).render(<App />);
