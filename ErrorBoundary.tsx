
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  onReset: () => void;
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  recoveryLogs: string[];
}

/**
 * Global Error Boundary component to catch and handle UI-level crashes.
 * Utilizes standard React Class Component lifecycle for error detection.
 */
// FIX: Reverted to explicit Component extension to fix property access issues.
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
      recoveryLogs: ["[KERNEL_FAULT_LOG]: Initializing fail-safe monitoring..."]
    };
    this.handleReset = this.handleReset.bind(this);
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error: error,
      recoveryLogs: ["[KERNEL_FAULT_LOG]: State recovery initiated."]
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("[KERNEL_FAULT]:", error, errorInfo);
    this.setState(prev => ({
        recoveryLogs: [
          ...prev.recoveryLogs,
          `[MEM_SHARD]: Fault detected in Sector_${Math.floor(Math.random() * 144)}`,
          `[SHIELD_ACTIVE]: Stabilizing core logic...`
        ]
    }));
  }

  handleReset(): void {
    this.props.onReset();
    this.setState({
      hasError: false,
      error: undefined,
      recoveryLogs: ["[KERNEL_REBOOT]: Initiating shard re-manifestation..."]
    });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center p-12 text-center overflow-hidden font-sans">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#e11d4822,_transparent_70%)] animate-pulse" />
          <div className="relative z-10 max-w-4xl w-full space-y-12">
            <div className="w-48 h-48 border-8 border-rose-600/30 rounded-full flex items-center justify-center mx-auto shadow-[0_0_100px_#e11d4844]">
               <ShieldAlert size={120} className="text-rose-600 animate-pulse" />
            </div>
            <h2 className="text-7xl font-black text-white uppercase italic tracking-tighter leading-none font-fantasy">Shard_Failure</h2>
            <p className="text-xl text-rose-400 font-bold uppercase tracking-widest italic">"Logic loop severed. Security protocols active."</p>
            <div className="bg-black/60 border-2 border-rose-500/20 p-8 rounded-[3rem] text-left font-mono text-xs text-rose-500/60 max-w-2xl mx-auto h-48 overflow-y-auto shadow-inner no-scrollbar">
               {this.state.recoveryLogs.map((log, i) => (
                 <div key={i} className="mb-2 flex gap-4">
                    <span className="opacity-30">[{new Date().toLocaleTimeString()}]</span>
                    <span className="italic">{log}</span>
                 </div>
               ))}
            </div>
            <button
              onClick={this.handleReset}
              className="px-16 py-8 bg-white text-black rounded-[3rem] font-black uppercase tracking-[0.4em] flex items-center gap-6 hover:bg-rose-600 hover:text-white transition-all active:scale-95 italic border-4 border-white shadow-3xl"
            >
              <RefreshCw size={24} /> RE_MANIFEST
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
