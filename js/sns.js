const period=document.querySelector('#period');
if(period){period.addEventListener('change',()=>{document.querySelector('.dashboard')?.setAttribute('data-period',period.value)})}
