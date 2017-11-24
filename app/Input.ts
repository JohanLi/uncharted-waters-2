import { IPosition, Direction } from "./types";

export default class Input {
  public direction: string;
  private gameElement: HTMLElement = document.getElementById("app");
  private lastMoveTime: object = {};
  private pressedKeys = {
    up: false,
    right: false,
    down: false,
    left: false,
    last: "",
  };
  private keyMap: object;
  private mouseLeft: number = 1;
  private mouseSensitivity: number = 5;
  private mouseLastPosition: IPosition = {x: 0, y: 0};
  private cursorDirection: Direction;
  private lastCursorDirection: string;
  private mousedownIntervals: number[] = [];

  constructor() {
    this.direction = "";
    this.lastMoveTime = {};

    this.setupKeyboard();
    this.setupMouse();
  }

  private setupKeyboard() {
    this.keyMap = {
      87: "up",
      68: "right",
      83: "down",
      65: "left",
    };

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
    const key = this.keyMap[e.keyCode];

    if (!key) {
      return;
    }

    e.preventDefault();

    if (e.type === "keydown") {
      this.pressedKeys[key] = true;
      this.pressedKeys.last = key;
    }

    if (e.type === "keyup") {
      this.pressedKeys[key] = false;
    }

    if (this.pressedKeys[this.pressedKeys.last]) {
      this.direction = this.pressedKeys.last;
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
        this.mouseSetDirection();
        this.mousedownIntervals.push(setInterval(this.mouseSetDirection.bind(this), 20));
      }

      if (e.type === "mouseup") {
        this.direction = "";
        this.mousedownIntervals.forEach((interval) => clearInterval(interval));
        this.mousedownIntervals = [];
      }
    }
  }

  private mouseSetDirection() {
    this.direction = this.cursorDirection;
  }

  private throttleMovement(milliseconds: number): boolean {
    if (window.performance.now() - this.lastMoveTime[milliseconds] < milliseconds) { return true; }

    this.lastMoveTime[milliseconds] = window.performance.now();
    return false;
  }

}
