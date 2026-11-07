import assert from 'node:assert/strict';
import {schedule} from '../src/process-tasks/scheduler';
import {sequenceBeat,jumpBeat} from '../src/process-tasks/timing';

const ids = (servers: number[], tasks: number[]) => schedule(servers, tasks).map(x => x.server);
assert.deepEqual(ids([3,3,2], [1,2,3,2,1,2]), [2,2,0,2,1,2], 'official example 1');
assert.deepEqual(ids([5,1,4,3,2], [2,1,2,4,5,2,1]), [1,4,1,4,1,3,2], 'official example 2');
const simultaneous = schedule([5,1], [5,4,1,1]);
assert.deepEqual(simultaneous.map(x=>x.server), [1,0,1,0], 'release all servers before selecting by weight');
assert.deepEqual(simultaneous.map(x=>x.start), [0,1,5,5], 'queued tasks can start in the same second');
assert.deepEqual(ids([1,1], [5,5,1,1]), [0,1,0,0], 'weight ties use index');
const long = schedule([1], Array(200000).fill(200000));
assert.equal(long.at(-1)?.finish, 40000000000, 'time must not overflow 32-bit');

function naive(servers: number[], tasks: number[]) {
  const ends = servers.map(()=>0); let time=0;
  return tasks.map((duration,j)=>{
    time=Math.max(time,j);
    if(!ends.some(x=>x<=time))time=Math.min(...ends);
    const selected=servers.map((weight,index)=>({weight,index})).filter(x=>ends[x.index]<=time).sort((a,b)=>a.weight-b.weight||a.index-b.index)[0];
    ends[selected.index]=time+duration; return selected.index;
  });
}
let seed=1882;
const next=(max:number)=>{seed=(seed*1664525+1013904223)>>>0;return seed%max+1;};
for(let k=0;k<300;k++){
  const servers=Array.from({length:next(7)},()=>next(6));
  const tasks=Array.from({length:next(30)},()=>next(20));
  assert.deepEqual(ids(servers,tasks),naive(servers,tasks),`oracle case ${k}`);
}
for(const t of [24,24.5,24.99])assert.equal(sequenceBeat(t,6,4).phase,1,'Hook keeps its final assignment visible');
for(const t of [50.8,50.9,51,54.99])assert.equal(sequenceBeat(t,7.8,6,4).phase,1,'Example keeps its completed answer visible');
assert.equal(jumpBeat(51).step,3,'T3 is current during its caption');
assert.ok(jumpBeat(51).phase>=.5,'T3 must be visibly assigned before its caption ends');
for(let t=52.5;t<60;t+=.25)assert.ok(jumpBeat(t).phase>=.5&&jumpBeat(t).step===3,'Jump holds final assignment');
console.log('PASS: official examples, release/FIFO/ties, 200k overflow, 300 oracle cases, final-frame and T3 caption regressions.');
