<div class="ba-slider" id="baSlider">
  <img src="after.jpg" alt="After">

  <div class="resize" id="resize">
    <img src="before.jpg" alt="Before">
  </div>

  <div class="handle" id="handle"></div>
</div>

<style>
.ba-slider{
  position:relative;
  max-width:900px;
  margin:40px auto;
  overflow:hidden;
  border-radius:14px;
  user-select:none;
}

.ba-slider img{
  width:100%;
  display:block;
  pointer-events:none;
}

.resize{
  position:absolute;
  top:0;
  left:0;
  width:50%;
  overflow:hidden;
  height:100%;
}

.handle{
  position:absolute;
  top:0;
  left:50%;
  width:3px;
  height:100%;
  background:white;
  cursor:ew-resize;
}

.handle::after{
  content:"";
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  width:38px;
  height:38px;
  border-radius:50%;
  background:white;
  box-shadow:0 0 12px rgba(0,0,0,.3);
}
</style>

<script>
const slider = document.getElementById("baSlider");
const handle = document.getElementById("handle");
const resize = document.getElementById("resize");

let dragging=false;

function move(x){
  const rect = slider.getBoundingClientRect();
  let pos = x - rect.left;
  pos = Math.max(0, Math.min(pos, rect.width));

  const percent = (pos / rect.width) * 100;
  resize.style.width = percent + "%";
  handle.style.left = percent + "%";
}

/* mouse */
handle.addEventListener("mousedown",()=> dragging=true);
window.addEventListener("mouseup",()=> dragging=false);
window.addEventListener("mousemove",(e)=>{
  if(!dragging) return;
  move(e.clientX);
});

/* touch */
handle.addEventListener("touchstart",()=> dragging=true);
window.addEventListener("touchend",()=> dragging=false);
window.addEventListener("touchmove",(e)=>{
  if(!dragging) return;
  move(e.touches[0].clientX);
});
</script>
