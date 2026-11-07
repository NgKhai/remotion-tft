export function sequenceBeat(seconds:number,interval:number,count:number,delay=0) {
  if(seconds>=delay+interval*count-1e-8)return {step:count-1,phase:1};
  return {step:Math.min(count-1,Math.max(0,Math.floor((seconds-delay)/interval))),phase:seconds<delay?0:((seconds-delay)%interval)/interval};
}
export function jumpBeat(t:number){
 const step=t<7.5?0:t<15?1:t<45?2:3;
 const phase=t<7.5?t/7.5:t<15?(t-7.5)/7.5:t<37.5?0:t<45?(t-37.5)/7.5:t<52.5?(t-45)/7.5:1;
 const clock=t<7.5?0:t<15?1:t<22.5?2:t<30?2+(t-22.5)/7.5*3:5;
 return {step,phase,clock};
}
