import Image from "next/image";
import type { Dictionary } from "@/i18n/dictionaries/types";
import { SectionReveal } from "@/components/home/section-reveal";

export function UsbBoot({ dict }: { dict: Dictionary }) {
  const { usbBoot } = dict.home;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
      <SectionReveal>
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/70 shadow-sm backdrop-blur-sm">
          <div className="grid items-center gap-8 md:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/plug-usb-and-run-ai.webp"
                alt={usbBoot.imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Text */}
            <div className="px-6 py-8 md:px-10 md:py-12">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                  {usbBoot.title}
                </span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {usbBoot.description}
              </p>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
