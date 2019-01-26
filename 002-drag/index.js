class SimpleDrag {
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
    const [x, y] = this.getXY(this.el.style.transform);
    document.onmousemove = moveEvent => this.onMouseMove(moveEvent, [e.clientX - x, e.clientY - y]);
    document.onmouseup = this.onMouseUp;
  }

  onMouseMove(e, XY) {
    this.el.style.transform = `translate(${e.clientX - XY[0]}px, ${e.clientY - XY[1]}px)`;
  }

  onMouseUp() {
    document.onmousemove = null;
  }
}

new SimpleDrag(document.querySelector('.box'));
