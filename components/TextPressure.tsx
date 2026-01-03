import React, { useEffect, useRef, useState } from 'react';

interface TextPressureProps {
  children: string;
  className?: string;
  intensity?: number;
}

// Text Pressure - Inspiriert von React Bits MCP
// Erzeugt einen Druck-Effekt auf Text basierend auf Mausposition
const TextPressure: React.FC<TextPressureProps> = ({ 
  children, 
  className = '', 
  intensity = 0.3 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const calculatePressure = (index: number, total: number) => {
    if (!isHovering) return 0;

    const container = containerRef.current;
    if (!container) return 0;

    const rect = container.getBoundingClientRect();
    const charWidth = rect.width / total;
    const charCenterX = (index + 0.5) * charWidth;
    
    const distance = Math.abs(mousePosition.x - charCenterX);
    const maxDistance = rect.width / 2;
    const normalizedDistance = Math.min(distance / maxDistance, 1);
    
    // Druck-Effekt: Je näher die Maus, desto stärker der Effekt
    const pressure = (1 - normalizedDistance) * intensity;
    
    return pressure;
  };

  return (
    <div 
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{ position: 'relative' }}
    >
      {children.split('').map((char, index) => {
        const pressure = calculatePressure(index, children.length);
        const scale = 1 + pressure * 0.15;
        const translateY = -pressure * 8;
        const blur = pressure * 2;
        
        return (
          <span
            key={index}
            className="inline-block transition-all duration-75 ease-out"
            style={{
              transform: `scale(${scale}) translateY(${translateY}px)`,
              filter: `blur(${blur}px)`,
              textShadow: pressure > 0 
                ? `0 0 ${blur * 10}px rgba(255, 255, 255, ${pressure * 0.3})`
                : 'none',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      })}
    </div>
  );
};

export default TextPressure;

