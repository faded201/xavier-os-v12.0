
import React, { useState } from 'react';
import { FolderArchive, Terminal, RefreshCw, GitBranch } from 'lucide-react';
import JSZip from 'jszip';

const RepoManifest: React.FC = () => {
  const [isBundling, setIsBundling] = useState(false);
  const [progress, setProgress] = useState(0);

  const projectFiles = [
    'index.html', 'index.tsx', 'App.tsx', 'metadata.json', 'package.json',
    'tsconfig.json', 'vite.config.ts', 'ErrorBoundary.tsx',
    'components/types.ts', 'components/data.ts', 'components/services/geminiService.ts',
    'components/services/NeuralBoot.tsx', 'components/views/NexusDashboard.tsx',
    'components/views/Dashboard.tsx', 'components/views/AutomationNexus.tsx',
    'components/views/RepoManifest.tsx', 'components/views/LoginPortal.tsx',
    'components/views/AutoMonetizer.tsx', 'components/views/QuantumTreasury.tsx'
  ];

  const triggerDownload = async () => {
    setIsBundling(true);
    setProgress(0);
    const zip = new JSZip();

    for (let i = 0; i < projectFiles.length; i++) {
      const path = projectFiles[i];
      try {
        const response = await fetch(`/${path}`);
        const content = response.ok ? await response.text() : `// SHARD_MISSING: ${path}`;
        zip.file(path, content);
      } catch (e) {
        zip.file(path, `// ERROR_FETCHING_SHARD: ${path}`);
      }
      setProgress(Math.floor(((i + 1) / projectFiles.length) * 100));
      await new Promise(r => setTimeout(r, 50));
    }

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `xavier-sovereign-os-unified.zip`;
    a.click();
    setIsBundling(false);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <header className="flex flex-col md:flex-row justify-between items-start gap-8 w-full">
        <div className="flex items-center gap-10">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-black rounded-[3rem] flex items-center justify-center shadow-4xl border-4 border-white/10">
            <GitBranch className="text-white" size={48} />
          </div>
          <div>
            <h2 className="text-4xl md:text-[8rem] font-black text-white tracking-tighter uppercase italic leading-none font-fantasy">Git Shard</h2>
            <div className="flex items-center gap-6 mt-12">
               <div className="w-5 h-5 rounded-full bg-amber-500 animate-ping"></div>
               <span className="text-base font-black uppercase tracking-[0.6em] text-amber-400 italic">SOURCE_CODE: FULLY_EXPOSED</span>
            </div>
          </div>
        </div>
        <button onClick={triggerDownload} disabled={isBundling} className="bg-white text-black px-16 py-10 rounded-[3.5rem] font-black uppercase tracking-[0.5em] flex items-center gap-8 shadow-4xl hover:bg-amber-500 hover:text-white transition-all active:scale-95 italic border-4 border-white">
          {isBundling ? <RefreshCw className="animate-spin" /> : <FolderArchive />} 
          {isBundling ? `SHARDING_${progress}%` : 'DOWNLOAD_VITE_PROJECT'}
        </button>
      </header>

      <div className="bg-gray-900 border-4 border-gray-800 rounded-[5rem] p-12 md:p-20 shadow-3xl space-y-10 relative overflow-hidden group">
         <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter flex items-center gap-8"><Terminal className="text-amber-500" /> Unified Architecture Manifest</h3>
         <p className="text-xl text-gray-400 font-bold italic leading-relaxed">
            "Every component, service, and view provided in this manifest is wired for immediate execution. Use the download button above to secure the entire shard cluster for your private nodes."
         </p>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs text-gray-600">
            {projectFiles.map(f => <div key={f} className="flex gap-4"><span>[OK]</span>{f}</div>)}
         </div>
      </div>
    </div>
  );
};

export default RepoManifest;
