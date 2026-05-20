import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { MagneticButton } from "./MagneticButton";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Zap } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/542622225260?text=Hola%20Matías,%20necesito%20un%20electricista";
const EMAIL_URL = "mailto:matiludo095@gmail.com";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

interface Arc {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  cx: number;
  cy: number;
  progress: number;
  speed: number;
  alpha: number;
  color: string;
}

function ElectricCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animIdRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", onMouseMove);

    const PARTICLE_COUNT = 200;
    const COLORS = ["#00BFFF", "#00E5FF", "#FFD700", "#00BFFF", "#00BFFF"];

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.6 - 0.1,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    const arcs: Arc[] = Array.from({ length: 6 }, () => ({
      x1: Math.random() * canvas.width,
      y1: Math.random() * canvas.height,
      x2: Math.random() * canvas.width,
      y2: Math.random() * canvas.height,
      cx: Math.random() * canvas.width,
      cy: Math.random() * canvas.height,
      progress: Math.random(),
      speed: 0.002 + Math.random() * 0.003,
      alpha: 0.3 + Math.random() * 0.4,
      color: Math.random() > 0.3 ? "#00BFFF" : "#FFD700",
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subtle radial glow from mouse
      const mx = mouseRef.current.x || canvas.width / 2;
      const my = mouseRef.current.y || canvas.height / 2;
      const grd = ctx.createRadialGradient(mx, my, 0, mx, my, 350);
      grd.addColorStop(0, "rgba(0, 191, 255, 0.06)");
      grd.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw arcing lines
      arcs.forEach((arc) => {
        arc.progress += arc.speed;
        if (arc.progress > 1) {
          arc.progress = 0;
          arc.x1 = Math.random() * canvas.width;
          arc.y1 = Math.random() * canvas.height;
          arc.x2 = Math.random() * canvas.width;
          arc.y2 = Math.random() * canvas.height;
          arc.cx = Math.random() * canvas.width;
          arc.cy = Math.random() * canvas.height;
        }

        const t = arc.progress;
        const px = (1 - t) * (1 - t) * arc.x1 + 2 * (1 - t) * t * arc.cx + t * t * arc.x2;
        const py = (1 - t) * (1 - t) * arc.y1 + 2 * (1 - t) * t * arc.cy + t * t * arc.y2;

        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = arc.color;
        ctx.globalAlpha = arc.alpha * (1 - Math.abs(arc.progress - 0.5) * 2);
        ctx.fill();

        // Trailing glow
        ctx.shadowBlur = 12;
        ctx.shadowColor = arc.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      // Subtle grid lines
      ctx.strokeStyle = "rgba(0, 191, 255, 0.03)";
      ctx.lineWidth = 1;
      const step = 60;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      animIdRef.current = requestAnimationFrame(draw);
    };

    animIdRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animIdRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(".hero-tag", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
      .fromTo(".hero-word", { y: 60, opacity: 0, skewY: 4 }, { y: 0, opacity: 1, skewY: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" }, "-=0.5")
      .fromTo(".hero-desc", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.3")
      .fromTo(".hero-actions", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.4")
      .fromTo(".hero-scroll", { opacity: 0 }, { opacity: 0.5, duration: 1 }, "-=0.2");
  }, []);

  const titleWords = ["SOLUCIONES", "ELÉCTRICAS", "MODERNAS,", "RÁPIDAS", "Y", "PROFESIONALES."];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
      {/* Animated canvas background */}
      <div className="absolute inset-0 z-0 bg-background">
        {mounted && <ElectricCanvas />}
        {/* Deep glow overlays */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-yellow-400/5 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="hero-tag opacity-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel mb-10 border border-primary/30 text-primary text-sm font-medium tracking-widest uppercase">
          <Zap className="w-4 h-4" />
          <span>Electricista Certificado — San Rafael, Mendoza</span>
        </div>

        {/* Title */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[1.0] tracking-tight mb-10 overflow-hidden">
          {titleWords.map((word, i) => (
            <span
              key={i}
              className={`hero-word opacity-0 inline-block mr-4 mb-2 ${
                i === 0
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-primary electric-text"
                  : i === 4 || i === 5
                  ? "text-yellow-400"
                  : "text-foreground"
              }`}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="hero-desc opacity-0 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-14 font-sans leading-relaxed">
          Servicio profesional de instalaciones, mantenimiento y emergencias eléctricas.
          Con años de experiencia y compromiso total con la seguridad.
        </p>

        {/* CTA Buttons */}
        <div className="hero-actions opacity-0 flex flex-col sm:flex-row items-center justify-center gap-5">
          <MagneticButton strength={0.35}>
            <Button
              asChild
              size="lg"
              className="h-16 px-10 text-base rounded-full bg-primary hover:bg-primary/90 text-background font-bold tracking-wide shadow-[0_0_40px_rgba(0,191,255,0.4)] hover:shadow-[0_0_70px_rgba(0,191,255,0.7)] transition-all duration-300 w-full sm:w-auto"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-testid="hero-whatsapp-btn">
                <Phone className="w-5 h-5 mr-3" />
                WhatsApp — Atención Inmediata
              </a>
            </Button>
          </MagneticButton>

          <MagneticButton strength={0.25}>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-16 px-10 text-base rounded-full border-primary/40 text-foreground hover:bg-primary/10 hover:border-primary/70 bg-white/5 backdrop-blur-sm transition-all duration-300 w-full sm:w-auto"
            >
              <a href={EMAIL_URL} data-testid="hero-email-btn">
                <Mail className="w-5 h-5 mr-3" />
                Solicitar Presupuesto
              </a>
            </Button>
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0">
        <span className="text-xs uppercase tracking-widest text-muted-foreground font-display">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
}
