async function crearZip(key) {
  
  const zip = new JSZip();

  const list = await fetch('files.json')
    .then(response => response.json())
    .then(data => data)
  
  // console.log(list["source"][key]["file"])

  const listFiles = list["source"][key]["file"]
  await listFiles.forEach(el => {
    const temp = fetch(`source/${key}/${el}`)
      .then(response => response.arrayBuffer());
    zip.file(el, temp);
  });

  // const imagen1 = await fetch('source/jpg/1.jpg').then(response => response.arrayBuffer());
  // const imagen2 = await fetch('source/jpg/2.jpg').then(response => response.arrayBuffer());
  // const imagen3 = await fetch('source/jpg/3.jpg').then(response => response.arrayBuffer());

  // zip.file("imagen1.jpg", imagen1);
  // zip.file("imagen2.jpg", imagen2);
  // zip.file("imagen3.jpg", imagen3);

  const content = await zip.generateAsync({ type: "blob" });

  const enlace = document.createElement('a');
  enlace.href = URL.createObjectURL(content);
  enlace.download = `backpack-${key}.zip`;
  enlace.click();
}