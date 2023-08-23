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
// Example usage
const mainMenu = createMenu('Main Menu', 'main-menu', 'absolute', '20px', '20px');
addButton(mainMenu, 'Button 1', () => alert('Button 1 clicked'));
addButton(mainMenu, 'Button 2', () => alert('Button 2 clicked'));

// Call renderGUI to display the GUI
renderGUI();
```
