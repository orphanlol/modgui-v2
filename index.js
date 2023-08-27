// Load scripts without issues
function addScript(src) {
    const script = document.createElement("script");
    script.src = src;
    const nonceElement = document.querySelector("[nonce]");
    if (nonceElement) {
        script.nonce = nonceElement.nonce;
    }
    document.body.appendChild(script);
}

// Load React
addScript('https://unpkg.com/react@17.0.2/umd/react.development.js')
addScript('https://unpkg.com/react-dom@17.0.2/umd/react-dom.development.js')

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
      buttons: [],
      sliders: [],
    };

    modGUI.GUI.menus.push(menu);

    return menu;
  },

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
        menuHeader.id = `${menu.id}header`;  // Add a unique ID for each menu header
        menuHeader.style.fontWeight = 'bold';
        menuHeader.style.textAlign = 'center';
        menuHeader.style.fontSize = '25px';
        menuHeader.style.cursor = 'move';
        menuHeader.style.padding = '5px';
        menuHeader.textContent = menu.title;
        menuContainer.appendChild(menuHeader);

      menu.buttons.forEach((button, index) => {
        const buttonElem = document.createElement('div');
        buttonElem.className = 'modMenuItem';
        buttonElem.style.cursor = 'pointer';
        buttonElem.style.marginBottom = '10px';
        buttonElem.style.padding = '10px';
        buttonElem.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        buttonElem.style.borderRadius = '5px';
        buttonElem.style.transition = 'background-color 0.3s ease';
        buttonElem.textContent = button.label;

        buttonElem.addEventListener('mouseenter', () => {
          buttonElem.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        });

        buttonElem.addEventListener('mouseleave', () => {
          buttonElem.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });

        buttonElem.addEventListener('click', button.callback);

        menuContainer.appendChild(buttonElem);
      });

      menu.sliders.forEach((slider, index) => {
        const sliderContainer = document.createElement('div');
        sliderContainer.style.marginBottom = '10px';

        const sliderHeader = document.createElement('div');
        sliderHeader.textContent = slider.label;
        sliderHeader.style.cursor = 'move';
        sliderHeader.style.padding = '5px';
        sliderContainer.appendChild(sliderHeader);

        const sliderInput = document.createElement('input');
        sliderInput.type = 'range';
        sliderInput.min = slider.min;
        sliderInput.max = slider.max;
        sliderInput.value = slider.value;

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
        slider.onChange(sliderInput.value);
        });

        sliderContainer.appendChild(sliderInput);
        menuContainer.appendChild(sliderContainer);
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

// Delay rendering until React is available
function renderReactComponentWhenReady() {
    if (window.React && window.ReactDOM) {
      modGUI.render();
    } else {
      setTimeout(renderReactComponentWhenReady, 100);
    }
  }
  
renderReactComponentWhenReady();
