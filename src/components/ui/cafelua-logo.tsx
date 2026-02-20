import Image from "next/image";
import { cn } from "@/lib/utils";

export function nanLogo({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <Image 
        src="/nanos-logo.png" 
        alt="NaN OS Logo" 
        width={32} 
        height={32} 
        className="w-full h-full object-contain"
      />
    </div>
  );
}
