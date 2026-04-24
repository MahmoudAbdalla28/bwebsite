"use client";

import { useEffect, useRef } from "react";

interface Node {
  id: string; label: string;
  bx: number; by: number; bz: number;
  x:  number; y:  number; z:  number;
  sx: number; sy: number; scale: number;
  r:  number; tier: 0|1|2;
  fp: number; activation: number;
}
interface Edge    { fi: number; ti: number; animated: boolean; }
interface Packet  { fi: number; ti: number; t: number; speed: number; ei: number; }
interface Ambient { bx:number;by:number;bz:number; rx:number;ry:number;rz:number; }

// ── Coordinates scaled ×1.5 so the graph fills the viewport ──
const NODE_SPEC = [
  { id:"bastion", label:"Bastion",         bx:   0, by:   0, bz:   0, r:30, tier:0 },
  { id:"kg",      label:"Knowledge Graph", bx: 195, by: -15, bz:  83, r:26, tier:0 },
  { id:"risk",    label:"Risk Engine",     bx:  68, by: 132, bz: -60, r:20, tier:1 },
  { id:"vec",     label:"Vector Store",    bx: 233, by:  75, bz: -53, r:17, tier:1 },
  { id:"telem",   label:"Telemetry",       bx: 105, by: 143, bz: 120, r:17, tier:1 },
  { id:"behav",   label:"Behavioral",      bx: -38, by: 120, bz: 105, r:17, tier:1 },
  { id:"ag1",     label:"AI Agent",        bx:-263, by: -60, bz:  30, r:12, tier:2 },
  { id:"ag2",     label:"AI Agent",        bx:-233, by:  45, bz: -98, r:12, tier:2 },
  { id:"ag3",     label:"AI Agent",        bx:-278, by: 113, bz:   8, r:12, tier:2 },
  { id:"orch",    label:"Orchestrator",    bx:-165, by:-128, bz: -68, r:14, tier:2 },
  { id:"pii",     label:"PII Scanner",     bx:  30, by:-150, bz:  90, r:12, tier:2 },
  { id:"tool",    label:"Tool Audit",      bx:  90, by:-120, bz: -98, r:12, tier:2 },
  { id:"report",  label:"Report",          bx: 308, by: -75, bz:  15, r:15, tier:2 },
  { id:"policy",  label:"Policy",          bx: 278, by:  38, bz:-113, r:12, tier:2 },
  { id:"drift",   label:"Drift Detector",  bx: 240, by: 173, bz:  60, r:12, tier:2 },
  { id:"attest",  label:"Attestation",     bx: 323, by:  75, bz:  53, r:12, tier:2 },
  { id:"consist", label:"Consistency",     bx: 135, by:-180, bz: -30, r:11, tier:2 },
  { id:"rate",    label:"Rate Limiter",    bx: -83, by: 188, bz: -83, r:11, tier:2 },
] as const;

const EDGE_SPEC: Array<[string, string, boolean]> = [
  ["ag1","bastion",true], ["ag2","bastion",true], ["ag3","bastion",true],
  ["orch","bastion",true],
  ["bastion","pii",true], ["bastion","tool",true],
  ["bastion","risk",true], ["bastion","behav",true],
  ["pii","risk",false],   ["tool","risk",false],
  ["risk","kg",true],     ["risk","vec",false],
  ["behav","kg",false],   ["behav","telem",true],
  ["pii","kg",true],      ["vec","kg",true],      ["telem","kg",false],
  ["kg","report",true],   ["kg","policy",true],
  ["kg","attest",true],   ["kg","drift",true],
  ["consist","kg",false], ["rate","bastion",false], ["drift","attest",false],
];

// ── Tier colors — deep tones for white background ──
const COLORS = [
  { glo:"rgba(8,145,178,",   hi:"#0E7490", bw:2.0 },  // tier 0 — dark cyan
  { glo:"rgba(67,56,202,",   hi:"#4338CA", bw:1.4 },  // tier 1 — dark indigo
  { glo:"rgba(2,132,199,",   hi:"#0284C7", bw:0.8 },  // tier 2 — dark sky
] as const;

const rotY = (x:number,y:number,z:number,a:number)=>{const c=Math.cos(a),s=Math.sin(a);return{x:x*c+z*s,y,z:-x*s+z*c};};
const rotX = (x:number,y:number,z:number,a:number)=>{const c=Math.cos(a),s=Math.sin(a);return{x,y:y*c-z*s,z:y*s+z*c};};

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;

    let w=0, h=0, frame=0, angleY=0;
    const angleX = 0.24;

    let nodes:   Node[]    = [];
    let edges:   Edge[]    = [];
    let packets: Packet[]  = [];
    let ambients:Ambient[] = [];

    /* Perspective — CAM=380 for dramatic near/far size ratio */
    const proj = (x:number, y:number, z:number) => {
      const CAM  = 380;
      const gs   = (Math.min(w, h) / 800) * 1.10;
      const dz   = Math.max(z + CAM, 40);
      const sc   = (CAM / dz) * gs;
      return { sx: x*sc + w*0.60, sy: y*sc + h*0.50, scale: sc };
    };

    const build = () => {
      nodes = NODE_SPEC.map((s,i)=>({
        id:s.id, label:s.label,
        bx:s.bx, by:s.by, bz:s.bz,
        x:s.bx,  y:s.by,  z:s.bz,
        sx:0, sy:0, scale:1,
        r:s.r, tier:s.tier as 0|1|2,
        fp:(i/NODE_SPEC.length)*Math.PI*2,
        activation:0,
      }));

      const idx=(id:string)=>nodes.findIndex(n=>n.id===id);
      edges = EDGE_SPEC
        .map(([a,b,anim])=>({fi:idx(a),ti:idx(b),animated:anim}))
        .filter(e=>e.fi>=0&&e.ti>=0);

      packets=[];
      edges.forEach((e,ei)=>{
        if(!e.animated) return;
        for(let k=0;k<2;k++){
          packets.push({fi:e.fi,ti:e.ti,t:k*0.5+Math.random()*0.2,
            speed:0.0022+Math.random()*0.0015, ei});
        }
      });

      // Ambient scatter — vector-space feel
      ambients = Array.from({length:110},()=>({
        bx:(Math.random()-0.5)*900,
        by:(Math.random()-0.5)*600,
        bz:(Math.random()-0.5)*750,
        rx:0,ry:0,rz:0,
      }));
    };

    const resize = ()=>{
      const rect=canvas.getBoundingClientRect();
      w=rect.width; h=rect.height;
      canvas.width=w*dpr; canvas.height=h*dpr;
      ctx.setTransform(dpr,0,0,dpr,0,0);
      build();
    };
    resize();
    window.addEventListener("resize",resize);
    let animId:number;

    const draw=()=>{
      frame++;
      angleY += 0.0013;   // ~80 s per full turn — slow but clearly rotating

      ctx.clearRect(0,0,w,h);

      /* Update 3D → screen */
      for(const n of nodes){
        const fy=n.by+Math.sin(frame*0.010+n.fp)*6;
        let r=rotY(n.bx,fy,n.bz,angleY);
        r=rotX(r.x,r.y,r.z,angleX);
        n.x=r.x; n.y=r.y; n.z=r.z;
        const p=proj(n.x,n.y,n.z);
        n.sx=p.sx; n.sy=p.sy; n.scale=p.scale;
        n.activation*=0.93;
      }
      for(const a of ambients){
        let r=rotY(a.bx,a.by,a.bz,angleY);
        r=rotX(r.x,r.y,r.z,angleX);
        a.rx=r.x; a.ry=r.y; a.rz=r.z;
      }

      /* 1. Rotating perspective grid — depth-faded per line ── */
      {
        const GS=500, STEP=55, GY=160;

        /* Project a grid vertex and return its rotated z-depth too */
        const gp=(gx:number,gz:number)=>{
          let r=rotY(gx,GY,gz,angleY);
          r=rotX(r.x,r.y,r.z,angleX);
          return {...proj(r.x,r.y,r.z), rz:r.z};
        };

        ctx.save();
        ctx.lineWidth=0.8;

        /* X-direction lines — each at a fixed gz, fade by depth */
        for(let gz=-GS;gz<=GS;gz+=STEP){
          const mid=gp(0,gz);
          const d=Math.max(0,Math.min(1,(mid.rz+500)/1000));
          const alpha=0.04+d*0.28; // near=0.32, far=0.04
          ctx.strokeStyle=`rgba(8,145,178,${alpha})`;
          const p1=gp(-GS,gz),p2=gp(GS,gz);
          ctx.beginPath();ctx.moveTo(p1.sx,p1.sy);ctx.lineTo(p2.sx,p2.sy);ctx.stroke();
        }
        /* Z-direction lines — each at a fixed gx */
        for(let gx=-GS;gx<=GS;gx+=STEP){
          const mid=gp(gx,0);
          const d=Math.max(0,Math.min(1,(mid.rz+500)/1000));
          const alpha=0.04+d*0.20;
          ctx.strokeStyle=`rgba(8,145,178,${alpha})`;
          const p1=gp(gx,-GS),p2=gp(gx,GS);
          ctx.beginPath();ctx.moveTo(p1.sx,p1.sy);ctx.lineTo(p2.sx,p2.sy);ctx.stroke();
        }
        ctx.restore();
      }

      /* 2. Ambient vector-space dots ─────────────────────── */
      for(const a of ambients){
        const p=proj(a.rx,a.ry,a.rz);
        if(p.sx<-30||p.sx>w+30||p.sy<-30||p.sy>h+30) continue;
        const depth=Math.max(0,Math.min(1,(a.rz+450)/900));
        ctx.beginPath();
        ctx.arc(p.sx,p.sy,1.1*p.scale*3,0,Math.PI*2);
        ctx.fillStyle=`rgba(8,145,178,${0.10+depth*0.14})`;
        ctx.fill();
      }

      /* 3. Edges ──────────────────────────────────────────── */
      for(const e of edges){
        const a=nodes[e.fi],b=nodes[e.ti];
        const avgZ=(a.z+b.z)*0.5;
        const depth=Math.max(0,Math.min(1,(avgZ+450)/900));
        const alpha=e.animated?0.22+depth*0.18:0.08+depth*0.08;

        ctx.save();
        if(e.animated){ctx.shadowColor="rgba(8,145,178,0.30)";ctx.shadowBlur=7;}
        ctx.beginPath();ctx.moveTo(a.sx,a.sy);ctx.lineTo(b.sx,b.sy);
        ctx.strokeStyle=`rgba(51,65,85,${alpha})`;
        ctx.lineWidth=e.animated
          ?0.7+(a.scale+b.scale)*0.6
          :0.3+(a.scale+b.scale)*0.3;
        ctx.stroke();
        ctx.restore();
      }

      /* 4. Packets ───────────────────────────────────────── */
      for(const pkt of packets){
        pkt.t+=pkt.speed;
        if(pkt.t>=1.0){pkt.t-=1.0; nodes[pkt.ti].activation=1.0;}
        const e=edges[pkt.ei],a=nodes[pkt.fi],b=nodes[pkt.ti];
        const t=pkt.t;
        const px=a.sx+(b.sx-a.sx)*t, py=a.sy+(b.sy-a.sy)*t;
        const sc=a.scale+(b.scale-a.scale)*t;
        const ts=Math.max(0,t-0.10);
        const tx=a.sx+(b.sx-a.sx)*ts, ty=a.sy+(b.sy-a.sy)*ts;

        const g=ctx.createLinearGradient(tx,ty,px,py);
        g.addColorStop(0,"rgba(8,145,178,0)");
        g.addColorStop(1,"rgba(8,145,178,0.85)");
        ctx.beginPath();ctx.moveTo(tx,ty);ctx.lineTo(px,py);
        ctx.strokeStyle=g;ctx.lineWidth=2.0*sc;ctx.stroke();

        ctx.save();
        ctx.shadowColor="#0E7490";ctx.shadowBlur=14;
        ctx.beginPath();ctx.arc(px,py,2.4*sc,0,Math.PI*2);
        ctx.fillStyle="#0E7490";ctx.fill();
        ctx.restore();
      }

      /* 5. Nodes — sorted back→front ─────────────────────── */
      const sorted=[...nodes].sort((a,b)=>a.z-b.z);

      for(const n of sorted){
        const sr=n.r*n.scale*2.1;
        const act=n.activation;
        const depth=Math.max(0.06,Math.min(1.0,(n.z+420)/680));
        const C=COLORS[n.tier];

        ctx.save();
        ctx.globalAlpha=depth;

        /* Dot only */
        ctx.shadowColor=C.hi;ctx.shadowBlur=10+act*14;
        const dotR=(n.tier===0?9.0:n.tier===1?6.5:4.5)*n.scale;
        ctx.beginPath();ctx.arc(n.sx,n.sy,dotR,0,Math.PI*2);
        ctx.fillStyle=C.hi;ctx.fill();

        ctx.restore();

        /* Labels — only front/large nodes, skip kg */
        if(depth>0.48&&sr>8&&n.id!=="kg"){
          const la=Math.min(1,(depth-0.48)/0.52)*0.75;
          ctx.save();
          ctx.globalAlpha=la;
          const fs=n.tier===0
            ?Math.round(10*Math.min(n.scale*2,1.7))
            :Math.round(8.5*Math.min(n.scale*2,1.5));
          ctx.font=n.tier===0?`600 ${fs}px system-ui,sans-serif`:`${fs}px system-ui,sans-serif`;
          ctx.fillStyle=n.tier===0?"#0E7490":n.tier===1?"#4338CA":"#475569";
          ctx.textAlign="center";
          ctx.shadowColor="rgba(15,23,42,0.8)";ctx.shadowBlur=5;
          ctx.fillText(n.label,n.sx,n.sy+sr+13*Math.min(n.scale*2,1.6));
          ctx.restore();
        }
      }

      animId=requestAnimationFrame(draw);
    };

    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if(!reduced) animId=requestAnimationFrame(draw); else draw();
    return ()=>{cancelAnimationFrame(animId);window.removeEventListener("resize",resize);};
  },[]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{pointerEvents:"none"}}
      aria-hidden="true"
    />
  );
}
