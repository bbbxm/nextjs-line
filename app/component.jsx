"use client";
import React, { useRef, useEffect, useState } from "react";

const LineChart = () => {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [element, setElement] = useState(null);
  const [drawing, setDrawing] = useState(false);
  // const [data, setData] = useState(
  //   new Array(12).fill(null).map(() => Math.random())
  // );

  const [points, setPoints] = useState(
    new Array(24).fill(null).map((i, index) => {
      return {
        x: index * (1020 / 23) + 100,
        y: Math.random() * 400 + 100,
        r: 5,
      };
    })
  );

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 1220;
      canvas.height = 600;
      const context = canvas.getContext("2d");
      context.font = "15px sans-serif";
      context.textAlign = "right";
      context.fillStyle = "gray";
      setContext(context);
      init(context);
      draw(context);
    }
    console.log("rerender...");
  }, [points]);

  const drawLine = (context, p1, p2) => {
    context.save();
    context.beginPath();
    context.strokeStyle = "green";
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.stroke();
    context.closePath();
    context.restore();
  };

  const drawLines = (context) => {
    if (points.length < 1) {
      return;
    }
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = "green";
    context.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      context.lineTo(points[i].x, points[i].y);
    }
    context.stroke();
    context.closePath();
  };

  const drawPoint = (context, x, y, r) => {
    context.save();
    context.lineWidth = 2;
    context.moveTo(x, y);
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, 0);
    context.fillStyle = "#fff";
    context.fill();
    context.strokeStyle = "green";
    context.stroke();
    context.closePath();
    context.restore();
  };

  const drawPoints = (context) => {
    points.forEach((p) => drawPoint(context, p.x, p.y, p.r));
  };

  const draw = (context) => {
    drawLines(context);
    drawPoints(context);
  };

  const init = (context) => {
    //  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    context.beginPath();
    context.moveTo(100, 500);
    context.lineTo(100, 100);
    context.moveTo(100, 500);
    context.lineTo(1120, 500);
    context.stroke();
    context.closePath();
    context.beginPath();
    for (let i = 0; i <= 10; i++) {
      context.moveTo(100, i * 40 + 100);
      context.lineTo(1120, i * 40 + 100);
      context.fillText((10 - i) * 10, 90, i * 40 + 107);
    }

    for (let i = 0; i < 24; i++) {
      context.moveTo(i * (1020 / 23) + 100, 100);
      context.lineTo(i * (1020 / 23) + 100, 500);
      context.fillStyle = "gray";
      context.fillText(i + "h", i * (1020 / 23) + 115, 520);
      context.fillStyle = "#2ed573";
      context.fillText(
        ((1 - (points[i].y - 100) / 400) * 100) | 0,
        i * (1020 / 23) + 115,
        90
      );
    }

    context.lineWidth = 0.3;
    context.stroke();
    context.closePath();
  };

  const inCircle = (p, x, y, r) => {
    return Math.sqrt((p.x - x) ** 2 + (p.y - y) ** 2) <= r ? true : false;
  };

  const handleMouseDown = (event) => {
    setDrawing(true);

    const clientX = event.nativeEvent.offsetX;
    const clientY = event.nativeEvent.offsetY;

    const pointsCopy = [...points];

    pointsCopy.forEach((p) => {
      if (inCircle(p, clientX, clientY, p.r)) {
        p.r = 8;
      }
    });

    setPoints(pointsCopy);
  };

  const handleMouseMove = (event) => {
    if (!drawing) return;

    const clientX = event.nativeEvent.offsetX;
    const clientY = event.nativeEvent.offsetY;

    const pointsCopy = [...points];

    pointsCopy.forEach((p) => {
      if (p.r === 8) {
        p.y = clientY >= 500 ? 500 : clientY <= 100 ? 100 : clientY;
      }
    });

    setPoints(pointsCopy);
  };

  const handleMouseUp = () => {
    setDrawing(false);

    const pointsCopy = [...points];
    pointsCopy.forEach((p) => {
      p.r = 5;
    });

    setPoints(pointsCopy);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
        className="border border-gray-400"
      />
    </div>
  );
};

export default LineChart;
