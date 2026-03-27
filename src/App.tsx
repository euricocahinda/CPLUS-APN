/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Globe, 
  Zap, 
  Settings, 
  Signal, 
  Cpu, 
  Activity, 
  ChevronRight, 
  Copy, 
  Check,
  Menu,
  X,
  RefreshCw,
  Lock,
  Wifi
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ConnectionStatus, Server, Payload } from './types';

const SERVERS: Server[] = [
  { id: '1', name: 'Premium Angola 01', country: 'Angola', flag: '🇦🇴', latency: 45, load: 12, ip: '197.231.0.1' },
  { id: '2', name: 'Cloud Gaming Luanda', country: 'Angola', flag: '🇦🇴', latency: 38, load: 45, ip: '197.231.0.5' },
  { id: '3', name: 'USA - New York Fast', country: 'USA', flag: '🇺🇸', latency: 180, load: 20, ip: '104.21.45.12' },
  { id: '4', name: 'Germany - Frankfurt', country: 'Germany', flag: '🇩🇪', latency: 145, load: 35, ip: '172.67.13.4' },
  { id: '5', name: 'Brazil - São Paulo', country: 'Brazil', flag: '🇧🇷', latency: 120, load: 15, ip: '104.26.2.1' },
];

const PAYLOADS: Payload[] = [
  { 
    id: 'p1', 
    name: 'Unitel Free Social', 
    network: 'Unitel', 
    content: 'CONNECT [host_port] [protocol][crlf]Host: m.facebook.com[crlf]X-Online-Host: m.facebook.com[crlf]Connection: Keep-Alive[crlf][crlf]',
    description: 'Otimizado para pacotes de redes sociais Unitel.'
  },
  { 
    id: 'p2', 
    name: 'Movicel Unlimited', 
    network: 'Movicel', 
    content: 'GET / HTTP/1.1[crlf]Host: internet.movicel.co.ao[crlf]Upgrade: websocket[crlf][crlf]',
    description: 'Payload direto para rede Movicel.'
  },
  { 
    id: 'p3', 
    name: 'DNS Tunneling Pro', 
    network: 'Generic', 
    content: '8.8.8.8:53',
    description: 'Túnel via DNS para bypass de firewall.'
  }
];

export default function App() {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [selectedServer, setSelectedServer] = useState<Server>(SERVERS[0]);
  const [selectedPayload, setSelectedPayload] = useState<Payload>(PAYLOADS[0]);
  const [activeTab, setActiveTab] = useState<'home' | 'servers' | 'payloads' | 'settings'>('home');
  const [copied, setCopied] = useState<string | null>(null);
  const [stats, setStats] = useState({ down: '0.0', up: '0.0', time: '00:00:00' });

  // Simulation of connection
  const toggleConnection = () => {
    if (status === 'disconnected') {
      setStatus('connecting');
      setTimeout(() => setStatus('connected'), 2000);
    } else {
      setStatus('disconnected');
    }
  };

  useEffect(() => {
    let interval: any;
    if (status === 'connected') {
      interval = setInterval(() => {
        setStats(prev => ({
          down: (Math.random() * 5 + 1).toFixed(1),
          up: (Math.random() * 2 + 0.5).toFixed(1),
          time: prev.time // In a real app we'd increment time
        }));
      }, 1000);
    } else {
      setStats({ down: '0.0', up: '0.0', time: '00:00:00' });
    }
    return () => clearInterval(interval);
  }, [status]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[40%] bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[40%] bg-brand-secondary/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="p-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-primary/20 rounded-xl flex items-center justify-center border border-brand-primary/30">
            <Shield className="text-brand-primary w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight">AngolaNet <span className="text-brand-primary">Pro</span></h1>
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Secure Tunneling</p>
          </div>
        </div>
        <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <Menu className="w-6 h-6 text-white/60" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 pb-24 z-10 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Status Card */}
              <div className="glass-card p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className={`w-48 h-48 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${
                  status === 'connected' ? 'border-brand-primary status-glow-connected' : 
                  status === 'connecting' ? 'border-yellow-400 animate-pulse' : 'border-white/10'
                }`}>
                  <button 
                    onClick={toggleConnection}
                    className="w-40 h-40 rounded-full bg-white/5 hover:bg-white/10 flex flex-col items-center justify-center transition-all active:scale-95"
                  >
                    <Zap className={`w-12 h-12 mb-2 transition-colors ${status === 'connected' ? 'text-brand-primary' : 'text-white/20'}`} />
                    <span className="font-bold text-sm tracking-widest uppercase">
                      {status === 'disconnected' ? 'Conectar' : status === 'connecting' ? 'Conectando...' : 'Desconectar'}
                    </span>
                  </button>
                </div>

                <div className="mt-8 flex gap-8">
                  <div className="text-center">
                    <p className="text-[10px] text-white/40 uppercase mb-1">Download</p>
                    <p className="font-mono text-xl font-bold">{stats.down} <span className="text-xs text-white/40">MB/s</span></p>
                  </div>
                  <div className="w-px h-10 bg-white/10 self-center" />
                  <div className="text-center">
                    <p className="text-[10px] text-white/40 uppercase mb-1">Upload</p>
                    <p className="font-mono text-xl font-bold">{stats.up} <span className="text-xs text-white/40">MB/s</span></p>
                  </div>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-4 flex items-center gap-3">
                  <Globe className="w-5 h-5 text-brand-secondary" />
                  <div>
                    <p className="text-[10px] text-white/40 uppercase">Servidor</p>
                    <p className="text-xs font-medium truncate w-24">{selectedServer.name}</p>
                  </div>
                </div>
                <div className="glass-card p-4 flex items-center gap-3">
                  <Wifi className="w-5 h-5 text-brand-primary" />
                  <div>
                    <p className="text-[10px] text-white/40 uppercase">Rede</p>
                    <p className="text-xs font-medium">{selectedPayload.network}</p>
                  </div>
                </div>
              </div>

              {/* IP Info */}
              <div className="glass-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-white/20" />
                  <div>
                    <p className="text-[10px] text-white/40 uppercase">Endereço IP</p>
                    <p className="text-xs font-mono">{status === 'connected' ? selectedServer.ip : 'Oculto'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${status === 'connected' ? 'bg-brand-primary' : 'bg-white/20'}`} />
                  <span className="text-[10px] uppercase text-white/40">{status === 'connected' ? 'Protegido' : 'Inseguro'}</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'servers' && (
            <motion.div 
              key="servers"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold">Servidores Premium</h2>
                <button className="text-brand-primary text-xs flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" /> Atualizar
                </button>
              </div>
              {SERVERS.map((server) => (
                <button
                  key={server.id}
                  onClick={() => {
                    setSelectedServer(server);
                    setActiveTab('home');
                  }}
                  className={`w-full glass-card p-4 flex items-center justify-between transition-all hover:bg-white/5 ${
                    selectedServer.id === server.id ? 'border-brand-primary/50 bg-brand-primary/5' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{server.flag}</span>
                    <div className="text-left">
                      <p className="text-sm font-bold">{server.name}</p>
                      <p className="text-[10px] text-white/40 font-mono">{server.ip}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className={`text-xs font-mono ${server.latency < 100 ? 'text-brand-primary' : 'text-yellow-400'}`}>
                        {server.latency}ms
                      </p>
                      <div className="w-12 h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-brand-primary" style={{ width: `${server.load}%` }} />
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/20" />
                  </div>
                </button>
              ))}
            </motion.div>
          )}

          {activeTab === 'payloads' && (
            <motion.div 
              key="payloads"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h2 className="text-lg font-bold mb-2">Configurações de Payload</h2>
              {PAYLOADS.map((payload) => (
                <div key={payload.id} className="glass-card p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-brand-primary" />
                      <h3 className="font-bold text-sm">{payload.name}</h3>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                      payload.network === 'Unitel' ? 'border-orange-500 text-orange-500' : 
                      payload.network === 'Movicel' ? 'border-blue-500 text-blue-500' : 'border-white/20 text-white/40'
                    }`}>
                      {payload.network}
                    </span>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed">
                    {payload.description}
                  </p>
                  <div className="bg-black/40 rounded-lg p-3 relative group">
                    <code className="text-[10px] font-mono text-brand-primary break-all block pr-8">
                      {payload.content}
                    </code>
                    <button 
                      onClick={() => copyToClipboard(payload.content, payload.id)}
                      className="absolute top-2 right-2 p-1.5 bg-white/5 rounded-md hover:bg-white/10 transition-colors"
                    >
                      {copied === payload.id ? <Check className="w-3 h-3 text-brand-primary" /> : <Copy className="w-3 h-3 text-white/40" />}
                    </button>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedPayload(payload);
                      setActiveTab('home');
                    }}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedPayload.id === payload.id ? 'bg-brand-primary text-black' : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {selectedPayload.id === payload.id ? 'Selecionado' : 'Usar Payload'}
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div 
              key="settings"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-bold">Configurações</h2>
              
              <div className="space-y-4">
                <div className="glass-card p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Cpu className="w-5 h-5 text-white/40" />
                    <span className="text-sm">Protocolo UDP/TCP</span>
                  </div>
                  <select className="bg-transparent text-xs text-brand-primary font-bold outline-none">
                    <option>SSH Direct</option>
                    <option>SSL/TLS</option>
                    <option>HTTP Proxy</option>
                  </select>
                </div>

                <div className="glass-card p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-white/40" />
                    <span className="text-sm">Compressão de Dados</span>
                  </div>
                  <div className="w-10 h-5 bg-brand-primary rounded-full relative p-1 cursor-pointer">
                    <div className="w-3 h-3 bg-black rounded-full absolute right-1" />
                  </div>
                </div>

                <div className="glass-card p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Signal className="w-5 h-5 text-white/40" />
                    <span className="text-sm">Auto-Reconectar</span>
                  </div>
                  <div className="w-10 h-5 bg-white/10 rounded-full relative p-1 cursor-pointer">
                    <div className="w-3 h-3 bg-white/40 rounded-full absolute left-1" />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-[10px] text-white/20 uppercase text-center font-mono">AngolaNet Pro v2.4.0-Stable</p>
                <p className="text-[10px] text-white/20 text-center mt-1 italic">Desenvolvido para máxima performance em Angola</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 z-20">
        <div className="glass-card flex items-center justify-around p-2 shadow-2xl shadow-black">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center p-2 rounded-xl transition-all ${activeTab === 'home' ? 'text-brand-primary' : 'text-white/40'}`}
          >
            <Zap className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-bold">Home</span>
          </button>
          <button 
            onClick={() => setActiveTab('servers')}
            className={`flex flex-col items-center p-2 rounded-xl transition-all ${activeTab === 'servers' ? 'text-brand-primary' : 'text-white/40'}`}
          >
            <Globe className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-bold">Servers</span>
          </button>
          <button 
            onClick={() => setActiveTab('payloads')}
            className={`flex flex-col items-center p-2 rounded-xl transition-all ${activeTab === 'payloads' ? 'text-brand-primary' : 'text-white/40'}`}
          >
            <Lock className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-bold">Payloads</span>
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center p-2 rounded-xl transition-all ${activeTab === 'settings' ? 'text-brand-primary' : 'text-white/40'}`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-bold">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
