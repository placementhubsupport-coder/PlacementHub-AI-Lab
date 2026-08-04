import { motion } from 'framer-motion';
import { Zap, ArrowRight, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function DashboardHero({ onSelectPoc, onRefresh, isRefreshing }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 md:p-10 border border-indigo-500/20 shadow-2xl shadow-indigo-950/40"
    >
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            NVIDIA NIM Accelerated Architecture
          </span>
          <Badge variant="success" className="items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            All 4 Microservices Operational
          </Badge>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
          PlacementHub <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">AI Lab Showcase</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed max-w-2xl">
          A standalone showcase of next-generation AI Proof of Concepts engineered for campus placements. Explore semantic matching, automated ATS resume screening, natural search, and placement copilots powered by NVIDIA NIMs.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button
            onClick={() => onSelectPoc && onSelectPoc('poc-01')}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-blue-600/30 border border-blue-400/30"
          >
            <span>Explore Active Match POC</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            onClick={onRefresh}
            variant="outline"
            size="lg"
            className="border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-slate-200"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh Metrics</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
