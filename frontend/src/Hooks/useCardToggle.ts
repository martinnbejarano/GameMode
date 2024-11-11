import { useEffect, useRef, useState } from "react";

export const useCardToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handlerClick = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handlerEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handlerClick);
      document.addEventListener("keydown", handlerEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handlerClick);
      document.removeEventListener("keydown", handlerEscapeKey);
    };
  }, [isOpen]);

  return { isOpen, setIsOpen, cardRef };
};
