const app = document.getElementById('app')
const url = 'https://patricio-dsgn.github.io/backpack/source/'
let info = ''
fetch('files.json')
  .then(response => response.json())
  .then(data => {

    info += `

  <ul class="table-index">
  <h2>Indice</h2>
    `
    for (key in data.source) {
      info += `<li><a href="#${key}">${key}</a></li>`
    }
    info += `
  </ul>`

    for (key in data.source) {
      info += `
  <div id="${key}" class="block">
    <h2>${key}</h2>
    <button class="back" onclick="history.back()">Go Back</button> 
    <div class="sub-block">`
      data.source[key].file.forEach(el => {
        info += element(url, key, el)
      });
      info += `
    </div>
  </div>`
    }

    app.innerHTML = info
  })



function element(url, key, el) {
  let out = ``
  let ext = key.split('-')[0]
  if (['jpg', 'png', 'gif', 'svg', 'webp', 'favicon'].includes(ext)) {
    if (el === '') {
      out = `<div class="element"><br></div>`
    } else {
      out = `
    <div class="element">
      <a href="./source/${key}/${el}">
        <img src="./source/${key}/${el}">  
      </a>
      <span>${url}${key}/${el}</span>
    </div>`
    }
  } else {
    out = `
    <div class="element">
      <a href="./source/${key}/${el}">
        ./source/${key}/${el}
      </a>
    </div>
      `

  }
  // }else if(type==='video'){
  //   out = `
  //   <video width="320" height="240" controls>
  //     <source src="${el}" type="video/${el.split('.')[1]}">
  //   </video>
  //   `
  // }else if(type==='audio'){
  //   out = ``

  // }
  return out

}