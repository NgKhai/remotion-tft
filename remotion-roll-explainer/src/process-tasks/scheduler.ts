export type Assignment = {task: number; arrival: number; duration: number; start: number; finish: number; server: number; released: number[]; jumped: boolean};
class MinHeap<T> {
  private values: T[] = [];
  constructor(private compare: (a: T, b: T) => number) {}
  get size() { return this.values.length; }
  peek() { return this.values[0]; }
  push(value: T) {
    let i=this.values.length; this.values.push(value);
    while(i>0){const parent=(i-1)>>1;if(this.compare(this.values[parent],value)<=0)break;this.values[i]=this.values[parent];i=parent;}
    this.values[i]=value;
  }
  pop(): T {
    const result=this.values[0]; const tail=this.values.pop()!;
    if(this.values.length){let i=0;while(2*i+1<this.values.length){let child=2*i+1;if(child+1<this.values.length&&this.compare(this.values[child+1],this.values[child])<0)child++;if(this.compare(tail,this.values[child])<=0)break;this.values[i]=this.values[child];i=child;}this.values[i]=tail;}
    return result;
  }
}

export function schedule(servers: number[], tasks: number[]): Assignment[] {
  const free=new MinHeap<number>((a,b)=>servers[a]-servers[b]||a-b);
  const busy=new MinHeap<{finish:number;index:number}>((a,b)=>a.finish-b.finish||a.index-b.index);
  servers.forEach((_,i)=>free.push(i));
  const result: Assignment[]=[]; let time=0;
  tasks.forEach((duration,task)=>{
    time=Math.max(time,task); const released:number[]=[];
    const release=()=>{while(busy.size&&busy.peek().finish<=time){const server=busy.pop();free.push(server.index);released.push(server.index);}};
    release(); const jumped=free.size===0;
    if(jumped){time=busy.peek().finish;release();}
    const server=free.pop(); const finish=time+duration;
    result.push({task,arrival:task,duration,start:time,finish,server,released,jumped});
    busy.push({finish,index:server});
  });
  return result;
}
