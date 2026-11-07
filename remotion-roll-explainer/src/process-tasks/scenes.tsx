import React from 'react';
import {interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {chapters,example,waiting} from './story';
import {HeapPanel,Shell,Simulation,Task} from './visuals';
import {sequenceBeat,jumpBeat} from './timing';

const useSeconds=()=>{const f=useCurrentFrame();const {fps}=useVideoConfig();return f/fps;};

export const Hook:React.FC=()=>{
 const t=useSeconds();const {step,phase}=sequenceBeat(t,6,4);
 return <Shell number={1} tag={chapters[0].tag} title={chapters[0].title} subtitle="Ai được nhận việc trước? Khi nào tác vụ phải chờ?"><Simulation {...waiting} step={step} phase={phase} clock={step===2&&phase<.4?2:undefined}/></Shell>;
};

export const Rules:React.FC=()=>{
 const t=useSeconds(); const active=Math.floor(t/6.67);
 return <Shell number={2} tag={chapters[1].tag} title={chapters[1].title} subtitle="Đến trước → xử lý trước. Máy rảnh → trọng số nhỏ → chỉ số nhỏ."><div className="pt-rules"><div className="pt-panel pt-task-definition"><div className="pt-small">GIẢI MÃ MỘT TÁC VỤ</div><div className="pt-definition-hero"><Task id={2} duration={3}/><div><span>tasks[2] = 3</span><b>Đến lúc <em>2</em> · cần <em>3</em> giây</b></div></div><div className="pt-arrival-line"><span>ĐẾN</span><b>2</b><i/><span>BẮT ĐẦU</span><b>{active<1?2:5}</b><i/><span>XONG</span><b>{active<1?5:8}</b></div><div className="pt-large-equation">kết thúc <span>=</span> bắt đầu <span>+</span> thời lượng</div><p className="pt-callout">Thời điểm đến có thể sớm hơn thời điểm bắt đầu.</p></div><div className="pt-panel pt-priority"><div className="pt-small">CHỌN TRONG NHÓM ĐANG RẢNH</div>{[{id:0,w:3},{id:1,w:3},{id:2,w:2}].map((s,i)=><div className={`pt-priority-row ${i===2&&active<3?'chosen':''} ${i===0&&active>=3?'chosen':''}`} key={s.id}><b>S{s.id}</b><span>trọng số <strong>{s.w}</strong></span><small>{i===2&&active>=3?'ĐANG BẬN':i===0&&active>=3?'CHỈ SỐ NHỎ HƠN':i===2?'TRỌNG SỐ NHỎ NHẤT':'ĐANG RẢNH'}</small></div>)}<div className="pt-rule-order"><span>RẢNH</span>→<span>TRỌNG SỐ</span>→<span>CHỈ SỐ</span></div></div></div><div className="pt-bottom-note">Trọng số là tiêu chí lựa chọn, không phải tốc độ xử lý.</div></Shell>;
};

export const Example:React.FC=()=>{
 const t=useSeconds();const {step,phase}=sequenceBeat(t,7.8,6,4);
 return <Shell number={3} tag={chapters[2].tag} title={chapters[2].title} subtitle="servers = [3, 3, 2]     •     tasks = [1, 2, 3, 2, 1, 2]"><Simulation {...example} step={step} phase={phase}/></Shell>;
};

export const Cost:React.FC=()=>{
 const t=useSeconds(); const scan=Math.floor(t*5)%120;
 return <Shell number={4} tag={chapters[3].tag} title={chapters[3].title} subtitle="Mỗi tác vụ quét n máy chủ → O(n × m)"><div className="pt-cost-layout"><div className="pt-panel pt-scan"><div className="pt-small">MỖI HÀNG LÀ MỘT TÁC VỤ</div><div className="pt-scan-grid">{Array.from({length:120},(_,i)=><div key={i} style={{backgroundColor:i===scan?'#f4b860':i<scan?'#22565c':'#142b3e'}}/>)}</div><div className="pt-scan-label"><b>m TÁC VỤ</b><span>×</span><b>n MÁY CHỦ</b></div></div><div className="pt-cost-right"><div className="pt-cost-input">200.000 × 200.000</div><div className="pt-cost-number">40 <em>TỶ</em></div><p>LƯỢT XÉT TRONG TRƯỜNG HỢP XẤU NHẤT</p><div className="pt-question"><b>01</b> Máy rảnh nào tốt nhất?</div><div className="pt-question"><b>02</b> Máy bận nào sắp xong?</div></div></div></Shell>;
};

export const Heaps:React.FC=()=>{
 const t=useSeconds();const stage=Math.min(4,Math.floor(t/10));
 const free=stage===0?[{index:2,weight:2},{index:0,weight:3},{index:1,weight:3}]:stage===1?[{index:0,weight:3},{index:1,weight:3}]:stage===2?[{index:1,weight:3}]:[{index:2,weight:2},{index:1,weight:3}];
 const busy=stage===0?[]:stage===1?[{index:2,weight:2,finish:3}]:stage===2?[{index:2,weight:2,finish:3},{index:0,weight:3,finish:5}]:[{index:0,weight:3,finish:5}];
 const direction=stage>=3;
 return <Shell number={5} tag={chapters[4].tag} title={chapters[4].title} subtitle="Một cấu trúc chọn máy. Một cấu trúc quản lý thời điểm."><div className="pt-heap-layout"><HeapPanel title="Máy chủ rảnh" kind="free" rows={free} highlight/><div className="pt-transfer"><div className="pt-transfer-clock">t = {stage>=3?3:stage===2?2:stage===1?1:0}</div><div className="pt-transfer-arrow">{direction?'←':'→'}</div><div className="pt-transfer-chip" style={{translate:`${interpolate((t%10),[0,5,10],direction?[80,0,-80]:[-80,0,80],{extrapolateRight:'clamp'})}px 0`}}>S{direction?2:stage===2?0:2}</div><b>{direction?'ĐÃ HOÀN THÀNH':'NHẬN TÁC VỤ'}</b><p>{direction?'finish ≤ t':'finish = t + thời lượng'}</p></div><HeapPanel title="Máy chủ bận" kind="busy" rows={busy} highlight/></div><div className="pt-bottom-note">Heap chỉ bảo đảm phần tử ưu tiên nhất ở đỉnh; không cần sắp xếp toàn bộ mảng.</div></Shell>;
};

export const Jump:React.FC=()=>{
 const t=useSeconds();const {step,phase,clock}=jumpBeat(t);
 const label=t>=15&&t<22.5?'CẢ HAI MÁY ĐỀU BẬN':t>=22.5&&t<30?'NHẢY ĐẾN THỜI ĐIỂM SỚM NHẤT':t>=30&&t<37.5?'GIẢI PHÓNG CẢ S0 VÀ S1':t>=45?'T3 NHẬN MÁY NGAY TRONG GIÂY 5':undefined;
 return <Shell number={6} tag={chapters[5].tag} title={chapters[5].title} subtitle="servers = [5, 1]     •     tasks = [5, 4, 1, 1]"><Simulation {...waiting} step={step} phase={phase} clock={clock} label={label}/><div className={`pt-jump-banner ${t>=30&&t<37.5?'visible':''}`}>CÙNG XONG LÚC 5 → TRẢ CẢ HAI MÁY VỀ HEAP RẢNH</div></Shell>;
};

const lines=[
 'for j = 0 … m − 1:',
 '    t = max(t, j)',
 '    giải_phóng_mọi_máy(finish ≤ t)',
 '    if heap_rảnh.trống():',
 '        t = heap_bận.đỉnh().finish',
 '        giải_phóng_mọi_máy(finish ≤ t)',
 '    s = heap_rảnh.lấy_đỉnh()',
 '    ans[j] = s.index',
 '    finish = t + tasks[j]',
 '    heap_bận.thêm(finish, s.index)',
 'return ans',
];
export const Code:React.FC=()=>{
 const t=useSeconds();const line=t<6?1:t<14?2:t<20?3:t<25?4:t<32?5:t<37?6:t<41?7:t<45?8:t<49?9:10;
 return <Shell number={7} tag={chapters[6].tag} title={chapters[6].title} subtitle="Duyệt từ trái sang phải là đủ để giữ đúng thứ tự tác vụ."><div className="pt-code-layout"><div className="pt-panel pt-code"><div className="pt-code-top"><span>GIẢ MÃ</span><span>O((n + m) log n)</span></div>{lines.map((text,i)=><div key={i} className={`pt-code-line ${line===i?'active':''}`}><small>{String(i+1).padStart(2,'0')}</small><code>{text}</code></div>)}</div><div className="pt-code-aside"><div className="pt-panel pt-code-explain"><div className="pt-small">DÒNG ĐANG CHẠY</div><div className="pt-code-step">{line+1}<span> / 11</span></div><h3>{['Duyệt tác vụ','Chờ tác vụ đến','Trả máy đã xong','Có máy rảnh chưa?','Nhảy thời gian','Trả TẤT CẢ máy đã xong','Chọn theo (w, index)','Ghi máy vào đáp án','Tính thời điểm kết thúc','Chuyển máy sang heap bận','Trả về đáp án'][line]}</h3><p>{line===5?'Dùng while, không dùng if: nhiều máy có thể cùng hoàn thành.':line===1?'Giữ đồng hồ không lùi lại khi tác vụ trước phải chờ.':line===6?'Máy tốt nhất trong nhóm rảnh đã nằm ở đỉnh heap.':'Mỗi tác vụ được gán đúng một lần; máy chủ quay lại nhóm rảnh khi hoàn thành.'}</p></div><div className="pt-panel pt-int64"><small>THỜI GIAN TÍCH LŨY</small><b>40.000.000.000</b><span>C++: long long · Java: long</span><p>JavaScript Number vẫn biểu diễn chính xác các số nguyên trong giới hạn bài này.</p></div></div></div></Shell>;
};

export const Summary:React.FC=()=>{
 const t=useSeconds();return <Shell number={8} tag={chapters[7].tag} title={chapters[7].title} subtitle="Mô phỏng đúng quy tắc, xử lý theo sự kiện."><div className="pt-summary"><div className="pt-summary-rules">{[
 ['01','Tác vụ đến trước, gán trước.','Duyệt j từ 0 đến m − 1.'],
 ['02','Hai heap giữ hai loại ưu tiên.','Rảnh: (trọng số, chỉ số) · Bận: thời điểm xong.'],
 ['03','Giải phóng tất cả, rồi mới chọn.','Bao gồm mọi máy có finish ≤ thời gian hiện tại.']
 ].map((r,i)=><div key={i} className="pt-summary-rule" style={{opacity:interpolate(t,[i*3,i*3+.5],[.2,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}><b>{r[0]}</b><div><strong>{r[1]}</strong><p>{r[2]}</p></div></div>)}</div><div className="pt-panel pt-big-o"><span>THỜI GIAN</span><b>O((n + m) log n)</b><hr/><span>BỘ NHỚ PHỤ TRỢ</span><b>O(n)</b><small>+ O(m) để lưu mảng đáp án</small><div className="pt-final-ans">Ví dụ 1<br/><strong>[2, 2, 0, 2, 1, 2]</strong></div></div></div></Shell>;
};
