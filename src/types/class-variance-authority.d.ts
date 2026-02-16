declare module 'class-variance-authority' {
  export interface VariantProps<T> {
    variant?: T extends { variant: infer V } ? V : never;
  }

  export function cva<T extends Record<string, any>>(
    base: string,
    config?: {
      variants?: T;
      defaultVariants?: Partial<T>;
    }
  ): (props?: Partial<T>) => string;
}
