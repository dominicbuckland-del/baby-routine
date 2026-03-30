export function BottleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 6h4v3h-4z" fill="currentColor" opacity="0.3" />
      <path d="M12 9h8l1 4-1 2v11a2 2 0 01-2 2h-4a2 2 0 01-2-2V15l-1-2 1-4z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 15h8" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
      <path d="M13 9V7a1 1 0 011-1h4a1 1 0 011 1v2" stroke="currentColor" strokeWidth="1.8" />
      <ellipse cx="16" cy="21" rx="2.5" ry="3" fill="currentColor" opacity="0.12" />
    </svg>
  );
}

export function BreastIcon({ className = "", side = "left" }: { className?: string; side?: "left" | "right" }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <circle cx="16" cy="16" r="9" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16" cy="16" r="3" fill="currentColor" opacity="0.2" />
      {side === "left" ? (
        <path d="M10 12l-2-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      ) : (
        <path d="M22 12l2-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      )}
    </svg>
  );
}

export function MoonIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <path d="M22 18A8 8 0 1114 10a6 6 0 008 8z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M22 18A8 8 0 1114 10a6 6 0 008 8z" fill="currentColor" opacity="0.1" />
      <circle cx="23" cy="9" r="1" fill="currentColor" opacity="0.3" />
      <circle cx="26" cy="13" r="0.7" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

export function SunIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16" cy="16" r="5" fill="currentColor" opacity="0.1" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 16 + Math.cos(rad) * 8;
        const y1 = 16 + Math.sin(rad) * 8;
        const x2 = 16 + Math.cos(rad) * 10;
        const y2 = 16 + Math.sin(rad) * 10;
        return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />;
      })}
    </svg>
  );
}

export function NappyIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 12c0-1 1-2 3-2h10c2 0 3 1 3 2v4c0 5-3 8-8 8s-8-3-8-8v-4z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 12c0-1 1-2 3-2h10c2 0 3 1 3 2v4c0 5-3 8-8 8s-8-3-8-8v-4z" fill="currentColor" opacity="0.08" />
      <path d="M12 10v3" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
      <path d="M16 10v3" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
      <path d="M20 10v3" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
      <circle cx="14" cy="18" r="1" fill="currentColor" opacity="0.15" />
      <circle cx="18" cy="17" r="1.2" fill="currentColor" opacity="0.15" />
    </svg>
  );
}

export function DropletIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <path d="M16 6l6 10a6.5 6.5 0 11-12 0L16 6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M16 6l6 10a6.5 6.5 0 11-12 0L16 6z" fill="currentColor" opacity="0.1" />
    </svg>
  );
}

export function CrossIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
