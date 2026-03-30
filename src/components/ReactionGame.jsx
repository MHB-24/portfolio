import { useState, useRef, useCallback, useEffect } from 'react';
import styles from './ReactionGame.module.css';
import comment3 from '../assets/comment3.svg';

const COLORS = {
  idle:    '#F82711',
  waiting: '#FFB514',
  go:      '#60A700',
  result:  '#60A700',
};

function SignalSVG({ color }) {
  return (
    <svg width="155" height="55" viewBox="0 0 155 55" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_825_39025)">
        <path fillRule="evenodd" clipRule="evenodd" d="M42.5501 0.353097L11.8017 0.353099L8.54382 0.353099C4.72479 0.353099 1.59766 3.48568 1.59766 7.29927L1.59766 47.4835C1.59766 51.3026 4.73024 54.4297 8.54382 54.4297L11.8017 54.4297L42.5937 54.4297L52.7596 54.4297L52.7596 0.353097L42.5501 0.353097Z" fill="#4D4D4D"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M52.7598 0.353516L52.7598 54.4355L62.9638 54.4355L93.7558 54.4355L103.965 54.4355L103.965 0.353513L93.7558 0.353514L62.9638 0.353515L52.7598 0.353516Z" fill="#4D4D4D"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M103.965 0.353099L103.965 54.4297L114.174 54.4297L144.966 54.4297L148.224 54.4297C152.043 54.4297 155.17 51.2971 155.17 47.4835L155.17 37.5791L155.17 17.2091L155.17 7.30472C155.17 3.48569 152.038 0.35855 148.224 0.35855L144.966 0.358551L114.174 0.358552L103.965 0.353099Z" fill="#4D4D4D"/>
        <path d="M51.7734 0.358963L51.7734 54.4355L53.7456 54.4355L53.7456 0.358963L51.7734 0.358963Z" fill="#313131"/>
        <path d="M102.979 0.358963L102.979 54.4355L104.951 54.4355L104.951 0.358963L102.979 0.358963Z" fill="#313131"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M47.2944 24.0407C47.2944 24.7271 47.2508 25.37 47.2072 26.0564L47.1201 26.9553H46.134L46.0468 26.0564C45.1479 17.4377 37.8531 10.8729 29.1472 10.8729C20.4849 10.8729 13.152 17.4323 12.2476 26.0564L12.1604 26.9553H11.1743L11.0872 26.0564C11 25.37 11 24.7271 11 24.0407C11 13.5315 18.6762 5 29.1853 5C39.6182 5 47.2944 13.537 47.2944 24.0407Z" fill="#333333"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M47.6118 27.3697C47.6118 17.4217 39.5488 9.35873 29.6008 9.35873C19.6528 9.35873 11.5898 17.4217 11.5898 27.3697C11.5898 37.3177 19.6528 45.3807 29.6008 45.3807C39.5488 45.3862 47.6118 37.3232 47.6118 27.3697Z" fill={color}/>
        <path fillRule="evenodd" clipRule="evenodd" d="M99.2944 25.0408C99.2944 25.7273 99.2508 26.3701 99.2072 27.0566L99.1201 27.9555H98.134L98.0468 27.0566C97.1479 18.4379 89.8531 11.8731 81.1472 11.8731C72.4849 11.8731 65.152 18.4324 64.2476 27.0566L64.1604 27.9555H63.1743L63.0872 27.0566C63 26.3701 63 25.7273 63 25.0408C63 14.5317 70.6762 6.00017 81.1853 6.00017C91.6182 5.95658 99.2944 14.4936 99.2944 25.0408Z" fill="#333333"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M99.022 27.3699C99.022 17.4219 90.959 9.35886 81.011 9.35886C71.063 9.35886 63 17.4219 63 27.3699C63 37.3179 71.063 45.3809 81.011 45.3809C90.959 45.3863 99.022 37.3233 99.022 27.3699Z" fill={color}/>
        <path fillRule="evenodd" clipRule="evenodd" d="M150.284 24.0407C150.284 24.7271 150.24 25.37 150.196 26.0564L150.109 26.9553C149.635 17.4323 141.79 9.79967 132.142 9.79967C122.493 9.79967 114.599 17.3887 114.174 26.9553L114.087 26.0564C114 25.37 114 24.7271 114 24.0407C114 13.5315 121.676 5 132.185 5C142.607 5 150.284 13.537 150.284 24.0407Z" fill="#333333"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M149.979 27.3699C149.979 17.4219 141.916 9.35886 131.968 9.35886C122.02 9.35886 113.957 17.4219 113.957 27.3699C113.957 37.3179 122.02 45.3809 131.968 45.3809C141.916 45.3863 149.979 37.3233 149.979 27.3699Z" fill={color}/>
      </g>
      <defs>
        <clipPath id="clip0_825_39025">
          <rect width="55" height="155" fill="white" transform="translate(2.40413e-06 55) rotate(-90)"/>
        </clipPath>
      </defs>
    </svg>
  );
}

export default function ReactionGame() {
  const [phase, setPhase] = useState('idle');
  const [ms, setMs] = useState('0.000');
  const [best, setBest] = useState(null);
  const [tries, setTries] = useState(0);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  const record = useCallback(() => {
    const elapsed = ((performance.now() - startTimeRef.current) / 1000).toFixed(3);
    setMs(elapsed);
    setBest(prev => prev === null || parseFloat(elapsed) < parseFloat(prev) ? elapsed : prev);
    setTries(prev => prev + 1);
    setPhase('result');
  }, []);

  // Listen for any click on the section when green
  useEffect(() => {
    if (phase !== 'go') return;
    const section = document.getElementById('contact');
    if (!section) return;
    section.addEventListener('click', record);
    return () => section.removeEventListener('click', record);
  }, [phase, record]);

  const handleStart = useCallback(() => {
    setPhase('waiting');
    const delay = 1500 + Math.random() * 3500;
    timerRef.current = setTimeout(() => {
      setPhase('go');
      startTimeRef.current = performance.now();
    }, delay);
  }, []);

  const handleTryAgain = useCallback(() => {
    clearTimeout(timerRef.current);
    setMs('0.000');
    setPhase('waiting');
    const delay = 1500 + Math.random() * 3500;
    timerRef.current = setTimeout(() => {
      setPhase('go');
      startTimeRef.current = performance.now();
    }, delay);
  }, []);

  return (
    <div className={styles.wrap}>
      <p className={styles.title}>Think you're fast?</p>
      <p className={styles.sub}>Wait for the signal, then click instantly. ⚡</p>

      <div className={styles.signalWrap}>
        <SignalSVG color={COLORS[phase]} />
      </div>

      <p className={styles.result}>{ms} s</p>
      <p className={styles.best} style={{ visibility: best ? 'visible' : 'hidden' }}>
        Best: {best ?? '0.000'} s
      </p>

      <button
        className={styles.btn}
        style={{ visibility: (phase === 'waiting' || phase === 'go') ? 'hidden' : 'visible' }}
        onClick={phase === 'idle' ? handleStart : handleTryAgain}
      >
        {phase === 'result' ? 'Try again' : 'Start'}
      </button>

      <div className={styles.nudge} style={{ visibility: tries >= 3 ? 'visible' : 'hidden' }}>
        <p className={styles.nudgeText}>Still interacting?</p>
        <img src={comment3} alt="" className={styles.nudgeImg} />
      </div>
    </div>
  );
}
