const fileInput = document.getElementById('user-image');
const imageName = document.getElementById('image-name');
const preview = document.getElementById('preview');
const reader = new FileReader();

function handleEvent(event) {
  console.log(`${event.type}: ${event.loaded} bytes transferred\n`);

  if (event.type === "load") {
    preview.src = reader.result;
  }
}

function addListeners(reader) {
  reader.addEventListener("loadstart", handleEvent);
  reader.addEventListener("load", handleEvent);
  reader.addEventListener("loadend", handleEvent);
  reader.addEventListener("progress", handleEvent);
  reader.addEventListener("error", handleEvent);
  reader.addEventListener("abort", handleEvent);
}

// Add listeners once
addListeners(reader);

function handleSelected(e) {
  const selectedFile = fileInput.files[0];
  if (selectedFile) {
    imageName.innerText = selectedFile.name;
    reader.readAsDataURL(selectedFile);
  }
}

fileInput.addEventListener("change", handleSelected);
