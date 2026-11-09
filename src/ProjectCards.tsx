import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { ArrowUpRight, Check, FlaskConical } from 'lucide-react';
import ReflectiveCard from './bits/ReflectiveCard';
import type { Lang } from './content';

export default function ProjectCards({lang}:{lang:Lang}){
 const ru=lang==='ru';const reduce=useReducedMotion();
 const [fine,setFine]=useState(()=>window.matchMedia('(hover: hover) and (pointer: fine)').matches);
 useEffect(()=>{const q=window.matchMedia('(hover: hover) and (pointer: fine)');const update=()=>setFine(q.matches);q.addEventListener('change',update);return()=>q.removeEventListener('change',update);},[]);
 const projects=[{
  key:'atelier',title:'Crona Atelier',status:ru?'Готовый проект':'Completed project',
  description:ru?'Готовый сайт в портфолио Crona. Открой проект, чтобы посмотреть результат.':'A completed website in the Crona portfolio. Open the project to explore the result.',
  tags:ru?['Веб-сайт','Завершён']:['Website','Completed'],
  link:'https://vlevickij683-a11y.github.io/crona-atelier/',action:ru?'Посмотреть сайт':'View website',
  note:ru?'Открытый демонстрационный проект.':'A publicly available demo project.'
 },{
  key:'playground',title:'Crona Playground',status:ru?'В разработке':'In development',
  description:ru?'Примерь свой будущий сайт: здесь можно будет менять расположение баннеров и кнопок, подбирать фон и анимации на основе React Bits. Для клиентов и всех, кому интересно попробовать дизайн.':'Try out your next website: rearrange banners and buttons, choose backgrounds and explore animations powered by React Bits. For clients and anyone curious about design.',
  tags:ru?['Конструктор','Фоны и анимации']:['Website builder','Backgrounds & motion'],
  link:'https://vlevickij683-a11y.github.io/crona-playground/',action:ru?'Открыть Playground':'Open Playground',
  note:ru?'Экспериментальный проект в разработке.':'An experimental project still in development.'
 }];
 return <section className="project-gallery" aria-labelledby="projects-heading"><div className="section-label" id="projects-heading">{ru?'ПРОЕКТЫ / CRONA':'PROJECTS / CRONA'}</div><div className="project-tiles">{projects.map((p,i)=><ReflectiveCard key={p.key} width="100%" height="100%" radius={32} theme="dark" blurStrength={0} roughness={0.1} grayscale={0} warp={0} tiltStrength={17} bevel={3.5} warpScale={1.7} webcam={false} enableTilt={fine&&!reduce} intro={!reduce} tint="#b78cea" className={`project-reflection project-${p.key}`}>
  <article className="project-tile" aria-labelledby={`${p.key}-heading`}>
   <div className="project-cover" aria-hidden="true">{i===0?<img src={`${import.meta.env.BASE_URL}atelier-cover.png`} alt="" loading="lazy" decoding="async"/>:<div className="project-cat"/>}<span className="project-index">0{i+1} / CRONA</span></div>
   <div className="project-details"><span className={`project-badge ${i===0?'is-ready':''}`}>{i===0?<Check size={13}/>:<FlaskConical size={13}/>} {p.status}</span><h2 id={`${p.key}-heading`}>{p.title}</h2><p>{p.description}</p><ul className="project-tags">{p.tags.map(tag=><li key={tag}>{tag}</li>)}</ul><a className="button secondary project-open" href={p.link} target="_blank" rel="noopener noreferrer" aria-describedby={`${p.key}-note`}>{p.action}<ArrowUpRight size={18}/></a><p className="project-note" id={`${p.key}-note`}>{p.note}</p></div>
  </article>
 </ReflectiveCard>)}</div></section>;
}
