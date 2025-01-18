"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

interface PopupModalImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function PopupModalImage({
  src,
  alt,
  width,
  height,
  className,
}: PopupModalImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPortalNode(document.body);
    }
  }, []);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  if (!portalNode) {
    return (
      <motion.div
        className="relative group cursor-pointer"
        onClick={handleOpen}
        layoutId={`modal-image-${src}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`${className} transition-transform group-hover:scale-105`}
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none"></div>
      </motion.div>
    );
  }

  return (
    <LayoutGroup>
      <motion.div
        className="relative group cursor-pointer"
        onClick={handleOpen}
        layoutId={`modal-image-${src}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`${className} transition-transform group-hover:scale-105`}
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none"></div>
      </motion.div>

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
              onClick={handleClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="relative max-w-4xl max-h-full"
                onClick={(e) => e.stopPropagation()}
                layoutId={`modal-image-${src}`}
                initial={{ scale: 0.75 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.75 }}
                transition={{ duration: 0.2 }}
              >
                <Image src={src} alt={alt} width={width} height={height} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        portalNode,
      )}
    </LayoutGroup>
  );
}
