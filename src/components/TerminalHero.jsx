import React, { useState, useEffect, useRef } from 'react';

// The Windows PowerShell execution command
const COMMAND = '.\\init-portfolio.ps1';

// Real-world server boot logs
const bootLogs = [
    { text: '[ INFO ] Loading environment configuration from .env...', color: '#64d2ff', delay: 0 },
    { text: '[  OK  ] Validated JWT_SECRET and AUTH_KEYS.', color: '#16c60c', delay: 350 },
    { text: '[  OK  ] Started Node.js (v20.x) worker process. (PID: 14092)', color: '#16c60c', delay: 700 },
    { text: '[  OK  ] Initialized PHP-FPM FastCGI pool.', color: '#16c60c', delay: 1000 },
    { text: '[ INFO ] Establishing MySQL TCP connection on port 3306...', color: '#64d2ff', delay: 1350 },
    { text: '[  OK  ] Database connection established. (Ping: 18ms)', color: '#16c60c', delay: 1700 },
    { text: '[  OK  ] Mounted core REST API routes (/api/v1).', color: '#16c60c', delay: 2000 },
    { text: '[  OK  ] Initialized module: Driver Attendance System.', color: '#16c60c', delay: 2350 },
    { text: '[ INFO ] Hydrating React DOM tree...', color: '#64d2ff', delay: 2700 },
    { text: '[ WARN ] Source maps disabled (NODE_ENV=production).', color: '#f9f1a5', delay: 3000 },
    { text: '[  OK  ] Client-side bundle compiled successfully. (0.84s)', color: '#16c60c', delay: 3300 },
    { text: '', color: '', delay: 3600 },
    { text: '=========================================================', color: '#777', delay: 3750 },
    { text: '  BIJAY KUMAR BEHERA — SYSTEM ONLINE', color: '#b4009e', delay: 3900 },
    { text: '=========================================================', color: '#777', delay: 4050 },
];

const TerminalHero = ({ onComplete }) => {
    const [phase, setPhase] = useState('idle'); // idle | typing | booting | done
    const [inputValue, setInputValue] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const [logs, setLogs] = useState([]);
    const [glitchActive, setGlitchActive] = useState(false);
    
    const inputRef = useRef(null);
    const logsEndRef = useRef(null);

    // Cursor blink
    useEffect(() => {
        const id = setInterval(() => setShowCursor(c => !c), 530);
        return () => clearInterval(id);
    }, []);

    // Auto-scroll logs
    useEffect(() => {
        logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    // Boot sequence 
    useEffect(() => {
        if (phase !== 'booting') return;
        let timers = [];
        bootLogs.forEach((log, i) => {
            const t = setTimeout(() => {
                setLogs(prev => [...prev, log]);
                if (i === bootLogs.length - 1) {
                    setTimeout(() => {
                        setGlitchActive(true);
                        setTimeout(() => onComplete(), 800);
                    }, 600);
                }
            }, log.delay);
            timers.push(t);
        });
        return () => timers.forEach(clearTimeout);
    }, [phase, onComplete]);

    // Handle typing into the fake input
    useEffect(() => {
        if (phase !== 'typing') return;
        let i = 0;
        const id = setInterval(() => {
            setInputValue(COMMAND.slice(0, i + 1));
            i++;
            if (i === COMMAND.length) {
                clearInterval(id);
                setTimeout(() => setPhase('booting'), 500);
            }
        }, 80);
        return () => clearInterval(id);
    }, [phase]);

    const handleLaunch = () => {
        if (phase !== 'idle') return;
        setPhase('typing');
    };

    return (
        <div className="terminal-root" style={s.root} onClick={() => phase === 'idle' && inputRef.current?.focus()}>
            <div style={s.scanlines} />
            <div style={s.grid} />

            {/* Ambient Windows Blue/Purple glow */}
            <div style={{ ...s.orb, top: '-15%', left: '-10%', background: 'radial-gradient(circle, rgba(0, 120, 215, 0.15) 0%, transparent 65%)' }} />
            <div style={{ ...s.orb, bottom: '-20%', right: '-5%', width: '55vw', height: '55vw', background: 'radial-gradient(circle, rgba(180, 0, 158, 0.08) 0%, transparent 65%)' }} />

            <div className="terminal-wrapper" style={s.wrapper}>
                <div style={s.infoRow}>
                    <span style={s.infoTag}>BIJAY@DEV</span>
                    <span style={s.infoSep}>·</span>
                    <span style={s.infoTag}>FULL STACK ENGINEER</span>
                    <span style={s.infoSep}>·</span>
                    <span style={{ ...s.infoTag, color: '#16c60c' }}>● ONLINE</span>
                </div>

                <div style={{ ...s.terminal, ...(glitchActive ? s.glitch : {}) }}>
                    {/* Windows Title Bar */}
                    <div style={s.titleBar}>
                        <div style={s.titleTab}>
                            <span style={s.tabIcon}>&gt;_</span>
                            <span className="hide-mobile" style={s.titleText}>Windows PowerShell</span>
                            <span className="show-mobile" style={{...s.titleText, display: 'none'}}>PowerShell</span>
                        </div>
                        {/* Windows Window Controls */}
                        <div style={s.winControls}>
                            <div className="win-btn" style={s.winBtn}>&#x2014;</div>
                            <div className="win-btn" style={s.winBtn}>&#x25A1;</div>
                            <div className="win-btn win-close" style={s.winBtn}>&#x2715;</div>
                        </div>
                    </div>

                    <div className="terminal-body" style={s.body}>
                        <div className="log-text" style={{ color: '#cccccc', marginBottom: '15px' }}>
                            Windows PowerShell<br/>
                            Copyright (C) Microsoft Corporation. All rights reserved.<br/><br/>
                            Install the latest PowerShell for new features and improvements!
                        </div>

                        <div className="log-text" style={{ ...s.motd, marginBottom: '1.5rem' }}>
                            <span style={{ color: '#888' }}>Ready to deploy. Execute </span>
                            <span style={{ color: '#f9f1a5' }}>.\init-portfolio.ps1</span>
                            <span style={{ color: '#888' }}> to begin.</span>
                        </div>

                        <div style={s.logArea}>
                            {logs.map((log, i) => (
                                <div key={i} className="log-text" style={{ ...s.logLine, color: log.color || '#cccccc', marginBottom: log.text === '' ? '0.5rem' : '0.2rem' }}>
                                    {log.text}
                                </div>
                            ))}
                            <div ref={logsEndRef} />
                        </div>

                        {phase !== 'done' && (
                            <div className="prompt-text" style={s.promptRow}>
                                <span style={s.promptPath}>PS C:\Users\Bijay\Portfolio&gt;</span>
                                <span style={s.promptInput}>{inputValue}</span>
                                {(phase === 'idle' || phase === 'typing') && (
                                    <span style={{ ...s.caret, opacity: showCursor ? 1 : 0 }} />
                                )}
                            </div>
                        )}

                        {phase === 'idle' && (
                            <div style={s.btnRow}>
                                <button className="launch-btn" style={s.btn} onClick={handleLaunch}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.background = '#cccccc';
                                        e.currentTarget.style.color = '#0c0c0c';
                                        e.currentTarget.style.boxShadow = '0 0 20px rgba(204,204,204,0.3)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.color = '#cccccc';
                                        e.currentTarget.style.boxShadow = 'inset 0 0 0 1px #555';
                                    }}>
                                    EXECUTE SCRIPT
                                </button>
                                <p className="hint-text" style={s.hint}>or click the button to run</p>
                            </div>
                        )}
                    </div>
                </div>

                <div style={s.footer}>
                    <span className="footer-tag" style={s.footerTag}>React.js</span>
                    <span className="footer-tag" style={s.footerTag}>Node.js</span>
                    <span className="footer-tag" style={s.footerTag}>PHP</span>
                    <span className="footer-tag" style={s.footerTag}>MySQL</span>
                    <span className="footer-tag" style={s.footerTag}>REST API</span>
                </div>
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cascadia+Code:wght@300;400;600&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { background: #060609; }
                
                @keyframes flicker {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.95; }
                }
                
                /* Windows UI Hover Effects */
                .win-btn { transition: background 0.2s; }
                .win-btn:hover { background: rgba(255,255,255,0.1); }
                .win-close:hover { background: #e81123 !important; color: white !important; }

                @media (max-width: 768px) {
                    .terminal-wrapper { padding: 0 10px !important; }
                    .terminal-body { padding: 20px 15px 20px !important; min-height: 380px !important; }
                    .log-text { font-size: 11px !important; }
                    .prompt-text { font-size: 11px !important; flex-wrap: wrap; }
                    .launch-btn { padding: 12px 20px !important; font-size: 12px !important; width: 100%; text-align: center; }
                    .hint-text { text-align: center; width: 100%; margin-top: 5px; }
                    .footer-tag { font-size: 9px !important; padding: 4px 8px !important; }
                    .hide-mobile { display: none !important; }
                    .show-mobile { display: block !important; }
                }
            `}</style>
        </div>
    );
};

// Base Inline Styles targeting a modern Windows Terminal look
const s = {
    root: {
        height: '100vh',
        width: '100vw',
        background: '#060609',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Cascadia Code', 'Consolas', monospace",
        position: 'relative',
        overflow: 'hidden',
        animation: 'flicker 5s infinite',
    },
    scanlines: {
        position: 'absolute',
        inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)',
        pointerEvents: 'none',
        zIndex: 1,
    },
    grid: {
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
        zIndex: 0,
    },
    orb: {
        position: 'absolute',
        borderRadius: '50%',
        filter: 'blur(90px)',
        pointerEvents: 'none',
        zIndex: 0,
    },
    wrapper: {
        width: '100%',
        maxWidth: '880px',
        padding: '0 20px',
        position: 'relative',
        zIndex: 2,
    },
    infoRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '12px',
        justifyContent: 'center',
    },
    infoTag: {
        fontSize: '11px',
        letterSpacing: '2px',
        color: '#666',
        fontWeight: '600',
    },
    infoSep: { color: '#333', fontSize: '12px' },
    terminal: {
        background: 'rgba(12, 12, 12, 0.95)', // Classic Windows Terminal dark background
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px', // Slightly rounded for Windows 11 feel
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)',
        position: 'relative',
    },
    titleBar: {
        background: '#1c1c1c', // Dark title bar
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        userSelect: 'none',
    },
    titleTab: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 16px',
        background: 'rgba(12, 12, 12, 0.95)', // Active tab color
        borderTop: '2px solid #0078d7', // Windows blue accent
        borderRight: '1px solid rgba(255,255,255,0.05)',
    },
    tabIcon: {
        color: '#64d2ff',
        fontSize: '14px',
        marginRight: '8px',
        fontWeight: 'bold',
    },
    titleText: {
        fontSize: '12px',
        color: '#cccccc',
        fontFamily: "'Segoe UI', sans-serif", // Native Windows font for UI elements
    },
    winControls: {
        display: 'flex',
        height: '100%',
    },
    winBtn: {
        color: '#cccccc',
        fontSize: '12px',
        padding: '10px 16px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Segoe UI', sans-serif",
    },
    body: {
        padding: '24px 32px 32px',
        minHeight: '420px',
        display: 'flex',
        flexDirection: 'column',
    },
    motd: {
        fontSize: '13px',
        marginBottom: '6px',
        lineHeight: '1.6',
    },
    logArea: {
        flex: 1,
        marginBottom: '12px',
        maxHeight: '220px',
        overflowY: 'auto',
        scrollbarWidth: 'none',
    },
    logLine: {
        fontSize: '13px',
        lineHeight: '1.6',
    },
    promptRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        marginTop: '6px',
    },
    promptPath: {
        color: '#cccccc',
        fontWeight: 'bold',
    },
    promptInput: {
        color: '#f9f1a5', // Standard PowerShell yellow for commands
    },
    caret: {
        display: 'inline-block',
        width: '8px',
        height: '16px',
        background: '#cccccc',
        marginLeft: '2px',
        verticalAlign: 'middle',
    },
    btnRow: {
        marginTop: '28px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '10px',
    },
    btn: {
        background: 'transparent',
        color: '#cccccc',
        border: 'none',
        borderRadius: '4px',
        padding: '12px 28px',
        cursor: 'pointer',
        fontSize: '13px',
        fontFamily: "'Cascadia Code', monospace",
        fontWeight: '600',
        letterSpacing: '2px',
        boxShadow: 'inset 0 0 0 1px #555',
        transition: 'all 0.2s ease',
    },
    hint: {
        color: '#666',
        fontSize: '11px',
        letterSpacing: '1px',
    },
    footer: {
        display: 'flex',
        gap: '8px',
        justifyContent: 'center',
        marginTop: '16px',
        flexWrap: 'wrap',
    },
    footerTag: {
        fontSize: '10px',
        letterSpacing: '1px',
        color: '#555',
        border: '1px solid #1c1c1c',
        padding: '4px 10px',
        borderRadius: '4px',
    },
};

export default TerminalHero;