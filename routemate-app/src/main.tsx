import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="portfolio-demo-notice" role="note">체험판 · 코스·가격·티켓은 예시이며 실제 AI 분석·예약·결제가 실행되지 않습니다.</div>
    <App />
  </StrictMode>,
);
