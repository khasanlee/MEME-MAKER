const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.getElementById("line-width")
const color = document.getElementById("color")
const colorOptions = Array.from(document.getElementsByClassName("color-option"))
const modeBtn = document.getElementById("mode-btn")
const destroyBtn = document.getElementById("destroy-btn")
const eraseBtn = document.getElementById("eraser-btn")
const fileInput = document.getElementById("file")
const textInput = document.getElementById("text")
const saveBtn = document.getElementById("save")

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 800

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round"
let isPainting = false
let isFilling = false

function onMove(event) {
    if(isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY)
        ctx.stroke()
        return
    }
    ctx.moveTo(event.offsetX, event.offsetY)
}

function onMouseDown(event) {
    isPainting = true
}

function onMouseUp(event) {
    ctx.beginPath()
    isPainting = false
}

function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value
}

function onColorChange(event) {
    ctx.strokeStyle = event.target.value
    ctx.fillStyle = event.target.value
}

function onColorClick(event) {
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue
    ctx.fillStyle = colorValue
    color.value = colorValue
}

function onModeClick(event) {
    if(isFilling) {
        isFilling = false
        modeBtn.innerText = "Fill"
    } else {
        isFilling = true
        modeBtn.innerText = "Draw"
    }
}

function onCanvasClick(event) {
    if(isFilling) {
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
    }
}

function onDestroyClick(event) {
    ctx.fillStyle = "white"
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
}

function onEraseClick(event) {
    ctx.strokeStyle = "white"
    isFilling = false
    modeBtn.innerText = "Fill"
}

function onFileChange(event) {
    const file = event.target.files[0]
    const url = URL.createObjectURL(file)
    const image = new Image()   // same with <img src=""/>
    image.src=url
    image.onload = function() {
        ctx.drawImage(image, 0, 0,CANVAS_WIDTH, CANVAS_HEIGHT)
        fileInput.value = null
    }

}

function onDoubleClick(event) {
    const text = textInput.value
    if(text !== "") {
        ctx.save() //saves the current context 
        ctx.lineWidth = 1
        ctx.font = "48px serif"
        ctx.fillText(text, event.offsetX, event.offsetY)
        ctx.restore() // restores previous context
    }
}

function onSaveClick(event) {
    const url = canvas.toDataURL()
    const a = document.createElement("a")
    a.href = url
    a.download = "myDrawing.png"
    a.click()
}


//canvas.onmousemove = function //is same with .addEventListener("mousemove")

canvas.addEventListener("mousemove", onMove)
canvas.addEventListener("mousedown", onMouseDown)
canvas.addEventListener("mouseup", onMouseUp)
canvas.addEventListener("mouseleave", onMouseUp)
canvas.addEventListener("click", onCanvasClick)
canvas.addEventListener("dblclick", onDoubleClick)


lineWidth.addEventListener("change", onLineWidthChange)
color.addEventListener("change", onColorChange)
colorOptions.forEach(color => color.addEventListener("click", onColorClick))
modeBtn.addEventListener("click", onModeClick)
destroyBtn.addEventListener("click", onDestroyClick)
eraseBtn.addEventListener("click", onEraseClick)
fileInput.addEventListener("change", onFileChange)
saveBtn.addEventListener("click", onSaveClick)