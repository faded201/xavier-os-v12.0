import React, { useState } from 'react';
import { Warehouse, Package, Truck, Globe, TrendingUp, AlertTriangle } from 'lucide-react';

const LogisticsNexus: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'INVENTORY' | 'ORDERS' | 'SUPPLIERS'>('INVENTORY');

  return (
    <div className="h-full w-full p-6 text-emerald-500 font-mono overflow-y-auto animate-in fade-in duration-500">
      <header className="mb-8 border-b border-emerald-500/30 pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
            <h1 className="text-4xl font-black uppercase tracking-widest flex items-center gap-3 text-white">
            <Warehouse size={40} className="text-emerald-500" />
            Drop Shard
            </h1>
            <p className="text-sm opacity-70 mt-2 tracking-[0.2em]">AUTONOMOUS LOGISTICS & FULFILLMENT NODE</p>
        </div>
        <div className="flex gap-2">
            {['INVENTORY', 'ORDERS', 'SUPPLIERS'].map(tab => (
                <button 
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-4 py-2 text-xs font-bold border rounded-lg transition-all ${activeTab === tab ? 'bg-emerald-500 text-black border-emerald-500' : 'border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10'}`}
                >
                    {tab}
                </button>
            ))}
        </div>
      </header>

      {/* Content based on tab */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats Row */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-black/40 border border-emerald-500/30 p-4 rounded-xl">
                <div className="text-xs opacity-50 uppercase">Active SKUs</div>
                <div className="text-2xl font-bold text-white">1,240</div>
            </div>
            <div className="bg-black/40 border border-emerald-500/30 p-4 rounded-xl">
                <div className="text-xs opacity-50 uppercase">Pending Orders</div>
                <div className="text-2xl font-bold text-amber-500">42</div>
            </div>
            <div className="bg-black/40 border border-emerald-500/30 p-4 rounded-xl">
                <div className="text-xs opacity-50 uppercase">In Transit</div>
                <div className="text-2xl font-bold text-blue-400">158</div>
            </div>
            <div className="bg-black/40 border border-emerald-500/30 p-4 rounded-xl">
                <div className="text-xs opacity-50 uppercase">Monthly Revenue</div>
                <div className="text-2xl font-bold text-emerald-400">$42,850</div>
            </div>
        </div>

        {/* Main Panel */}
        <div className="lg:col-span-2 bg-black/40 border border-emerald-500/30 p-6 rounded-2xl min-h-[400px]">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                {activeTab === 'INVENTORY' && <Package />}
                {activeTab === 'ORDERS' && <Truck />}
                {activeTab === 'SUPPLIERS' && <Globe />}
                {activeTab} STREAM
            </h3>
            
            {activeTab === 'INVENTORY' && (
                <div className="space-y-4">
                    {[1,2,3,4,5].map(i => (
                        <div key={i} className="flex items-center justify-between p-4 border border-white/5 hover:border-emerald-500/50 bg-black/20 transition-all rounded-lg">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                                    <Package size={20} className="text-gray-500" />
                                </div>
                                <div>
                                    <div className="text-white font-bold">Neural Interface Headset v{i}.0</div>
                                    <div className="text-xs opacity-50">SKU: NI-HS-{100+i}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-emerald-400 font-bold">Stock: {100 * i}</div>
                                <div className="text-xs opacity-50">Warehouse A</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'ORDERS' && (
                 <div className="space-y-4">
                    {[1,2,3].map(i => (
                        <div key={i} className="flex items-center justify-between p-4 border border-white/5 bg-black/20 rounded-lg">
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                                <div>
                                    <div className="text-white font-bold">Order #882{i}</div>
                                    <div className="text-xs opacity-50">To: Sydney, AU</div>
                                </div>
                            </div>
                            <button className="px-4 py-1 bg-emerald-500/20 text-emerald-500 text-xs border border-emerald-500/50 hover:bg-emerald-500 hover:text-black transition-colors rounded">
                                FULFILL
                            </button>
                        </div>
                    ))}
                 </div>
            )}
        </div>

        {/* Side Panel */}
        <div className="bg-black/40 border border-emerald-500/30 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><TrendingUp size={18} /> PERFORMANCE</h3>
            <div className="space-y-6">
                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span>Fulfillment Speed</span>
                        <span className="text-emerald-400">98%</span>
                    </div>
                    <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[98%]"></div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span>Return Rate</span>
                        <span className="text-emerald-400">1.2%</span>
                    </div>
                    <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[1.2%]"></div>
                    </div>
                </div>

                <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="text-amber-500 shrink-0" size={20} />
                        <div>
                            <div className="text-amber-500 font-bold text-sm">Low Stock Alert</div>
                            <div className="text-xs opacity-70 mt-1">SKU-104 is below threshold. Auto-reorder initiated.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LogisticsNexus;