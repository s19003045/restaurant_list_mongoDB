console.log('hello')
// 按 delete button 時，跳出 alert
const deleteBtn = document.querySelector('.delete-btn')

// console.log(deleteBtn)

deleteBtn.addEventListener('click', function (event) {
  console.log(event)
  let r = confirm("確定要刪除嗎？")
  if (r == true) {
    document.write("You pressed OK!")
  }
  else {
    document.write("You pressed Cancel!")
  }
})