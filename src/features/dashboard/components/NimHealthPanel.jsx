import { Cpu, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function NimHealthPanel({ nimServices = [] }) {
  return (
    <Card className="lg:col-span-1 p-6 space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-sm text-foreground">NVIDIA NIM Health Status</h3>
        </div>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
      </div>

      <div className="space-y-3.5">
        {nimServices.map((service, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-muted/40 border border-border/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground">{service.name}</span>
              <Badge variant="success">{service.status}</Badge>
            </div>

            <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
              <span>Latency: <strong className="text-foreground">{service.latency}</strong></span>
              <span>Util: <strong className="text-foreground">{service.gpuUtil}</strong></span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-600 dark:text-blue-300 space-y-1">
        <div className="font-bold flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-500" />
          NIM Infrastructure Engine
        </div>
        <p className="text-[11px] text-muted-foreground">
          Hosted on NVIDIA DGX Cloud with NV-Embed-QA semantic vector indexing.
        </p>
      </div>
    </Card>
  );
}
