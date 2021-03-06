export default class Cursor {
    constructor() {
        this.userAgent = navigator.userAgent;
        if(this.userAgent.indexOf('iPhone') >= 0 || this.userAgent.indexOf('iPad') >= 0 || this.userAgent.indexOf('Android') >= 0){    
            window.addEventListener('touchstart',this._TouchStart.bind(this));
            window.addEventListener('touchmove',this._TouchMove.bind(this),{passive: false});
            window.addEventListener('touchend',this._TouchEnd.bind(this));
        }else{
            window.addEventListener('mousedown',this._TouchStart.bind(this));
            window.addEventListener('mousemove',this._TouchMove.bind(this));
            window.addEventListener('mouseup',this._TouchEnd.bind(this));
            window.addEventListener('dragend',this._TouchEnd.bind(this));
        }

        this.onTouchStart;
        this.onTouchMove;
        this.onTouchEnd;

        this._x = -999;
        this._y = -999;
        this.mx;
        this.my;

        this._touchDown = false;
    }

    set x(x) {
        if (this._x == -1) this._deltaX = 0;
        else this._deltaX = x - this._x
        this._x = x;
    }
    get x() {
        return this._x;
    }

    set y(y) {
        if (this._y == -1) this._deltaY = 0;
        else this._deltaY = y - this._y
        this._y = y;
    }

    get y() {
        return this._y;
    }

    get deltaX() {
        if (this._deltaX != null) return this._deltaX;
        else return 0;
    }

    get deltaY() {
        if (this._deltaY != null) return this._deltaY;
        else return 0;
    }

    _TouchStart(event) {
        if (!event.touches) {
            if(event.button != 0) return;
            this.x = event.pageX;
            this.y = event.pageY;
        } else {
            this.x = event.touches[0].clientX + window.pageXOffset;
            this.y = event.touches[0].clientY + window.pageYOffset;
        }
        this._touchDown = true;

        if(this.onTouchStart){
            this.onTouchStart(event);
        }
    }

    _TouchMove(event) {
        if (this._touchDown) {
            if (!event.touches) {
                this.x = event.pageX;
                this.y = event.pageY;
            } else {
                this.x = event.touches[0].clientX + window.pageXOffset;
                this.y = event.touches[0].clientY + window.pageYOffset;
            }
            if(this.onTouchMove){
                this.onTouchMove(event);
            }
        }
    }

    _TouchEnd() {
        if (this._touchDown) {
            this._touchDown = false;
            this._x = -999;
            this._y = -999;

            if(this.onTouchEnd){
                this.onTouchEnd(event);
            }
        }
    }
}