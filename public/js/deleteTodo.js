let clearTodo=function(){
  let xhttp = new XMLHttpRequest();
  xhttp.open("POST", "deleteTodo.html", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  let date=document.getElementById('date');
  let title=document.getElementById('title');
  let description=document.getElementById('description');
  let postData=`date=${date.innerText}&title=${title.value}&description=${description.value}`;
  let item=document.getElementById('item1');
  let i=2;
  while(item){
    postData+=`&item${i-1}=${item.value}`;
    item=document.getElementById(`item${i}`);
    i++;
  }
  xhttp.send(postData);
  window.location.href="/homepage.html"
}
