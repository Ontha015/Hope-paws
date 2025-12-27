document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({behavior:'smooth'});
    });
  });

  // Fade-in sequence (elements with .fade-in)
  document.querySelectorAll('.fade-in').forEach((el, i) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(8px)';
    setTimeout(()=> {
      el.style.transition = 'opacity 600ms ease, transform 600ms ease';
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }, 120 * i);
  });

  // Lightbox
  const lb = document.createElement('div');
  lb.id = 'site-lightbox';
  lb.innerHTML = '<div class="lb-inner"><button id="lb-close" aria-label="Close">×</button><img id="lb-img" src="" alt=""></div>';
  document.body.appendChild(lb);
  document.querySelectorAll('.lightbox-trigger').forEach(img => {
    img.addEventListener('click', ()=> {
      const src = img.dataset.full || img.src;
      document.getElementById('lb-img').src = src;
      lb.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });
  document.getElementById('lb-close').addEventListener('click', ()=> { lb.style.display='none'; document.body.style.overflow=''; });
  lb.addEventListener('click', (e) => { if (e.target === lb) { lb.style.display='none'; document.body.style.overflow=''; } });

  // Load posts.json if present
  const postsContainer = document.getElementById('posts');
  if (postsContainer) {
    fetch('data/posts.json').then(r => r.json()).then(posts => {
      window._hopePosts = posts;
      renderPosts(posts);
    }).catch(()=>{ postsContainer.innerHTML = '<p>No events available.</p>'; });
    const search = document.getElementById('searchInput');
    if (search) {
      search.addEventListener('input', ()=> {
        const q = search.value.toLowerCase();
        renderPosts(window._hopePosts.filter(p=> (p.title+p.desc+p.category).toLowerCase().includes(q)));
      });
    }
  }
  function renderPosts(posts){
    if(!posts) return;
    postsContainer.innerHTML = posts.map(p=>`
      <article class="post fade-in">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <small>${p.date} • ${p.category}</small>
      </article>
    `).join('');
  }
});

// Page fade-in when fully loaded
window.addEventListener('load', ()=>{
  document.documentElement.classList.add('page-fade'); 
  setTimeout(()=> document.documentElement.classList.add('show'), 50);
});




