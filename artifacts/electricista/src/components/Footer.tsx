import { Logo } from "./Logo";
import { Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-background pt-20 pb-10 px-6 border-t border-white/5 overflow-hidden">
      {/* Subtle top gradient line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <Logo className="w-12 h-12 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
          <div>
            <p className="font-serif font-bold tracking-widest text-lg text-foreground">MATÍAS LUDOVICI</p>
            <p className="text-sm text-muted-foreground uppercase tracking-wider">Electricista Certificado</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 text-muted-foreground">
          <a href="https://wa.me/542622225260?text=Hola%20Matías,%20necesito%20un%20electricista" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Phone className="w-4 h-4" />
            +54 2622 225260
          </a>
          <a href="mailto:matiludo095@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Mail className="w-4 h-4" />
            matiludo095@gmail.com
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground/60 gap-4">
        <p>&copy; {new Date().getFullYear()} Matías Sebastián Ludovici. Todos los derechos reservados.</p>
        <p>San Rafael, Mendoza, Argentina</p>
      </div>
    </footer>
  );
}
