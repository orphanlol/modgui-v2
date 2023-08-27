// Framework functions
const modGUI = {
  GUI: {
    menus: [],
  },

  createMenu(title, id, position, top, left) {
    const menu = {
      title,
      id,
      position,
      top,
      left,
      elements: [], // Store all elements in this array
    };
  
    modGUI.GUI.menus.push(menu);
  
    return menu;
  },

  addButton(menu, label, callback) {
    const button = {
      type: 'button', // Indicate the element type
      label,
      callback,
    };
  
    menu.elements.push(button);
  },
  
  addSlider(menu, label, min, max, value, onChange) {
    const slider = {
      type: 'slider', // Indicate the element type
      label,
      min,
      max,
      value,
      onChange,
    };
  
    menu.elements.push(slider);
  },
  
  addText(menu, content) {
    const text = {
      type: 'text', // Indicate the element type
      content,
    };
  
    menu.elements.push(text);
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

    const menuHeader = document.createElement('div');
    menuHeader.id = `${menu.id}header`;
    menuHeader.style.fontWeight = 'bold';
    menuHeader.style.textAlign = 'center';
    menuHeader.style.fontSize = '25px';
    menuHeader.style.cursor = 'move';
    menuHeader.style.padding = '5px';
    menuHeader.textContent = menu.title;
    menuContainer.appendChild(menuHeader);

    menu.elements.forEach(element => {
      const elemContainer = document.createElement('div');
      // Customize container styling here based on element type
      elemContainer.style.marginBottom = '10px';

      if (element.type === 'button') {
        // Render button
        const buttonElem = document.createElement('div');
        // Customize button styling here
        buttonElem.className = 'modMenuItem';
        buttonElem.style.cursor = 'pointer';
        buttonElem.style.padding = '10px';
        buttonElem.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        buttonElem.style.borderRadius = '5px';
        buttonElem.style.transition = 'background-color 0.3s ease';
        buttonElem.textContent = element.label;

        buttonElem.addEventListener('mouseenter', () => {
          buttonElem.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        });

        buttonElem.addEventListener('mouseleave', () => {
          buttonElem.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });

        buttonElem.addEventListener('click', element.callback);

        elemContainer.appendChild(buttonElem);
      } else if (element.type === 'slider') {
        // Render slider
        const sliderHeader = document.createElement('div');
        // Customize slider header styling here
        sliderHeader.style.cursor = 'move';
        sliderHeader.style.padding = '5px';
        sliderHeader.textContent = element.label;
        elemContainer.appendChild(sliderHeader);

        const sliderInput = document.createElement('input');
        // Customize slider input styling here
        sliderInput.type = 'range';
        sliderInput.min = element.min;
        sliderInput.max = element.max;
        sliderInput.value = element.value;

        const sliderValueSpan = document.createElement('span');
        sliderValueSpan.textContent = element.value;
        sliderValueSpan.style.float = 'right';

        sliderInput.style.width = '100%';
        sliderInput.style.height = '20px';
        sliderInput.style.padding = '0';
        sliderInput.style.margin = '0';
        sliderInput.style.appearance = 'none';
        sliderInput.style.background = 'transparent';
        sliderInput.style.border = 'none';
        sliderInput.style.cursor = 'pointer';
        sliderInput.style.borderRadius = '5px';
        sliderInput.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        sliderInput.style.transition = 'background-color 0.3s ease';

        sliderInput.addEventListener('input', () => {
          element.onChange(sliderInput.value);
          sliderValueSpan.textContent = sliderInput.value;
        });

        elemContainer.appendChild(sliderInput);
        sliderHeader.appendChild(sliderValueSpan);
      } else if (element.type === 'text') {
        // Render text
        const textElem = document.createElement('div');
        // Customize text styling here
        textElem.className = 'modTextItem';
        textElem.style.padding = '5px';
        textElem.style.backgroundColor = 'rgba(115 115 115 / 10%)';
        textElem.style.borderRadius = '5px';
        textElem.textContent = element.content;
        elemContainer.appendChild(textElem);
      }

      menuContainer.appendChild(elemContainer);
    });

    document.body.appendChild(menuContainer);
    modGUI.dragElement(menuContainer);
  });
},

  dragElement(elmnt) {
    let pos1 = 0,
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
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
      elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  },
};

