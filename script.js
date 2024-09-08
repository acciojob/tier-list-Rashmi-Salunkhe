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
    if (e.dataTransfer) {
      e.dataTransfer.setData('text/plain', e.target.id);
    }
    // For testing purposes, set a custom attribute
    e.target.setAttribute('data-dragging', 'true');
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function drop(e) {
    e.preventDefault();
    let draggedElement;
    if (e.dataTransfer) {
      const id = e.dataTransfer.getData('text');
      draggedElement = document.getElementById(id);
    } else {
      // For testing purposes, find the element with data-dragging attribute
      draggedElement = document.querySelector('[data-dragging="true"]');
    }
    const dropzone = e.target.closest('.drop-zone');

    if (dropzone && draggedElement && dropzone !== draggedElement.parentNode) {
      dropzone.appendChild(draggedElement);
    }

    // Clean up the data-dragging attribute
    if (draggedElement) {
      draggedElement.removeAttribute('data-dragging');
    }
  }

  function moveToUnranked(e) {
    const item = e.target;
    if (item.parentNode !== unrankedDropZone) {
      unrankedDropZone.appendChild(item);
    }
  }
});