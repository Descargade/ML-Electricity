import { useEffect, useRef } from "react";
import gsap from "gsap";

interface MagneticButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  strength?: number;
}

export function MagneticButton({ children, className = "", strength = 0.3, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const hoverHandler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const h = rect.width / 2;
      const w = rect.height / 2;
      const x = e.clientX - rect.left - h;
      const y = e.clientY - rect.top - w;

      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const leaveHandler = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    };

    el.addEventListener("mousemove", hoverHandler);
    el.addEventListener("mouseleave", leaveHandler);

    return () => {
      el.removeEventListener("mousemove", hoverHandler);
      el.removeEventListener("mouseleave", leaveHandler);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`inline-block ${className}`} {...props}>
      {children}
    </div>
  );
}
