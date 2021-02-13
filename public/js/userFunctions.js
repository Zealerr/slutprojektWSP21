const userNav = document.getElementsByClassName("user-menu")[0]
var User = {
  
}


// trash that I do not want to delete ;)

// openMenu: (type) => {
//   let button = document.getElementById(`${type}MenuBtn`)
//   if (button.classList.contains(`${type}MenuOpen`)) {
//     button.classList.remove(`${type}MenuOpen`)
//     menu = document.getElementsByClassName(`${type}Menu`)
//     console.log(menu.length)
//     for (i = 0; i < menu.length; i++) {
//       menu[i].remove()
//     }
//   } else {
//     button.classList.add(`${type}MenuOpen`)
//     var htmlObject = document.createElement("div")
//     htmlObject.classList.add(`${type}Menu`)
//     createMenu = ` 
//     <ul>
//       <li>
//         <a href="#">New post</a>
//       </li>
//       <li>
//         <a href="#">New project</a>
//       </li>
//     </ul>
//     `
//     userMenu = `
//     <ul>
//       <li>
//         <a href="#">Account</a>
//       </li>
//       <li>
//         <a href="#">Log out</a>
//       </li>
//     </ul>
//     `
//     if (type == "create") {
//       htmlObject.innerHTML = createMenu
//     } else if (type == "user") {
//       htmlObject.innerHTML = userMenu
//     }
    
//     userNav.insertAdjacentElement(last, htmlObject)
//   } 
// }