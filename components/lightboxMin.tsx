"use client";

import Lightbox from "yet-another-react-lightbox";
import { useBodyScrollLock } from "@/lib/use-body-scroll-lock";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";

type Slide = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  caption?: string;
};

type Props = {
  open: boolean;
  index: number;
  images: Slide[];
  onClose: () => void;
  backdrop?: string; // ej. "rgb(0 0 0 / 0.6)"
};

export default function LightboxMin({
  open,
  index,
  images,
  onClose,
  backdrop = "rgb(0 0 0 / 0.6)",
}: Props) {
  // Bloquea el scroll cuando el lightbox está abierto
  useBodyScrollLock(open);

  return (
    <Lightbox
      open={open}
      close={onClose}
      index={index}
      slides={images}
      controller={{ closeOnBackdropClick: true }}
      styles={{ container: { backgroundColor: backdrop } }}
      render={{
        slide: ({ slide, rect }) => {
          const s = slide as Slide;
          return (
            <div
              style={{
                position: "relative",
                width: Math.round(rect.width),
                height: Math.round(rect.height),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* En móvil 100% ancho; en desktop ~60% */}
              <div className="relative h-full w-full md:w-[60%]">
                <Image
                  src={s.src}
                  alt={s.alt ?? ""}
                  fill
                  className="object-contain"
                  sizes="(min-width: 768px) 60vw, 100vw"
                  priority
                  draggable={false}
                />
              </div>
            </div>
          );
        },
      }}
    />
  );
}
