var img_counter = 0
const post_form = document.getElementsByClassName("post-form")[0]
const post_menu = document.getElementsByClassName("post-menu")[0]
const last = "beforeend"

// Post creation namespace for ease of use
var Post = {
  create: () => {
    console.log('put content in a hidden input and post')
  },
  update: () => {
    console.log('put content in hidden input and update')
  },
  addField: (type) => {
    var input = document.createElement(`input`)
    if (type == "text" || type == "quote" || type == "h2" || type == "h3" || type == "h4") {
      input.classList.add(`${type}`)
      input.setAttribute("type", "text")
      input.setAttribute("placeholder", `This is a ${type} here...`)
      post_form.insertAdjacentElement(last, input)
      if (type == "h2" || type == "h3" || type == "h4") {
        Post.openHeadingsMenu()
      }
    } else if (type == "img") {
      let html = `
      <figure>
        <img class="post-img" id="post-img-${img_counter} alt="your image>
      </figure>
      <input class="post-img-input" type="file" accept="image">
      `
      
      post_form.insertAdjacentHTML(last, html)
    }
  },
}

//fixa funktion som kan ta allt i forms och skriva om till ny form som är en "preview"

var hmm
// trash that I do not want to delete just yet.

  // openHeadingsMenu: () => {
  //   let button = document.getElementById("headingsMenuBtn")
    
  //   if (button.classList.contains("menuOpen")) {
  //     button.classList.remove("menuOpen")
  //     headingsMenu = document.getElementsByClassName("headingsMenu")
  //     console.log(headingsMenu.length)
  //     for (i = 0; i < headingsMenu.length; i++) {
  //       headingsMenu[i].remove()
  //     }
  //   } else {
  //     button.classList.add("menuOpen")
  //     var htmlObject = document.createElement("div")
  //     htmlObject.classList.add("headingsMenu")
  //     menu = ` 
  //     <ul> 
  //       <li>
  //         <button type='button' onclick="Post.addField('h2')" >header 2</button>
  //       </li>
  //       <li>
  //         <button type='button' onclick="Post.addField('h3')" >header 3</button>
  //       </li>
  //       <li>
  //         <button type='button' onclick="Post.addField('h4')" >header 4</button>
  //       </li>
  //     </ul>
  //     `
  //     htmlObject.innerHTML = menu
  //     post_menu.insertAdjacentElement(last, htmlObject)
  //   } 
  // }

  // addField: (type) => {
  //   var html = ``
  //   if (type == "text" || type == "quote") {
  //     // html = `<input class="${type}" type="text" placeholder="This is your ${type}">`
  //   } else if (type == "img") {
  //     // html = `
  //     // <img class="post-img" id="post-img-${img_counter} alt="your image>
  //     // <input class="post-img-input" type="file" accept="image">
  //     // `
  //     // img_counter += 1
  //   }
  //   Post.insertInput(type)
  // },