window.modGUI = {
  GUI : {
    menus: [],
  },
  
  // Function to create a menu
  createMenu(title, id, position, top, left) {
    const menu = {
      title,
      id,
      position,
      top,
      left,
      buttons: [],
      sliders: [],
    };
    
    modGUI.GUI.menus.push(menu);
    
    return menu;
  },

  getMenu(menu) {
    return document.getElementById(menu.id)
  },
  
  // Function to add a button to a menu
  addButton(menu, label, callback) {
    const button = {
      label,
      callback,
    };
    
    menu.buttons.push(button);
  },

  addSlider(menu, label, min, max, value, onChange) {
    const slider = {
      label,
      min,
      max,
      value,
      onChange,
    };
    
    menu.sliders.push(slider);
  },
  
  createLiveOverlay(headerText) {
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
    return overlayDiv
  },
  
  // Function to render the menus and buttons
  render() {
    modGUI.GUI.menus.forEach(menu => {
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
      menuHeader.style.fontWeight = 'bold';
      menuHeader.style.textAlign = 'center';
      menuHeader.style.fontSize = '25px'
      menuHeader.style.cursor = 'move';
      menuHeader.style.padding = '5px';
      menuHeader.textContent = menu.title;
      // Create minimize button
      const minimizeButton = document.createElement('button');
      minimizeButton.textContent = '-';
      minimizeButton.style.float = 'right';
      minimizeButton.style.border = 'none';
      minimizeButton.style.backgroundColor = 'transparent';
      minimizeButton.style.color = '#fff';
      minimizeButton.style.fontSize = '20px';
      minimizeButton.style.cursor = 'pointer';
      minimizeButton.style.outline = 'none';
      minimizeButton.style.padding = '0';
      
      const animationDuration = 300; // Animation duration in milliseconds
      let isCollapsed = false;
    
      // Handle collapsing when clicking the minimize button
      minimizeButton.addEventListener('click', () => {
        isCollapsed = !isCollapsed;
        if (isCollapsed) {
          menuContainer.style.height = '50px';
          menuContainer.style.overflow = 'hidden';
        } else {
          menuContainer.style.height = 'auto';
          menuContainer.style.overflow = 'visible';
        }
        menuContainer.style.transition = `height ${animationDuration}ms ease, overflow ${animationDuration}ms ease`;
      });
    
      menuHeader.appendChild(minimizeButton);
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

      menu.sliders.forEach(slider => {
          const sliderContainer = document.createElement('div'); // Create a container for the slider
          sliderContainer.style.marginBottom = '10px';
          
          const sliderHeader = document.createElement('div'); // Create header for slider
          sliderHeader.textContent = slider.label;
          sliderHeader.style.cursor = 'move';
          sliderHeader.style.padding = '5px';
          sliderContainer.appendChild(sliderHeader);
          
          const sliderInput = document.createElement('input');
          sliderInput.type = 'range';
          sliderInput.min = slider.min;
          sliderInput.max = slider.max;
          sliderInput.value = slider.value;
        
          // Style the slider to match the button's appearance
          sliderInput.style.width = '100%';
          sliderInput.style.height = '20px'; // Adjust the height to match the button
          sliderInput.style.padding = '0';
          sliderInput.style.margin = '0';
          sliderInput.style.appearance = 'none'; // Hide the default appearance
          sliderInput.style.background = 'transparent'; // Hide the default track
        
          // Style the slider thumb (dot)
          sliderInput.style.border = 'none'; // Hide the dot
          sliderInput.style.cursor = 'pointer';
          sliderInput.style.borderRadius = '5px'; // Match the button's border radius
          sliderInput.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          sliderInput.style.transition = 'background-color 0.3s ease';
          
          sliderInput.addEventListener('input', () => {
            slider.onChange(sliderInput.value); // Use sliderInput.value here
          });
          
          sliderContainer.appendChild(sliderInput);
          menuContainer.appendChild(sliderContainer);
      });
      
      
      document.body.appendChild(menuContainer);
  
      // Make the menu draggable
      modGUI.dragElement(menuContainer);
    });
  },
  
  // Function for making an element draggable
  dragElement(elmnt) {
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

}
