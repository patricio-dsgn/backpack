async function crearZip(key) {
  
  
  const d = await fetch('files.json')
  .then(response => response.json())
  .then(data => data)
  
  // console.log(files.source[key])
  // console.log(d.source[key].file)
  
  const zip = new JSZip();
  d.source[key].file.forEach(el => {
    let link =  `source/${key}/${el}`
    // console.log(link)
    const temp = await fetch(link)
      .then(response => response.arrayBuffer())
    zip.file(el, temp);
  });
  

  // const imagen2 = await fetch('source/jpg/2.jpg').then(response => response.arrayBuffer());
  // const imagen3 = await fetch('source/jpg/3.jpg').then(response => response.arrayBuffer());

  // zip.file("imagen2.jpg", imagen2);
  // zip.file("imagen3.jpg", imagen3);

  const content = await zip.generateAsync({ type: "blob" });

  const enlace = document.createElement('a');
  enlace.href = URL.createObjectURL(content);
  enlace.download = 'imagenes.zip';
  enlace.click();
}