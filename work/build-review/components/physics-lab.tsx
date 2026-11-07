"use client";

import { useEffect, useRef, useState } from "react";

type Shot = { x: number; y: number };

export function PhysicsLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);
  const [angle, setAngle] = useState(42);
  const [speed, setSpeed] = useState(24);
  const [gravity, setGravity] = useState(9.8);
  const [launch, setLaunch] = useState(0);
  const [plotWidth, setPlotWidth] = useState(0);
  const [stats, setStats] = useState({ range: 0, height: 0, time: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(() => setPlotWidth(canvas.clientWidth));
    observer.observe(canvas);
    setPlotWidth(canvas.clientWidth);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = plotWidth || canvas.clientWidth || 800;
    const height = canvas.clientHeight || 300;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);

    const radians = (angle * Math.PI) / 180;
    const range = (speed * speed * Math.sin(2 * radians)) / gravity;
    const flightTime = (2 * speed * Math.sin(radians)) / gravity;
    const maxHeight = (speed * speed * Math.sin(radians) ** 2) / (2 * gravity);
    setStats({ range: Math.max(0, range), height: maxHeight, time: flightTime });

    const margin = { left: 38, right: 18, top: 20, bottom: 34 };
    const drawWidth = width - margin.left - margin.right;
    const drawHeight = height - margin.top - margin.bottom;
    const scale = Math.min(drawWidth / Math.max(range, 1), drawHeight / Math.max(maxHeight, 1));
    const originX = margin.left;
    const originY = margin.top + drawHeight;
    const trajectory = (t: number): Shot => ({
      x: (speed * Math.cos(radians) * t) * scale,
      y: (speed * Math.sin(radians) * t - 0.5 * gravity * t * t) * scale,
    });

    context.strokeStyle = "rgba(232, 228, 220, .16)";
    context.lineWidth = 1;
    context.setLineDash([2, 7]);
    for (let i = 1; i <= 3; i += 1) {
      const y = margin.top + (drawHeight * i) / 4;
      context.beginPath(); context.moveTo(originX, y); context.lineTo(width - margin.right, y); context.stroke();
    }
    context.setLineDash([]);
    context.strokeStyle = "rgba(232, 228, 220, .42)";
    context.beginPath(); context.moveTo(originX, originY); context.lineTo(width - margin.right, originY); context.stroke();

    const steps = 100;
    context.beginPath();
    for (let i = 0; i <= steps; i += 1) {
      const point = trajectory((flightTime * i) / steps);
      const x = originX + point.x;
      const y = originY - point.y;
      if (i === 0) context.moveTo(x, y); else context.lineTo(x, y);
    }
    context.strokeStyle = "#d93636";
    context.lineWidth = 2;
    context.stroke();

    const end = trajectory(flightTime);
    context.fillStyle = "rgba(242,166,90,.9)";
    context.beginPath(); context.arc(originX + end.x, originY - end.y, 4, 0, Math.PI * 2); context.fill();
    context.fillStyle = "rgba(232, 228, 220, .48)";
    context.font = "10px 'IBM Plex Mono', monospace";
    context.fillText("0 m", originX - 4, height - 8);
    context.fillText(`${range.toFixed(0)} m`, Math.min(originX + end.x - 20, width - 58), height - 8);

    const staticFrame = context.getImageData(0, 0, canvas.width, canvas.height);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (launch > 0 && !prefersReducedMotion) {
      const started = performance.now();
      const animateShot = (now: number) => {
        const progress = Math.min((now - started) / 1150, 1);
        context.putImageData(staticFrame, 0, 0);
        const point = trajectory(flightTime * progress);
        context.fillStyle = "#e8e4dc";
        context.beginPath(); context.arc(originX + point.x, originY - point.y, 4.4, 0, Math.PI * 2); context.fill();
        if (progress < 1) frameRef.current = requestAnimationFrame(animateShot);
      };
      frameRef.current = requestAnimationFrame(animateShot);
    }

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [angle, speed, gravity, launch, plotWidth]);

  return (
    <div className="physics-lab">
      <div className="physics-lab__plot">
        <canvas ref={canvasRef} aria-label={`Projectile trajectory at ${angle} degrees, initial speed ${speed} metres per second, gravity ${gravity} metres per second squared.`} role="img" />
        <div className="physics-lab__axis" aria-hidden="true"><span>TRAJECTORY / IDEAL MODEL</span><span>NO AIR RESISTANCE</span></div>
      </div>
      <div className="physics-lab__controls">
        <label className="range-control">
          <span><span>Launch angle</span><output htmlFor="angle">{angle}°</output></span>
          <input id="angle" type="range" min="15" max="75" step="1" value={angle} onChange={(event) => setAngle(Number(event.target.value))} />
          <small>15° <span>75°</span></small>
        </label>
        <label className="range-control">
          <span><span>Initial speed</span><output htmlFor="speed">{speed} m/s</output></span>
          <input id="speed" type="range" min="12" max="30" step="1" value={speed} onChange={(event) => setSpeed(Number(event.target.value))} />
          <small>12 m/s <span>30 m/s</span></small>
        </label>
        <label className="range-control">
          <span><span>Gravity</span><output htmlFor="gravity">{gravity.toFixed(1)} m/s²</output></span>
          <input id="gravity" type="range" min="5" max="15" step="0.1" value={gravity} onChange={(event) => setGravity(Number(event.target.value))} />
          <small>5.0 m/s² <span>15.0 m/s²</span></small>
        </label>
        <div className="physics-lab__readout" aria-live="polite">
          <div><small>RANGE</small><strong>{stats.range.toFixed(1)} <i>m</i></strong></div>
          <div><small>PEAK</small><strong>{stats.height.toFixed(1)} <i>m</i></strong></div>
          <div><small>FLIGHT TIME</small><strong>{stats.time.toFixed(2)} <i>s</i></strong></div>
          <button className="launch-button" type="button" onClick={() => setLaunch((value) => value + 1)}>Run this shot <span aria-hidden="true">↗</span></button>
        </div>
      </div>
    </div>
  );
}



