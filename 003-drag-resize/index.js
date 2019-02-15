class SimpleDragResize {
  constructor(props) {
    this.el = props;
    this.el.style.setProperty("transform", "translate(0px, 0px)");
    this.el.onmousedown = this.onMouseDown.bind(this);
  }

  getXY(data) {
    const res = /translate\((\d+)px, (\d+)px\)/.exec(data);
    return res && [res[1], res[2]] || [0, 0];
  }

  onMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.target.className === 'bottom-right') {
      const oldWidth = Number(window.getComputedStyle(this.el).width.replace('px', ''));
      const oldHeight = Number(window.getComputedStyle(this.el).height.replace('px', ''));
      const eX = e.clientX;
      const eY = e.clientY;
      document.onmousemove = me => {
        this.el.style.width = `${oldWidth + me.x - eX}px`;
        this.el.style.height = `${oldHeight + me.y - eY}px`;
      }
      return false;
    }
    if (e.target.className === 'bottom') {
      const oldHeight = Number(window.getComputedStyle(this.el).height.replace('px', ''));
      const eY = e.clientY;
      document.onmousemove = me => {
        this.el.style.height = `${oldHeight + me.y - eY}px`;
      }
      document.onmouseup = this.onMouseUp;
      return false;
    }
    if (e.target.className === 'right') {
      const oldWidth = Number(window.getComputedStyle(this.el).width.replace('px', ''));
      const eX = e.clientX;
      document.onmousemove = me => {
        this.el.style.width = `${oldWidth + me.x - eX}px`;
      }
      document.onmouseup = this.onMouseUp;
      return false;
    }
    
    const [x, y] = this.getXY(this.el.style.transform);
    document.onmousemove = moveEvent => this.onDragMove(moveEvent, [e.clientX - x, e.clientY - y]);
    document.onmouseup = this.onMouseUp;
  }

  onDragMove(e, XY) {
    this.el.style.transform = `translate(${e.clientX - XY[0]}px, ${e.clientY - XY[1]}px)`;
  }

  onMouseUp() {
    document.onmousemove = null;
  }
}

new SimpleDragResize(document.querySelector('.box'));
