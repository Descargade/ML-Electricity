import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Menu, X } from "lucide-react";
import gsap from "gsap";
import { MagneticButton } from "./MagneticButton";

const WHATSAPP_URL = "https://wa.me/542622225260?text=Hola%20Matías,%20necesito%20un%20electricista";
const EMAIL_URL = "mailto:matiludo095@gmail.com";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".navbar-anim",
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.1 }
    );
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-panel border-b border-white/8 py-4 shadow-[0_8px_40px_rgba(0,0,0,0.4)]" : "py-6 bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 navbar-anim">
          <Logo className="w-10 h-10" />
          <span className="font-serif font-bold text-xl tracking-widest hidden sm:block glow-text">
            MATÍAS LUDOVICI
          </span>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          <MagneticButton className="navbar-anim">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-white/5" asChild>
              <a href={EMAIL_URL} data-testid="nav-email">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </a>
            </Button>
          </MagneticButton>
          <MagneticButton className="navbar-anim">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_4px_20px_rgba(77,163,255,0.3)] hover:shadow-[0_6px_28px_rgba(77,163,255,0.45)] rounded-full px-6 transition-all" asChild>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-testid="nav-whatsapp">
                <Phone className="w-4 h-4 mr-2" />
                Contactar
              </a>
            </Button>
          </MagneticButton>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden navbar-anim">
          <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6 text-primary" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full glass-panel border-b border-primary/20 p-6 flex flex-col gap-4 md:hidden">
          <Button variant="ghost" className="w-full justify-start text-lg" asChild>
            <a href={EMAIL_URL} data-testid="nav-mobile-email">
              <Mail className="w-5 h-5 mr-3 text-primary" />
              Email
            </a>
          </Button>
          <Button className="w-full justify-start text-lg bg-primary/20 text-primary hover:bg-primary/30" asChild>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" data-testid="nav-mobile-whatsapp">
              <Phone className="w-5 h-5 mr-3" />
              WhatsApp
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
}
