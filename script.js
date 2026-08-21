const navbar=document.getElementById('navbar');
  window.addEventListener('scroll',()=>navbar.classList.toggle('scrolled',window.scrollY>10));



  const menuToggle=document.getElementById('menuToggle');
  const navLinks=document.getElementById('navLinks');
  menuToggle.addEventListener('click',()=>navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));

  const io=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in-view'); io.unobserve(e.target); } });
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  document.querySelectorAll('.tab-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });

  const galleryData=[
    {src:"images/galeri-1.jpg",cap:"Gedung Yayasan"},
    {src:"images/galeri-2.jpg",cap:"Aula"},
    {src:"images/galeri-3.jpg",cap:"SMK Nuris"},
    {src:"images/galeri-4.jpg",cap:"SMP Nuris"},
    {src:"images/galeri-5.jpg",cap:"MTs Nuris"},
    {src:"images/galeri-6.jpg",cap:"Area Parkir"},
    {src:"images/galeri-7.jpg",cap:"Mushola"},
    {src:"images/galeri-8.jpg",cap:"Kegiatan Siswa"}
  ];
  const grid=document.getElementById('galleryGrid');
  galleryData.forEach((item,i)=>{
    const div=document.createElement('div');
    div.className='gallery-item reveal'+(i%3===1?' reveal-d1':i%3===2?' reveal-d2':'');
    div.innerHTML=`<img src="${item.src}" alt="${item.cap}" loading="lazy" onerror="this.parentElement.classList.add('is-empty')">
      <div class="photo-placeholder">
        <svg class="icon" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10.5" r="1.5"/><path d="M21 15l-5-5L5 19"/></svg>
        <span>${item.cap}</span><code>${item.src}</code>
      </div>
      <div class="gallery-overlay"><svg class="icon" viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg></div>`;
    div.addEventListener('click',()=>{ if(!div.classList.contains('is-empty')) openLightbox(item.src,item.cap); });
    grid.appendChild(div);
    io.observe(div);
  });

  const lightbox=document.getElementById('lightbox');
  const lightboxImg=document.getElementById('lightboxImg');
  document.getElementById('lightboxClose').addEventListener('click',()=>lightbox.classList.remove('active'));
  lightbox.addEventListener('click',(e)=>{ if(e.target===lightbox) lightbox.classList.remove('active'); });
  document.addEventListener('keydown',(e)=>{ if(e.key==='Escape') lightbox.classList.remove('active'); });
  function openLightbox(src,alt){ lightboxImg.src=src; lightboxImg.alt=alt; lightbox.classList.add('active'); }

  document.getElementById('sendMsgBtn').addEventListener('click',()=>{
    const nama=document.getElementById('nama');
    const btn=document.getElementById('sendMsgBtn');
    if(!nama.value.trim()){ nama.focus(); return; }
    btn.textContent='Pesan Terkirim';
    btn.style.background='var(--green-900)';
    setTimeout(()=>{ btn.textContent='Kirim Pesan'; btn.style.background=''; },2200);
  });
