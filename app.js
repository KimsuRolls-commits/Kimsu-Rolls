const WA='51997454391';
const makis=['Acevichado','Furai','California','Avocado','Guacamole','Parrillero','Umi','Tokio','New Guacamole','Parmesano','Tiradito','Volcano','Kimsu','Al Olivo'];
const makiDescriptions={
  'Avocado':'Relleno de queso crema y pescado empanizado, cubierto con palta, ajonjoli negro y salsa taré.',
  'Acevichado':'Relleno de palta, pescado empanizado, cubierto de pescado blanco, bañado en salsa acevichada, togarashi y cebollin.',
  'Furai':'Relleno de palta, queso crema y pescado empanizado, frito al panko.',
  'California':'Relleno de palta, queso crema y pescado empanizado, cubierto con mix de ajonjoli.',
  'Guacamole':'Relleno de queso crema y pollo empanizado, coronado con guacamole de la casa y togarashi.',
  'Parrillero':'Relleno de palta y pescado empanizado, cubierto de bonito, coronado con chimichurri flameado.',
  'Umi':'Relleno de palta y pescado empanizado, coronado con cevichito de pota.',
  'Volcano':'Relleno de palta y pescado empanizado, bañado en salsa spicy flameada y ajonjoli negro.',
  'Al Olivo':'Relleno de palta y pescado empanizado, bañado en salsa de aceituna, coronado con pota y togarshi',
  'New Guacamole':'Relleno de palta y pescado empanizado, frito al panko, coronado con guacamole, chicharrón de pota y salsa acevichada.',
  'Parmesano':'Relleno de palta y pescado empanizado, cubierto de queso crema, coronado con queso parmesano gratinado, gotas de limón y taré.',
  'Tokio':'Relleno de palta, pescado empanizado, frito al panko, acompañado de salsa acevichada',
  'Tiradito':'Relleno de palta, pescado empanizado, cubierto de pescado blanco, bañado en salsa tiradito.',
  'Kimsu':'Relleno de queso crema y pescado empanizado, cubierto de palta, coronado con salsa spicy flameada.'
};
const drinks=['Coca Cola Original','Coca Cola Zero','Inca Kola Original','Inca Kola Zero','Agua San Luis S/Gas'];
const C={
  personal:{n:'Combo Personal',p:25,m:1,d:1},
  sakura:{n:'Combo Sakura',p:38,m:2,d:1},
  koi:{n:'Combo Koi',p:58,m:3,d:1},
  shogun:{n:'Combo Shogun',p:78,m:4,d:1},
  akai:{n:'Combo Akai',p:95,m:5,d:2},
  fuji:{n:'Combo Fuji',p:125,m:7,d:3}
};
let cart={},A=null,M={},D={};
const $=x=>document.getElementById(x);
function show(x){$(x).classList.add('show')}
function hide(x){$(x).classList.remove('show')}
function go(id,btn){
  const section=$(id);
  if(!section)return;
  document.querySelectorAll('.cats button').forEach(b=>b.classList.remove('active'));
  if(btn)btn.classList.add('active');
  section.scrollIntoView({behavior:'smooth',block:'start'});
}
function thumbFor(n){
  const s=n.toLowerCase();
  if(['acevichado','furai','california','avocado','guacamole','parrillero','umi','tokio','new guacamole','parmesano','tiradito','volcano','kimsu','al olivo'].some(x=>s.includes(x)) || s.includes('maki')) return '🍣';
  if(s.includes('alitas')) return '🍗';
  if(s.includes('gaseosa') || s.includes('coca') || s.includes('inca') || s.includes('agua')) return '🥤';
  if(s.includes('gyoza') || s.includes('wantan') || s.includes('rollitos') || s.includes('ebi')) return '🥟';
  if(s.includes('combo')) return '🍱';
  return '🛍️';
}
function toast(x){
  const e=$('toast');
  $('toastText').textContent='Añadiste '+x+' al carrito';
  $('toastThumb').textContent=thumbFor(x);
  e.classList.remove('show');
  void e.offsetWidth;
  e.classList.add('show');
  $('bar').classList.remove('pulse');
  void $('bar').offsetWidth;
  $('bar').classList.add('pulse');
  clearTimeout(window.tt);
  window.tt=setTimeout(()=>e.classList.remove('show'),2200);
}
function add(n,p){cart[n]??={name:n,price:p,qty:0};cart[n].qty++;update();toast(n)}
function gyoza(){show('gyozaModal')}
function addGyoza(s){add('Gyozas '+s+' x6',15);hide('gyozaModal')}
function combo(k){A=C[k];M={};D={};$('comboTitle').textContent=A.n.toUpperCase();$('comboInfo').textContent=`${A.m} ${A.m==1?'sabor':'sabores'} · ${A.d} ${A.d==1?'bebida':'bebidas'} · S/${A.p}`;render();show('comboModal')}
function totalMaki(){return Object.values(M).reduce((a,b)=>a+b,0)}
function totalDrink(){return Object.values(D).reduce((a,b)=>a+b,0)}
function incMaki(n){let total=totalMaki();if(total>=A.m)return;if((M[n]||0)<A.m){M[n]=(M[n]||0)+1;render()}}
function decMaki(n){if(!M[n])return;M[n]--;if(M[n]<=0)delete M[n];render()}
function incDrink(n){let total=totalDrink();if(total>=A.d)return;if((D[n]||0)<A.d){D[n]=(D[n]||0)+1;render()}}
function decDrink(n){if(!D[n])return;D[n]--;if(D[n]<=0)delete D[n];render()}
function render(){
  $('mOptions').innerHTML=makis.map(x=>{
    const q=M[x]||0;
    return `<div class="option ${q?'selected':''}"><span>${x}</span><span class="optionControls"><button type="button" class="mini" onclick="decMaki('${x}')" ${q?'':'disabled'}>−</button><b class="optionQty">${q}</b><button type="button" class="mini plus" onclick="incMaki('${x}')" ${totalMaki()>=A.m?'disabled':''}>+</button></span></div>`
  }).join('');
  $('dOptions').innerHTML=drinks.map(x=>{
    const q=D[x]||0;
    return `<div class="option ${q?'selected':''}"><span>${x}</span><span class="optionControls"><button type="button" class="mini" onclick="decDrink('${x}')" ${q?'':'disabled'}>−</button><b class="optionQty">${q}</b><button type="button" class="mini plus" onclick="incDrink('${x}')" ${totalDrink()>=A.d?'disabled':''}>+</button></span></div>`
  }).join('');
  $('mCount').textContent=`${totalMaki()}/${A.m}`;
  $('dCount').textContent=`${totalDrink()}/${A.d}`;
  const ms=[];Object.entries(M).forEach(([n,q])=>ms.push(q>1?`${n} ×${q}`:n));
  const ds=[];Object.entries(D).forEach(([n,q])=>ds.push(q>1?`${n} ×${q}`:n));
  $('summary').innerHTML=`🍣 ${ms.length?ms.join(' · '):'Sin seleccionar'}<br>🥤 ${ds.length?ds.join(' · '):'Sin seleccionar'}`;
  let ok=totalMaki()==A.m&&totalDrink()==A.d;
  $('comboAdd').disabled=!ok;
  $('comboAdd').textContent=ok?'✓ AGREGAR AL CARRITO':'COMPLETA TU SELECCIÓN';
}
function confirmCombo(){
  if(totalMaki()!=A.m||totalDrink()!=A.d)return;
  const ms=[];Object.entries(M).forEach(([n,q])=>ms.push(q>1?`${n} x${q}`:n));
  const ds=[];Object.entries(D).forEach(([n,q])=>ds.push(q>1?`${n} x${q}`:n));
  const label=`${A.n} | Makis: ${ms.join(' + ')} | Bebidas: ${ds.join(' + ')}`;
  hide('comboModal');
  add(label,A.p);
}
function toggleMiniCart(){
  if(!Object.keys(cart).length){openCart();return}
  renderMiniCart();
  $('miniCart').classList.toggle('show');
}
function renderMiniCart(){
  const entries=Object.values(cart);
  const mini=$('miniItems');
  if(!mini)return;
  mini.innerHTML=entries.length?entries.slice(-4).map(x=>`<div class="miniItem"><span class="miniThumb">${thumbFor(x.name)}</span><span class="miniName">${x.name}</span><b>×${x.qty}</b></div>`).join(''):`<div class="miniEmpty">Aún no has agregado productos.</div>`;
  let t=0,c=0;entries.forEach(x=>{t+=x.qty*x.price;c+=x.qty});
  $('miniTotal').textContent=`S/${t}`;
  $('miniCount').textContent=c;
}
function update(){let c=0,t=0;Object.values(cart).forEach(x=>{c+=x.qty;t+=x.qty*x.price});$('count').textContent=c;$('mtotal').textContent=t;$('rtotal').textContent=t;renderMiniCart()}
function openCart(){renderMiniCart();renderCart();show('cartModal');hide('miniCart')}
function renderCart(){$('items').innerHTML=Object.keys(cart).length?Object.entries(cart).map(([k,x])=>`<div class="cartline"><div><b>${x.name}</b><small>S/${x.price} c/u</small></div><div class="qty"><button onclick="qty('${encodeURIComponent(k)}',-1)">−</button><b>${x.qty}</b><button onclick="qty('${encodeURIComponent(k)}',1)">+</button></div><button class="remove" onclick="removeIt('${encodeURIComponent(k)}')">ELIMINAR</button></div>`).join(''):'<p style="text-align:center;color:#777">Tu carrito está vacío.</p>';update()}
function qty(k,n){k=decodeURIComponent(k);if(!cart[k])return;cart[k].qty+=n;if(cart[k].qty<=0)delete cart[k];renderCart()}
function removeIt(k){let n=decodeURIComponent(k);delete cart[n];renderCart()}
function clearCart(){cart={};renderCart()}
function review(){if(!Object.keys(cart).length)return;$('reviewItems').innerHTML=Object.values(cart).map(x=>`<div class="cartline"><div><b>${x.qty} × ${x.name}</b></div><strong>S/${x.qty*x.price}</strong></div>`).join('');hide('cartModal');show('reviewModal');update()}
function sendWA(){let m='PEDIDO%0A%0A';Object.values(cart).forEach(x=>m+=`${x.qty} x ${x.name} — S/${x.qty*x.price}%0A`);let t=Object.values(cart).reduce((s,x)=>s+x.qty*x.price,0);window.open(`https://wa.me/${WA}?text=${m}%0A*TOTAL: S/${t}*`,'_blank')}
$('makisGrid').innerHTML=makis.map(x=>`<article class="card"><h3>${x} <b>S/22</b></h3><p>${makiDescriptions[x]}</p><button onclick="add('${x}',22)">+ AÑADIR</button></article>`).join('');
update();
window.addEventListener('scroll',()=>{['entradas','makis','ramen','alitas','combos','bebidas'].forEach((id,i)=>{if(scrollY+130>=$(id).offsetTop)document.querySelectorAll('.cats button').forEach((b,j)=>b.classList.toggle('active',i===j))})});
