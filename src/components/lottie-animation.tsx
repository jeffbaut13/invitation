"use client";

import Lottie from "lottie-react";

type LottieAnimationProps = {
  animationData: Record<string, unknown>;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
};

export default function LottieAnimation({
  animationData,
  loop = true,
  autoplay = true,
  className,
}: LottieAnimationProps) {
  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
    />
  );
}
