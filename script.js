//your JS code here. If required.
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.item');
  const dropZones = document.querySelectorAll('.drop-zone');
  const unrankedDropZone = document.getElementById('unranked-drop-zone');

  items.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dblclick', moveToUnranked);
  });

  dropZones.forEach(zone => {
    zone.addEventListener('dragover', dragOver);
    zone.addEventListener('drop', drop);
  });

  function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);
    const dropzone = e.target.closest('.drop-zone');

    if (dropzone && dropzone !== draggableElement.parentNode) {
      dropzone.appendChild(draggableElement);
    }
  }

  function moveToUnranked(e) {
    const item = e.target;
    if (item.parentNode !== unrankedDropZone) {
      unrankedDropZone.appendChild(item);
    }
  }
});