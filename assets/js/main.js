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
    <div class="block-head">
      <h2 class="block-title">${key}</h2>
      <button class="download" onclick="crearZip('${key}')">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-zip" viewBox="0 0 16 16">
          <path d="M5 7.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.11 0l-.929-.62a1 1 0 0 1-.415-1.074L5 8.438V7.5zm2 0H6v.938a1 1 0 0 1-.03.243l-.4 1.598.93.62.929-.62-.4-1.598A1 1 0 0 1 7 8.438V7.5z"/>
          <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1h-2v1h-1v1h1v1h-1v1h1v1H6V5H5V4h1V3H5V2h1V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
        </svg>
      </button>
    </div>
    <div class="block-main">`
      data.source[key].file.forEach(el => {
        const dimension = data.source[key]["dimension"]
        info += element(url, key, dimension, el)
      });
      info += `
    </div>
  </div>`
    }

    app.innerHTML = info
  })



function element(url, key, dimension, el) {
  let out = ``
  let ext = key.split('-')[0]
  if (['jpg', 'png', 'gif', 'svg', 'webp', 'favicon'].includes(ext)) {
    if (el === '') {
      out = `<div class="jump"></div>`
    } else {
      out = `
    <div style="width:${dimension[0]}px; height:${dimension[1]}px;" class="element" dir="${url}${key}/${el}" onclick="copy(this)">
      <img src="./source/${key}/${el}">  
    </div>`
    }
  } else {
    out = `
    `
    // <div class="element">
    //   <a href="./source/${key}/${el}">
    //     ./source/${key}/${el}
    //   </a>
    // </div>

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



function copy(button) {
  const valor = button.getAttribute("dir")
  navigator.clipboard.writeText(valor)
  // console.log(`El valor "${valor}" se ha copiado al portapapeles.`);
}