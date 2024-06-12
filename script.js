const fileInput = document.getElementById('user-image');
const imageName = document.getElementById('image-name');
const preview = document.getElementById('uploaded-image');
const reader = new FileReader();
let fileName = "";

function handleEvent(event) {
  // console.log(`${event.type}: ${event.loaded} bytes transferred\n`);

  if (event.type === "load") {
    preview.src = reader.result;
  }
}

function addListeners(reader) {
  reader.addEventListener("load", handleEvent);
}

// Add listeners once
addListeners(reader);

function handleSelected(e) {
  const selectedFile = fileInput.files[0];
  if (selectedFile) {
    imageName.innerText = selectedFile.name;
    fileName = selectedFile.name;
    reader.readAsDataURL(selectedFile);
  }
}

fileInput.addEventListener("change", handleSelected);

document.getElementById('download').addEventListener('click', function() {
  html2canvas(document.getElementById('frame-container'), {
    allowTaint: true,
    foreignObjectRendering: true,
  }).then(function(canvas) {
    let link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `akatakyie_${fileName}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});

document.querySelectorAll('.frame-option').forEach(option => {
  option.addEventListener('click', function() {
    const frameSrc = option.getAttribute('data-frame');
    document.getElementById('current-frame').src = frameSrc;
    document.querySelectorAll('.frame-option img').forEach(image => {
      image.classList.remove('selected');
    });
    option.querySelector('img').classList.add('selected');
  });
})