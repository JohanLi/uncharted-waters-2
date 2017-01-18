export class Player {
    
    constructor(x, y, frame) {
        this.x = x;
        this.y = y;

        this.pressedKey = {
            left: false,
            right: false,
            up: false,
            down: false
        };

        this.width = 32;
        this.height = 32;
        this.frame = frame;
        this.offsetX = 0;
        this.offsetY = -16;
        this.tilesize = 16;

        this.keyMap();
    }

    keyMap() {
        this.keyMap = {
            38: 'up',
            40: 'down',
            37: 'left',
            39: 'right'
        };

        document.addEventListener('keydown', this.keydown.bind(this));
        document.addEventListener('keyup', this.keyup.bind(this));
    }

    keydown(e) {
        let key = this.keyMap[e.keyCode];

        if (key) {
            this.pressedKey[key] = true;
            e.preventDefault();
        }
    }

    keyup(e) {
        let key = this.keyMap[e.keyCode];

        if (key) {
            this.pressedKey[key] = false;
            e.preventDefault();
        }
    }

    setDestination() {
        this.destination = {
            x: this.x,
            y: this.y,
        };

        if (this.pressedKey.up) {
            this.destination.y -= this.tilesize;
            this.frame = this.frame === 0 ? 1 : 0;
        } else if (this.pressedKey.down) {
            this.destination.y += this.tilesize;
            this.frame = this.frame === 4 ? 5 : 4;
        } else if (this.pressedKey.left) {
            this.destination.x -= this.tilesize;
            this.frame = this.frame === 6 ? 7 : 6;
        } else if (this.pressedKey.right) {
            this.destination.x += this.tilesize;
            this.frame = this.frame === 2 ? 3 : 2;
        }
    }

    move() {
        this.x = this.destination.x;
        this.y = this.destination.y;
    }

    collisionAt(destination) {
        const xCollision = destination.x - this.x < this.width && destination.x - this.x > -this.width;
        const yCollision = destination.y - this.y < this.height && destination.y - this.y > -this.height;

        return xCollision && yCollision;
    }

}