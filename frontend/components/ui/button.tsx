import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-[#FF6500] text-white hover:bg-[#FF7A1A] shadow-lg shadow-[#FF6500]/25',
        destructive: 'bg-red-500 text-white hover:bg-red-600',
        outline: 'border border-white/20 bg-transparent text-white hover:bg-white/10',
        secondary: 'bg-white/10 text-white hover:bg-white/20 border border-white/10',
        ghost: 'hover:bg-white/10 text-slate-300 hover:text-white',
        link: 'text-[#FF6500] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-6 py-2.5',
        sm: 'h-9 rounded-lg px-3.5 text-xs',
        lg: 'h-13 rounded-xl px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
