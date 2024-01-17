import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css'; // require 'css global'
import { register } from 'swiper/element/bundle';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';

register();

const root = createRoot(document.querySelector('#root'));
root.render(<App />);