import React, { useEffect, useRef } from 'react';

// LiquidEther - Fließender Hintergrund-Effekt inspiriert von React Bits MCP
const LiquidEther: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      time += 0.005;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(26, 26, 26, 0.95)');
      gradient.addColorStop(0.3, 'rgba(30, 30, 30, 0.9)');
      gradient.addColorStop(0.6, 'rgba(26, 26, 26, 0.95)');
      gradient.addColorStop(1, 'rgba(20, 20, 20, 0.9)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw liquid blobs - Ether-ähnliche Formen
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Blob 1 - Top left
      ctx.beginPath();
      const blob1X = centerX * 0.3 + Math.sin(time * 0.7) * 100;
      const blob1Y = centerY * 0.4 + Math.cos(time * 0.5) * 80;
      const blob1Radius = 200 + Math.sin(time * 0.8) * 50;
      
      for (let i = 0; i < Math.PI * 2; i += 0.1) {
        const x = blob1X + Math.cos(i) * (blob1Radius + Math.sin(i * 3 + time) * 30);
        const y = blob1Y + Math.sin(i) * (blob1Radius + Math.cos(i * 3 + time) * 30);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      
      const blob1Gradient = ctx.createRadialGradient(blob1X, blob1Y, 0, blob1X, blob1Y, blob1Radius);
      blob1Gradient.addColorStop(0, 'rgba(255, 255, 255, 0.03)');
      blob1Gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.015)');
      blob1Gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = blob1Gradient;
      ctx.fill();

      // Blob 2 - Top right
      ctx.beginPath();
      const blob2X = centerX * 1.7 + Math.cos(time * 0.6) * 120;
      const blob2Y = centerY * 0.5 + Math.sin(time * 0.7) * 90;
      const blob2Radius = 180 + Math.cos(time * 0.9) * 40;
      
      for (let i = 0; i < Math.PI * 2; i += 0.1) {
        const x = blob2X + Math.cos(i) * (blob2Radius + Math.sin(i * 4 + time * 1.2) * 25);
        const y = blob2Y + Math.sin(i) * (blob2Radius + Math.cos(i * 4 + time * 1.2) * 25);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      
      const blob2Gradient = ctx.createRadialGradient(blob2X, blob2Y, 0, blob2X, blob2Y, blob2Radius);
      blob2Gradient.addColorStop(0, 'rgba(255, 255, 255, 0.025)');
      blob2Gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.012)');
      blob2Gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = blob2Gradient;
      ctx.fill();

      // Blob 3 - Bottom center
      ctx.beginPath();
      const blob3X = centerX + Math.sin(time * 0.8) * 150;
      const blob3Y = centerY * 1.6 + Math.cos(time * 0.6) * 100;
      const blob3Radius = 220 + Math.sin(time * 0.7) * 60;
      
      for (let i = 0; i < Math.PI * 2; i += 0.1) {
        const x = blob3X + Math.cos(i) * (blob3Radius + Math.sin(i * 5 + time * 1.5) * 35);
        const y = blob3Y + Math.sin(i) * (blob3Radius + Math.cos(i * 5 + time * 1.5) * 35);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      
      const blob3Gradient = ctx.createRadialGradient(blob3X, blob3Y, 0, blob3X, blob3Y, blob3Radius);
      blob3Gradient.addColorStop(0, 'rgba(255, 255, 255, 0.02)');
      blob3Gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.01)');
      blob3Gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = blob3Gradient;
      ctx.fill();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'normal' }}
    />
  );
};

export default LiquidEther;

