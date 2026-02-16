
import React, { useState, useEffect } from 'react';
import { ScanState, UserInfo } from './types';
import { FULL_LETTER_DATA, AGE_REPORTS_MALE, AGE_REPORTS_FEMALE } from './constants';
import { Camera, ShieldAlert, Cpu, Activity, Printer, User, RefreshCw, AlertCircle, Zap, Crosshair, Brain, Eye, Droplets, Thermometer } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<ScanState>('IDLE');
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: '', age: 25, gender: 'male' });
  const [progress, setProgress] = useState(0);

  const startScan = () => {
    setState('SCANNING');
    setProgress(0);
  };

  useEffect(() => {
    if (state === 'SCANNING') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setState('PROCESSING'), 500);
            return 100;
          }
          return prev + 1.5;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [state]);

  useEffect(() => {
    if (state === 'PROCESSING') {
      const timer = setTimeout(() => {
        setState('RESULT');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const getAgeReport = () => {
    const genderReports = userInfo.gender === 'male' ? AGE_REPORTS_MALE : AGE_REPORTS_FEMALE;
    const report = genderReports.find(r => userInfo.age >= r.min && userInfo.age <= r.max);
    return report ? report.report : "Mfumo unashindwa kuchakata taarifa za umri wako kwa sasa. Tafadhali jaribu tena.";
  };

  const nameInitial = userInfo.name.charAt(0).toUpperCase();
  const letterData = FULL_LETTER_DATA[nameInitial] || FULL_LETTER_DATA.DEFAULT;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 scan-overlay">
      <div className="w-full max-w-5xl glass-panel rounded-[2rem] overflow-hidden border border-cyan-500/30 crt-flicker">
        
        {/* Header Section */}
        <header className="bg-black/40 border-b border-cyan-500/20 p-6 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="bg-cyan-500/20 p-2 rounded-lg border border-cyan-500/40">
              <Activity className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-black font-futuristic tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                V8 PRO BIO-SCAN
              </h1>
              <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-500/60 tracking-tighter">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                SYSTEM CORE: ONLINE // VERSION 2.5.9
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 font-mono text-xs">
            <div className="flex flex-col items-end">
              <span className="text-cyan-500/40">LATENCY</span>
              <span className="text-cyan-400">12ms</span>
            </div>
            <div className="flex flex-col items-end border-l border-cyan-500/20 pl-6">
              <span className="text-cyan-500/40">CPU_TEMP</span>
              <span className="text-cyan-400">42°C</span>
            </div>
          </div>
        </header>

        <main className="p-8 min-h-[500px] flex flex-col justify-center">
          {state === 'IDLE' && (
            <div className="text-center space-y-10 py-12 animate-in fade-in zoom-in duration-500">
              <div className="relative mx-auto w-40 h-40">
                <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-2 border-2 border-dashed border-cyan-400/40 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="w-16 h-16 text-cyan-400" />
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-futuristic font-bold text-white tracking-tight">
                  SCAN YA MWILI MZIMA
                </h2>
                <p className="text-cyan-100/60 max-w-xl mx-auto text-lg font-light leading-relaxed">
                  Anza uchambuzi wa hali ya juu wa bio-sumaku. Mfumo wetu utatambua mtetemo wa seli zako kulingana na wasifu wako na kutoa ripoti ya kina.
                </p>
              </div>
              <button 
                onClick={() => setState('FORM')}
                className="group relative bg-cyan-600 hover:bg-cyan-500 text-black px-12 py-5 rounded-full font-black font-futuristic text-xl transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)] active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3 uppercase tracking-tighter">
                  ANZA SCAN <Zap className="w-6 h-6 fill-current" />
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </button>
            </div>
          )}

          {state === 'FORM' && (
            <div className="max-w-xl mx-auto w-full space-y-8 animate-in slide-in-from-right duration-500">
              <div className="flex items-center gap-4 border-b border-cyan-500/20 pb-4">
                <User className="text-cyan-400 w-8 h-8" />
                <h2 className="text-2xl font-futuristic font-bold text-cyan-100 uppercase tracking-widest">
                  WASIFU WA BIOMETRIA
                </h2>
              </div>
              <div className="space-y-6 bg-black/40 p-10 rounded-[2rem] border border-cyan-500/10 shadow-2xl">
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-cyan-400 uppercase tracking-widest">Jina Kamili la Mtumiaji</label>
                  <input 
                    type="text" 
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                    className="w-full bg-slate-900/50 border border-cyan-500/30 rounded-xl p-4 text-xl text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all placeholder:text-slate-700"
                    placeholder="ENTER NAME..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-cyan-400 uppercase tracking-widest">Umri (Miaka)</label>
                    <input 
                      type="number" 
                      value={userInfo.age}
                      onChange={(e) => setUserInfo({...userInfo, age: parseInt(e.target.value) || 0})}
                      className="w-full bg-slate-900/50 border border-cyan-500/30 rounded-xl p-4 text-xl text-white focus:border-cyan-400 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-cyan-400 uppercase tracking-widest">Jinsia</label>
                    <select 
                      value={userInfo.gender}
                      onChange={(e) => setUserInfo({...userInfo, gender: e.target.value as 'male' | 'female'})}
                      className="w-full bg-slate-900/50 border border-cyan-500/30 rounded-xl p-4 text-xl text-white focus:border-cyan-400 outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="male">MWANAUME</option>
                      <option value="female">MWANAMKE</option>
                    </select>
                  </div>
                </div>
                <button 
                  disabled={!userInfo.name || userInfo.age <= 0}
                  onClick={startScan}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-20 disabled:grayscale text-black py-5 rounded-2xl font-black font-futuristic text-xl tracking-widest transition-all mt-6 shadow-lg shadow-cyan-900/40"
                >
                  THIBITISHA & ANZA
                </button>
              </div>
            </div>
          )}

          {state === 'SCANNING' && (
            <div className="text-center space-y-12 animate-in fade-in duration-700">
              <div className="relative mx-auto w-full max-w-sm aspect-square bg-black/40 rounded-3xl overflow-hidden border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.2)]">
                <img 
                  src="https://i.imgur.com/KOx7slr.gif" 
                  alt="Scanning..." 
                  className="w-full h-full object-cover opacity-80 mix-blend-screen"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 flex flex-col items-start gap-1">
                  <div className="flex items-center gap-2 text-[10px] text-cyan-400 font-mono">
                    <Crosshair className="w-3 h-3" /> TARGET_LOCK: {userInfo.name.toUpperCase()}
                  </div>
                  <div className="w-24 h-1 bg-cyan-900 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 animate-[loading_1s_infinite]" style={{width: '60%'}}></div>
                  </div>
                </div>
                <div className="absolute bottom-6 inset-x-0 flex flex-col items-center gap-2">
                   <div className="text-5xl font-futuristic font-black text-cyan-400 tabular-nums drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
                    {Math.floor(progress)}%
                  </div>
                  <div className="text-xs font-mono text-cyan-500/60 uppercase tracking-[0.2em] animate-pulse">
                    Analyzing Quantum Frequencies
                  </div>
                </div>
              </div>
              <div className="max-w-md mx-auto space-y-4">
                <div className="flex justify-between text-[10px] font-mono text-cyan-500 mb-1">
                  <span>BIO_READOUT</span>
                  <span>CELLULAR_MATRIX_ALIGNMENT</span>
                </div>
                <div className="w-full bg-cyan-950/40 h-3 rounded-full overflow-hidden border border-cyan-500/20">
                  <div className="bg-gradient-to-r from-cyan-600 via-cyan-400 to-white h-full transition-all duration-300 relative" style={{ width: `${progress}%` }}>
                    <div className="absolute top-0 right-0 bottom-0 w-8 bg-white/40 blur-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {state === 'PROCESSING' && (
            <div className="text-center py-24 space-y-8 animate-in fade-in duration-700">
              <div className="relative w-24 h-24 mx-auto">
                <RefreshCw className="w-24 h-24 text-cyan-400 animate-spin" />
                <Cpu className="w-10 h-10 text-cyan-200 absolute inset-0 m-auto animate-pulse" />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-futuristic font-bold text-white tracking-widest uppercase">
                  KUTAYARISHA RIPOTI...
                </h3>
                <div className="font-mono text-xs text-cyan-500/60 flex flex-col gap-1">
                  <span>&gt; CROSS-REFERENCING DATABASE...</span>
                  <span>&gt; CALCULATING VULNERABILITY METRICS...</span>
                  <span>&gt; GENERATING PREVENTATIVE STRATEGIES...</span>
                </div>
              </div>
            </div>
          )}

          {state === 'RESULT' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="flex flex-col lg:flex-row gap-8">
                
                {/* Main Content Area */}
                <div className="flex-1 space-y-8">
                  
                  {/* Digital Bio-Magnetic Scan Header */}
                  <div className="bg-cyan-900/20 p-8 rounded-[2rem] border-l-4 border-cyan-400 shadow-2xl relative">
                    <div className="absolute top-4 right-4 text-[10px] font-mono text-cyan-500/50">BIO-MAGNETIC REPORT v2.0</div>
                    <h3 className="text-2xl font-futuristic font-black text-cyan-400 mb-6 flex items-center gap-4">
                      <ShieldAlert className="w-8 h-8" /> RIPOTI YA VIPIMO VYA AFYA
                    </h3>
                    <div className="space-y-4 text-slate-100 leading-relaxed text-lg">
                      <p className="bg-black/30 p-4 rounded-xl border border-cyan-500/10 italic text-sm">
                        Haya ni majibu ya vipimo vyako ambavyo vimebainika baada ya kufanya uchunguzi wa mwili wako kuanzia juu mpaka chini. Mfumo huu unatumia teknolojia ya Magnetic Resonance kubaini sumu (taxi) na viashiria muhimu vya afya yako.
                      </p>
                      <p className="font-medium text-cyan-100">
                        {getAgeReport()}
                      </p>
                    </div>
                  </div>

                  {/* Character Diagnosis Section */}
                  <div className="bg-black/30 p-8 rounded-[2rem] border border-cyan-500/20">
                    <h3 className="text-xl font-futuristic font-bold text-cyan-400 mb-6 flex items-center gap-3">
                      <Brain className="w-6 h-6" /> UCHAMBUZI WA KIBIOMETRIA (HERUFI: {nameInitial})
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="bg-red-900/20 p-6 rounded-2xl border border-red-500/30">
                          <h4 className="text-red-400 font-futuristic font-bold mb-3 flex items-center gap-2 text-xs">
                            <AlertCircle className="w-4 h-4" /> Changamoto Zinazowezekana
                          </h4>
                          <ul className="space-y-2">
                            {letterData.diseases.map((d, i) => (
                              <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                                <span className="text-red-500 mt-1">•</span> {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-amber-900/20 p-6 rounded-2xl border border-amber-500/30">
                          <h4 className="text-amber-400 font-futuristic font-bold mb-3 flex items-center gap-2 text-xs">
                            <Zap className="w-4 h-4" /> Dalili za Mapema
                          </h4>
                          <ul className="space-y-2">
                            {letterData.symptoms.map((s, i) => (
                              <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                                <span className="text-amber-500 mt-1">•</span> {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="bg-green-900/20 p-6 rounded-2xl border border-green-500/30">
                        <h4 className="text-green-400 font-futuristic font-bold mb-4 text-xs uppercase tracking-widest">Ushauri wa Kinga & Suluhisho</h4>
                        <ul className="space-y-4">
                          {letterData.prevention.map((p, i) => (
                            <li key={i} className="text-slate-200 text-sm italic border-b border-green-500/10 pb-2 flex gap-2">
                              <span className="text-green-500 font-serif">“</span>
                              {p}
                              <span className="text-green-500 font-serif">”</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
                          <p className="text-[11px] text-cyan-300 font-mono">RECOM_ACTION: Detoxification required (ZETRONE Protocol)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar Details */}
                <div className="w-full lg:w-80 space-y-6">
                  <div className="bg-black/60 p-6 rounded-[2rem] border border-cyan-500/20 space-y-6">
                    <h4 className="text-cyan-400 font-futuristic font-black text-center text-xs tracking-widest">SYSTEM DATA BREAKDOWN</h4>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-cyan-400" />
                          <span className="text-[10px] text-slate-400 uppercase">Visual Core</span>
                        </div>
                        <span className="text-xs text-red-400 font-mono">CONSTR_DETECT</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                        <div className="flex items-center gap-2">
                          <Droplets className="w-4 h-4 text-blue-400" />
                          <span className="text-[10px] text-slate-400 uppercase">Hydration</span>
                        </div>
                        <span className="text-xs text-red-500 font-mono">LOW_VOL_ALERT</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                        <div className="flex items-center gap-2">
                          <Thermometer className="w-4 h-4 text-orange-400" />
                          <span className="text-[10px] text-slate-400 uppercase">Bio-Heat</span>
                        </div>
                        <span className="text-xs text-orange-400 font-mono">ABOVE_NORM</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-cyan-500/20">
                      <p className="text-[10px] text-slate-500 italic mb-4">"Akili yenye afya ni tunda la mwili wenye afya. Mfumo wako unaonyesha mrundikano wa sumu za muda mrefu."</p>
                      <button 
                        onClick={() => window.print()}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl transition-all border border-slate-600 flex items-center justify-center gap-2 text-xs font-bold"
                      >
                        <Printer className="w-4 h-4" /> CHAPISHA RIPOTI
                      </button>
                      <button 
                        onClick={() => setState('IDLE')}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-black py-3 rounded-xl transition-all font-bold text-xs mt-2 shadow-lg shadow-cyan-900/40"
                      >
                        ANZA UPYA
                      </button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-900/40 to-cyan-900/40 p-6 rounded-[2rem] border border-cyan-500/20">
                    <h5 className="text-[10px] font-futuristic text-cyan-300 mb-2 uppercase tracking-widest">Spiritual & Emotional State</h5>
                    <div className="space-y-2">
                       <div className="h-1 bg-cyan-900 rounded-full overflow-hidden">
                         <div className="h-full bg-cyan-400" style={{width: '75%'}}></div>
                       </div>
                       <div className="flex justify-between text-[8px] font-mono text-cyan-500/60">
                         <span>CALM</span>
                         <span>TURBULENT</span>
                       </div>
                       <p className="text-[9px] text-slate-400 mt-2">
                         Mvumo wa mishipa unaonyesha mrundikano wa hasira za ndani au msongo wa mawazo ambao unaathiri utulivu wa seli.
                       </p>
                    </div>
                  </div>
                </div>

              </div>

              <footer className="text-center pt-8 border-t border-cyan-500/20">
                <div className="flex flex-wrap justify-center gap-4 text-[10px] font-mono text-cyan-500/40 uppercase mb-4 tracking-tighter">
                  <span>SCAN_ID: {Math.random().toString(36).substr(2, 12).toUpperCase()}</span>
                  <span>| NODE: CORE_AXIS_V8</span>
                  <span>| TIMESTAMP: {new Date().toLocaleString()}</span>
                </div>
                <div className="text-[9px] text-slate-600 max-w-2xl mx-auto leading-relaxed uppercase tracking-tighter opacity-60">
                  Disclaimer: This system is a high-advanced bio-magnetic frequency simulator. Mfumo huu upo katika hatua za kiutafiti kubaini kisayansi kusoma taarifa himu za binadamu kupitia scan ya sura ya mtu hivyo kasoro zozote, zinatumika kuboresha mfumo huu wa bora zaidi kwani mfumo tayari umeisha kutambua na utaweka record zake kwa umakini zaidi na kwa siri.
                </div>
              </footer>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
