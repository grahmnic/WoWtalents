export {};

declare global {
  interface BaseComponent {
    disabled?: boolean;
    children?: React.ReactNode;
    className?: string;
    ref?: any;
  }

  interface Talent {
    id: string;
    label: string;
    fileId: string;
    summary: string;
    ranks: number;
    isActive: boolean;
    cost?: number;
    resource?: string;
    castTime?: number;
    cooldown?: number;
    minRange?: number;
    maxRange?: number;
    charges?: number;
  }
}