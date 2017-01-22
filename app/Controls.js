export class Controls {

    constructor() {
        this.direction = '';
        this.lastMoveTime = {};

        this.setupKeyboard();
        this.setupMouse();
    }

    setupKeyboard() {
        this.pressedKeys = {};
        this.keyMap = {
            87: 'up',
            68: 'right',
            83: 'down',
            65: 'left'
        };

        document.addEventListener('keydown', this.keyboard.bind(this));
        document.addEventListener('keyup', this.keyboard.bind(this));
    }

    setupMouse() {
        this.mouseSensitivity = 5;
        this.mouseLastPosition = {};

        document.addEventListener('mousemove', this.setCursorDirection.bind(this));
        document.addEventListener('mousedown', this.mouse.bind(this));
        document.addEventListener('mouseup', this.mouse.bind(this));
    }

    keyboard(e) {
        const key = this.keyMap[e.keyCode];

        if (!key)
            return;

        e.preventDefault();

        if (e.type === 'keydown') {
            this.pressedKeys[key] = true;
            this.pressedKeys.last = key;
        }

        if (e.type === 'keyup')
            this.pressedKeys[key] = false;

        if (this.pressedKeys[this.pressedKeys.last]) {
            this.direction = this.pressedKeys.last;
        } else if (this.pressedKeys.up) {
            this.direction = 'up';
        } else if (this.pressedKeys.right) {
            this.direction = 'right';
        } else if (this.pressedKeys.down) {
            this.direction = 'down';
        } else if (this.pressedKeys.left) {
            this.direction = 'left';
        } else {
            this.direction = '';
        }

        if (this.direction) {
            this.cursorDirection = this.direction;
            this.updateCursor();
        }
    }

    setCursorDirection(e) {
        if (this.throttleMovement(20))
            return;

        let xDifference = e.clientX - this.mouseLastPosition.x;
        let yDifference = e.clientY - this.mouseLastPosition.y;

        if (Math.abs(xDifference) - Math.abs(yDifference) >= 0) {
            if (xDifference > this.mouseSensitivity) {
                this.cursorDirection = 'right';
            }
            if (xDifference < -this.mouseSensitivity) {
                this.cursorDirection = 'left';
            }
        } else {
            if (yDifference > this.mouseSensitivity) {
                this.cursorDirection = 'down';
            }
            if (yDifference < -this.mouseSensitivity) {
                this.cursorDirection = 'up';
            }
        }

        this.mouseLastPosition = {
            x: e.clientX,
            y: e.clientY
        };

        this.updateCursor();
    }

    updateCursor() {
        if (this.lastCursorDirection !== this.cursorDirection) {
            document.body.classList.remove('cursor-' + this.lastCursorDirection);
            document.body.classList.add('cursor-' + this.cursorDirection);
            this.lastCursorDirection = this.cursorDirection;
        }
    }

    mouse(e) {
        if (e.buttons === 1) {
            if (e.type === 'mousedown') {
                e.preventDefault();
                this.mouseSetDirection();
                this.mousedownInterval = setInterval(this.mouseSetDirection.bind(this), 20);
            }
        }

        if (e.type === 'mouseup') {
            e.preventDefault();
            this.direction = '';
            clearInterval(this.mousedownInterval);
        }
    }

    mouseSetDirection() {
        this.direction = this.cursorDirection;
    }

    throttleMovement(milliseconds) {
        if (window.performance.now() - this.lastMoveTime[milliseconds] < milliseconds)
            return true;

        this.lastMoveTime[milliseconds] = window.performance.now();
    }

}