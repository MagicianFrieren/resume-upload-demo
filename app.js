const form = document.querySelector('#resume-form');
const fileInput = document.querySelector('#resume-file');
const dropZone = document.querySelector('#drop-zone');
const fileLabel = document.querySelector('#file-label');
const status = document.querySelector('#status');
const previousStep = document.querySelector('#previous-step');

let selectedFile = null;

function showStatus(message, kind = '') {
  status.textContent = message;
  status.dataset.kind = kind;
}

function selectFile(files) {
  if (!files.length) return;

  if (files.length !== 1) {
    showStatus('Choose one resume file at a time.', 'error');
    return;
  }

  const file = files[0];
  if (!/\.(pdf|docx?)$/i.test(file.name) || file.size === 0) {
    showStatus('Choose a non-empty PDF, DOC, or DOCX file.', 'error');
    return;
  }

  selectedFile = file;
  fileLabel.textContent = file.name;
  dropZone.classList.add('has-file');
  showStatus('File selected. Click Finish to complete the demo.');
}

dropZone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', () => {
  selectFile(fileInput.files);
  fileInput.value = '';
});

document.addEventListener('dragover', (event) => {
  if (!event.dataTransfer.types.includes('Files')) return;

  event.preventDefault();
  const isOverDropZone = dropZone.contains(event.target);
  dropZone.classList.toggle('is-dragging', isOverDropZone);
  event.dataTransfer.dropEffect = isOverDropZone ? 'copy' : 'none';
});

dropZone.addEventListener('dragleave', (event) => {
  if (!dropZone.contains(event.relatedTarget)) {
    dropZone.classList.remove('is-dragging');
  }
});

document.addEventListener('drop', (event) => {
  if (!event.dataTransfer.types.includes('Files')) return;

  event.preventDefault();
  dropZone.classList.remove('is-dragging');
  if (dropZone.contains(event.target)) selectFile(event.dataTransfer.files);
});

previousStep.addEventListener('click', () => {
  showStatus('This demo shows the final step only.');
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!selectedFile) {
    showStatus('Choose a resume file to finish.', 'error');
    dropZone.focus();
    return;
  }

  showStatus('Done. Your selected file stayed on this device.', 'success');
});
