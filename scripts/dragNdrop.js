export class Draggable {
    constructor(element) {
        this.element = element;
        this.isDragging = false;
        this.offsetX = 0;
        this.offsetY = 0;

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);

        this.element.addEventListener('mousedown', this.onMouseDown);
        document.addEventListener('mouseup', this.onMouseUp);
    }

    onMouseDown(e) {
        this.isDragging = true;
        this.offsetX = e.clientX - this.element.offsetLeft;
        this.offsetY = e.clientY - this.element.offsetTop;

        document.addEventListener('mousemove', this.onMouseMove);
    }

    onMouseMove(e) {
        if (this.isDragging) {
            this.element.style.left = `${e.clientX - this.offsetX}px`;
            this.element.style.top = `${e.clientY - this.offsetY}px`;
        }
    }

    onMouseUp() {
        this.isDragging = false;
        document.removeEventListener('mousemove', this.onMouseMove);
    }
}

