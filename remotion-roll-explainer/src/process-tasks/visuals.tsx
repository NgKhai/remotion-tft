import React from 'react';
import {interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {schedule} from './scheduler';

export const colors=['#53d9d0','#f4b860','#a59bff','#ff8f9c','#86ca86','#64b5ff'];
export const Task:React.FC<{id:number;duration:number;muted?:boolean;active?:boolean}>=({id,duration,muted,active})=><div className={`pt-task ${active?'active':''}`} style={{opacity:muted?.22:1,borderColor:colors[id%6]}}><b>T{id}</b><span>{duration} giây</span></div>;

export const Shell:React.FC<{number:number;tag:string;title:string;subtitle?:string;children:React.ReactNode}>=({number,tag,title,subtitle,children})=>{
 const frame=useCurrentFrame(); const {fps}=useVideoConfig();
 return <div className="pt-scene"><div className="pt-top"><b>THUẬT TOÁN / MÔ PHỎNG SỰ KIỆN</b><span>LEETCODE 1882 <i>•</i> HAI MIN-HEAP</span></div><header style={{opacity:interpolate(frame,[0,.5*fps],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}),translate:`0 ${interpolate(frame,[0,.6*fps],[18,0],{extrapolateRight:'clamp'})}px`}}><div className="pt-eyebrow"><b>{String(number).padStart(2,'0')}</b>{tag}</div><h1>{title}</h1>{subtitle&&<p>{subtitle}</p>}</header><main>{children}</main></div>;
};

export const Gantt:React.FC<{servers:number[];tasks:number[];count:number;time:number}>=({servers,tasks,count,time})=>{
 const all=schedule(servers,tasks); const max=Math.max(...all.map(a=>a.finish));
 return <div className="pt-gantt"><div className="pt-small">LỊCH XỬ LÝ <span>THỜI ĐIỂM KẾT THÚC KHÔNG CÒN CHIẾM MÁY</span></div><div className="pt-ticks">{Array.from({length:max+1},(_,i)=><span key={i} style={{left:`${i/max*100}%`}}>{i}</span>)}</div>{servers.map((_,s)=><div className="pt-gantt-row" key={s}><b>S{s}</b><div>{all.slice(0,count).filter(a=>a.server===s).map(a=><div className="pt-gantt-block" key={a.task} style={{left:`${a.start/max*100}%`,width:`${(a.finish-a.start)/max*100}%`,backgroundColor:colors[a.task%6]}}>T{a.task}</div>)}<i style={{left:`${Math.min(time,max)/max*100}%`}}/></div></div>)}</div>;
};

export const Simulation:React.FC<{servers:number[];tasks:number[];step:number;phase:number;clock?:number;label?:string}>=({servers,tasks,step,phase,clock,label})=>{
 const assignments=schedule(servers,tasks); const current=assignments[Math.min(step,assignments.length-1)];
 const time=clock??current.start; const assigned=phase>=.5; const count=step+(assigned?1:0);
 const past=assignments.slice(0,count); const available=servers.map((w,i)=>({w,i})).filter(s=>!past.some(a=>a.server===s.i&&a.finish>time)).sort((a,b)=>a.w-b.w||a.i-b.i);
 const busy=past.filter(a=>a.finish>time).sort((a,b)=>a.finish-b.finish||a.server-b.server);
 const travel=interpolate(phase,[.22,.48],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const serverWidth=(1350-(servers.length-1)*20)/servers.length;
 const targetX=current.server*(serverWidth+20)+serverWidth/2-52.5;
 const flightX=24+step*120+travel*(targetX-24-step*120);
 return <div className="pt-simulation"><div className="pt-sim-left"><div className="pt-panel pt-queue"><div className="pt-small">TÁC VỤ THEO THỨ TỰ ĐẾN <span>tasks = [{tasks.join(', ')}]</span></div><div className="pt-tasks">{tasks.map((d,i)=><Task key={i} id={i} duration={d} muted={i<step||(i===step&&phase>.22)||i>time} active={i===step&&!assigned}/>)}<div className="pt-queue-arrow">→</div></div><div className="pt-queue-status">{label??(time<current.start?'ĐANG CHỜ MÁY CHỦ RẢNH':assigned?`ĐÃ GÁN T${step} → S${current.server}`:`ĐẾN LƯỢT TÁC VỤ T${step}`)}</div></div><div className="pt-server-grid" style={{gridTemplateColumns:`repeat(${servers.length},1fr)`}}>{servers.map((weight,index)=>{
 const job=past.find(a=>a.server===index&&a.finish>time); const selected=current.server===index;
 const p=job?interpolate(time,[job.start,job.finish],[0,100],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}):0;
 return <div key={index} className={`pt-server ${job?'busy':'free'} ${selected?'selected':''}`}><div className="pt-server-head"><strong>S{index}</strong><span>{job?'ĐANG BẬN':'ĐANG RẢNH'}</span></div><div className="pt-server-weight"><small>TRỌNG SỐ</small><b>{weight}</b></div><div className="pt-rack"><i/><i/><i/>{job&&<span style={{backgroundColor:colors[job.task%6]}}>T{job.task}</span>}</div><div className="pt-server-finish">{job?<>Rảnh lại lúc <b>{job.finish}</b></>:<>Sẵn sàng nhận việc <b>✓</b></>}</div><div className="pt-load"><i style={{width:`${p}%`,backgroundColor:job?colors[job.task%6]:'#53d9d0'}}/></div></div>;
 })}</div><div className="pt-flying" style={{opacity:phase>.22&&phase<.49?1:0,left:flightX,top:65+travel*220,scale:1-travel*.15}}><Task id={step} duration={current.duration}/></div><Gantt servers={servers} tasks={tasks} count={count} time={time}/></div><aside className="pt-panel pt-state"><div className="pt-small">ĐỒNG HỒ MÔ PHỎNG</div><div className="pt-clock">{Number.isInteger(time)?time:time.toFixed(1)}<small>GIÂY</small></div><div className="pt-clock-rule">t = max(t, j)</div><div className="pt-state-row"><span>TÁC VỤ HIỆN TẠI</span><b>T{step}</b></div><div className="pt-state-row"><span>THỜI GIAN XỬ LÝ</span><b>{current.duration}s</b></div><div className="pt-state-row"><span>MÁY ĐƯỢC CHỌN</span><b style={{color:'#53d9d0'}}>{assigned?`S${current.server}`:'—'}</b></div><div className="pt-mini-heaps"><div><span>RẢNH / ƯU TIÊN TRƯỚC</span><b>{available.length?available.map(s=>`S${s.i}`).join(' → '):'TRỐNG'}</b></div><div><span>BẬN / XONG SỚM TRƯỚC</span><b>{busy.length?busy.map(a=>`S${a.server} @${a.finish}`).join(' · '):'TRỐNG'}</b></div></div><div className="pt-answer"><span>ans</span><b>[{assignments.slice(0,count).map(a=>a.server).join(', ')}]</b></div></aside></div>;
};

export const HeapPanel:React.FC<{title:string;kind:'free'|'busy';rows:{index:number;weight:number;finish?:number}[];highlight?:boolean}>=({title,kind,rows,highlight})=><div className={`pt-panel pt-heap ${kind}`}><div className="pt-heap-title"><span>{kind==='free'?'01':'02'}</span><h2>{title}</h2></div><p>{kind==='free'?'Ưu tiên (trọng số, chỉ số)':'Ưu tiên thời điểm hoàn thành'}</p><div className="pt-heap-root">ĐỈNH HEAP <b>↓</b></div>{rows.map((r,i)=><div key={r.index} className={`pt-heap-row ${i===0?'first':''}`} style={{opacity:highlight&&i>0?.45:1}}><span>S{r.index}</span><b>{kind==='free'?`w = ${r.weight}`:`xong lúc ${r.finish}`}</b><small>chỉ số {r.index}</small>{i===0&&<em>ƯU TIÊN</em>}</div>)}{!rows.length&&<div className="pt-heap-empty">TRỐNG</div>}<div className="pt-heap-note">HIỂN THỊ THEO THỨ TỰ ƯU TIÊN</div></div>;
