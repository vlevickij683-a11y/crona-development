import { useEffect, useState, type CSSProperties } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Send, ArrowUpRight } from 'lucide-react';
import HoldButton from './bits/HoldButton';
import Carousel from './bits/Carousel';
import ShapeBlur from './bits/ShapeBlur';
import logo from './logo-paths.json';
import type { Lang } from './content';

export function useCompact(){
 const [compact,setCompact]=useState(()=>window.matchMedia('(max-width: 700px)').matches);
 useEffect(()=>{const q=window.matchMedia('(max-width: 700px)');const change=()=>setCompact(q.matches);q.addEventListener('change',change);return()=>q.removeEventListener('change',change);},[]);
 return compact;
}
export function LogoAssembly(){
 const offsets=[[-120,-130],[-140,75],[30,160],[150,25]];
 return <svg className="assembled-logo" viewBox="100 160 1060 1010" role="img" aria-label="Crona"><defs><linearGradient id="metal" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#18181e"/><stop offset=".4" stopColor="#34333e"/><stop offset=".48" stopColor="#8e8c99"/><stop offset=".53" stopColor="#44434e"/><stop offset=".65" stopColor="#1c1b23"/><stop offset="1" stopColor="#33313b"/><animateTransform attributeName="gradientTransform" type="translate" values="-1 -1;1 1;-1 -1" dur="3s" repeatCount="indefinite"/></linearGradient><linearGradient id="logoPurple" x2="1" y2="1"><stop stopColor="#783bff"/><stop offset="1" stopColor="#521cff"/></linearGradient></defs><motion.path d={logo.metal} fill="url(#metal)" fillRule="evenodd" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2,duration:.55}}/>{logo.parts.map((d,i)=><motion.path key={i} d={d} fill="url(#logoPurple)" initial={{x:offsets[i][0],y:offsets[i][1],opacity:0,rotate:(i%2?1:-1)*18}} animate={{x:0,y:0,opacity:1,rotate:0}} transition={{delay:.15+i*.14,duration:1.05,type:'spring',damping:19,stiffness:85}} style={{transformOrigin:'627px 680px'}}/>)}</svg>;
}
export function AboutLogo(){
 const reduce=useReducedMotion();
 const compact=useCompact();
 const [ready,setReady]=useState(false);
 return <div className={`about-logo ${ready?'blur-ready':''}`} role="img" aria-label="Crona">
  <svg className="about-logo-parts" viewBox="0 0 1254 1254" aria-hidden="true">
   {logo.parts.map((d,i)=><path key={i} d={d} fill="#6428ff" style={{'--part-delay':`${[0,3.6,2.4,1.2][i]}s`, '--impulse-x':`${[18,18,-24,-24][i]}px`, '--impulse-y':`${[24,-24,-18,18][i]}px`} as CSSProperties}/>)}
  </svg>
  {!compact&&!reduce&&<ShapeBlur src={`${import.meta.env.BASE_URL}crona-vector.svg`} size={0.63} thickness={0.5} roundness={0.35} lensSize={0.22} fill color="#6428ff" blur={16} idle={false} onReady={()=>setReady(true)} className="about-logo-blur"/>}
 </div>;
}
export function TelegramHold({lang}:{lang:Lang}){
 const go=()=>window.location.assign('https://t.me/Kelsodod');
 return <div className="telegram-hold"><HoldButton holdTime={950} size="lg" fillColor="#7740c5" backgroundColor="#eee6d7" textColor="#20152b" fillTextColor="#fff4e5" icon={<Send size={19}/>} doneIcon={<ArrowUpRight size={19}/>} doneLabel={lang==='ru'?'Открываю Telegram…':'Opening Telegram…'} onHold={go} hint={lang==='ru'?'Удерживай около секунды, чтобы открыть Telegram':'Hold for about a second to open Telegram'}>{lang==='ru'?'Удерживай → Telegram':'Hold → Telegram'}</HoldButton><a href="https://t.me/Kelsodod" className="telegram-direct" target="_blank" rel="noreferrer">@Kelsodod <ArrowUpRight size={13}/></a></div>;
}
export function ProcessCarousel({steps,lang}:{steps:string[][],lang:Lang}){
 const compact=useCompact(); const reduce=useReducedMotion();
 return <div className="process-carousel"><Carousel lang={lang} baseWidth="100%" aspectRatio={compact?1:2.4} peek={compact?20:140} gap={compact?12:28} radius={20} frame={false} effect={reduce?'fade':'tilt'} indicator="bars" arrows autoplay={false} loop={false} items={steps.map(([title,desc],i)=><div className="process-panel" key={i}><div className="process-panel-top"><span>{i+1} / 4</span><span>{lang==='ru'?'ОТ ИДЕИ ДО ЗАПУСКА':'FROM IDEA TO LAUNCH'}</span></div><div className="process-panel-body"><span className="panel-number">{i+1}</span><div><h3>{title}</h3><p>{desc}</p></div></div></div>)}/></div>;
}
