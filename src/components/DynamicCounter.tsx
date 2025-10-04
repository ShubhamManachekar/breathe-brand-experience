import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCountAnimation } from '@/hooks/useScrollAnimation';

interface DynamicCounterProps {
  endValue: number;
  label: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

const DynamicCounter: React.FC<DynamicCounterProps> = ({
  endValue,
  label,
  suffix = '',
  prefix = '',
  duration = 2000,
  className = ''
}) => {
  const { elementRef, isVisible } = useScrollAnimation(0.5);
  const count = useCountAnimation(endValue, duration, isVisible);

  return (
    <div ref={elementRef} className={`text-center ${className}`}>
      <div className="text-4xl font-bold text-primary mb-2">
        {prefix}{count}{suffix}
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

export default DynamicCounter;