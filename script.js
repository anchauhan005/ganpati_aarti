const tracks=[
 {title:'Ganpati Aarti 1',src:'music1.mp3'},
 {title:'Ganpati Aarti 2',src:'music2.mp3'},
 {title:'Ganpati Aarti 3',src:'music3.mp3'},
 {title:'Ganpati Aarti 4',src:'music4.mp3'}
];
const audio=document.getElementById('audio'),titleEl=document.getElementById('title'),counter=document.getElementById('counter'),fill=document.getElementById('progressFill'),current=document.getElementById('current'),duration=document.getElementById('duration'),play=document.getElementById('play'),status=document.getElementById('status'),playlist=document.getElementById('playlist');
let index=0;
const fmt=s=>{if(!Number.isFinite(s))return '0:00';return Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0')};
function render(){playlist.innerHTML='';tracks.forEach((t,i)=>{const b=document.createElement('button');b.className='track'+(i===index?' active':'');b.innerHTML=`<span class="num">${i+1}</span><span class="track-name">${t.title}</span>`;b.addEventListener('click',()=>load(i,true));playlist.appendChild(b)});titleEl.classList.remove('title-pop');void titleEl.offsetWidth;titleEl.textContent=tracks[index].title;titleEl.classList.add('title-pop');counter.textContent=`${index+1} / ${tracks.length}`;audio.src=tracks[index].src;audio.load()}
async function load(i,auto=false){index=(i+tracks.length)%tracks.length;render();if(auto){try{await audio.play()}catch{status.textContent='Tap play to begin prayer'}}}
play.addEventListener('click',async()=>{if(audio.paused){try{await audio.play()}catch{status.textContent='Audio could not start'}}else audio.pause()});
document.getElementById('prev').addEventListener('click',()=>load(index-1,true));
document.getElementById('next').addEventListener('click',()=>load(index+1,true));
document.getElementById('backward').addEventListener('click',()=>{
  audio.currentTime=Math.max(0,audio.currentTime-10);
});
document.getElementById('forward').addEventListener('click',()=>{
  const target=audio.currentTime+10;
  audio.currentTime=Number.isFinite(audio.duration)?Math.min(target,audio.duration):target;
});audio.addEventListener('play',()=>{play.innerHTML='<span>⏸</span>';play.classList.add('playing');status.textContent='Now playing • Prayer in progress'});audio.addEventListener('pause',()=>{play.innerHTML='<span>▶</span>';play.classList.remove('playing');if(!audio.ended)status.textContent='Paused'});audio.addEventListener('ended',()=>load(index+1,true));audio.addEventListener('timeupdate',()=>{current.textContent=fmt(audio.currentTime);fill.style.width=audio.duration?(audio.currentTime/audio.duration*100)+'%':'0%'});audio.addEventListener('loadedmetadata',()=>duration.textContent=fmt(audio.duration));audio.addEventListener('error',()=>{status.textContent='Add the prayer audio files in assets/'});render();
