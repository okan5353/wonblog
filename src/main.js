import './style.css';

const articles = [
  { title: 'Yapay zekâ çağında insan kalmak', category: 'Teknoloji', time: '8 dk okuma', date: '24 Haz 2024', excerpt: 'Araçlar değişirken iyi düşünmenin kıymeti neden artıyor?', color: 'purple' },
  { title: 'İyi ürünler, sessizce ikna eder', category: 'Ürün', time: '6 dk okuma', date: '18 Haz 2024', excerpt: 'Gürültülü özellikler yerine doğru hissettiren küçük detaylar.', color: 'orange' },
  { title: 'Dijital dünyada boşluk tasarlamak', category: 'Tasarım', time: '5 dk okuma', date: '11 Haz 2024', excerpt: 'Ekrandaki nefes alanı, dikkatimizi nasıl geri kazanır?', color: 'blue' },
  { title: 'Her şeye yetişmemenin hafifliği', category: 'Kültür', time: '4 dk okuma', date: '04 Haz 2024', excerpt: 'Bilinçli olarak kaçırmak, daha iyi bir ritim kurmanın başlangıcı.', color: 'green' },
  { title: 'Bir fikri prototipe dönüştürmek', category: 'Ürün', time: '7 dk okuma', date: '28 May 2024', excerpt: 'İlk sürümün görevi mükemmel olmak değil, soruyu görünür kılmaktır.', color: 'red' },
  { title: 'Görsel sistemler neden güven yaratır?', category: 'Tasarım', time: '5 dk okuma', date: '20 May 2024', excerpt: 'Tutarlılık, markanın en sessiz ama en güçlü cümlesidir.', color: 'yellow' }
];
const grid = document.querySelector('#article-grid');
const template = document.querySelector('#article-template');
const empty = document.querySelector('.empty-state');
let activeFilter = 'all';
function render() {
  const query = document.querySelector('#search').value.trim().toLocaleLowerCase('tr');
  const selected = articles.filter((a) => (activeFilter === 'all' || a.category === activeFilter) && `${a.title} ${a.category} ${a.excerpt}`.toLocaleLowerCase('tr').includes(query));
  grid.replaceChildren(...selected.map((article, index) => {
    const node = template.content.cloneNode(true); const card = node.querySelector('article');
    card.style.setProperty('--delay', `${index * 55}ms`); card.querySelector('.card-image').classList.add(article.color);
    card.querySelector('.category').textContent = article.category; card.querySelector('.read-time').textContent = article.time;
    card.querySelector('h3 a').textContent = article.title; card.querySelector('.excerpt').textContent = article.excerpt; card.querySelector('.date').textContent = article.date;
    node.querySelectorAll('a').forEach((a) => a.href = `#makale-${article.title.toLocaleLowerCase('tr').replaceAll(' ', '-')}`);
    node.querySelector('.share').addEventListener('click', async () => { const url = `${location.origin}${location.pathname}#${article.title.toLocaleLowerCase('tr').replaceAll(' ', '-')}`; try { await navigator.clipboard.writeText(url); node.querySelector('.share').textContent = '✓'; } catch { location.hash = url.split('#')[1]; } });
    return node;
  }));
  empty.hidden = selected.length > 0;
}
document.querySelectorAll('.filter').forEach((button) => button.addEventListener('click', () => { activeFilter = button.dataset.filter; document.querySelectorAll('.filter').forEach((b) => b.classList.toggle('active', b === button)); render(); }));
document.querySelector('#search').addEventListener('input', render);
const root = document.documentElement; const savedTheme = localStorage.getItem('wonblog-theme');
if (savedTheme) root.dataset.theme = savedTheme;
function setTheme(theme) { root.dataset.theme = theme; localStorage.setItem('wonblog-theme', theme); document.querySelector('.theme-toggle').setAttribute('aria-label', theme === 'dark' ? 'Açık temaya geç' : 'Koyu temaya geç'); }
setTheme(root.dataset.theme); document.querySelector('.theme-toggle').addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
document.querySelector('.menu-button').addEventListener('click', (event) => { const open = document.body.classList.toggle('nav-open'); event.currentTarget.setAttribute('aria-expanded', String(open)); });
document.querySelectorAll('nav a').forEach((link) => link.addEventListener('click', () => { document.body.classList.remove('nav-open'); document.querySelector('.menu-button').setAttribute('aria-expanded', 'false'); }));
document.querySelector('#subscribe-form').addEventListener('submit', (event) => { event.preventDefault(); const input = document.querySelector('#email'); const message = document.querySelector('.form-message'); if (!input.validity.valid) { message.textContent = 'Lütfen geçerli bir e-posta adresi gir.'; input.focus(); return; } message.textContent = 'Harika! İlk not yakında gelen kutunda.'; event.currentTarget.reset(); });
document.querySelector('#year').textContent = new Date().getFullYear(); render();
