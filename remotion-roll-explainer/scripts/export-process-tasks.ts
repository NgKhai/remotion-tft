import {mkdirSync,writeFileSync} from 'node:fs';
import type {Caption} from '@remotion/captions';
import {chapters} from '../src/process-tasks/story';

const captions:Caption[]=[];let start=0;
let narration='# Phân công tác vụ bằng hai heap — lời dẫn tiếng Việt\n\nBản video dùng captions, chưa có giọng đọc.\n\n';
const stamp=(ms:number)=>{const n=Math.round(ms);return `${String(Math.floor(n/3600000)).padStart(2,'0')}:${String(Math.floor(n/60000)%60).padStart(2,'0')}:${String(Math.floor(n/1000)%60).padStart(2,'0')},${String(n%1000).padStart(3,'0')}`;};
for(const chapter of chapters){
 narration+=`## ${Math.floor(start/60)}:${String(start%60).padStart(2,'0')} — ${chapter.title}\n\n${chapter.captions.join(' ')}\n\n`;
 chapter.captions.forEach((text,i)=>captions.push({text,startMs:Math.round((start+i*chapter.duration/chapter.captions.length)*1000),endMs:Math.round((start+(i+1)*chapter.duration/chapter.captions.length)*1000),timestampMs:null,confidence:null}));
 start+=chapter.duration;
}
mkdirSync('public/process-tasks',{recursive:true});
writeFileSync('public/process-tasks/captions.json',JSON.stringify(captions,null,2)+'\n');
writeFileSync('public/process-tasks/captions.vi.srt',captions.map((c,i)=>`${i+1}\n${stamp(c.startMs)} --> ${stamp(c.endMs)}\n${c.text}\n`).join('\n'));
writeFileSync('PROCESS_TASKS_NARRATION_VI.md',narration);
console.log(`Exported ${captions.length} Vietnamese cues, ${start} seconds, JSON/SRT/narration.`);
