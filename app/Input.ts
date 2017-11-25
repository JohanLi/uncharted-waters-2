import { IPosition, IPressedKeys, Direction } from "./types";

export default class Input {
  public direction: Direction = "";
  private gameElement: HTMLElement = document.getElementById("app");
  private lastMoveTime: {[key: number]: number} = {};
  private pressedKeys: IPressedKeys = {
    up: false,
    right: false,
    down: false,
    left: false,
  };
  private keyMap: {[key: number]: Direction}  = {
    87: "up",
    68: "right",
    83: "down",
    65: "left",
  };
  private mouseLeft = 1;
  private mouseSensitivity = 5;
  private mouseLastPosition: IPosition = {
    x: 0,
    y: 0,
  };
  private cursorDirection: Direction;
  private lastCursorDirection: Direction;
  private mousedownIntervals: number[] = [];

  constructor() {
    this.setupKeyboard();
    this.setupMouse();
  }

  private setupKeyboard() {
    document.addEventListener("keydown", this.keyboard.bind(this));
    document.addEventListener("keyup", this.keyboard.bind(this));
  }

  private setupMouse() {
    this.disableRightClick();

    document.addEventListener("mousemove", this.setCursorDirection.bind(this));
    document.addEventListener("mousedown", this.mouse.bind(this));
    document.addEventListener("mouseup", this.mouse.bind(this));
  }

  private disableRightClick() {
    this.gameElement.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }

  private keyboard(e: KeyboardEvent) {
    const pressedKey = this.keyMap[e.keyCode];

    if (!pressedKey) {
      return;
    }

    e.preventDefault();

    if (e.type === "keydown") {
      this.pressedKeys[pressedKey] = true;
    }

    if (e.type === "keyup") {
      this.pressedKeys[pressedKey] = false;
    }

    if (this.pressedKeys[pressedKey]) {
      this.direction = pressedKey;
    } else if (this.pressedKeys.up) {
      this.direction = "up";
    } else if (this.pressedKeys.right) {
      this.direction = "right";
    } else if (this.pressedKeys.down) {
      this.direction = "down";
    } else if (this.pressedKeys.left) {
      this.direction = "left";
    } else {
      this.direction = "";
    }

    this.hideCursor();
  }

  private setCursorDirection(e: MouseEvent) {
    if (this.throttleMovement(20)) {
      return;
    }

    const xDifference = e.clientX - this.mouseLastPosition.x;
    const yDifference = e.clientY - this.mouseLastPosition.y;

    this.mouseLastPosition = {
      x: e.clientX,
      y: e.clientY,
    };

    if (Math.abs(xDifference) < this.mouseSensitivity
      && Math.abs(yDifference) < this.mouseSensitivity) {
      return;
    }

    if (Math.abs(xDifference) >= Math.abs(yDifference)) {
      if (xDifference > 0) {
        this.cursorDirection = "right";
      }
      if (xDifference < 0) {
        this.cursorDirection = "left";
      }
    } else {
      if (yDifference > 0) {
        this.cursorDirection = "down";
      }
      if (yDifference < 0) {
        this.cursorDirection = "up";
      }
    }

    this.updateCursor();
  }

  private updateCursor() {
    if (this.lastCursorDirection !== this.cursorDirection) {
      this.gameElement.classList.remove(`cursor-${this.lastCursorDirection}`);
      this.gameElement.classList.add(`cursor-${this.cursorDirection}`);
      this.lastCursorDirection = this.cursorDirection;
    }
  }

  private hideCursor() {
    if (this.lastCursorDirection) {
      this.gameElement.classList.remove(`cursor-${this.lastCursorDirection}`);
      this.lastCursorDirection = "";
    }
  }

  private mouse(e: MouseEvent) {
    if (e.which === this.mouseLeft) {
      e.preventDefault();

      if (e.type === "mousedown") {
        this.direction = this.cursorDirection;
        this.mousedownIntervals.push(window.setInterval(() => this.direction = this.cursorDirection, 20));
      }

      if (e.type === "mouseup") {
        this.direction = "";
        this.mousedownIntervals.forEach((interval) => window.clearInterval(interval));
        this.mousedownIntervals = [];
      }
    }
  }

  private throttleMovement(milliseconds: number): boolean {
    if (window.performance.now() - this.lastMoveTime[milliseconds] < milliseconds) {
      return true;
    }

    this.lastMoveTime[milliseconds] = window.performance.now();
    return false;
  }
}
