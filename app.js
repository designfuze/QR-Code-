let canvas = document.getElementById("qrCanvas");
let qr = new QRious({ element: canvas, size: 400 });

function generateQR(){
  let type = typeSelect = document.getElementById("type").value;
  let data = document.getElementById("data").value;
  let color = document.getElementById("color").value;
  let size = document.getElementById("size").value;

  if(type=="whatsapp") data="https://wa.me/"+data;
  if(type=="phone") data="tel:"+data;
  if(type=="email") data="mailto:"+data;

  qr.set({value:data,size:size,foreground:color});
}

function downloadPNG(){
  let a=document.createElement("a");
  a.download="qr.png";
  a.href=canvas.toDataURL();
  a.click();
}

function downloadSVG(){
  htmlToImage.toSvg(canvas).then(data=>{
    let a=document.createElement("a");
    a.download="qr.svg";
    a.href=data;
    a.click();
  });
}

function saveQR(){
  let name=prompt("Enter QR name");
  let list=JSON.parse(localStorage.getItem("qrList"))||[];
  list.push({name,img:canvas.toDataURL(),fav:false});
  localStorage.setItem("qrList",JSON.stringify(list));
  loadLibrary();
}

function loadLibrary(){
  let lib=document.getElementById("library");
  lib.innerHTML="";
  let list=JSON.parse(localStorage.getItem("qrList"))||[];
  list.forEach((i,x)=>{
    let d=document.createElement("div");
    d.innerHTML=`<b>${i.name}</b><br><img src="${i.img}" width="80">`;
    lib.appendChild(d);
  });
}

const themeSwitch=document.getElementById("themeSwitch");
themeSwitch.addEventListener("change",()=>{
  document.body.classList.toggle("light");
});

loadLibrary();
