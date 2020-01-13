const buttonNodeList = document.querySelectorAll(".nav-child");
const navButtons = Array.from(buttonNodeList);

navButtons.forEach(button => {
  button.addEventListener("click", handleClick);
});

function handleClick(e){
  
  data = {query : e.target.value }

  fetch('/test', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {'Content-type': 'application/json'}
  });
}
