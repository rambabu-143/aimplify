"use client";

import { motion } from "framer-motion";
import { Bot, Database, Mail, BarChart3, Zap, TrendingUp, DollarSign } from "lucide-react";

/* ─── node data ───────────────────────────────────────────────── */
const leftNodes = [
  { icon: Database, label: "CRM & Leads",   color: "#6366f1", y: 64  },
  { icon: Mail,     label: "Email Campaigns",color: "#10b981", y: 160 },
  { icon: BarChart3,label: "Site Analytics", color: "#f59e0b", y: 256 },
];

const rightNodes = [
  { icon: Zap,        label: "Tasks Automated", color: "#6366f1", y: 64  },
  { icon: TrendingUp, label: "Revenue +32%",    color: "#10b981", y: 160 },
  { icon: DollarSign, label: "Costs Down 40%",  color: "#f59e0b", y: 256 },
];

/* ─── SVG path strings ─────────────────────────────────────────── */
const inPaths = [
  "M 145 64  C 188 64  222 160 248 160",
  "M 145 160 L 248 160",
  "M 145 256 C 188 256 222 160 248 160",
];
const outPaths = [
  "M 312 160 C 338 160 372 64  415 64",
  "M 312 160 L 415 160",
  "M 312 160 C 338 160 372 256 415 256",
];

/* ─── Dot component (native SVG animateMotion) ─────────────────── */
function FlowDot({ path, color, delay }: { path: string; color: string; delay: string }) {
  return (
    <circle r="4" fill={color} opacity="0.85">
      {/* @ts-expect-error — animateMotion is a valid SVG element */}
      <animateMotion
        dur="2.6s"
        repeatCount="indefinite"
        begin={delay}
        path={path}
        calcMode="spline"
        keyTimes="0;1"
        keySplines="0.4 0 0.6 1"
      />
    </circle>
  );
}

/* ─── Node card (foreignObject) ───────────────────────────────── */
function NodeCard({
  x, y, icon: Icon, label, color, align,
}: {
  x: number; y: number; icon: React.ElementType;
  label: string; color: string; align: "left" | "right";
}) {
  const w = 130;
  const h = 44;
  return (
    <foreignObject x={x} y={y - h / 2} width={w} height={h}>
      <div
        // @ts-expect-error — xmlns needed for SVG foreignObject
        xmlns="http://www.w3.org/1999/xhtml"
        className={`flex items-center gap-2 h-full w-full ${align === "right" ? "flex-row-reverse" : ""}`}
      >
        <div
          className="w-[44px] h-[44px] shrink-0 rounded-xl border border-neutral-200 bg-white shadow-sm flex items-center justify-center"
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
        >
          <Icon size={18} style={{ color }} />
        </div>
        <span
          className={`text-[11px] font-medium leading-tight text-neutral-600 ${align === "right" ? "text-right" : "text-left"}`}
        >
          {label}
        </span>
      </div>
    </foreignObject>
  );
}

/* ─── Main component ───────────────────────────────────────────── */
export default function FlowDiagram() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="relative w-full max-w-[560px] mx-auto"
      style={{ aspectRatio: "560/320" }}
    >
      <svg
        viewBox="0 0 560 320"
        className="w-full h-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── glow paths (thick, low opacity) ── */}
        {[...inPaths, ...outPaths].map((d, i) => (
          <path
            key={`glow-${i}`}
            d={d}
            stroke={[...leftNodes, ...rightNodes][i % 6]?.color ?? "#ccc"}
            strokeWidth="8"
            fill="none"
            opacity="0.06"
            strokeLinecap="round"
          />
        ))}

        {/* ── dashed track lines ── */}
        {[...inPaths, ...outPaths].map((d, i) => (
          <path
            key={`track-${i}`}
            d={d}
            stroke="#e5e5e5"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="5 5"
            strokeLinecap="round"
          />
        ))}

        {/* ── flowing dots on input paths ── */}
        {inPaths.map((path, i) => (
          <g key={`indot-${i}`}>
            <FlowDot path={path} color={leftNodes[i].color} delay={`${i * 0.7}s`} />
            <FlowDot path={path} color={leftNodes[i].color} delay={`${i * 0.7 + 1.3}s`} />
          </g>
        ))}

        {/* ── flowing dots on output paths ── */}
        {outPaths.map((path, i) => (
          <g key={`outdot-${i}`}>
            <FlowDot path={path} color={rightNodes[i].color} delay={`${i * 0.7 + 0.35}s`} />
            <FlowDot path={path} color={rightNodes[i].color} delay={`${i * 0.7 + 1.65}s`} />
          </g>
        ))}

        {/* ── left node cards ── */}
        {leftNodes.map((n, i) => (
          <motion.g
            key={`ln-${i}`}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.12, duration: 0.5, ease: "easeOut" }}
          >
            <NodeCard x={10} y={n.y} icon={n.icon} label={n.label} color={n.color} align="left" />
          </motion.g>
        ))}

        {/* ── center node ── */}
        {/* pulse rings */}
        {[1, 2, 3].map((ring) => (
          <motion.circle
            key={`ring-${ring}`}
            cx={280} cy={160} r={30}
            fill="none"
            stroke="black"
            strokeWidth="1"
            initial={{ scale: 1, opacity: 0.3 }}
            animate={{ scale: 1 + ring * 0.28, opacity: 0 }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              delay: ring * 0.55,
              ease: "easeOut",
            }}
            style={{ transformOrigin: "280px 160px" }}
          />
        ))}

        {/* center circle */}
        <motion.circle
          cx={280} cy={160} r={30}
          fill="#0a0a0a"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
          style={{ transformOrigin: "280px 160px" }}
        />

        {/* center icon (Bot) via foreignObject */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
        >
          <foreignObject x={256} y={136} width={48} height={48}>
            <div
              // @ts-expect-error
              xmlns="http://www.w3.org/1999/xhtml"
              className="w-full h-full flex items-center justify-center"
            >
              <Bot size={22} color="white" />
            </div>
          </foreignObject>

          {/* label below */}
          <text
            x={280} y={206}
            textAnchor="middle"
            className="text-[11px] font-semibold fill-neutral-500"
            fontSize="11"
            fill="#737373"
            fontFamily="inherit"
            fontWeight="600"
          >
            AI Core
          </text>
        </motion.g>

        {/* ── right node cards ── */}
        {rightNodes.map((n, i) => (
          <motion.g
            key={`rn-${i}`}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.5, ease: "easeOut" }}
          >
            <NodeCard x={420} y={n.y} icon={n.icon} label={n.label} color={n.color} align="right" />
          </motion.g>
        ))}
      </svg>

      {/* floating "live" badge */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.4 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-200 bg-white shadow-sm text-xs font-medium text-neutral-500"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Processing live
      </motion.div>
    </motion.div>
  );
}
