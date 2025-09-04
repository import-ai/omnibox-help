import { isBoolean } from 'lodash-es';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

interface IProps {
  visible?: boolean;
  className?: string;
  rootClassName?: string;
  slot: React.ReactNode;
  children: React.ReactNode;
}

export function Badge(props: IProps) {
  const { slot, visible, className, children, rootClassName } = props;
  const [open, setOpen] = useState(false);
  const isVisible = isBoolean(visible) && visible;
  const handleMouseEnter = () => {
    setOpen(true);
  };
  const handleMouseLeave = () => {
    setOpen(false);
  };

  return (
    <div
      className={cn('relative', rootClassName)}
      onMouseEnter={isVisible ? undefined : handleMouseEnter}
      onMouseLeave={isVisible ? undefined : handleMouseLeave}
    >
      {children}
      <div
        className={cn(
          'absolute right-[-7px] top-[-7px] z-[100] leading-[0] transition-opacity',
          className,
          {
            'opacity-0': isVisible ? false : !open,
            'opacity-100': isVisible ? isVisible : open,
          }
        )}
      >
        {slot}
      </div>
    </div>
  );
}
