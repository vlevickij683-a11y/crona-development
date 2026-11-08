// @vitest-environment jsdom
import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import App from './App';

vi.mock('./bits/ReflectiveCard',()=>({default:({children}:{children:import('react').ReactNode})=> <div>{children}</div>}));
vi.mock('./bits/TechText',()=>({default:()=> <span>CRONA.</span>}));
vi.mock('./bits/CRTWarp',()=>({default:()=> <div/>}));
vi.mock('./bits/ShapeGrid',()=>({default:()=> <div/>}));
vi.mock('./bits/Crosshair',()=>({default:()=> <div/>}));
beforeEach(()=>{
 localStorage.clear();sessionStorage.clear();
 Object.defineProperty(window,'matchMedia',{writable:true,value:vi.fn().mockImplementation((query:string)=>({matches:query.includes('reduced-motion'),media:query,addListener:vi.fn(),removeListener:vi.fn(),addEventListener:vi.fn(),removeEventListener:vi.fn(),dispatchEvent:vi.fn()}))});
 vi.stubGlobal('ResizeObserver',class{observe(){} unobserve(){} disconnect(){}});
 vi.stubGlobal('IntersectionObserver',class{observe(){} unobserve(){} disconnect(){}});
});
afterEach(()=>{cleanup();vi.unstubAllGlobals();});
describe('Crona visitor flows',()=>{
 it('switches all content and metadata to English and remembers the choice',()=>{
  render(<App/>);expect(document.documentElement.lang).toBe('ru');
  fireEvent.click(screen.getByRole('button',{name:'EN'}));
  expect(document.documentElement.lang).toBe('en');expect(localStorage.getItem('crona-lang')).toBe('en');
  expect(screen.getByRole('heading',{name:'Websites & web apps'})).toBeTruthy();
  expect(document.title).toBe('Crona Development — independent developer');
 });
 it('provides direct contacts and valid local section targets',()=>{
  render(<App/>);
  expect(screen.getByRole('link',{name:'wsesyki1337@gmail.com'}).getAttribute('href')).toBe('mailto:wsesyki1337@gmail.com');
  expect(screen.getByRole('link',{name:/@Kelsodod/}).getAttribute('href')).toBe('https://t.me/Kelsodod');
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(a=>expect(document.getElementById(a.hash.slice(1))).toBeTruthy());
 });
 it('opens the mobile menu and closes it with Escape, restoring focus',()=>{
  render(<App/>);const trigger=screen.getByRole('button',{name:'Меню'});
  fireEvent.click(trigger);expect(trigger.getAttribute('aria-expanded')).toBe('true');
  expect(document.activeElement?.closest('#mobile-menu')).toBeTruthy();
  fireEvent.keyDown(document,{key:'Escape'});expect(trigger.getAttribute('aria-expanded')).toBe('false');expect(document.activeElement).toBe(trigger);
 });
 it('shows the new budget and carousel controls',()=>{render(<App/>);expect(document.querySelector('.price')?.textContent).toContain('$30');expect(screen.getByRole('button',{name:/Удерживай/})).toBeTruthy();expect(screen.getByRole('button',{name:'Следующий этап'})).toBeTruthy();});
 it('honors the stored language and reduced motion on a new visit',()=>{
  localStorage.setItem('crona-lang','en');render(<App/>);
  expect(screen.queryByRole('button',{name:'Skip intro'})).toBeNull();
  expect(screen.getByRole('button',{name:'EN'}).getAttribute('aria-pressed')).toBe('true');
 });
});
