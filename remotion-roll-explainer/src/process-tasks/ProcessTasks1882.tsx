import React from 'react';
import {Series,useCurrentFrame,useVideoConfig,interpolate} from 'remotion';
import {TOTAL_SECONDS} from './story';
import type {Caption} from '@remotion/captions';
import captionsJson from '../../public/process-tasks/captions.json';
import {Code,Cost,Example,Heaps,Hook,Jump,Rules,Summary} from './scenes';
import './style.css';

const Captions:React.FC=()=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();const t=frame/fps;
 const captions:Caption[]=captionsJson;
 const cue=captions.find(c=>t*1000>=c.startMs&&t*1000<c.endMs);
 const fade=cue?interpolate(t*1000,[cue.startMs,cue.startMs+180,cue.endMs-180,cue.endMs],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}):0;
 return <><div className="pt-caption" style={{opacity:fade}}>{cue?.text}</div><div className="pt-global-progress"><i style={{width:`${t/TOTAL_SECONDS*100}%`}}/></div><div className="pt-footer"><span>1882 / PHÂN CÔNG TÁC VỤ</span><span>{String(Math.floor(t/60)).padStart(2,'0')}:{String(Math.floor(t%60)).padStart(2,'0')} <i>/</i> 05:40</span></div></>;
};

export const ProcessTasks1882:React.FC=()=>{
 const {fps}=useVideoConfig();
 return <div className="pt-video"><Series>
  <Series.Sequence name="Mở bài" durationInFrames={25*fps} premountFor={fps}><Hook/></Series.Sequence>
  <Series.Sequence name="Quy tắc" durationInFrames={40*fps} premountFor={fps}><Rules/></Series.Sequence>
  <Series.Sequence name="Ví dụ chính" durationInFrames={55*fps} premountFor={fps}><Example/></Series.Sequence>
  <Series.Sequence name="Cách làm chậm" durationInFrames={25*fps} premountFor={fps}><Cost/></Series.Sequence>
  <Series.Sequence name="Hai heap" durationInFrames={50*fps} premountFor={fps}><Heaps/></Series.Sequence>
  <Series.Sequence name="Nhảy thời gian" durationInFrames={60*fps} premountFor={fps}><Jump/></Series.Sequence>
  <Series.Sequence name="Giả mã" durationInFrames={55*fps} premountFor={fps}><Code/></Series.Sequence>
  <Series.Sequence name="Tổng kết" durationInFrames={30*fps} premountFor={fps}><Summary/></Series.Sequence>
 </Series><Captions/></div>;
};
