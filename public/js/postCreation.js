var img_counter = 0
const post_creation_form = document.getElementsByClassName("post-form")[0]
const post_form = document.getElementsByClassName("hidden-post-form")[0]
const post_menu = document.getElementsByClassName("post-menu")[0]
const last = "beforeend"

// Post creation namespace for ease of use
var Post = {
  loadFile: (id) => {
    var output = document.getElementById(id);
    output.src = URL.createObjectURL(event.target.files[0]);
  },
  addField: (type) => {
    var dynamicInput = document.createElement('div')
    var input = ``
    dynamicInput.classList.add("dynamic-input")
    if (type == "quote" || type == "h2" || type == "h3" || type == "h4") {
      input = `
      <input class="post-${type}" type="text" placeholder="This is a ${type} here...">
      
      `
    } else if (type == "text") { 
      input = `
      <textarea class="post-text" cols="30" rows="5" placeholder="Write your text here..." rows="5" type="text"></textarea>
      `
    } else if (type == "img") {
      dynamicInput.classList.add("dynamic-input-img")
      input = `
      <figure>
        <img class="post-img" id="post-img-${img_counter}" alt="your image" src="/img/empty_image.png">
      </figure>
      <input class="post-img-input" type="file" accept="image" >
      `
    }
    var deleteButton = `
    <div class="post-delete-input">
      <button type="button"> Delete </button>
    </div>
    `
    dynamicInput.innerHTML = input + deleteButton

    // add remove button funktionality with eventlistener
    let element = post_creation_form.insertAdjacentElement(last, dynamicInput)
    if (type == "img") {
      child = element.children[2].children[0]
      let img = element.children[0].children[0]
      let input = element.children[1]
      input.addEventListener("change", function() {
        Post.loadFile(img.id)
      })
    } else {
      child = element.children[1].children[0]
    }
    child.addEventListener("click", function(e) {
      element.remove()
    });
  },
  createPostHTML: (type) => {
    // main variables
    let post = ""
    let dynamicContent = []
    let baseInputs = post_creation_form.children[0].children
    let formInputs = post_creation_form.children
    inputs = []

    // select all but baseInputs -> Did not find a better way to select all
    // but first child of post_creation_form.
    for (i = 1; i < post_creation_form.children.length; i++) {
      inputs.push(formInputs[i].children)
    }
    
    // go trough input list and get textarea or input and add to 
    for (i = 0; i < inputs.length; i++) {
      for (j = 0; j < inputs[i].length; j++) {
        if (inputs[i][j].nodeName == "INPUT" || inputs[i][j].nodeName == "TEXTAREA") {
          dynamicContent.push(inputs[i][j])
        }
      }
    }
    // get value of content and create html blocks with it
    for (i = 0; i < dynamicContent.length; i++) {
      let inputClass = dynamicContent[i].classList[0]
      let html = ""
      switch (inputClass) {
        case "post-h1":
          html = `<h1> ${dynamicContent[i].value} </h1>`
          break;
        case "post-h2":
          html = `<h2> ${dynamicContent[i].value} </h2>`
          break;
        case "post-h3":
          html = `<h3> ${dynamicContent[i].value} </h3>`
          break;
        case "post-h4":    
          html = `<h4> ${dynamicContent[i].value} </h4>`
          break;
        case "post-quote":
          html = `<blockquote>${dynamicContent[i].value}</blockquote>`
          break;
        case "post-text":  
          html = `<p>${dynamicContent[i].value}</p>`
          break;
        case "post-img-input":  
          imgName = dynamicContent[i].value
          imgName = imgName.slice(12)
          html = `<figure><img alt="${imgName}" src="/img/${imgName}"></figure>`
          break;
        default:
          console.log("Does not have the right class")
      }
      post = post + html
    }
    
    // input name="postProject" type="text"
    // input name="postTitle" type="text"
    // input name="postDesc" type="text"
    // input name="postContent" type="text"
    // input name="postDate" type="date"
    // input name="isDraft" type="checkbox"

    // get project choice and put in post_form
    project = document.getElementById("project").value
    projectInput = document.getElementById("postProjectInput")
    projectInput.value = project
    // post title 
    titleInput = document.getElementById("postTitleInput")
    titleInput.value = baseInputs[0].value
    // post description
    descInput = document.getElementById("postDescInput")
    descInput.value = baseInputs[1].value
    // post content
    contentInput = document.getElementById("postContentInput")
    contentInput.value = post
    // post date
    dateInput = document.getElementById("postDateInput")
    dateInput.value = baseInputs[2].value
    // post is draft
    if (type == "draft") {
      isDraftInput = document.getElementById("postIsDraftInput")
      isDraftInput.checked = true
    } else if (type == "publish") {
      isDraftInput = document.getElementById("postIsDraftInput")
      isDraftInput.checked = false
    }

    // post isPublic
      isPublicInput = document.getElementById("postIsPublicInput")
      isPublicCheckbox = document.getElementById("isPublicCheckbox")
      isPublicInput.checked = isPublicCheckbox.checked
  }
}

// add eventlistener to save draft button and publish button
let saveDraftButton = document.getElementById("saveDraftButton")
let publishButton = document.getElementById("publishButton")

if (saveDraftButton != undefined) {
  saveDraftButton.addEventListener("click", function() {
    Post.createPostHTML("draft")
    post_form.submit()
  })
}

if (publishButton != undefined) {
  publishButton.addEventListener("click", function() {
    Post.createPostHTML("publish")
    post_form.submit()
  })
}


// imgFile = inputs[i][j].files
//           dynamicContent.push(imgFile)
//           console.log(imgFile)
//           if (imgFile == undefined) {
//             value = inputs[i][j].value

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