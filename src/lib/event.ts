export function eventTimestamp(date:string,time:string,timezone:string):number|null {
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!/^([01]\d|2[0-3]):[0-5]\d$/.test(time))return null;
 const desired=Date.parse(`${date}T${time}:00Z`);if(!Number.isFinite(desired))return null;
 try {const format=new Intl.DateTimeFormat('en-CA',{timeZone:timezone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'});
 let result=desired;
 for(let i=0;i<3;i++){const parts=Object.fromEntries(format.formatToParts(result).map(p=>[p.type,p.value]));const represented=Date.parse(`${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}Z`);result+=desired-represented;}
 return result;
 }catch{return null;}
}
export function countdownParts(target:number,now:number){const seconds=Math.max(0,Math.floor((target-now)/1000));return [Math.floor(seconds/86400),Math.floor(seconds/3600)%24,Math.floor(seconds/60)%60,seconds%60];}
export function whatsappUrl(number:string,message:string){const clean=number.replace(/[\s()+-]/g,'');return /^[1-9]\d{7,14}$/.test(clean)?`https://wa.me/${clean}?text=${encodeURIComponent(message)}`:null;}
export function safeHttpsUrl(value:string){try{const url=new URL(value);return url.protocol==='https:'?url.href:null;}catch{return null;}}
