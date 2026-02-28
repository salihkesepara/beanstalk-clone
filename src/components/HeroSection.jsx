import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Github, Globe, Settings, Plus, ChevronDown, Power, Clock, Zap, MessageSquare, X, Check, Calendar, Mail, Database, FileText, Layers } from 'lucide-react';

/* ═══════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════ */

const BEANSBOT_CENTER = { x: 335, y: 390 };
const NODE_W = 90; // px, width of node card
const NODE_H = 90; // px, height of node card
const HALF_W = NODE_W / 2;
const HALF_H = NODE_H / 2;

const DEFAULT_NODES = [
  { id: 'slack', label: 'Slack', x: 240, y: 80, hasBadge: true, badgeColor: 'bg-blue-500', badgeText: '9+', messages: 142, lastActive: '30s ago', removable: false },
  { id: 'terminal', label: 'Terminal', x: 130, y: 220, messages: 56, lastActive: 'Just now', removable: false },
  { id: 'github', label: 'GitHub', x: 420, y: 120, hasBadge: true, badgeColor: 'bg-primary', badgeText: '9+', messages: 235, lastActive: '1m ago', removable: false },
  { id: 'browser', label: 'Browser', x: 130, y: 430, messages: 89, lastActive: '1m ago', removable: false },
  { id: 'notion', label: 'Notion', x: 210, y: 560, messages: 34, lastActive: '3m ago', removable: false },
];

const ACTIVITY_POOL = [
  { icon: 'github', text: 'Issue #89 closed' },
  { icon: 'terminal', text: 'npm test completed' },
  { icon: 'github', text: 'PR #234 merged' },
  { icon: 'slack', text: '@tommy asked abo...' },
  { icon: 'notion', text: 'Meeting notes crea...' },
  { icon: 'terminal', text: 'Deploy script runni...' },
  { icon: 'github', text: 'New PR #235 open...' },
  { icon: 'browser', text: 'Screenshot capture...' },
  { icon: 'slack', text: 'Standup reminder...' },
  { icon: 'notion', text: 'Weekly report upda...' },
];

const AVAILABLE_CONNECTIONS = [
  { id: 'github', label: 'GitHub', desc: 'Issues, PRs, repos' },
  { id: 'notion', label: 'Notion', desc: 'Pages & databases' },
  { id: 'linear', label: 'Linear', desc: 'Tasks & projects' },
  { id: 'calendar', label: 'Calendar', desc: 'Events & scheduling' },
  { id: 'email', label: 'Email', desc: 'Messages & threads' },
  { id: 'database', label: 'Database', desc: 'Queries & tables' },
];
const AVAILABLE_CHANNELS = [
  { id: 'slack', label: 'Slack', desc: 'Team messaging' },
  { id: 'discord', label: 'Discord', desc: 'Community chat' },
  { id: 'teams', label: 'Teams', desc: 'Microsoft Teams' },
];
const AVAILABLE_SKILLS = [
  { id: 'browser', label: 'Browser', desc: 'Web scraping & screenshots' },
  { id: 'terminal', label: 'Terminal', desc: 'Shell commands' },
  { id: 'codemod', label: 'CodeMod', desc: 'Code refactoring' },
];

/* ═══════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════ */

const SlackIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.27 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.163 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.163 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.163 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.27a2.527 2.527 0 0 1-2.52-2.523 2.527 2.527 0 0 1 2.52-2.52h6.315A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.521h-6.315z" />
  </svg>
);
const NotionIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L18.28 2.09c-.467-.373-.98-.746-2.055-.653L3.31 2.557c-.466.046-.56.28-.373.466l1.522 1.185zM5.252 7.075v13.405c0 .747.373 1.027 1.213.98l14.523-.84c.84-.046.933-.559.933-1.166V6.222c0-.606-.233-.933-.746-.886l-15.177.886c-.56.047-.746.327-.746.853zM18.6 7.638c.094.42 0 .84-.42.886l-.7.14v9.917c-.607.327-1.167.514-1.633.514-.747 0-.934-.234-1.494-.934l-4.577-7.19v6.956l1.447.327s0 .84-1.167.84l-3.22.187c-.093-.187 0-.653.327-.746l.84-.234V9.272L6.87 9.132c-.094-.42.14-1.026.793-1.073l3.454-.233 4.763 7.283V8.85l-1.213-.14c-.094-.513.28-.886.746-.933l3.186-.14z" />
  </svg>
);
const LinearIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M3.357 7.18a10.225 10.225 0 0 0-.357 2.648c0 5.624 4.548 10.183 10.16 10.183.916 0 1.804-.122 2.648-.35L3.357 7.179zm1.21-1.86l13.107 13.123A10.134 10.134 0 0 0 22.16 12C22.16 6.376 17.612 1.817 12 1.817c-2.554 0-4.893.946-6.684 2.508l-.749-.749z" />
  </svg>
);

const getNodeIcon = (id) => {
  const map = { slack: <SlackIcon />, terminal: <Terminal size={20} />, github: <Github size={20} />, browser: <Globe size={20} />, notion: <NotionIcon />, linear: <LinearIcon />, calendar: <Calendar size={20} />, email: <Mail size={20} />, database: <Database size={20} />, discord: <Layers size={20} />, teams: <FileText size={20} />, codemod: <Terminal size={20} /> };
  return map[id] || <Globe size={20} />;
};
const getActivityIcon = (type) => {
  const map = { github: <Github size={14} className="text-white" />, terminal: <Terminal size={14} className="text-zinc-300" />, slack: <SlackIcon />, notion: <NotionIcon />, browser: <Globe size={14} className="text-blue-400" /> };
  return map[type] || <Globe size={14} className="text-zinc-400" />;
};

/* ═══════════════════════════════════════════
   ANIMATED EDGE — connects to exact node center
   ═══════════════════════════════════════════ */

const AnimatedEdge = ({ x1, y1, x2, y2, online, hovered, delay = 0, color = "#4ADE80" }) => {
  const dur = 2 + delay * 0.5;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={!online ? "rgba(255,255,255,0.06)" : hovered ? "rgba(74,222,128,0.5)" : "rgba(74,222,128,0.18)"}
        strokeWidth={hovered && online ? "2" : "1.5"}
        strokeDasharray={online ? "2 3" : "none"}
        style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }} />
      {online && (
        <motion.circle r={hovered ? "4" : "3"} fill={color} filter="url(#pulseGlow)"
          initial={{ opacity: 0 }}
          animate={{ cx: [x1, x2], cy: [y1, y2], opacity: [0, 1, 1, 0] }}
          transition={{ duration: hovered ? dur * 0.6 : dur, delay: delay * 0.8, repeat: Infinity, repeatDelay: hovered ? 0.5 : 1.5 + delay * 0.3, ease: "easeInOut" }} />
      )}
    </g>
  );
};

/* ═══════════════════════════════════════════
   DYNAMIC ACTIVITY PANEL — pinned to right edge
   ═══════════════════════════════════════════ */

const DynamicActivityPanel = ({ isOnline }) => {
  const [activities, setActivities] = useState(() =>
    ACTIVITY_POOL.slice(0, 4).map((a, i) => ({ ...a, id: i, time: 'Just now' }))
  );
  const counterRef = useRef(4);

  useEffect(() => {
    if (!isOnline) return;
    const interval = setInterval(() => {
      const poolItem = ACTIVITY_POOL[counterRef.current % ACTIVITY_POOL.length];
      counterRef.current++;
      setActivities(prev => {
        const updated = prev.map(a => ({ ...a, time: a.time === 'Just now' ? '1m ago' : a.time === '1m ago' ? '2m ago' : a.time }));
        return [{ ...poolItem, id: Date.now(), time: 'Just now' }, ...updated.slice(0, 3)];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isOnline]);

  return (
    <AnimatePresence>
      {isOnline && (
        <motion.div className="absolute z-20"
          style={{ right: -140, top: 50 }}
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.5 }}>
          <div className="rounded-xl bg-zinc-900/80 border border-white/10 backdrop-blur-sm p-3.5">
            <p className="text-[11px] font-semibold text-textMuted tracking-widest uppercase mb-2">Activity</p>
            <AnimatePresence mode="popLayout">
              {activities.map((item) => (
                <motion.div key={item.id} className="flex items-start gap-2.5 py-2"
                  initial={{ opacity: 0, x: 20, height: 0 }} animate={{ opacity: 1, x: 0, height: 'auto' }}
                  exit={{ opacity: 0, x: -20, height: 0 }} transition={{ duration: 0.3 }} layout>
                  <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
                    {getActivityIcon(item.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-white/80 truncate leading-tight">{item.text}</p>
                    <p className="text-[10px] text-textMuted mt-0.5">{item.time}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ═══════════════════════════════════════════
   CONNECTIONS PANEL
   ═══════════════════════════════════════════ */

const ConnectionsPanel = ({ isOpen, connectedIds, onAddNode }) => {
  const [activeTab, setActiveTab] = useState('connections');
  const tabs = [
    { id: 'connections', label: 'CONNECTIONS', items: AVAILABLE_CONNECTIONS },
    { id: 'channels', label: 'CHANNELS', items: AVAILABLE_CHANNELS },
    { id: 'skills', label: 'SKILLS', items: AVAILABLE_SKILLS },
  ];
  const currentTab = tabs.find(t => t.id === activeTab);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="absolute z-50" style={{ left: 340, top: 520 }}
          initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }} transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}>
          <div className="w-[280px] bg-zinc-900/95 border border-white/10 rounded-xl backdrop-blur-md shadow-2xl overflow-hidden">
            <div className="flex border-b border-white/10">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 text-[11px] font-semibold tracking-wider transition-colors ${activeTab === tab.id ? 'text-primary border-b-2 border-primary' : 'text-textMuted hover:text-white/70'
                    }`}>{tab.label}</button>
              ))}
            </div>
            <div className="max-h-[240px] overflow-y-auto">
              {currentTab.items.map(item => {
                const isConnected = connectedIds.includes(item.id);
                return (
                  <button key={item.id} onClick={() => !isConnected && onAddNode(item)}
                    className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${isConnected ? 'cursor-default' : 'hover:bg-white/5 cursor-pointer'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isConnected ? 'bg-primary/15 text-primary' : 'bg-zinc-700/50 text-zinc-400'}`}>
                      {getNodeIcon(item.id)}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className={`text-sm font-medium ${isConnected ? 'text-primary' : 'text-zinc-300'}`}>{item.label}</p>
                      <p className="text-[11px] text-textMuted">{item.desc}</p>
                    </div>
                    {isConnected && <Check size={18} className="text-primary shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ═══════════════════════════════════════════
   SATELLITE NODE — custom pointer drag
   ═══════════════════════════════════════════ */

const SatelliteNode = ({ node, index, isOnline, nodeEnabled, isHovered, isDragging, onHover, onLeave, onDragStart, onRemove, onToggleEnabled }) => {
  const isActive = isOnline && nodeEnabled;
  return (
    <div
      className="absolute select-none touch-none"
      style={{ left: 0, top: 0, width: NODE_W, height: NODE_H, zIndex: isDragging ? 50 : isHovered ? 30 : 5, cursor: isDragging ? 'grabbing' : 'grab' }}
      onMouseEnter={() => isActive && !isDragging && onHover(node.id)}
      onMouseLeave={() => onLeave()}
      onPointerDown={(e) => onDragStart(e, node.id)}
    >
      {/* Card with float animation — visual only, doesn't affect position */}
      <motion.div
        animate={isActive && !isHovered && !isDragging ? { y: [-4, 4, -4] } : { y: 0 }}
        transition={{ duration: 3 + (index % 5) * 0.3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className={`relative rounded-2xl backdrop-blur-sm flex flex-col items-center justify-center gap-1 transition-all duration-300 ${!isActive
          ? 'bg-zinc-800/70 border border-white/5 opacity-60 grayscale'
          : isHovered
            ? 'bg-zinc-900/90 border-[1.5px] border-primary shadow-[0_0_24px_rgba(74,222,128,0.3)] ring-1 ring-primary/30'
            : 'bg-zinc-900/90 border border-white/10 shadow-lg'
          }`} style={{ width: NODE_W, height: NODE_H }}>
          {node.removable && isActive && (
            <button onClick={(e) => { e.stopPropagation(); e.preventDefault(); onRemove(node.id); }}
              onPointerDown={(e) => e.stopPropagation()}
              className="absolute -top-2 -left-2 z-30 w-5 h-5 rounded-full bg-red-500/90 text-white hover:bg-red-400 flex items-center justify-center">
              <X size={10} strokeWidth={3} />
            </button>
          )}
          {isActive && node.hasBadge && (
            <span className={`absolute -top-2.5 -left-2.5 ${node.badgeColor} text-[10px] font-bold text-background rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-1 z-20`}>
              {node.badgeText}
            </span>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); e.preventDefault(); onToggleEnabled(node.id); }}
            onPointerDown={(e) => e.stopPropagation()}
            className={`absolute -top-2 -right-2 z-20 w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-500 cursor-pointer hover:scale-110 ${isActive ? 'bg-primary/90 text-background' : 'bg-zinc-700 text-zinc-500'
              }`}><Power size={10} strokeWidth={3} /></button>
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-500 ${isActive ? 'bg-primary/15 text-primary' : 'bg-zinc-700/30 text-zinc-500'
            }`}>{getNodeIcon(node.id)}</div>
          <span className={`text-[11px] font-medium ${isActive ? 'text-textMuted' : 'text-textMuted/30'}`}>{node.label}</span>
        </div>
      </motion.div>

      {/* Hover details — below card, doesn't affect position */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 flex flex-col items-center pointer-events-none whitespace-nowrap">
        <AnimatePresence>
          {isHovered && isActive && !isDragging && (
            <motion.div className="flex flex-col items-center gap-1 mt-1"
              initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.15 }}>
              <span className="text-[10px] text-primary/60 italic">Drag to move</span>
              <div className="flex items-center gap-2.5 bg-zinc-800/90 border border-white/10 rounded-lg px-3 py-1.5 backdrop-blur-sm">
                <div className="flex items-center gap-1">
                  <MessageSquare size={11} className="text-zinc-400" />
                  <span className="text-[11px] text-white/80 font-mono">{node.messages}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={11} className="text-zinc-400" />
                  <span className="text-[11px] text-white/80 font-mono">{node.lastActive}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */

const HeroSection = () => {
  const [nodes, setNodes] = useState(DEFAULT_NODES);
  const [isOnline, setIsOnline] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);
  const [beansbotHovered, setBeansbotHovered] = useState(false);
  const [plusMenuOpen, setPlusMenuOpen] = useState(false);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const [positions, setPositions] = useState(() =>
    Object.fromEntries(DEFAULT_NODES.map(n => [n.id, { x: n.x, y: n.y }]))
  );
  const [beansbotPos, setBeansbotPos] = useState({ x: 0, y: 0 });
  const [nodeEnabled, setNodeEnabled] = useState(() =>
    Object.fromEntries(DEFAULT_NODES.map(n => [n.id, true]))
  );
  const [dragId, setDragId] = useState(null);
  const dragRef = useRef(null);
  const containerRef = useRef(null);

  const toggleNodeEnabled = useCallback((id) => {
    setNodeEnabled(prev => ({ ...prev, [id]: !prev[id] }));
    setHoveredId(null);
  }, []);

  // ── Custom pointer drag ──
  const handlePointerDown = useCallback((e, nodeId) => {
    e.preventDefault();
    e.stopPropagation();
    const pos = nodeId === 'beansbot' ? beansbotPos : (positions[nodeId] || { x: 0, y: 0 });
    dragRef.current = { nodeId, startMouseX: e.clientX, startMouseY: e.clientY, startPosX: pos.x, startPosY: pos.y };
    setDragId(nodeId);
    setHoveredId(null);

    const onMove = (ev) => {
      if (!dragRef.current) return;
      const dx = ev.clientX - dragRef.current.startMouseX;
      const dy = ev.clientY - dragRef.current.startMouseY;

      if (dragRef.current.nodeId === 'beansbot') {
        // Constrain main node drag to a certain radius around center so it doesn't get lost
        const nx = dragRef.current.startPosX + dx;
        const ny = dragRef.current.startPosY + dy;
        const dist = Math.sqrt(nx * nx + ny * ny);
        const maxDist = 150;
        if (dist > maxDist) {
          const ratio = maxDist / dist;
          setBeansbotPos({ x: nx * ratio, y: ny * ratio });
        } else {
          setBeansbotPos({ x: nx, y: ny });
        }
      } else {
        setPositions(prev => ({
          ...prev,
          [dragRef.current.nodeId]: {
            x: dragRef.current.startPosX + dx,
            y: dragRef.current.startPosY + dy,
          }
        }));
      }
    };

    const onUp = () => {
      dragRef.current = null;
      setDragId(null);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }, [positions, beansbotPos]);

  const toggleOnline = useCallback(() => {
    setIsOnline(prev => !prev);
    setHoveredId(null);
    setPlusMenuOpen(false);
  }, []);

  const getCenter = useCallback((id) => {
    if (id === 'beansbot') return { x: BEANSBOT_CENTER.x + beansbotPos.x, y: BEANSBOT_CENTER.y + beansbotPos.y };
    const pos = positions[id];
    if (!pos) return BEANSBOT_CENTER;
    return { x: pos.x + HALF_W, y: pos.y + HALF_H };
  }, [positions, beansbotPos]);

  const addNode = useCallback((item) => {
    const angle = Math.random() * Math.PI * 2;
    const dist = 160 + Math.random() * 40;
    const nx = Math.max(20, Math.min(480, BEANSBOT_CENTER.x - HALF_W + Math.cos(angle) * dist));
    const ny = Math.max(20, Math.min(560, BEANSBOT_CENTER.y - HALF_H + Math.sin(angle) * dist));
    setNodes(prev => [...prev, { id: item.id, label: item.label, x: nx, y: ny, messages: 0, lastActive: 'Just now', removable: true }]);
    setPositions(prev => ({ ...prev, [item.id]: { x: nx, y: ny } }));
    setPlusMenuOpen(false);
  }, []);

  const removeNode = useCallback((id) => {
    setNodes(prev => prev.filter(n => n.id !== id));
    setPositions(prev => { const next = { ...prev }; delete next[id]; return next; });
    setHoveredId(null);
  }, []);

  const connectedIds = nodes.map(n => n.id);

  return (
    <section className="relative min-h-screen pt-28 pb-16 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.02]"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container relative z-10 mx-auto px-6 grid lg:grid-cols-[1fr_1.2fr] gap-8 items-center min-h-[calc(100vh-112px)]">

        {/* LEFT COLUMN */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono text-textMuted tracking-wider uppercase">Closed Beta</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08]">
            Spin up agents.<br />Watch them work.<br /><span className="text-primary">Stay in control.</span>
          </h1>
          <p className="text-lg text-textMuted mb-2 max-w-lg">Beanstalk is the command center for your <a href="#" className="text-primary hover:underline">Clawdbot</a> agents.</p>
          <p className="text-base text-textMuted/70 mb-2 max-w-lg">See what they're doing in real-time, manage multiple bots from one place, and start new ones from templates.</p>
          <p className="text-sm text-textMuted/50 mb-8">Agents run locally. Manage them from anywhere.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mb-3">
            <input type="email" placeholder="you@email.com" className="flex-1 px-4 py-3.5 rounded-xl bg-zinc-900/60 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" required />
            <button type="submit" className="px-6 py-3.5 rounded-xl bg-primary hover:bg-[#3ac16f] text-background font-semibold hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap text-sm transition-all">Join the waitlist</button>
          </form>
          <p className="text-xs text-textMuted/50 mb-8">No spam. Just an invite when it's your turn.</p>
          <div className="flex items-center gap-6 text-sm text-textMuted/70">
            <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Built by <a href="#" className="text-white/80 hover:text-white underline decoration-white/20 underline-offset-2">Toolbenders Labs</a></div>
            <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Your data stays local</div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN */}
        <div ref={containerRef} className="relative h-[700px] hidden lg:block overflow-visible" onClick={() => setPlusMenuOpen(false)}>

          {/* SVG edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0, overflow: 'visible' }}>
            <defs>
              <filter id="pulseGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                <feFlood floodColor="#4ADE80" floodOpacity="0.6" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="glow" />
                <feMerge><feMergeNode in="glow" /><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            {nodes.map((node, i) => {
              const nc = getCenter(node.id);
              const colors = ["#4ADE80", "#60A5FA", "#4ADE80", "#4ADE80", "#60A5FA", "#4ADE80", "#60A5FA"];
              const bc = getCenter('beansbot');
              return (
                <AnimatedEdge key={`edge-${node.id}`}
                  x1={bc.x} y1={bc.y} x2={nc.x} y2={nc.y}
                  online={isOnline && (nodeEnabled[node.id] !== false)} hovered={hoveredId === node.id} delay={i % 5} color={colors[i % colors.length]} />
              );
            })}
          </svg>

          {/* Hub dot */}
          <div className={`absolute w-3 h-3 rounded-full z-10 transition-colors duration-500 ${isOnline ? 'bg-primary' : 'bg-zinc-600'}`}
            style={{ left: BEANSBOT_CENTER.x + beansbotPos.x - 6, top: BEANSBOT_CENTER.y + beansbotPos.y - 50 }} />

          {/* SATELLITE NODES — positioned via transform for smooth drag */}
          {nodes.map((node, i) => {
            const pos = positions[node.id] || { x: node.x, y: node.y };
            return (
              <div key={node.id} className="absolute" style={{ transform: `translate(${pos.x}px, ${pos.y}px)`, left: 0, top: 0 }}>
                <SatelliteNode
                  node={node} index={i} isOnline={isOnline}
                  nodeEnabled={nodeEnabled[node.id] !== false}
                  isHovered={hoveredId === node.id}
                  isDragging={dragId === node.id}
                  onHover={setHoveredId} onLeave={() => setHoveredId(null)}
                  onDragStart={handlePointerDown}
                  onRemove={removeNode}
                  onToggleEnabled={toggleNodeEnabled}
                />
              </div>
            );
          })}

          {/* Beansbot Main Node Settings Modal */}
          <AnimatePresence>
            {settingsMenuOpen && (
              <motion.div className="absolute z-50 p-4 rounded-xl bg-[#222224] border border-white/5 shadow-2xl w-[320px]"
                style={{ left: BEANSBOT_CENTER.x + beansbotPos.x + 80, top: BEANSBOT_CENTER.y + beansbotPos.y - 100 }}
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[15px] font-bold text-white tracking-wide">Beansbot Settings</h3>
                  <button onClick={() => setSettingsMenuOpen(false)} className="text-zinc-400 hover:text-white transition-colors"><X size={16} /></button>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Complex Model</p>
                    <div className="relative">
                      <select className="w-full appearance-none bg-zinc-900 border border-white/5 rounded-lg py-2.5 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary/50 cursor-pointer">
                        <option>Claude Opus 4.5</option>
                        <option>GPT-4o</option>
                        <option>Gemini 1.5 Pro</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Simple Model</p>
                    <div className="relative">
                      <select className="w-full appearance-none bg-zinc-900 border border-white/5 rounded-lg py-2.5 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary/50 cursor-pointer">
                        <option>Claude Sonnet 4.5</option>
                        <option>GPT-4o-mini</option>
                        <option>Gemini 1.5 Flash</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Daily Spend Limit</p>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">$</span>
                      <input type="number" defaultValue="5.00" className="w-full bg-zinc-900 border border-white/5 rounded-lg py-2.5 pl-7 pr-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary/50" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Beansbot */}
          <div className="absolute z-10 touch-none select-none"
            style={{ left: BEANSBOT_CENTER.x + beansbotPos.x - 65, top: BEANSBOT_CENTER.y + beansbotPos.y - 75, cursor: dragId === 'beansbot' ? 'grabbing' : 'grab' }}
            onPointerDown={(e) => handlePointerDown(e, 'beansbot')}
            onMouseEnter={() => setBeansbotHovered(true)} onMouseLeave={() => setBeansbotHovered(false)}>
            <motion.div animate={isOnline && dragId !== 'beansbot' ? { y: [-4, 4, -4] } : { y: 0 }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <div className={`relative w-[130px] h-[150px] rounded-[24px] flex flex-col items-center justify-center pb-4 transition-all duration-300 ${!isOnline ? 'bg-zinc-800/80 border-2 border-white/10'
                : beansbotHovered || dragId === 'beansbot' ? 'bg-[#1e1e20] border-2 border-primary shadow-[0_0_50px_rgba(74,222,128,0.2)]'
                  : 'bg-[#1e1e20] border-2 border-primary/40 shadow-[0_0_40px_rgba(74,222,128,0.12)]'
                }`}>
                <button
                  onClick={(e) => { e.stopPropagation(); setSettingsMenuOpen(true); }}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="absolute top-3 left-3 w-8 h-8 rounded-full bg-zinc-800/50 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700/80 transition-colors cursor-pointer z-20">
                  <Settings size={14} />
                </button>
                <div className={`w-[70px] h-[60px] flex justify-center items-end mt-2 mb-1.5 transition-all duration-500`}>
                  <svg viewBox="0 0 100 100" className={`w-full h-full drop-shadow-md transition-all duration-500 ${!isOnline ? 'grayscale opacity-60' : ''}`}>
                    <defs>
                      <radialGradient id="beanGrad" cx="40%" cy="30%" r="60%">
                        <stop offset="0%" stopColor="#d98c63" />
                        <stop offset="70%" stopColor="#a35732" />
                        <stop offset="100%" stopColor="#68341b" />
                      </radialGradient>
                      <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(0,0,0,0.6)" />
                        <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                      </radialGradient>
                    </defs>
                    <ellipse cx="50" cy="90" rx="35" ry="8" fill="url(#shadowGrad)" opacity={isOnline && dragId !== 'beansbot' ? 0.4 : 0.8} />
                    <g className={isOnline && dragId !== 'beansbot' ? "origin-bottom" : ""} style={{ transform: isOnline && dragId !== 'beansbot' ? 'translateY(0px)' : 'translateY(4px)' }}>
                      <path d="M50 15 C75 15, 85 40, 80 65 C75 90, 25 90, 20 65 C15 40, 25 15, 50 15" fill="url(#beanGrad)" stroke="#4a2512" strokeWidth="2" />
                      {/* Left sunglasses lens */}
                      <path d="M28 42 C30 40, 42 40, 48 42 C48 48, 42 52, 32 52 C28 50, 28 42, 28 42 Z" fill="#111" />
                      {/* Right sunglasses lens */}
                      <path d="M52 42 C58 40, 70 40, 72 42 C72 42, 72 50, 68 52 C58 52, 52 48, 52 42 Z" fill="#111" />
                      {/* Bridge */}
                      <path d="M48 42 Q50 40 52 42" fill="none" stroke="#222" strokeWidth="2" />
                      {/* Arms */}
                      <path d="M28 42 Q20 38 18 42" fill="none" stroke="#222" strokeWidth="2" />
                      <path d="M72 42 Q80 38 82 42" fill="none" stroke="#222" strokeWidth="2" />
                      {/* Little mouth */}
                      <path d="M45 60 Q50 65 55 60" fill="none" stroke="#4a2512" strokeWidth="2" strokeLinecap="round" />
                    </g>
                  </svg>
                </div>
                <span className={`text-[13px] tracking-wide font-medium mb-2 ${isOnline ? 'text-white' : 'text-zinc-400'}`}>{isOnline ? 'Beansbot' : 'Offline'}</span>
                <button onClick={(e) => { e.stopPropagation(); toggleOnline(); }}
                  className={`relative w-11 h-6 rounded-full flex items-center px-0.5 cursor-pointer transition-colors duration-500 ${isOnline ? 'bg-primary/80' : 'bg-zinc-600'}`}>
                  <motion.div className="w-5 h-5 rounded-full bg-white shadow-md" animate={{ x: isOnline ? 20 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} />
                </button>
              </div>
            </motion.div>
          </div>
          {/* Beansbot hover popup */}
          <AnimatePresence>
            {beansbotHovered && (
              <motion.div className="absolute left-[120px] top-[10px] z-40"
                initial={{ opacity: 0, x: -8, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -8, scale: 0.95 }} transition={{ duration: 0.2 }}>
                <div className={`border rounded-xl p-4 backdrop-blur-md min-w-[200px] ${isOnline ? 'bg-zinc-800/95 border-primary/30 shadow-[0_0_30px_rgba(74,222,128,0.1)]' : 'bg-zinc-800/95 border-white/10'
                  }`}>
                  <h4 className="text-sm font-semibold text-white mb-3">Agent Status</h4>
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-6">
                      <div className="flex items-center gap-2 text-xs text-textMuted"><Power size={12} /><span>Status</span></div>
                      <span className={`text-xs font-mono ${isOnline ? 'text-primary' : 'text-zinc-500'}`}>{isOnline ? 'Online' : 'Offline'}</span>
                    </div>
                    {isOnline && (<>
                      <div className="flex items-center justify-between gap-6">
                        <div className="flex items-center gap-2 text-xs text-textMuted"><Zap size={12} /><span>Sessions</span></div>
                        <span className="text-xs font-mono text-primary">3 active</span>
                      </div>
                      <div className="flex items-center justify-between gap-6">
                        <div className="flex items-center gap-2 text-xs text-textMuted"><Clock size={12} /><span>Last active</span></div>
                        <span className="text-xs font-mono text-zinc-400">2m ago</span>
                      </div>
                    </>)}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Plus Button */}
          <motion.div className="absolute" style={{ left: 380, top: 490 }}
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8, duration: 0.4, ease: "backOut" }}>
            <motion.div animate={isOnline ? { y: [-3, 3, -3] } : { y: 0 }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
              <div onClick={(e) => { e.stopPropagation(); isOnline && setPlusMenuOpen(p => !p); }}
                className={`w-11 h-11 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-300 ${plusMenuOpen ? 'bg-primary/20 border-primary/50' : isOnline ? 'bg-zinc-800/80 border-white/10 hover:border-primary/50' : 'bg-zinc-800/50 border-white/5'
                  }`} style={{ transform: plusMenuOpen ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.3s' }}>
                <Plus size={18} className={`transition-colors ${plusMenuOpen ? 'text-primary' : isOnline ? 'text-zinc-400' : 'text-zinc-600'}`} />
              </div>
            </motion.div>
          </motion.div>

          <ConnectionsPanel isOpen={plusMenuOpen} connectedIds={connectedIds} onAddNode={addNode} />
          <DynamicActivityPanel isOnline={isOnline} />

          {/* Bottom Status Card */}
          <AnimatePresence>
            {isOnline && (
              <motion.div className="absolute right-[10px] bottom-[20px] w-[250px]"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.5 }}>
                <div className="rounded-xl bg-zinc-900/80 border border-white/10 backdrop-blur-sm py-3 px-4 flex items-center gap-3">
                  <div className="flex items-center gap-2 shrink-0"><span className="w-2 h-2 rounded-full bg-primary animate-pulse" /><Terminal size={14} className="text-zinc-400" /></div>
                  <p className="text-xs text-white/80 truncate flex-1">Posting summary to #dev</p>
                  <div className="w-16 h-2.5 rounded-full bg-zinc-800 overflow-hidden shrink-0">
                    <motion.div className="h-full bg-primary rounded-full" initial={{ width: "0%" }} animate={{ width: "65%" }} transition={{ delay: 2, duration: 2, ease: "easeOut" }} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Offline tooltip */}
          <AnimatePresence>
            {!isOnline && (
              <motion.div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 z-20"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.4, delay: 0.2 }}>
                <div className="bg-zinc-700/90 text-zinc-300 text-sm px-5 py-2.5 rounded-xl backdrop-blur-sm border border-white/5">Toggle the switch to bring the agent online</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
        <span className="text-xs text-textMuted/50">Scroll to explore</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown size={18} className="text-primary/60" />
        </motion.div>
      </motion.div>
      <div className="vignette-bottom absolute bottom-0 left-0 right-0 h-64 pointer-events-none" />
    </section >
  );
};

export default HeroSection;
