import { Clock, ShieldCheck, Zap, Settings, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { text: "Respuesta Rápida", icon: Clock },
  { text: "Trabajo Garantizado", icon: ShieldCheck },
  { text: "Seguridad Total", icon: Zap },
  { text: "Soluciones Eficientes", icon: Settings },
  { text: "Disponibilidad 24/7", icon: CheckCircle },
];

export function WhyUsSection() {
  return (
    <section className="py-32 px-6 relative overflow-hidden bg-white/[0.01]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,191,255,0.05),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">¿Por qué elegirnos?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            La electricidad no es un juego. Apostá por calidad, eficiencia y seguridad certificada.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center group hover:bg-primary/5 transition-colors border-primary/10 relative overflow-hidden"
            >
              {/* Animated scanner line effect */}
              <div className="absolute inset-0 -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out bg-gradient-to-b from-transparent via-primary/20 to-transparent w-full h-[50px] opacity-0 group-hover:opacity-100 pointer-events-none" />

              <div className="w-16 h-16 rounded-full bg-card border border-white/8 flex items-center justify-center mb-6 group-hover:border-primary/30 transition-all shadow-[0_2px_16px_rgba(0,0,0,0.3)] group-hover:shadow-[0_4px_24px_rgba(77,163,255,0.15)]">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-serif font-semibold text-lg tracking-wide">{feature.text}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
