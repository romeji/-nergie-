import { useState, useEffect, useRef, useCallback } from "react";

function rnd(a,b,d=2){return parseFloat((a+Math.random()*(b-a)).toFixed(d));}

const G={
  bg:"#0d0d14",s1:"#13131f",s2:"#1a1a2e",s3:"#1e1e38",
  purple:"#a78bfa",purpleD:"#7c3aed",purpleG:"#c4b5fd",
  cyan:"#22d3ee",cyanD:"#0891b2",
  green:"#34d399",greenD:"#059669",
  orange:"#fbbf24",red:"#f87171",pink:"#f472b6",
  text:"#e2e8f0",textM:"#64748b",textD:"#334155",
  bdr:"rgba(167,139,250,0.1)",bdrG:"rgba(167,139,250,0.3)",
};

const CONCURRENTS=[
  {nom:"GEG (vous)",short:"GEG",kwh:0.2516,abo:13.47,color:G.purple,you:true},
  {nom:"EDF",short:"EDF",kwh:0.2470,abo:15.12,color:G.red},
  {nom:"TotalEnergies",short:"Total",kwh:0.2389,abo:17.50,color:G.orange,badge:"Moins cher/kWh"},
  {nom:"Engie",short:"Engie",kwh:0.2601,abo:12.00,color:G.green},
  {nom:"Octopus",short:"Octopus",kwh:0.2299,abo:19.90,color:G.cyan,badge:"Éco"},
  {nom:"Vattenfall",short:"Vattenfall",kwh:0.2450,abo:14.20,color:G.pink},
  {nom:"Ilek",short:"Ilek",kwh:0.2680,abo:11.50,color:G.orange,badge:"100% Vert"},
];

function genHourly(){
  return Array.from({length:24},(_,h)=>({
    h,label:`${String(h).padStart(2,"0")}h`,
    v:h>=7&&h<=9||h>=18&&h<=22?rnd(1.4,3.2):h<=5?rnd(0.08,0.35):rnd(0.4,1.1),
    prev:h>=7&&h<=9||h>=18&&h<=22?rnd(1.2,2.8):h<=5?rnd(0.08,0.3):rnd(0.3,1.0),
  }));
}
function genWeekly(){
  return ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"].map(l=>({l,v:rnd(4,16),prev:rnd(4,16)}));
}
function genMonthly(){
  return ["J","F","M","A","M","J","J","A","S","O","N","D"].map((l,i)=>({
    l,v:rnd(80,160)+(i<3||i>9?55:0),prev:rnd(80,160)+(i<3||i>9?55:0)
  }));
}

const HOURLY=genHourly();
const WEEKLY=genWeekly();
const MONTHLY=genMonthly();
const totalJour=parseFloat(HOURLY.reduce((s,d)=>s+d.v,0).toFixed(1));

const CONSEILS=[
  {titre:"Chauffe-eau la nuit",desc:"Heures creuses 23h–6h : divisez le coût par 1.6.",saving:60,icon:"🚿",color:G.cyan},
  {titre:"Thermostat −1°C",desc:"−7% de facture chauffage chaque degré en moins.",saving:85,icon:"🌡️",color:G.orange},
  {titre:"Supprimer les veilles",desc:"80€/an gaspillés en veille. Coupez d'un geste.",saving:80,icon:"🔌",color:G.purple},
  {titre:"LED partout",desc:"10 ampoules → 60€ économisés chaque année.",saving:60,icon:"💡",color:G.green},
  {titre:"Isolation des combles",desc:"30% des pertes passent par le toit.",saving:200,icon:"🏚️",color:G.pink},
  {titre:"Anomalie nocturne",desc:"0.9 kW à 3h du matin — appareil défaillant ?",saving:95,icon:"🔍",color:G.red},
];

const TABS=[
  {id:"dash",label:"Dashboard",icon:"◈"},
  {id:"conso",label:"Conso",icon:"⚡"},
  {id:"comp",label:"Comparatif",icon:"⚖"},
  {id:"conseils",label:"Conseils IA",icon:"✦"},
  {id:"alertes",label:"Alertes",icon:"◉"},
  {id:"profil",label:"Profil",icon:"◎"},
];

const PROFILS={
  logement:[{id:"maison",label:"Maison",icon:"🏠"},{id:"appart",label:"Appartement",icon:"🏢"},{id:"studio",label:"Studio",icon:"🚪"}],
  chauffage:[{id:"elec",label:"Électrique",icon:"⚡"},{id:"gaz",label:"Gaz",icon:"🔥"},{id:"pompe",label:"PAC",icon:"🌡️"},{id:"bois",label:"Bois",icon:"🪵"}],
  occupants:[{id:"1",label:"1 pers.",icon:"👤"},{id:"2",label:"2 pers.",icon:"👫"},{id:"3-4",label:"3–4",icon:"👨‍👩‍👧"},{id:"5+",label:"5+",icon:"👨‍👩‍👧‍👦"}],
};

// ── SVG Area Chart ──────────────────────────────────────────────
function SvgArea({data,dataKey,prevKey,color,height=160,showPrev=true}){
  const W=600,H=height,PL=8,PR=8,PT=10,PB=20;
  const vals=data.map(d=>d[dataKey]);
  const prevs=showPrev?data.map(d=>d[prevKey]||0):[];
  const allVals=[...vals,...(showPrev?prevs:[])];
  const minV=0, maxV=Math.max(...allVals)*1.15||1;
  const xS=i=>(PL+(i/(data.length-1))*(W-PL-PR));
  const yS=v=>(H-PB-((v-minV)/(maxV-minV))*(H-PT-PB));
  const makePath=arr=>{
    let d=`M ${xS(0)} ${yS(arr[0])}`;
    for(let i=1;i<arr.length;i++){
      const x0=xS(i-1),y0=yS(arr[i-1]),x1=xS(i),y1=yS(arr[i]);
      const cx=(x0+x1)/2;
      d+=` C ${cx} ${y0} ${cx} ${y1} ${x1} ${y1}`;
    }
    return d;
  };
  const makeArea=arr=>{
    const base=yS(0);
    return makePath(arr)+` L ${xS(arr.length-1)} ${base} L ${xS(0)} ${base} Z`;
  };
  const id=`sg${Math.random().toString(36).slice(2,6)}`;
  const tickEvery=Math.ceil(data.length/6);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{overflow:"visible",display:"block"}}>
      <defs>
        <linearGradient id={id+"a"} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.45"/>
          <stop offset="100%" stopColor={color} stopOpacity="0.01"/>
        </linearGradient>
        <linearGradient id={id+"b"} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={G.cyan} stopOpacity="0.18"/>
          <stop offset="100%" stopColor={G.cyan} stopOpacity="0.01"/>
        </linearGradient>
        <filter id={id+"glow"}>
          <feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {[0.25,0.5,0.75,1].map(t=>{
        const y=yS(minV+(maxV-minV)*t);
        return <line key={t} x1={PL} y1={y} x2={W-PR} y2={y} stroke="rgba(167,139,250,0.07)" strokeWidth="1"/>;
      })}
      {showPrev&&<path d={makeArea(prevs)} fill={`url(#${id}b)`} opacity="0.6"/>}
      {showPrev&&<path d={makePath(prevs)} fill="none" stroke={G.cyan} strokeWidth="1.2" strokeDasharray="5 3" opacity="0.5"/>}
      <path d={makeArea(vals)} fill={`url(#${id}a)`}/>
      <path d={makePath(vals)} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" filter={`url(#${id}glow)`}/>
      {vals.map((v,i)=>{
        if(i%tickEvery!==0&&i!==vals.length-1) return null;
        return <text key={i} x={xS(i)} y={H-4} textAnchor="middle" fontSize="9" fill={G.textM}>{data[i].label||data[i].l||data[i].h}</text>;
      })}
      {[0.5,1].map(t=>{
        const val=minV+(maxV-minV)*t;
        return <text key={t} x={PL} y={yS(val)+3} fontSize="8" fill={G.textM} textAnchor="start">{val.toFixed(1)}</text>;
      })}
    </svg>
  );
}

// ── SVG Bar Chart ──────────────────────────────────────────────
function SvgBars({data,dataKey,prevKey,colorMain,colorPrev,height=160,showLabels=true,horizontal=false}){
  if(horizontal){
    const H=data.length*44+20,W=600;
    const maxV=Math.max(...data.map(d=>d[dataKey]))*1.1||1;
    const barH=28;
    return(
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{display:"block"}}>
        <defs>
          <linearGradient id="hbarG" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={colorMain} stopOpacity="0.9"/>
            <stop offset="100%" stopColor={colorMain} stopOpacity="0.4"/>
          </linearGradient>
        </defs>
        {data.map((d,i)=>{
          const y=i*44+8;
          const bw=(d[dataKey]/maxV)*(W-100);
          return(
            <g key={i}>
              <text x="0" y={y+barH/2+4} fontSize="10" fill={G.textM} textAnchor="start">{d.nom||d.l||d.label}</text>
              <rect x={75} y={y} width={bw} height={barH} rx="6" fill="url(#hbarG)" opacity={d.you?1:0.65}/>
              {d.you&&<rect x={75} y={y} width={3} height={barH} rx="1" fill={colorMain}/>}
              <text x={75+bw+6} y={y+barH/2+4} fontSize="10" fill={d.color||colorMain} fontWeight="600">{typeof d[dataKey]==="number"?d[dataKey].toFixed(2):d[dataKey]}</text>
            </g>
          );
        })}
      </svg>
    );
  }
  const W=600,H=height,PL=8,PR=8,PT=10,PB=24;
  const n=data.length;
  const allV=data.flatMap(d=>[d[dataKey],prevKey?d[prevKey]:0]);
  const maxV=Math.max(...allV)*1.12||1;
  const grpW=(W-PL-PR)/n;
  const bw=prevKey?grpW*0.38:grpW*0.6;
  const gap=prevKey?grpW*0.06:0;
  const id=`b${Math.random().toString(36).slice(2,5)}`;
  return(
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{display:"block"}}>
      <defs>
        <linearGradient id={id+"m"} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colorMain} stopOpacity="0.95"/>
          <stop offset="100%" stopColor={colorMain} stopOpacity="0.4"/>
        </linearGradient>
        <linearGradient id={id+"p"} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colorPrev||colorMain} stopOpacity="0.4"/>
          <stop offset="100%" stopColor={colorPrev||colorMain} stopOpacity="0.1"/>
        </linearGradient>
        <filter id={id+"f"}><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {[0.25,0.5,0.75,1].map(t=>{
        const y=PT+((1-t)*(H-PT-PB));
        return <line key={t} x1={PL} y1={y} x2={W-PR} y2={y} stroke="rgba(167,139,250,0.06)" strokeWidth="1"/>;
      })}
      {data.map((d,i)=>{
        const cx=PL+i*grpW+grpW/2;
        const bh=(d[dataKey]/maxV)*(H-PT-PB);
        const by=H-PB-bh;
        const ph=prevKey?(d[prevKey]/maxV)*(H-PT-PB):0;
        const py=H-PB-ph;
        return(
          <g key={i}>
            {prevKey&&<rect x={cx-bw-gap/2} y={py} width={bw} height={ph} rx="4" fill={`url(#${id}p)`}/>}
            <rect x={cx+(prevKey?gap/2:-bw/2)} y={by} width={bw} height={bh} rx="4" fill={`url(#${id}m)`} filter={`url(#${id}f)`}/>
            {showLabels&&<text x={cx} y={H-6} textAnchor="middle" fontSize="9" fill={G.textM}>{d.l||d.label||d.nom}</text>}
          </g>
        );
      })}
    </svg>
  );
}

// ── Donut Chart ────────────────────────────────────────────────
function Donut({segments,size=130,inner=0.6}){
  const r=size/2,ri=r*inner,cx=r,cy=r;
  let angle=-Math.PI/2;
  const total=segments.reduce((s,d)=>s+d.v,0)||1;
  const paths=segments.map(seg=>{
    const a=(seg.v/total)*2*Math.PI;
    const x1=cx+r*Math.cos(angle),y1=cy+r*Math.sin(angle);
    const x2=cx+r*Math.cos(angle+a),y2=cy+r*Math.sin(angle+a);
    const xi1=cx+ri*Math.cos(angle),yi1=cy+ri*Math.sin(angle);
    const xi2=cx+ri*Math.cos(angle+a),yi2=cy+ri*Math.sin(angle+a);
    const large=a>Math.PI?1:0;
    const path=`M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${xi2} ${yi2} A ${ri} ${ri} 0 ${large} 0 ${xi1} ${yi1} Z`;
    angle+=a;
    return {path,color:seg.color,label:seg.label,pct:Math.round(seg.v/total*100)};
  });
  const id=`dn${Math.random().toString(36).slice(2,5)}`;
  return(
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      <defs>
        {paths.map((p,i)=>(
          <radialGradient key={i} id={`${id}${i}`} cx="50%" cy="50%" r="50%">
            <stop offset="40%" stopColor={p.color} stopOpacity="0.9"/>
            <stop offset="100%" stopColor={p.color} stopOpacity="0.5"/>
          </radialGradient>
        ))}
      </defs>
      {paths.map((p,i)=>(
        <path key={i} d={p.path} fill={`url(#${id}${i})`} stroke={G.s1} strokeWidth="2"/>
      ))}
      <circle cx={cx} cy={cy} r={ri-2} fill={G.s2}/>
    </svg>
  );
}

// ── Radial Gauge ───────────────────────────────────────────────
function Gauge({value,max,color,size=100,label}){
  const r=40,cx=size/2,cy=size/2;
  const startA=-200*Math.PI/180,endA=20*Math.PI/180;
  const pct=Math.min(value/max,1);
  const fillA=startA+(endA-startA)*pct;
  const arc=(a1,a2,R)=>{
    const x1=cx+R*Math.cos(a1),y1=cy+R*Math.sin(a1);
    const x2=cx+R*Math.cos(a2),y2=cy+R*Math.sin(a2);
    const large=(a2-a1)>Math.PI?1:0;
    return `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2}`;
  };
  const id=`g${Math.random().toString(36).slice(2,5)}`;
  return(
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0.4"/>
          <stop offset="100%" stopColor={color}/>
        </linearGradient>
        <filter id={id+"f"}><feGaussianBlur stdDeviation="2"/></filter>
      </defs>
      <path d={arc(startA,endA,r)} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" strokeLinecap="round"/>
      <path d={arc(startA,fillA,r)} fill="none" stroke={`url(#${id})`} strokeWidth="6" strokeLinecap="round" filter={`url(#${id}f)`}/>
      <path d={arc(startA,fillA,r)} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.9"/>
      <text x={cx} y={cy+4} textAnchor="middle" fontSize="14" fontWeight="700" fill={color}>{value}</text>
      {label&&<text x={cx} y={cy+16} textAnchor="middle" fontSize="8" fill={G.textM}>{label}</text>}
    </svg>
  );
}

// ── Sparkline ─────────────────────────────────────────────────
function Spark({data,color,w=80,h=28}){
  if(!data||data.length<2) return null;
  const min=Math.min(...data),max=Math.max(...data)||1;
  const pts=data.map((v,i)=>`${(i/(data.length-1))*w},${h-((v-min)/(max-min||1))*h}`).join(" ");
  return(
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={(data.length-1)/(data.length-1)*w} cy={h-((data[data.length-1]-min)/(max-min||1))*h} r="2.5" fill={color}/>
    </svg>
  );
}

// ── Glass Card ─────────────────────────────────────────────────
function GC({children,style={},glow=false,c=G.purple,onClick}){
  return(
    <div onClick={onClick} style={{
      background:`linear-gradient(135deg,rgba(30,28,60,0.85),rgba(20,18,40,0.9))`,
      backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",
      border:`1px solid ${glow?c+"55":G.bdr}`,
      borderRadius:20,padding:"1.1rem",position:"relative",overflow:"hidden",
      boxShadow:glow
        ?`0 0 0 1px ${c}18,0 8px 40px ${c}20,inset 0 1px 0 rgba(255,255,255,0.06),inset 0 -1px 0 rgba(0,0,0,0.3)`
        :`0 4px 24px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.04),inset 0 -1px 0 rgba(0,0,0,0.2)`,
      transition:"transform 0.22s,box-shadow 0.22s",
      cursor:onClick?"pointer":"default",
      ...style
    }}>
      {glow&&<div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${c}cc,transparent)`}}/>}
      <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,borderRadius:20,background:"radial-gradient(ellipse at 20% 0%,rgba(167,139,250,0.04),transparent 60%)",pointerEvents:"none"}}/>
      {children}
    </div>
  );
}

function Btn({children,onClick,active=false,c=G.purple,style={}}){
  return(
    <button onClick={onClick} style={{
      background:active?`linear-gradient(135deg,${c}28,${c}10)`:"rgba(255,255,255,0.02)",
      border:`1px solid ${active?c+"55":"rgba(255,255,255,0.06)"}`,
      color:active?c:G.textM,borderRadius:12,padding:"7px 16px",fontSize:12,
      fontWeight:active?600:400,cursor:"pointer",
      boxShadow:active?`0 0 16px ${c}30,inset 0 1px 0 rgba(255,255,255,0.07),inset 0 -1px 0 rgba(0,0,0,0.2)`
        :`inset 0 1px 0 rgba(255,255,255,0.04),inset 0 -1px 0 rgba(0,0,0,0.15)`,
      transition:"all 0.18s",whiteSpace:"nowrap",...style
    }}>
      {children}
    </button>
  );
}

function Bdg({children,c=G.purple}){
  return<span style={{background:`${c}18`,color:c,border:`1px solid ${c}30`,fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:20,display:"inline-flex",alignItems:"center",gap:3}}>{children}</span>;
}

function Toggle({on,onChange,c=G.purple}){
  return(
    <div onClick={()=>onChange(!on)} style={{
      width:40,height:22,borderRadius:11,cursor:"pointer",position:"relative",
      background:on?`linear-gradient(135deg,${c},${c}bb)`:`rgba(255,255,255,0.05)`,
      border:`1px solid ${on?c+"66":"rgba(255,255,255,0.08)"}`,
      boxShadow:on?`0 0 12px ${c}44,inset 0 1px 0 rgba(255,255,255,0.2)`:`inset 0 1px 0 rgba(255,255,255,0.05)`,
      transition:"all 0.28s cubic-bezier(.4,0,.2,1)"
    }}>
      <div style={{
        width:16,height:16,borderRadius:"50%",background:"white",
        position:"absolute",top:2,left:on?20:2,
        transition:"left 0.28s cubic-bezier(.4,0,.2,1)",
        boxShadow:"0 1px 4px rgba(0,0,0,0.5)"
      }}/>
    </div>
  );
}

// ── Live Ring ──────────────────────────────────────────────────
function LiveRing({value,max=4}){
  const pct=Math.min(value/max,1);
  const c=pct>0.7?G.red:pct>0.4?G.orange:G.green;
  const size=58,r=24,circ=2*Math.PI*r;
  const [tick,setTick]=useState(true);
  useEffect(()=>{const t=setInterval(()=>setTick(v=>!v),900);return()=>clearInterval(t);},[]);
  return(
    <div style={{position:"relative",width:size,height:size,flexShrink:0}}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{position:"absolute",top:0,left:0}}>
        <defs>
          <filter id="lrf"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={c+"18"} strokeWidth="4"/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={c} strokeWidth="4"
          strokeDasharray={`${pct*circ} ${circ}`} strokeDashoffset={circ/4}
          strokeLinecap="round" filter="url(#lrf)" style={{transition:"stroke-dasharray 1s ease,stroke 0.5s"}}/>
      </svg>
      <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <span style={{fontSize:13,fontWeight:800,color:c,lineHeight:1,transition:"color 0.5s"}}>{value}</span>
        <span style={{fontSize:7,color:G.textM,letterSpacing:"0.05em"}}>kW</span>
      </div>
      <div style={{position:"absolute",inset:-4,borderRadius:"50%",border:`1px solid ${c}`,opacity:tick?0.4:0,transition:"opacity 0.9s"}}/>
    </div>
  );
}

const css=`
@keyframes glow-pulse{0%,100%{box-shadow:0 0 14px rgba(167,139,250,0.35)}50%{box-shadow:0 0 30px rgba(167,139,250,0.75)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes slide-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes fade-in{from{opacity:0}to{opacity:1}}
@keyframes shimmer{0%{opacity:0.5}50%{opacity:1}100%{opacity:0.5}}
.ani{animation:slide-in 0.32s cubic-bezier(.4,0,.2,1) both}
.hover-lift{transition:transform 0.2s,box-shadow 0.2s}
.hover-lift:hover{transform:translateY(-2px)}
input[type=range]{-webkit-appearance:none;appearance:none;height:4px;border-radius:2px;outline:none;cursor:pointer}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;cursor:pointer;border:2px solid rgba(167,139,250,0.6);box-shadow:0 0 8px rgba(167,139,250,0.4)}
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:rgba(167,139,250,0.2);border-radius:2px}
`;

export default function App(){
  const [tab,setTab]=useState("dash");
  const [liveKw,setLiveKw]=useState(1.24);
  const [liveHistory,setLiveHistory]=useState(Array.from({length:20},()=>rnd(0.5,2.0)));
  const [consoMens,setConsoMens]=useState(320);
  const [subTab,setSubTab]=useState("heure");
  const [profil,setProfil]=useState({logement:"maison",chauffage:"elec",occupants:"2"});
  const [alertes,setAlertes]=useState([
    {id:1,type:"danger",titre:"Pic 3.8 kW détecté",desc:"Dépassement seuil à 19h42",time:"8 min",lu:false},
    {id:2,type:"warning",titre:"Budget 80% consommé",desc:"68€ sur 80€ ce mois",time:"2h",lu:false},
    {id:3,type:"info",titre:"Heures creuses actives",desc:"Jusqu'à 06h00 — lancez vos appareils",time:"4h",lu:true},
    {id:4,type:"success",titre:"Record économies !",desc:"−8% vs l'an dernier",time:"Hier",lu:true},
    {id:5,type:"warning",titre:"Anomalie nocturne",desc:"0.9 kW à 3h du matin",time:"2j",lu:true},
  ]);
  const [nc,setNc]=useState({email:true,sms:false,push:true,emailAddr:"moi@exemple.fr",seuilKw:3.0,seuilBudget:80});

  useEffect(()=>{
    const t=setInterval(()=>{
      setLiveKw(v=>{
        const nv=parseFloat((Math.max(0.08,v+(Math.random()-0.47)*0.22)).toFixed(2));
        setLiveHistory(h=>[...h.slice(1),nv]);
        return nv;
      });
    },1600);
    return()=>clearInterval(t);
  },[]);

  const fm=(kwh,f)=>((kwh*f.kwh)+f.abo).toFixed(2);
  const factVous=parseFloat(fm(consoMens,CONCURRENTS[0]));
  const best=CONCURRENTS.filter(c=>!c.you).reduce((a,b)=>parseFloat(fm(consoMens,a))<parseFloat(fm(consoMens,b))?a:b);
  const econo=(factVous-parseFloat(fm(consoMens,best))).toFixed(2);
  const unread=alertes.filter(a=>!a.lu).length;
  const typeC={danger:G.red,warning:G.orange,info:G.cyan,success:G.green};

  const compData=CONCURRENTS.map(c=>({
    nom:c.short,v:parseFloat(fm(consoMens,c)),color:c.color,you:c.you,
    badge:c.badge,full:c.nom,kwh:c.kwh,abo:c.abo
  })).sort((a,b)=>a.v-b.v);

  const donutData=[
    {label:"HC",v:totalJour*0.35,color:G.purple},
    {label:"HP",v:totalJour*0.65,color:G.cyan},
  ];

  return(
    <div style={{background:G.bg,minHeight:"100vh",color:G.text,fontFamily:"'Inter',system-ui,sans-serif",padding:"1rem",boxSizing:"border-box",maxWidth:920,margin:"0 auto"}}>
      <style>{css}</style>

      {/* BANNER */}
      <GC glow c={G.purple} style={{marginBottom:"1.25rem",padding:"0.9rem 1.1rem"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:42,height:42,borderRadius:13,background:`linear-gradient(135deg,${G.purple}44,${G.cyan}22)`,border:`1px solid ${G.purple}55`,display:"flex",alignItems:"center",justifyContent:"center",animation:"glow-pulse 3s infinite",flexShrink:0}}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={G.purple} strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <div>
              <p style={{margin:0,fontWeight:800,fontSize:17,letterSpacing:"-0.5px"}}>LINKY <span style={{color:G.purple}}>PRO</span></p>
              <p style={{margin:0,fontSize:10,color:G.textM,letterSpacing:"0.06em"}}>PDL 09876543210123 · GEG · DONNÉES SIMULÉES</p>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{display:"flex",alignItems:"center",gap:10,background:"rgba(10,10,20,0.7)",border:`1px solid ${G.bdr}`,borderRadius:40,padding:"6px 14px",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.04)"}}>
              <LiveRing value={liveKw}/>
              <div>
                <p style={{margin:0,fontSize:9,color:G.textM,letterSpacing:"0.06em"}}>PUISSANCE LIVE</p>
                <p style={{margin:0,fontSize:15,fontWeight:800,color:liveKw>2.5?G.red:liveKw>1.5?G.orange:G.green,transition:"color 0.5s"}}>{liveKw} kW</p>
                <Spark data={liveHistory} color={liveKw>2.5?G.red:liveKw>1.5?G.orange:G.green} w={70} h={20}/>
              </div>
            </div>
            {unread>0&&<div style={{background:`${G.red}18`,border:`1px solid ${G.red}44`,color:G.red,borderRadius:20,padding:"5px 12px",fontSize:11,fontWeight:700,animation:"shimmer 2s infinite"}}>{unread} alerte{unread>1?"s":""}</div>}
          </div>
        </div>
      </GC>

      {/* NAV */}
      <div style={{display:"flex",gap:3,marginBottom:"1.5rem",background:"rgba(13,13,20,0.9)",border:`1px solid ${G.bdr}`,borderRadius:16,padding:"4px",backdropFilter:"blur(20px)",overflowX:"auto",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.03),0 4px 20px rgba(0,0,0,0.4)"}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{
            flex:"1 0 auto",
            background:tab===t.id?`linear-gradient(135deg,${G.purple}28,${G.cyan}10)`:"transparent",
            color:tab===t.id?G.purple:G.textM,
            border:tab===t.id?`1px solid ${G.purple}44`:"1px solid transparent",
            borderRadius:12,padding:"7px 12px",fontSize:12,cursor:"pointer",
            fontWeight:tab===t.id?700:400,whiteSpace:"nowrap",
            boxShadow:tab===t.id?`0 0 14px ${G.purple}20,inset 0 1px 0 rgba(255,255,255,0.07)`:"none",
            transition:"all 0.2s",position:"relative"
          }}>
            <span style={{marginRight:4,opacity:0.7,fontSize:10}}>{t.icon}</span>{t.label}
            {t.id==="alertes"&&unread>0&&<span style={{position:"absolute",top:3,right:5,width:6,height:6,borderRadius:"50%",background:G.red,boxShadow:`0 0 6px ${G.red}`}}/>}
          </button>
        ))}
      </div>

      {/* ═══ DASHBOARD ═══ */}
      {tab==="dash"&&(
        <div className="ani">
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(135px,1fr))",gap:10,marginBottom:"1.25rem"}}>
            {[
              {l:"Aujourd'hui",v:totalJour,u:"kWh",c:G.purple,sp:HOURLY.map(d=>d.v)},
              {l:"Ce mois",v:consoMens,u:"kWh",c:G.cyan,sp:MONTHLY.map(d=>d.v),trend:"+8%"},
              {l:"Facture mois",v:factVous.toFixed(0),u:"€",c:G.orange,sp:MONTHLY.map(d=>d.v*0.2516)},
              {l:"Économie possible",v:econo,u:"€/mois",c:G.green,sp:null},
              {l:"Score énergie",v:72,u:"/100",c:G.pink,sp:null},
            ].map((k,i)=>(
              <GC key={i} glow c={k.c} style={{padding:"0.9rem"}}>
                <p style={{margin:"0 0 4px",fontSize:10,color:G.textM,textTransform:"uppercase",letterSpacing:"0.07em"}}>{k.l}</p>
                <p style={{margin:"0 0 4px",fontSize:22,fontWeight:800,color:k.c}}>{k.v}<span style={{fontSize:11,fontWeight:400,marginLeft:2,color:G.textM}}>{k.u}</span></p>
                {k.trend&&<span style={{fontSize:10,color:G.red}}>{k.trend} vs mois dernier</span>}
                {k.sp&&<div style={{marginTop:4}}><Spark data={k.sp} color={k.c} w={90} h={22}/></div>}
              </GC>
            ))}
          </div>

          <div style={{display:"grid",gridTemplateColumns:"5fr 3fr",gap:12,marginBottom:"1.25rem"}}>
            <GC glow c={G.purple}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <p style={{margin:0,fontSize:13,fontWeight:600}}>Consommation aujourd'hui vs hier</p>
                <div style={{display:"flex",gap:10}}>
                  <span style={{display:"flex",alignItems:"center",gap:4,fontSize:10,color:G.textM}}><span style={{width:12,height:2,background:G.purple,borderRadius:2,display:"inline-block"}}/> Auj.</span>
                  <span style={{display:"flex",alignItems:"center",gap:4,fontSize:10,color:G.textM}}><span style={{width:12,height:2,background:G.cyan,borderRadius:2,display:"inline-block",opacity:0.5}}/> Hier</span>
                </div>
              </div>
              <SvgArea data={HOURLY} dataKey="v" prevKey="prev" color={G.purple} height={165}/>
            </GC>
            <GC glow c={G.green}>
              <p style={{margin:"0 0 10px",fontSize:13,fontWeight:600}}>Économies détectées</p>
              <div style={{textAlign:"center",padding:"0.5rem 0",animation:"float 3s ease-in-out infinite"}}>
                <p style={{margin:0,fontSize:46,fontWeight:900,color:G.green,lineHeight:1,textShadow:`0 0 20px ${G.green}66`}}>{econo}€</p>
                <p style={{margin:"4px 0 0",fontSize:11,color:G.textM}}>par mois avec {best.nom.split(" ")[0]}</p>
                <p style={{margin:"2px 0 8px",fontSize:10,color:G.green}}>soit {(parseFloat(econo)*12).toFixed(0)}€/an</p>
                <Gauge value={Math.round(parseFloat(econo)/5)} max={20} color={G.green} size={80} label="score éco"/>
              </div>
              <Btn active c={G.green} style={{width:"100%",textAlign:"center"}} onClick={()=>setTab("comp")}>
                Voir le comparatif →
              </Btn>
            </GC>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:12}}>
            <GC glow c={G.cyan}>
              <p style={{margin:"0 0 10px",fontSize:13,fontWeight:600}}>Fournisseurs — {consoMens} kWh/mois</p>
              <SvgBars data={compData} dataKey="v" colorMain={G.purple} height={140} showLabels/>
            </GC>
            <GC>
              <p style={{margin:"0 0 8px",fontSize:13,fontWeight:600}}>HC / HP aujourd'hui</p>
              <div style={{display:"flex",alignItems:"center",gap:12,justifyContent:"center",padding:"0.5rem 0"}}>
                <Donut segments={donutData} size={110}/>
                <div>
                  {donutData.map(d=>(
                    <div key={d.label} style={{marginBottom:8}}>
                      <div style={{display:"flex",alignItems:"center",gap:5}}>
                        <div style={{width:8,height:8,borderRadius:2,background:d.color}}/>
                        <span style={{fontSize:11,color:G.textM}}>{d.label==="HC"?"Heures creuses":"Heures pleines"}</span>
                      </div>
                      <p style={{margin:"1px 0 0 13px",fontSize:15,fontWeight:700,color:d.color}}>{d.v.toFixed(1)} kWh</p>
                    </div>
                  ))}
                </div>
              </div>
            </GC>
          </div>
        </div>
      )}

      {/* ═══ CONSO ═══ */}
      {tab==="conso"&&(
        <div className="ani">
          <div style={{display:"flex",gap:6,marginBottom:"1.25rem",flexWrap:"wrap"}}>
            {[["heure","Horaire"],["semaine","Semaine"],["mois","Mensuel"]].map(([id,lbl])=>(
              <Btn key={id} active={subTab===id} onClick={()=>setSubTab(id)} c={G.purple}>{lbl}</Btn>
            ))}
          </div>
          {subTab==="heure"&&(
            <GC glow c={G.purple} style={{marginBottom:12}}>
              <p style={{margin:"0 0 10px",fontSize:13,fontWeight:600}}>Courbe horaire — aujourd'hui vs hier (kW)</p>
              <SvgArea data={HOURLY} dataKey="v" prevKey="prev" color={G.purple} height={200}/>
            </GC>
          )}
          {subTab==="semaine"&&(
            <GC glow c={G.cyan} style={{marginBottom:12}}>
              <p style={{margin:"0 0 10px",fontSize:13,fontWeight:600}}>Consommation quotidienne — 2 semaines</p>
              <SvgBars data={WEEKLY} dataKey="v" prevKey="prev" colorMain={G.cyan} colorPrev={G.cyan} height={200}/>
            </GC>
          )}
          {subTab==="mois"&&(
            <GC glow c={G.orange} style={{marginBottom:12}}>
              <p style={{margin:"0 0 10px",fontSize:13,fontWeight:600}}>Évolution annuelle — 2025 vs 2024 (kWh)</p>
              <SvgBars data={MONTHLY} dataKey="v" prevKey="prev" colorMain={G.orange} colorPrev={G.orange} height={200}/>
            </GC>
          )}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:10,marginTop:4}}>
            {[
              {l:"Aujourd'hui",v:totalJour,u:"kWh",c:G.purple},
              {l:"Semaine",v:WEEKLY.reduce((s,d)=>s+d.v,0).toFixed(1),u:"kWh",c:G.cyan},
              {l:"Mois",v:consoMens,u:"kWh",c:G.orange},
              {l:"Annuel estimé",v:(consoMens*12).toFixed(0),u:"kWh",c:G.pink},
            ].map(k=>(
              <GC key={k.l} style={{padding:"0.85rem",textAlign:"center"}}>
                <p style={{margin:"0 0 3px",fontSize:10,color:G.textM,textTransform:"uppercase",letterSpacing:"0.07em"}}>{k.l}</p>
                <p style={{margin:0,fontSize:20,fontWeight:700,color:k.c}}>{k.v}<span style={{fontSize:11,marginLeft:2,color:G.textM}}>{k.u}</span></p>
              </GC>
            ))}
          </div>
        </div>
      )}

      {/* ═══ COMPARATIF ═══ */}
      {tab==="comp"&&(
        <div className="ani">
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"1.25rem",padding:"0.75rem 1rem",background:"rgba(13,13,20,0.7)",border:`1px solid ${G.bdr}`,borderRadius:14,flexWrap:"wrap"}}>
            <span style={{fontSize:12,color:G.textM}}>Simuler pour</span>
            <input type="number" value={consoMens} onChange={e=>setConsoMens(parseInt(e.target.value)||320)}
              style={{width:80,background:"rgba(5,5,12,0.9)",border:`1px solid ${G.purple}44`,borderRadius:8,color:G.text,padding:"5px 9px",fontSize:13,outline:"none",boxSizing:"border-box"}} min={50} max={2000}/>
            <span style={{fontSize:12,color:G.textM}}>kWh/mois</span>
            <Bdg c={G.green}>● Live</Bdg>
          </div>

          <GC glow c={G.cyan} style={{marginBottom:"1.25rem"}}>
            <p style={{margin:"0 0 10px",fontSize:13,fontWeight:600}}>Facture mensuelle comparée (€)</p>
            <SvgBars data={compData.map(d=>({...d,l:d.nom}))} dataKey="v" colorMain={G.purple} height={160}/>
          </GC>

          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {compData.map((c,i)=>{
              const diff=(c.v-factVous).toFixed(2);
              const isMin=i===0;
              return(
                <GC key={c.nom} glow={c.you} c={c.color} style={{padding:"0.9rem 1rem"}} className="hover-lift">
                  {c.you&&<div style={{position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${c.color},transparent)`}}/>}
                  <div style={{display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                    <div style={{width:10,height:10,borderRadius:3,background:c.color,boxShadow:`0 0 8px ${c.color}`,flexShrink:0}}/>
                    <div style={{flex:1,minWidth:90}}>
                      <div style={{display:"flex",gap:5,alignItems:"center",flexWrap:"wrap",marginBottom:2}}>
                        <span style={{fontSize:13,fontWeight:c.you?700:500,color:c.you?G.text:G.textM}}>{c.full}</span>
                        {c.you&&<Bdg c={c.color}>Votre offre</Bdg>}
                        {c.badge&&!c.you&&<Bdg c={c.color}>{c.badge}</Bdg>}
                        {isMin&&<Bdg c={G.green}>★ Moins cher</Bdg>}
                      </div>
                      <span style={{fontSize:10,color:G.textM}}>{c.kwh.toFixed(4)} €/kWh · {c.abo.toFixed(2)}€ abo.</span>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <p style={{margin:0,fontSize:20,fontWeight:800,color:c.color}}>{c.v.toFixed(2)}<span style={{fontSize:11,color:G.textM,marginLeft:2}}>€/mois</span></p>
                      {!c.you&&<p style={{margin:0,fontSize:11,color:parseFloat(diff)>0?G.red:G.green}}>{parseFloat(diff)>0?"+":""}{diff}€ vs vous</p>}
                    </div>
                  </div>
                  <div style={{marginTop:8,height:3,background:"rgba(255,255,255,0.04)",borderRadius:4,overflow:"hidden"}}>
                    <div style={{width:`${Math.round((1-(c.v-compData[0].v)/(compData[compData.length-1].v-compData[0].v+0.01))*100)}%`,height:"100%",background:`linear-gradient(90deg,${c.color},${c.color}88)`,boxShadow:`0 0 6px ${c.color}66`,borderRadius:4,transition:"width 0.6s cubic-bezier(.4,0,.2,1)"}}/>
                  </div>
                </GC>
              );
            })}
          </div>
        </div>
      )}

      {/* ═══ CONSEILS IA ═══ */}
      {tab==="conseils"&&(
        <div className="ani">
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.25rem",flexWrap:"wrap",gap:8}}>
            <div>
              <p style={{margin:0,fontSize:13,fontWeight:600}}>Conseils personnalisés</p>
              <p style={{margin:0,fontSize:11,color:G.textM}}>
                {PROFILS.logement.find(x=>x.id===profil.logement)?.label} · {PROFILS.chauffage.find(x=>x.id===profil.chauffage)?.label} · {PROFILS.occupants.find(x=>x.id===profil.occupants)?.label}
              </p>
            </div>
            <GC style={{padding:"6px 14px",display:"inline-flex",alignItems:"center",gap:6}}>
              <span style={{fontSize:14,fontWeight:800,color:G.green}}>{CONSEILS.reduce((s,c)=>s+c.saving,0)}€</span>
              <span style={{fontSize:10,color:G.textM}}>potentiel/an</span>
            </GC>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:10,marginBottom:"1.25rem"}}>
            {CONSEILS.map((c,i)=>(
              <GC key={i} glow={i===0} c={c.color} style={{padding:"1rem"}}>
                <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                  <div style={{width:38,height:38,borderRadius:11,background:`${c.color}18`,border:`1px solid ${c.color}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{c.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:4,flexWrap:"wrap"}}>
                      <p style={{margin:0,fontSize:12,fontWeight:600}}>{c.titre}</p>
                      <Bdg c={G.green}>-{c.saving}€/an</Bdg>
                    </div>
                    <p style={{margin:"5px 0 0",fontSize:11,color:G.textM,lineHeight:1.6}}>{c.desc}</p>
                  </div>
                </div>
                <div style={{marginTop:8,height:2,background:"rgba(255,255,255,0.04)",borderRadius:2,overflow:"hidden"}}>
                  <div style={{width:`${Math.round(c.saving/200*100)}%`,height:"100%",background:`linear-gradient(90deg,${c.color},${c.color}66)`,boxShadow:`0 0 4px ${c.color}66`,borderRadius:2}}/>
                </div>
              </GC>
            ))}
          </div>

          <GC glow c={G.cyan}>
            <p style={{margin:"0 0 6px",fontSize:13,fontWeight:600}}>Générer un plan d'action IA</p>
            <p style={{margin:"0 0 12px",fontSize:11,color:G.textM}}>Plan personnalisé sur 3 mois basé sur votre profil complet.</p>
            <Btn active c={G.cyan} style={{width:"100%",textAlign:"center",padding:"10px"}} onClick={()=>{
              if(typeof sendPrompt==="function"){
                const lg=PROFILS.logement.find(x=>x.id===profil.logement)?.label||profil.logement;
                const ch=PROFILS.chauffage.find(x=>x.id===profil.chauffage)?.label||profil.chauffage;
                const oc=PROFILS.occupants.find(x=>x.id===profil.occupants)?.label||profil.occupants;
                sendPrompt(`Crée un plan d'action sur 3 mois pour réduire ma facture électricité : ${lg}, chauffage ${ch}, ${oc}. Actions concrètes par mois avec économies estimées.`);
              }
            }}>
              Générer mon plan personnalisé ↗
            </Btn>
          </GC>
        </div>
      )}

      {/* ═══ ALERTES ═══ */}
      {tab==="alertes"&&(
        <div className="ani">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:"1.25rem"}}>
            <GC glow c={G.purple}>
              <p style={{margin:"0 0 12px",fontSize:13,fontWeight:600}}>Canaux actifs</p>
              {[{id:"email",icon:"✉️",label:"Email",sub:nc.emailAddr},{id:"sms",icon:"📱",label:"SMS",sub:"+33 6 ·· ··"},{id:"push",icon:"🔔",label:"Push",sub:"Navigateur"}].map(ch=>(
                <div key={ch.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${G.bdr}`}}>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <span style={{fontSize:14}}>{ch.icon}</span>
                    <div>
                      <p style={{margin:0,fontSize:12,fontWeight:500}}>{ch.label}</p>
                      <p style={{margin:0,fontSize:10,color:G.textM}}>{ch.sub}</p>
                    </div>
                  </div>
                  <Toggle on={nc[ch.id]} onChange={v=>setNc(a=>({...a,[ch.id]:v}))} c={G.purple}/>
                </div>
              ))}
            </GC>
            <GC>
              <p style={{margin:"0 0 12px",fontSize:13,fontWeight:600}}>Seuils</p>
              {[
                {l:"Puissance max",id:"seuilKw",val:nc.seuilKw,min:1,max:9,step:0.5,unit:"kW",c:G.orange},
                {l:"Budget mensuel",id:"seuilBudget",val:nc.seuilBudget,min:20,max:300,step:5,unit:"€",c:G.red},
              ].map(s=>(
                <div key={s.id} style={{marginBottom:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <span style={{fontSize:11,color:G.textM}}>{s.l}</span>
                    <span style={{fontSize:12,fontWeight:700,color:s.c}}>{s.val} {s.unit}</span>
                  </div>
                  <input type="range" min={s.min} max={s.max} step={s.step} value={s.val}
                    onChange={e=>setNc(a=>({...a,[s.id]:parseFloat(e.target.value)}))}
                    style={{width:"100%",background:`linear-gradient(90deg,${s.c} ${((s.val-s.min)/(s.max-s.min))*100}%,rgba(255,255,255,0.07) 0)`,accentColor:s.c}}/>
                </div>
              ))}
              <input value={nc.emailAddr} onChange={e=>setNc(a=>({...a,emailAddr:e.target.value}))}
                style={{width:"100%",boxSizing:"border-box",background:"rgba(5,5,12,0.8)",border:`1px solid ${G.bdr}`,borderRadius:8,color:G.text,padding:"6px 10px",fontSize:12,outline:"none"}} type="email" placeholder="Email de contact"/>
            </GC>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {alertes.map(a=>{
              const c=typeC[a.type]||G.purple;
              return(
                <div key={a.id} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"0.85rem 1rem",background:`rgba(26,26,46,${a.lu?0.35:0.8})`,border:`1px solid ${a.lu?G.bdr:c+"44"}`,borderLeft:`3px solid ${c}`,borderRadius:"0 14px 14px 0",backdropFilter:"blur(12px)",boxShadow:a.lu?"none":`0 0 12px ${c}12`,transition:"all 0.2s"}}>
                  <div style={{width:26,height:26,borderRadius:7,background:`${c}18`,border:`1px solid ${c}33`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:11,color:c,fontWeight:800}}>
                    {a.type==="danger"?"!":a.type==="warning"?"?":a.type==="success"?"✓":"i"}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                      <p style={{margin:0,fontSize:12,fontWeight:600,color:a.lu?G.textM:G.text}}>{a.titre}</p>
                      <span style={{fontSize:10,color:G.textM,whiteSpace:"nowrap",marginLeft:8}}>{a.time}</span>
                    </div>
                    <p style={{margin:"2px 0 4px",fontSize:11,color:G.textM}}>{a.desc}</p>
                    {!a.lu&&<Bdg c={c}>Nouveau</Bdg>}
                  </div>
                  <button onClick={()=>setAlertes(v=>v.map(x=>x.id===a.id?{...x,lu:true}:x))} style={{background:"none",border:"none",cursor:"pointer",color:G.textM,fontSize:18,padding:0,lineHeight:1}}>×</button>
                </div>
              );
            })}
          </div>
          {unread>0&&<Btn active c={G.purple} style={{width:"100%",marginTop:12,textAlign:"center",padding:"9px"}} onClick={()=>setAlertes(v=>v.map(x=>({...x,lu:true})))}>Tout marquer comme lu</Btn>}
        </div>
      )}

      {/* ═══ PROFIL ═══ */}
      {tab==="profil"&&(
        <div className="ani">
          {Object.entries(PROFILS).map(([key,opts])=>(
            <GC key={key} style={{marginBottom:12}}>
              <p style={{margin:"0 0 10px",fontSize:13,fontWeight:600}}>
                {key==="logement"?"🏠 Logement":key==="chauffage"?"🔥 Chauffage":"👥 Occupants"}
              </p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(95px,1fr))",gap:8}}>
                {opts.map(o=>{
                  const on=profil[key]===o.id;
                  return(
                    <div key={o.id} onClick={()=>setProfil(p=>({...p,[key]:o.id}))} style={{
                      padding:"0.75rem 0.5rem",borderRadius:12,textAlign:"center",cursor:"pointer",
                      border:`1px solid ${on?G.purple+"66":G.bdr}`,
                      background:on?`linear-gradient(135deg,${G.purple}22,${G.cyan}0d)`:"rgba(255,255,255,0.02)",
                      boxShadow:on?`0 0 14px ${G.purple}22,inset 0 1px 0 rgba(255,255,255,0.07)`:`inset 0 1px 0 rgba(255,255,255,0.03)`,
                      transition:"all 0.18s"
                    }}>
                      <p style={{margin:"0 0 4px",fontSize:20}}>{o.icon}</p>
                      <p style={{margin:0,fontSize:11,fontWeight:on?700:400,color:on?G.text:G.textM}}>{o.label}</p>
                    </div>
                  );
                })}
              </div>
            </GC>
          ))}
          <GC glow c={G.cyan}>
            <p style={{margin:"0 0 8px",fontSize:13,fontWeight:600}}>Profil actuel</p>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
              {Object.entries(profil).map(([k,v])=>{
                const f=(PROFILS[k]||[]).find(x=>x.id===v);
                return f?<Bdg key={k} c={G.purple}>{f.icon} {f.label}</Bdg>:null;
              })}
            </div>
            <Btn active c={G.cyan} style={{width:"100%",textAlign:"center",padding:"9px"}} onClick={()=>setTab("conseils")}>Voir mes conseils personnalisés →</Btn>
          </GC>
        </div>
      )}

      <p style={{marginTop:"1.5rem",fontSize:10,color:G.textD,textAlign:"center",letterSpacing:"0.06em"}}>
        LINKY PRO · DONNÉES SIMULÉES · CONNECTEZ VOTRE PDL VIA ENEDIS DATA CONNECT POUR LES DONNÉES RÉELLES
      </p>
    </div>
  );
}
