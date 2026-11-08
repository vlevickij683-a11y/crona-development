import { ArrowUpRight, PanelsTopLeft, SlidersHorizontal, MousePointer2 } from 'lucide-react';
import type { Lang } from './content';

const copy = {
 ru: {
  status:'В разработке', label:'CRONA PLAYGROUND', title:'Примерь свой будущий сайт.',
  description:'Конструктор для клиентов и всех, кому интересно попробовать дизайн. Здесь можно будет собрать мини-сайт: менять расположение баннеров и кнопок, подбирать фон и анимации на основе React Bits.',
  action:'Открыть Playground', warning:'Пока не готов к публичному запуску. Доступ сейчас ограничен — ссылка может запросить вход или разрешение.',
  tags:['Компоновка блоков','Фоны и анимации','Свой вариант сайта']
 },
 en: {
  status:'In development', label:'CRONA PLAYGROUND', title:'Try out your next website.',
  description:'A builder for clients and anyone curious about design. You’ll be able to assemble a mini website: rearrange banners and buttons, choose backgrounds and explore animations powered by React Bits.',
  action:'Open Playground', warning:'Not ready for public launch yet. Access is currently restricted — the link may require sign-in or permission.',
  tags:['Block layouts','Backgrounds & motion','Your own website concept']
 }
};
export default function PlaygroundCard({lang}:{lang:Lang}){
 const t=copy[lang];
 return <aside className="playground-card" aria-labelledby="playground-title">
  <div className="playground-copy">
   <div className="playground-heading"><span className="section-label">{t.label}</span><span className="playground-status"><span/>{t.status}</span></div>
   <h2 id="playground-title">{t.title}</h2>
   <p>{t.description}</p>
   <ul className="playground-features">{t.tags.map(tag=><li key={tag}>{tag}</li>)}</ul>
   <a className="button secondary playground-link" href="https://crona-playground.silestisl.chatgpt.site/" target="_blank" rel="noopener noreferrer" aria-describedby="playground-warning">{t.action}<ArrowUpRight size={18}/></a>
   <p id="playground-warning" className="playground-warning">{t.warning}</p>
  </div>
  <div className="playground-preview" aria-hidden="true">
   <div className="playground-toolbar"><PanelsTopLeft size={15}/><span>playground / canvas</span><SlidersHorizontal size={15}/></div>
   <div className="playground-canvas"><div className="playground-mini-nav"/><div className="playground-selected"><span>YOUR NEXT<br/><em>BIG IDEA.</em></span><i/><i/><i/><i/></div><div className="playground-mini-button"/><div className="playground-mini-grid"><span/><span/><span/></div><MousePointer2 className="playground-pointer" size={24}/><span className="playground-preview-label">LAYOUT · COLOR · MOTION</span></div>
  </div>
 </aside>;
}
