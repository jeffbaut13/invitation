"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

type Props = {
  frontData: Record<string, unknown>;
  backData: Record<string, unknown>;
  interval?: number;
  className?: string;
};

export default function LottieFlipSlider({
  frontData,
  backData,
  interval = 3500,
  className,
}: Props) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setFlipped((f) => !f), interval);
    return () => clearInterval(timer);
  }, [interval]);

  return (
    <div className={className} style={{ perspective: "900px" }}>
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: "relative",
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Frente */}
        <div style={{ backfaceVisibility: "hidden", width: "100%", height: "100%" }}>
          <Lottie animationData={frontData} loop autoplay />
        </div>

        {/* Reverso — pre-rotado 180° para que al girar quede visible */}
        <div
          style={{
            backfaceVisibility: "hidden",
            position: "absolute",
            inset: 0,
            transform: "rotateY(180deg)",
            width: "100%",
            height: "100%",
          }}
        >
          <Lottie animationData={backData} loop autoplay />
        </div>
      </motion.div>
    </div>
  );
}
