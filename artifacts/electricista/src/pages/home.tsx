import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Zap, Mail, Phone, Clock, ShieldCheck, Wrench, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

// Constants
const WHATSAPP_URL = "https://wa.me/542622225260?text=Hola%20Matías,%20necesito%20un%20electricista";
const EMAIL_URL = "mailto:matiludo095@gmail.com";
const PHONE_DISPLAY = "+54 2622 225260";

// Custom Background effect
const ElectricBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-50 mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] opacity-40 mix-blend-screen" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #00BFFF 1px, transparent 1px), linear-gradient(to bottom, #00BFFF 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary">
      <ElectricBackground />
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="font-serif font-bold text-xl tracking-tight hidden sm:block">
              MATÍAS LUDOVICI
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex text-muted-foreground hover:text-white hover:bg-white/5">
              <a href={EMAIL_URL}>
                <Mail className="w-4 h-4 mr-2" />
                Email
              </a>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-[0_0_20px_rgba(0,191,255,0.4)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,191,255,0.6)] rounded-full px-6">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Phone className="w-4 h-4 mr-2" />
                Contactar
              </a>
            </Button>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 px-6 flex flex-col items-center justify-center min-h-[90vh]">
          <motion.div 
            style={{ y }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto relative"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border-primary/30 text-primary text-sm font-medium tracking-wide">
              <Zap className="w-4 h-4 fill-primary/20" />
              <span>Electricista Profesional Certificado</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.1] tracking-tight mb-8 glow-text">
              ENERGÍA <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">PRECISA</span>,<br />
              SOLUCIONES SEGURAS.
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-sans leading-relaxed">
              No dejes tu seguridad en manos de cualquiera. Instalaciones, reparaciones y urgencias eléctricas con calidad premium y respuesta inmediata en todo momento.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_rgba(0,191,255,0.5)] hover:shadow-[0_0_50px_rgba(0,191,255,0.7)] transition-all">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Phone className="w-5 h-5 mr-2" />
                  WhatsApp Urgencias
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50 transition-all bg-background/50 backdrop-blur-sm">
                <a href={EMAIL_URL}>
                  <Mail className="w-5 h-5 mr-2" />
                  Solicitar Presupuesto
                </a>
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Servicios Premium</h2>
              <div className="h-1 w-20 bg-primary rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: Zap,
                  title: "Instalaciones Eléctricas",
                  desc: "Diseño y ejecución de obras eléctricas completas para residencias y comercios. Tableros, cableados y automatización con estándares de primer nivel."
                },
                {
                  icon: Wrench,
                  title: "Mantenimiento y Reparación",
                  desc: "Mantenimiento preventivo y correctivo. Detección de fallas complejas, recambio de componentes y actualización de instalaciones obsoletas."
                },
                {
                  icon: Clock,
                  title: "Emergencias 24/7",
                  desc: "Respuesta rápida ante cortes de suministro, cortocircuitos o fugas eléctricas. Soluciones inmediatas para restablecer tu tranquilidad."
                }
              ].map((svc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.2 }}
                  className="glass-panel p-8 rounded-3xl relative group overflow-hidden hover:border-primary/50 transition-colors duration-500"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 group-hover:scale-110 transform origin-center">
                    <svc.icon className="w-32 h-32 text-primary" />
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                    <svc.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-serif font-semibold mb-4">{svc.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {svc.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 px-6 relative bg-white/[0.02]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Por qué elegir a un profesional.</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  La electricidad no perdona errores. Contratar a un experto no es un gasto, es una inversión en seguridad, eficiencia y tranquilidad para tu hogar o empresa.
                </p>
                <div className="space-y-6">
                  {[
                    "Respuesta rápida garantizada",
                    "Profesional certificado e idóneo",
                    "Garantía de seguridad total",
                    "Soluciones eficientes y definitivas",
                    "Disponibilidad horaria flexible"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-lg font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-square md:aspect-video lg:aspect-square rounded-3xl glass-panel border-primary/20 overflow-hidden flex items-center justify-center glow-box"
              >
                <ShieldCheck className="w-32 h-32 md:w-48 md:h-48 text-primary opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 glass-panel p-6 rounded-2xl border-white/10">
                  <p className="font-serif font-semibold text-xl mb-2 text-primary">Confianza absoluta</p>
                  <p className="text-sm text-muted-foreground">Cada trabajo se realiza cumpliendo estrictamente las normativas vigentes de seguridad eléctrica.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center relative z-10"
          >
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 glow-text">
              ¿Necesitás una solución eléctrica urgente?
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              No esperes a que el problema sea mayor. Contactame ahora y resolvamos el inconveniente de manera rápida y segura.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button asChild size="lg" className="w-full sm:w-auto h-16 px-10 text-xl rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_40px_rgba(0,191,255,0.6)] hover:shadow-[0_0_60px_rgba(0,191,255,0.8)] transition-all">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  Escribime por WhatsApp
                  <ArrowRight className="w-6 h-6 ml-3" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-16 px-10 text-xl rounded-full border-primary/30 hover:bg-primary/10 transition-all bg-background/80">
                <a href={EMAIL_URL}>
                  Enviar Email
                </a>
              </Button>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 relative z-10 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo className="w-8 h-8" />
            <span className="font-serif font-bold tracking-wider">MATÍAS LUDOVICI</span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-muted-foreground">
            <a href={WHATSAPP_URL} className="hover:text-primary transition-colors flex items-center gap-2">
              <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
            </a>
            <a href={EMAIL_URL} className="hover:text-primary transition-colors flex items-center gap-2">
              <Mail className="w-4 h-4" /> matiludo095@gmail.com
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-white/5 text-center text-sm text-muted-foreground/60">
          <p>&copy; {new Date().getFullYear()} Matías Sebastián Ludovici. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
