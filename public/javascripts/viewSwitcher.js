console.log('Running viewSwitcher.js...')

const navView = document.querySelector('#nav-container');
const widget = document.querySelector('#display-container');

widget.style.display='flex';

function toggleVisibility(view){
  console.log('toggling toggles...')
  const computedStyle = window.getComputedStyle(view);
  const display = computedStyle.getPropertyValue('display');

  if(display === 'flex'){
    console.log('rippin it up...')
    navView.style.display = 'none';
    widget.style.display = 'flex';
  }else{
    console.log('option 3...')
    navView.style.display = 'flex';
    widget.style.display = 'none';
  }
}



