# Mod-GUI (VERY BUGGY)
WIP GUI Library for browser mod menus or hacks.

## Overview

This library provides a basic way to create GUI menus and buttons using JavaScript. It's designed to be injected and executed directly in the browser's developer console. The library allows you to define menus, add buttons to them, and customize their appearance.

## Features

- Create customizable menus with buttons.
- Apply styles to menus and buttons.
- Make menus draggable.

## Usage

1. Open the developer console in your browser.
2. Copy and paste the library code from `gui-library.js` into the console.
3. Use the provided functions to create menus and buttons, and then call `renderGUI()` to display the GUI.

```javascript

// Create main menu w/ buttons
const mainMenu = modGUI.createMenu('Main Menu', 'main-menu', 'absolute', '20px', '20px');
modGUI.addButton(mainMenu, 'Button 1', () => alert('Button 1 clicked'));
modGUI.addButton(mainMenu, 'Button 2', () => alert('Button 2 clicked'));
modGUI.addSlider(
  mainMenu,
  'Slider 1',
  0, 100, 50,
  value => console.log(`Slider 1 value: ${value}`)
);

// Create overlay
let overlay = modGUI.createLiveOverlay('lol')

window.addEventListener('keydown', (event) => {
  if (event.code === 'ShiftRight') {
      if (
        modGUI.getMenu(mainMenu).style.display === 'none' &&
        overlay.style.display === 'none'
      ) {
        modGUI.getMenu(mainMenu).style.display = 'block';
        overlay.style.display = 'block';
        document.exitPointerLock(); //if needed
      } else {
        modGUI.getMenu(mainMenu).style.display = 'none';
        overlay.style.display = 'none';
      }
  }
});

// Call render to display the GUI
modGUI.render();

```
