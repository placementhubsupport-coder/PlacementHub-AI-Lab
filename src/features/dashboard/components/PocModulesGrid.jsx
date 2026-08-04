import { motion } from 'framer-motion';
import { Sparkles, FileSearch, Search, Bot, GraduationCap, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function PocModulesGrid({ modules = [], onSelectPoc }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">AI Proof of Concept Modules</h2>
          <p className="text-xs text-muted-foreground">Select any AI showcase module to launch its interactive demonstration environment.</p>
        </div>
        <Badge variant="outline" className="hidden sm:inline-flex">5 Modules Standardized</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((poc, idx) => {
          const Icon = poc.icon;
          return (
            <motion.div
              key={poc.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.1 + idx * 0.05 }}
            >
              <Card className="h-full flex flex-col justify-between group hover:border-primary/50 hover:shadow-xl transition-all duration-300 border-border/80">
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant={poc.badgeVariant}>{poc.badgeText}</Badge>
                  </div>

                  <div>
                    <CardTitle className="text-base group-hover:text-primary transition-colors">{poc.title}</CardTitle>
                    <span className="text-[11px] font-semibold text-primary/80">{poc.subtitle}</span>
                  </div>

                  <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                    {poc.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 pt-0">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground bg-muted/40 p-2.5 rounded-xl border border-border/50">
                    <span className="font-mono truncate">⚡ {poc.tech}</span>
                    <span className="font-bold text-foreground shrink-0">{poc.stats}</span>
                  </div>

                  <Button
                    onClick={() => onSelectPoc && onSelectPoc(poc.id)}
                    variant="outline"
                    className="w-full justify-between font-semibold group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all shadow-xs"
                  >
                    <span>Explore Module</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
