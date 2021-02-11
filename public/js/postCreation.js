var img_counter = 0
const post_form = document.getElementsByClassName("post-form")[0]
const last = "beforeend"
var Post = {
  create: () => {
    console.log('put content in a hidden input and post')
  },
  update: () => {
    console.log('put content in hidden input and update')
  },
  addField: (type) => {
    if (type == "text" || type == "quote") {
      html = `input class="${type}" type="text" placeholder="This is your ${type}"` 
    } else if (type == "img") {

      // const html = `<div>
      //   img class="post-img" id="post-img-${img_counter}" alt="your image" width="100" height="100"
      //   input class="post-${type}-input" type="file" accept=image"
      // `
      
      var html = `
                  <img class="post-img" id="post-img-${img_counter} alt="your image>
                  <input class="post-img-input" type="file" accept="image">          
      `
      var htmlObject = document.createElement('div')
      htmlObject.innerHTML=html
      img_counter += 1
      post_form.insertAdjacentElement(last, htmlObject)
      return html
    }
    console.log('Wrong value of parameter')
  },
  addHeadingField: (type, tag) => {
    if (type == "heading") {
      html = `input class="post-${tag} type="text" placeholder="Header ${tag}`
    }
  },
  insertElement: (htmlString, elementType) => {
    var htmlObject = document.createElement(`${elementType}`)
  }
}


//fixa med alla "addField" funktioner så att dem lägger till med hjälp av insertElement
//fixa "insertElement" funktionen så att det skrivs in i html.
//fixa funktion som kan ta allt i forms och skriva om till ny form som är en "preview" 