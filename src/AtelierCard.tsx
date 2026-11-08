import { ArrowUpRight, Check } from 'lucide-react';
import type { Lang } from './content';

export default function AtelierCard({lang}:{lang:Lang}){
 const ru=lang==='ru';
 return <section className="atelier-portfolio" aria-labelledby="portfolio-heading">
  <div className="section-label" id="portfolio-heading">{ru?'ПОРТФОЛИО / ГОТОВЫЕ ПРОЕКТЫ':'PORTFOLIO / COMPLETED PROJECTS'}</div>
  <article className="atelier-card">
   <div className="atelier-art" aria-hidden="true"><span className="atelier-art-top">CRONA / SELECTED PROJECT</span><div className="atelier-art-orbit"/><div className="atelier-art-title">atelier<span>by crona.</span></div><span className="atelier-art-bottom">DIGITAL EXPERIENCE ↗</span></div>
   <div className="atelier-copy">
    <span className="atelier-status"><Check size={13}/>{ru?'Готовый проект':'Completed project'}</span>
    <h2>Crona Atelier</h2>
    <p>{ru?'Новый сайт в портфолио Crona. Проект завершён — открой его, чтобы посмотреть результат.':'A new website in the Crona portfolio. The project is complete — open it to explore the result.'}</p>
    <a className="button secondary" href="https://crona-atelier.silestisl.chatgpt.site/" target="_blank" rel="noopener noreferrer">{ru?'Посмотреть сайт':'View website'}<ArrowUpRight size={18}/></a>
    <p className="atelier-access">{ru?'Для просмотра может потребоваться вход в ChatGPT.':'Viewing may require signing in to ChatGPT.'}</p>
   </div>
  </article>
 </section>;
}
