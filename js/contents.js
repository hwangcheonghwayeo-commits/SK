const filters=document.querySelectorAll('[data-filter]');const cards=document.querySelectorAll('[data-category]');
filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(item=>item.classList.remove('active'));button.classList.add('active');cards.forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter})}));
