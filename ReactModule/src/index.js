import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/index.css' // require 'css global'

const root = createRoot(document.querySelector('#root'));
root.render(<App />);