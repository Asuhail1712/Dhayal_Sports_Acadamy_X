import React from 'react';

type BrandLogoProps = {
  compact?: boolean;
  className?: string;
};

export function BrandLogo({ compact = false, className = '' }: BrandLogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={`${import.meta.env.BASE_URL}images/dayal-logo.png`}
        alt="Dayal Sports Academy"
        className={`brand-logo-image w-auto object-contain ${compact ? 'h-10' : 'h-14'}`}
      />
    </div>
  );
}
