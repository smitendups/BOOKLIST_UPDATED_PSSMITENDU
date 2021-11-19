let data=[];
//for fetching get
function x(){
    fetch("http://localhost:3000/api/books")
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      console.log(myJson);
      data=myJson;
     // console.log("data1",data)
      data.forEach((b)=>addBookToList(b));
    })
    .catch(function (error) {
      console.log("Error: " + error);
    });
}

//add to book list
 function addBookToList(book)
  {
     const list=document.querySelector('#book-list');
     const row=document.createElement('tr');
     row.innerHTML=`
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.id}</td>
        <td> <input type="checkbox" id=${book.id} name="book" value=${book.id}></td>
       
     `;
     list.appendChild(row);
  }
  // <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>

 
 
  //for  fetching post
 document.querySelector('#book-form').addEventListener('submit',(e)=>{
// prevent actual submit
   e.preventDefault();
  //get form values
  const title=document.querySelector('#name').value;
  const author=document.querySelector('#author').value;
  const id=document.querySelector('#id').value;
  console.log(id.length);
  if(title === '' || author === '' || id === '' || id.length < 3 || author.length <2 || title.length < 2){
    showAlert('Please Fill All The Boxes With Minimun 2 Charecter','danger');
 } 
 else{
    let data={name:title,author:author,id:id}
    const option={
                    method: 'POST', // or 'PUT'
                    headers: {
                     "Content-type": "application/json; charset=UTF-8",},
                   body: JSON.stringify(data)
    }
   
    fetch('http://localhost:3000/api/books',option)
    .then(response => {
      return response.json( )
  })
    .then(data => {
      console.log('Success:', data);
      myFunction();
      clearFields();
      showAlert('Book Added','success');
    })
    .catch((error) => {
      console.error('Error:', error);
      showAlert('Book ID Already Exist','danger');
    });}
    
 }
 
  );


//clear fields
  function clearFields(){
    document.querySelector('#name').value='';
    document.querySelector('#author').value='';
    document.querySelector('#id').value='';
}

//show alret
function showAlert(message,className){
    const div=document.createElement('div');
    div.className=`alert alert-${className}`;
    div.appendChild(document.createTextNode(message)); 
    const container=document.querySelector('.container');
    const form=document.querySelector('#book-form');
    container.insertBefore(div,form);
    setTimeout(()=>{
        document.querySelector('.alert').remove();
    },2000)
 }
 //my function
function myFunction(){
  x();
  clearTable();
}

function clearTable() {
  var rowCount = table1.rows.length;
  for (var i = rowCount - 1; i > 0; i--) {
      table1.deleteRow(i);
  }
}


//update book
function updateBook(){
  const title=document.querySelector('#name').value;
  const author=document.querySelector('#author').value;
  const id=document.querySelector('#id').value;
  if(title === '' || author === '' || id === '' || id.length < 3 || author.length <2 || title.length < 2){
    showAlert('Fill All The Boxes With Minimum 2 Charecter','danger');
 } 
 else{
  let data={name:title,author:author,id:id};
  console.log(data);
  const option={
    method: 'PUT', // or 'PUT'
    headers: {
     "Content-type": "application/json; charset=UTF-8",},
   body: JSON.stringify(data)
}
clearFields();
fetch(`http://localhost:3000/api/books/${id}`,option)
    .then(response => {
      return response.json( )
  })
    .then(data => {
      console.log('Success:', data);
      myFunction();
      showAlert('Book Updated!','success');
    })
    .catch((error) => {
      console.error('Error:', error);
      showAlert('Book Does Not Exist With Given ID!','danger');
    });
 }

}


//for multiple serach
function multiSearch(){
  const searchValue=document.querySelector('#searching').value;
  let data={value:searchValue}
  const option={
    method: 'POST', // or 'PUT'
   headers: {
      "Content-type": "application/json; charset=UTF-8",},
      body: JSON.stringify(data)
}
clearFields();
fetch('http://localhost:3000/api/books/search',option)
.then(response => {
    return response.json( )
})
.then(data => 
    // this is the data we get after doing the delete request, do whatever you want with this data
   {
    //myFunction();
    clearTable();
    data.forEach((b)=>addBookToList(b));

  }  

) .catch((error) => {
  console.error('Error:', error);
  clearTable();
  showAlert('Book is not present','danger');
})

}


//for deleting

function deleteAll(){
  var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  var arr=[];
  for (var checkbox of checkboxes) {
   arr.push(checkbox.value);
}
console.log(arr);
let data={value:arr};
console.log("inside delete all");
console.log(data);
const option={
  method: 'DELETE', // or 'PUT'
   headers: {
      "Content-type": "application/json; charset=UTF-8",},
     body: JSON.stringify(data)
}
fetch('http://localhost:3000/api/books/deleteAll',option)
.then(response => {
    return response.json( )
})
.then(data => 
    // this is the data we get after doing the delete request, do whatever you want with this data
   {console.log(data);
    myFunction();

  }  

);

}