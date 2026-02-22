function toggleSidebar(){
  document.getElementById('sidebar').classList.toggle('collapsed')
}

function toggleSubmenu(id){
  const menu=document.getElementById(id)
  menu.style.display=menu.style.display==='flex'?'none':'flex'
}

function toggleSubmenu(link){
  const dropdown = link.nextElementSibling; // récupère le <div class="submenu"> juste après le lien
  const all = document.querySelectorAll('.submenu');
  
  all.forEach(menu => {
    if(menu !== dropdown) menu.style.display = 'none';
  });
  
  dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
}
function toggleNestedSubmenu(e, link) {
    e.preventDefault(); // empêche le # de naviguer
    const nested = link.nextElementSibling; // la div .nested
    nested.style.display = nested.style.display === 'flex' ? 'none' : 'flex';
}


window.onclick = function(e){
    if(!e.target.closest('.icon') && 
       !e.target.closest('.profile') &&
       !e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown').forEach(menu => menu.style.display = 'none');
    }
}

function toggleDropdown(id){
    const menu = document.getElementById(id);
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}