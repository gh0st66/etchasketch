const container = document.querySelector('.container');
const colorButton = document.querySelectorAll('.choices');
const userColorPicker = document.querySelector('#input-color');
const clearButton = document.querySelector('.clear');
var slider = document.querySelector('#range');
var color = 'black';

//function grid

function createGrid (gridNumber) {
    let gridArea = gridNumber * gridNumber;
    for (let i = 1; i <= gridArea; i++) {
        let gridItem = document.createElement('div');
        container.style.gridTemplateColumns = `repeat(${gridNumber}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${gridNumber}, 1fr)`;
        container.insertAdjacentElement('beforeend', gridItem);
    }
    var gridPixels = container.querySelectorAll('div');
    gridPixels.forEach(gridPixel => gridPixel.addEventListener('mouseover', colorGrid));
}

function colorGrid() {
    switch (color) {
        case 'rainbow':
            this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            this.classList.remove('gray');
            break;
        case 'gray':
            if (this.style.backgroundColor.match(/rgba/)) {
                let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
                if (currentOpacity <= 0.9) {
                    this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
                    this.classList.add('gray');
                }
            } else if (this.classList == 'gray' && this.style.backgroundColor == 'rgb(0, 0, 0)') {
                return;
            } else {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
            }
            break;
        case 'eraser':
            this.style.backgroundColor = '#ffffff';
            this.classList.remove('gray');
            break;
        case 'black':
            this.style.backgroundColor = '#000000';
            this.classList.remove('gray');
            break;
        default:
            this.style.backgroundColor = color;
            this.classList.remove('gray');
            break;
    }
}


//clear button function
function eraseAllColor() {
    var gridPixels = container.querySelectorAll('div');
    gridPixels.forEach(gridPixels => gridPixels.style.backgroundColor = '#ffffff');
}

// color variable upon click
function changeColor(event) {
    switch (event.target.dataset.color) {
        case 'rainbow':
            color = 'rainbow';
            break;
        case 'gray':
            color = 'gray';
            break;
        case 'eraser':
            color = 'eraser';
            break;
        default:
            color = 'black';
            break;
    }
}

// pixel size funtion
function pixelSize() {
    let gridPixels = container.querySelectorAll('div');
    gridPixels.forEach(gridPixels => gridPixels.remove());
    createGrid(slider.value);
}

function userColorSelection(event) {
    color = event.target.value;
}

function buttonHover() {
    this.style.border = '1px solid #ffffff';
}

function butttonStandard() {
    this.style.border = '1px solid #ff0000';
}

//defualt
createGrid(10);

//events
clearButton.addEventListener('click', eraseAllColor);
clearButton.addEventListener('mouseover', buttonHover);
clearButton.addEventListener('mouseout', butttonStandard);
colorButton.forEach(colorButton => colorButton.addEventListener('click', changeColor));
colorButton.forEach(colorButton => colorButton.addEventListener('mouseover', buttonHover));
colorButton.forEach(colorButton => colorButton.addEventListener('mouseout', butttonStandard));
slider.addEventListener('mouseup', pixelSize);
userColorPicker.addEventListener('change', userColorSelection, false);
userColorPicker.addEventListener('input', userColorSelection, false);