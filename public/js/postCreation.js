var img_counter = 0
const creationDiv = document.getElementsByClassName("creation")[0]
const creation_form = document.getElementsByClassName("creation-form")[0]
const dynamic_form = document.getElementsByClassName("dynamic-form")[0]
const imgButton = document.getElementById("imgButton")
const last = "beforeend"


// Post creation namespace for ease-of-use
var Post = {
  loadFile: (id) => {
    var output = document.getElementById(id);
    output.src = URL.createObjectURL(event.target.files[0]);
  },
  addField: (type) => {
    var dynamicInput = document.createElement('div')
    var input = ``
    dynamicInput.classList.add("dynamic-input")
    if (type == "quote" || type == "h3" || type == "h4") {
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
      <input class="post-img-input" name="img[]" type="file" accept="image" form="creation-form">
      `
      img_counter++
      toggleImgButton()
    }
    var deleteButton = `
    <div class="post-delete-input">
      <button type="button"> Delete </button>
    </div>
    `
    dynamicInput.innerHTML = input + deleteButton

    // add remove button funktionality with eventlistener
    let element = dynamic_form.insertAdjacentElement(last, dynamicInput)
    if (type == "img") {
      child = element.children[2].children[0]
      let img = element.children[0].children[0]
      let input = element.children[1]
      input.addEventListener("change", function() {
        Post.loadFile(img.id)
      })
      child.addEventListener("click", function(e) {
        element.remove()
        img_counter--
        toggleImgButton()
      });
    } else {
      child = element.children[1].children[0]
      child.addEventListener("click", function(e) {
        element.remove()
      });
    }
  },
  reformCreationForm: () => {
    // main variables

    // gather all html in this
    let postContent = ""
    // get all divs with inputs
    let dynamicDivs = dynamic_form.children
    let dynamicDivsChildren = []
    // gather all inputs in this list
    inputs = []
    
    // go trough div list and get textarea or input and add to inputs
    for (i = 0; i < dynamicDivs.length; i++) {
      dynamicDivsChildren = (dynamicDivs[i].children)
      for (j = 0; j < dynamicDivsChildren.length; j++) {
        input = dynamicDivsChildren[j]
        if (input.nodeName == "INPUT" || input.nodeName == "TEXTAREA") {
          inputs.push(input)
        }
      }
    }
    // get value of content and create html blocks with it
    for (i = 0; i < inputs.length; i++) {
      let inputClass = inputs[i].classList[0]
      let html = ""
      switch (inputClass) {
        case "post-h3":
          html = `<h3>${inputs[i].value}</h3>`
          break;
        case "post-h4":    
          html = `<h4>${inputs[i].value}</h4>`
          break;
        case "post-quote":
          html = `<blockquote>${inputs[i].value}</blockquote>`
          break;
        case "post-text":  
          html = `<p>${inputs[i].value}</p>`
          break;
        case "post-img-input":  
          imgName = inputs[i].value
          imgName = imgName.slice(12)
          html = `<figure><img alt="${imgName}" src="/img/uploads/${imgName}"></figure>`
          // move file to imgFiles
          
          break;
        default:
          console.log("Does not have the right class")
      }
      postContent = postContent + html
    }
    // add postContent to content input
    contentInput = document.getElementById("contentInput")
    contentInput.value = postContent


    // post tags
    tagsInput = document.getElementById("tagsInput")
    tags = document.getElementsByClassName("post-tag")
    tagInputs = []
    for (i = 0; i < tags.length; i++) {
      input = tags[i].children[0]
      if (input.checked) {
        tagInputs.push(input.value)
      }
    }
    tagsInput.value = tagInputs

    // add img files to array and 

  },
  allInputs: () => {
    //projectId, title, desc, content, date, isPublic, tag
    content = document.getElementById("contentInput").value
    tags = document.getElementById("tagsInput").value
    title = document.getElementById("titleInput").value
    desc = document.getElementById("descInput").value
    date = document.getElementById("dateInput").value
    projectId = document.getElementById("project").value
    isPublic = document.getElementById("isPublic").checked
    let inputs = [projectId, title, desc, content, date, isPublic, tags]
    return inputs
  }
}

function toggleImgButton() {
  if (img_counter == 5) {
    imgButton.classList.add("disabledButton")
    imgButton.textContent = "Max img count"
    imgButton.disabled = true
  } else {
    imgButton.classList.remove("disabledButton")
    imgButton.textContent = "+ Image"
    imgButton.disabled = false
  }
}



// add eventlistener to publish button
let publishButton = document.getElementById("publishButton")

if (publishButton != undefined) {
  publishButton.addEventListener("click", function() {
    Post.reformCreationForm()
    console.log(Post.allInputs())
    creation_form.submit()
  })
}

let localDraftButton = document.getElementById("localDraftButton")

if (localDraftButton != undefined) {
  localDraftButton.addEventListener("click", function() {
  })
}

function testMoveImgFiles() {
  let imgInput = document.getElementById("imgInput")
  images = document.getElementsByClassName("post-img-input")
  console.log(imgInput.files)
  console.log(images[0])
  for (i = 0; i < images.length; i++) {
    console.log(images[i].files[0])
  }
}

//// eventually make it possible to save as draft and edit.
// let saveDraftButton = document.getElementById("saveDraftButton")


// if (saveDraftButton != undefined) {
//   saveDraftButton.addEventListener("click", function() {
//     Post.reformCreationForm("draft")
//     post_form.submit()
//   })
// }


// // get project choice and put in post_form
// project = document.getElementById("project").value
// projectInput = document.getElementById("postProjectInput")
// projectInput.value = project
// // post title 
// titleInput = document.getElementById("postTitleInput")
// titleInput.value = baseInputs[1].value
// // post description
// descInput = document.getElementById("postDescInput")
// descInput.value = baseInputs[2].value
// // post content
// contentInput = document.getElementById("postContentInput")
// contentInput.value = post
// // post date
// dateInput = document.getElementById("postDateInput")
// dateInput.value = baseInputs[3].value
// // post is draft
// if (type == "draft") {
//   isDraftInput = document.getElementById("postIsDraftInput")
//   isDraftInput.checked = true
// } else if (type == "publish") {
//   isDraftInput = document.getElementById("postIsDraftInput")
//   isDraftInput.checked = false
// }

// // post isPublic
// isPublicInput = document.getElementById("postIsPublicInput")
// isPublicCheckbox = document.getElementById("isPublicCheckbox")
// isPublicInput.checked = isPublicCheckbox.checked
    







// imgFile = inputs[i][j].files
//           dynamicDivs.push(imgFile)
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