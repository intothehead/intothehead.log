"use client";
import Link from "next/link";
import { motion } from "motion/react";
import RollingText from "@/components/RollingText";

const MotionLink = motion.create(Link);

type RollingLinkProps = {
  href: string;
  text: string;
  className?: string;
};

export default function RollingLink({
  href,
  text,
  className,
}: RollingLinkProps) {
  return (
    <MotionLink
      href={href}
      className={className}
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
      <RollingText text={text} />
    </MotionLink>
  );
}
