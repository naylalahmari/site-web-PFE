const toggle = document.querySelector(".menu-hb");
const sidebar = document.querySelector(".sidebar");
const mainContent = document.querySelector(".main-content");
const dashboardTitle = document.querySelector(".main-content h1");

toggle.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  mainContent.classList.toggle('collapsed');
  
  // Déplacer le titre Dashboard
  if (sidebar.classList.contains('collapsed')) {
    dashboardTitle.style.marginLeft = '0';
  } else {
    dashboardTitle.style.marginLeft = '20px';
  }
});

// manage dropdowns both on hover and click
const dropdowns = document.querySelectorAll('.sidebar .dropdown');
dropdowns.forEach(dd => {
  const link = dd.querySelector('a');
  link.addEventListener('click', e => {
    e.preventDefault();
    dd.classList.toggle('open');
  });
  dd.addEventListener('mouseenter', () => dd.classList.add('open'));
  dd.addEventListener('mouseleave', () => dd.classList.remove('open'));
});

const nested = document.querySelectorAll('.sidebar .nested-dropdown');
nested.forEach(nd => {
  const link = nd.querySelector('a');
  link.addEventListener('click', e => {
    e.preventDefault();
    nd.classList.toggle('open');
  });
  nd.addEventListener('mouseenter', () => nd.classList.add('open'));
  nd.addEventListener('mouseleave', () => nd.classList.remove('open'));
});