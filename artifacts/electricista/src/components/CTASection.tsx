import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/542622225260?text=Hola%20Matías,%20necesito%20un%20electricista";
const EMAIL_URL = "mailto:matiludo095@gmail.com";

export function CTASection() {
  return (
    <section className="py-32 px-6 relative overflow-hidden flex items-center justify-center min-h-[70vh]">
      {/* Animated gradient background and lines */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(77,163,255,0.05) 0%, rgba(124,92,255,0.05) 100%)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] rounded-full blur-[160px]" style={{ background: "radial-gradient(ellipse, rgba(77,163,255,0.10) 0%, rgba(124,92,255,0.06) 50%, transparent 70%)" }} />
      
      {/* Lightning CSS lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-[20%] left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" style={{ animation: "pulse 4s ease-in-out infinite" }} />
        <div className="absolute top-[70%] left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" style={{ animation: "pulse 4s ease-in-out infinite 1.5s" }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 glass-panel border-white/8 p-10 md:p-20 rounded-[3rem] text-center max-w-5xl mx-auto glow-box"
      >
        <h2 className="text-4xl md:text-6xl font-serif font-black mb-6 glow-text tracking-tight uppercase">
          ¿Necesitás asistencia<br/>eléctrica inmediata?
        </h2>
        <p className="text-xl md:text-2xl text-primary-foreground/80 dark:text-muted-foreground mb-12 max-w-2xl mx-auto font-light">
          Contactame ahora y te respondo al instante. Soluciones rápidas, seguras y definitivas.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Button asChild size="lg" className="h-16 px-10 text-xl rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_8px_32px_rgba(77,163,255,0.30)] hover:shadow-[0_12px_48px_rgba(77,163,255,0.45)] transition-all duration-300 font-semibold tracking-wide w-full sm:w-auto">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-testid="cta-whatsapp">
              Hablar por WhatsApp
              <ArrowRight className="w-6 h-6 ml-3" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-16 px-10 text-xl rounded-full border-primary/40 text-foreground hover:bg-primary/10 hover:border-primary transition-all bg-background/50 backdrop-blur-md w-full sm:w-auto">
            <a href={EMAIL_URL} data-testid="cta-email">
              <Mail className="w-6 h-6 mr-3" />
              Enviar Email
            </a>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
