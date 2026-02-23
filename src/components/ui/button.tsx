import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.97] active:brightness-95",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground rounded-xl shadow-skeuo border-t border-white/30 dark:border-white/10 hover:shadow-skeuo-hover transition-all duration-300 hover:-translate-y-0.5",
        destructive:
          "bg-destructive text-destructive-foreground rounded-xl shadow-skeuo hover:shadow-skeuo-hover transition-all duration-300 hover:-translate-y-0.5",
        outline:
          "bg-transparent border-2 border-border rounded-xl hover:bg-muted/50 transition-all duration-300 text-foreground",
        secondary:
          "gradient-raised text-foreground rounded-xl shadow-skeuo border border-white/50 dark:border-white/10 hover:shadow-skeuo-hover transition-all duration-300 hover:-translate-y-0.5",
        ghost:
          "hover:bg-muted/50 rounded-xl transition-all duration-300 text-muted-foreground hover:text-foreground",
        link:
          "text-primary underline-offset-4 hover:underline",
        hero:
          "gradient-hero bg-primary text-white dark:text-amber-300 rounded-2xl font-bold tracking-wide shadow-skeuo border-t border-white/20 hover:shadow-skeuo-hover transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]",
        premium:
          "gradient-gold bg-accent text-accent-foreground rounded-2xl font-bold shadow-skeuo border-t border-yellow-200/40 dark:border-yellow-400/20 hover:shadow-glow transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]",
        glass:
          "bg-card/70 backdrop-blur-xl rounded-xl border border-white/40 dark:border-white/10 text-foreground shadow-skeuo hover:shadow-skeuo-hover transition-all duration-300 hover:-translate-y-0.5",
        luxury:
          "bg-transparent border-2 border-accent/40 text-foreground rounded-xl hover:bg-accent/5 hover:border-accent/70 font-semibold tracking-wide transition-all duration-300",
        floating:
          "gradient-raised shadow-skeuo-hover hover:shadow-skeuo-hover animate-float rounded-2xl font-bold border border-white/50 dark:border-white/10",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-xl px-4 text-xs",
        lg: "h-12 rounded-2xl px-8 text-sm",
        xl: "h-14 rounded-2xl px-10 text-base",
        icon: "h-11 w-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
