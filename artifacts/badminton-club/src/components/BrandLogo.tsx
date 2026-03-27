import React from 'react';

type BrandLogoProps = {
  compact?: boolean;
  className?: string;
};

export function BrandLogo({ compact = false, className = '' }: BrandLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative shrink-0 ${compact ? 'h-10 w-12' : 'h-14 w-16'}`}>
        <div className="brand-logo-mark absolute left-0 top-1/2 h-8 w-14 -translate-y-1/2 rounded-[999px] opacity-95" />
        <div className="brand-logo-mark-inner absolute left-3 top-1/2 h-5 w-9 -translate-y-1/2 rounded-[999px]" />
        <div className="brand-logo-shuttle absolute right-0 top-0 h-4 w-4 rounded-full" />
        <div className="brand-logo-feather absolute right-1 top-3 h-5 w-3 rounded-full" />
      </div>
      <div className="leading-none">
        <div className={`font-display font-black italic tracking-tight text-white ${compact ? 'text-2xl' : 'text-3xl'}`}>
          Dayal
        </div>
        <div className={`font-display font-extrabold italic tracking-tight text-white/95 ${compact ? 'text-lg' : 'text-2xl'}`}>
          Sports Academy
        </div>
      </div>
    </div>
  );
}
