// Define a global object to hold your GUI components
const GUI = {
  menus: [],
};

// Function to create a menu
function createMenu(title, id, position, top, left) {
  const menu = {
    title,
    id,
    position,
    top,
    left,
    buttons: [],
  };
  
  GUI.menus.push(menu);
  
  return menu;
}

// Function to add a button to a menu
function addButton(menu, label, callback) {
  const button = {
    label,
    callback,
  };
  
  menu.buttons.push(button);
}

function createLiveOverlay(headerText) {
  const overlayDiv = document.createElement('div');
  overlayDiv.id = 'overlayDiv';
  overlayDiv.style.position = 'fixed';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.width = '100%';
  overlayDiv.style.height = '100%';
  overlayDiv.style.backgroundColor = 'rgb(39 38 38 / 70%)';
  overlayDiv.style.zIndex = '9998';
  overlayDiv.style.backdropFilter = 'blur(5px)';
  
  const header = document.createElement('div');
  header.id = 'overlayHeader';
  header.style.color = 'white';
  header.style.textAlign = 'center';
  header.style.padding = '10px';
  header.style.fontWeight = 'bold';
  header.style.fontSize = '30px';
  header.textContent = headerText;
  overlayDiv.appendChild(header);
  document.body.appendChild(overlayDiv);
}

// Function to render the menus and buttons
function renderGUI() {
  GUI.menus.forEach(menu => {
    const menuContainer = document.createElement('div');
    menuContainer.id = menu.id;
    menuContainer.style.position = menu.position;
    menuContainer.style.top = menu.top;
    menuContainer.style.left = menu.left;
    menuContainer.style.padding = '20px';
    menuContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    menuContainer.style.color = '#fff';
    menuContainer.style.fontSize = '15px';
    menuContainer.style.zIndex = '9999';
    menuContainer.style.borderRadius = '10px';
    menuContainer.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.3)';
    menuContainer.style.width = '300px';
    
    // Create header for dragging
    const menuHeader = document.createElement('div');
    menuHeader.id = `${menu.id}header`;
    menuHeader.style.cursor = 'move';
    menuHeader.style.padding = '5px';
    menuHeader.textContent = menu.title;
    menuContainer.appendChild(menuHeader);
    
    menu.buttons.forEach(button => {
      const buttonElem = document.createElement('div'); // Use a div for button
      buttonElem.textContent = button.label;
      buttonElem.classList.add('modMenuItem');
      buttonElem.style.cursor = 'pointer';
      buttonElem.style.marginBottom = '10px';
      buttonElem.style.padding = '10px';
      buttonElem.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      buttonElem.style.borderRadius = '5px';
      buttonElem.style.transition = 'background-color 0.3s ease';
      
      // Add mouse enter and leave event listeners
      buttonElem.addEventListener('mouseenter', () => {
        buttonElem.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
      });
      buttonElem.addEventListener('mouseleave', () => {
        buttonElem.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      });

      // Add the click event
      buttonElem.addEventListener('click', button.callback);
      
      menuContainer.appendChild(buttonElem);
    });
    
    document.body.appendChild(menuContainer);

    // Make the menu draggable
    dragElement(menuContainer);
  });
}

// Function for making an element draggable
function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  
  const header = elmnt.querySelector(`#${elmnt.id}header`);
  if (header) {
    header.style.cursor = 'move';
    header.onmousedown = dragMouseDown;
  } else {
    elmnt.style.cursor = 'move';
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // calculate the new element position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
