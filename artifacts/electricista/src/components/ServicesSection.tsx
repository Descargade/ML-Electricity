import { useRef } from "react";
import { Zap, Wrench, Clock } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

const services = [
  {
    icon: Zap,
    title: "Instalaciones Eléctricas",
    desc: "Instalaciones completas para hogares y comercios, con materiales de primera calidad y total seguridad."
  },
  {
    icon: Wrench,
    title: "Mantenimiento y Reparación",
    desc: "Diagnóstico y solución de problemas eléctricos, tableros, cables, tomas y más."
  },
  {
    icon: Clock,
    title: "Emergencias 24/7",
    desc: "Atención inmediata ante cualquier emergencia eléctrica, sin importar el horario."
  }
];

function TiltCard({ service, index }: { service: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useMotionTemplate`${mouseYSpring}deg`;
  const rotateY = useMotionTemplate`${mouseXSpring}deg`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate rotation
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const rX = ((mouseY / height) - 0.5) * -15; // Max 15deg
    const rY = ((mouseX / width) - 0.5) * 15;
    
    x.set(rY);
    y.set(rX);

    // Update CSS vars for glow effect
    ref.current.style.setProperty("--mouse-x", `${mouseX}px`);
    ref.current.style.setProperty("--mouse-y", `${mouseY}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="relative glass-panel rounded-3xl p-8 sm:p-10 cursor-pointer overflow-hidden border border-white/5 hover:border-primary/20 transition-all duration-300 shadow-[0_2px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_60px_rgba(0,0,0,0.45)]"
    >
      <div className="card-tilt-glow" />
      
      <div style={{ transform: "translateZ(50px)" }} className="relative z-20">
        <div className="w-16 h-16 rounded-2xl bg-primary/8 flex items-center justify-center mb-8 border border-primary/15 shadow-[0_4px_24px_rgba(77,163,255,0.12)]">
          <service.icon className="w-8 h-8 text-primary drop-shadow-[0_0_6px_rgba(77,163,255,0.5)]" />
        </div>
        
        <h3 className="text-2xl font-serif font-bold mb-4 text-foreground">{service.title}</h3>
        <p className="text-muted-foreground leading-relaxed text-lg font-sans">
          {service.desc}
        </p>
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  return (
    <section className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 glow-text">Servicios Destacados</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent mx-auto rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ perspective: "1000px" }}>
          {services.map((svc, i) => (
            <TiltCard key={i} service={svc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
