import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'fadeInScale' | 'slideInUp';
  delay?: number;
  threshold?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  animation = 'fadeInUp',
  delay = 0,
  threshold = 0.1
}) => {
  const { elementRef, isVisible } = useScrollAnimation(threshold);

  const animationClasses = {
    fadeInUp: 'translate-y-8 opacity-0',
    fadeInLeft: '-translate-x-8 opacity-0',
    fadeInRight: 'translate-x-8 opacity-0',
    fadeInScale: 'scale-95 opacity-0',
    slideInUp: 'translate-y-12 opacity-0'
  };

  const activeClasses = {
    fadeInUp: 'translate-y-0 opacity-100',
    fadeInLeft: 'translate-x-0 opacity-100',
    fadeInRight: 'translate-x-0 opacity-100',
    fadeInScale: 'scale-100 opacity-100',
    slideInUp: 'translate-y-0 opacity-100'
  };

  return (
    <div
      ref={elementRef}
      className={cn(
        'transition-all duration-1000 ease-out',
        isVisible ? activeClasses[animation] : animationClasses[animation],
        className
      )}
      style={{
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;