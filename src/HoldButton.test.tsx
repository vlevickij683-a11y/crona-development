// @vitest-environment jsdom
import { beforeEach, afterEach, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import HoldButton from './bits/HoldButton';
beforeEach(()=>{
 vi.useFakeTimers({toFake:['setTimeout','clearTimeout','performance','requestAnimationFrame','cancelAnimationFrame']});
 vi.stubGlobal('ResizeObserver',class{observe(){} disconnect(){}});
});
afterEach(()=>{cleanup();vi.useRealTimers();vi.unstubAllGlobals();});
it('requires a complete hold and cancels early release',()=>{
 const navigate=vi.fn();render(<HoldButton holdTime={950} onHold={navigate}>Telegram</HoldButton>);
 const button=screen.getByRole('button',{name:/Telegram/});
 fireEvent.keyDown(button,{key:'Enter'});act(()=>vi.advanceTimersByTime(400));fireEvent.keyUp(button,{key:'Enter'});
 act(()=>vi.advanceTimersByTime(1200));expect(navigate).not.toHaveBeenCalled();
 fireEvent.keyDown(button,{key:'Enter'});act(()=>vi.advanceTimersByTime(1100));expect(navigate).toHaveBeenCalledTimes(1);
});
it('cancels a hold when the page loses focus',()=>{
 const navigate=vi.fn();render(<HoldButton holdTime={950} onHold={navigate}>Telegram</HoldButton>);
 fireEvent.keyDown(screen.getByRole('button',{name:/Telegram/}),{key:' '});act(()=>vi.advanceTimersByTime(300));fireEvent.blur(window);act(()=>vi.advanceTimersByTime(1200));expect(navigate).not.toHaveBeenCalled();
});

