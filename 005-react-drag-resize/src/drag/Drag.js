import React, { Component } from 'react';
import './Drag.css';

export default class Drag extends Component {
  constructor(props) {
    super(props);
    this.el = React.createRef();
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onDragMove = this.onDragMove.bind(this);
    this.onRightMouseDown = this.onRightMouseDown.bind(this);
    this.onBottomMouseDown = this.onBottomMouseDown.bind(this);
    this.onBottomRightMouseDown = this.onBottomRightMouseDown.bind(this);
  }

  componentDidMount() {
    this.el.current.style.setProperty("transform", "translate(0px, 0px)");
  }

  getXY(data) {
    const res = /translate\((\d+)px, (\d+)px\)/.exec(data);
    return res && [res[1], res[2]] || [0, 0];
  }

  onDragMove(e, XY) {
    const clientX = e.clientX;
    const clientY = e.clientY;
    this.el.current.style.transform = `translate(${clientX - XY[0]}px, ${clientY - XY[1]}px)`;
  }

  onMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
    const [x, y] = this.getXY(this.el.current.style.transform);
    // React 把合成事件做了处理，得先赋值再使用
    const clientX = e.clientX;
    const clientY = e.clientY;
    document.onmousemove = me => this.onDragMove(me, [clientX - x, clientY - y]);
    document.onmouseup = this.onMouseUp;
  }

  onRightMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
    const oldWidth = Number(window.getComputedStyle(this.el.current).width.replace('px', ''));
    const eX = e.clientX;
    document.onmousemove = me => {
      this.el.current.style.width = `${oldWidth + me.x - eX}px`;
    }
    document.onmouseup = this.onMouseUp;
  }

  onBottomMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
    const oldHeight = Number(window.getComputedStyle(this.el.current).height.replace('px', ''));
    const eY = e.clientY;
    document.onmousemove = me => {
      this.el.current.style.height = `${oldHeight + me.y - eY}px`;
    }
    document.onmouseup = this.onMouseUp;
  }

  onBottomRightMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
    const oldWidth = Number(window.getComputedStyle(this.el.current).width.replace('px', ''));
    const oldHeight = Number(window.getComputedStyle(this.el.current).height.replace('px', ''));
    const eX = e.clientX;
    const eY = e.clientY;
    document.onmousemove = me => {
      this.el.current.style.width = `${oldWidth + me.x - eX}px`;
      this.el.current.style.height = `${oldHeight + me.y - eY}px`;
    }
    document.onmouseup = this.onMouseUp;
  }

  onMouseUp() {
    document.onmousemove = null;
  }

  render() {
    return (
      <div onMouseDown={this.onMouseDown} ref={this.el} className="box">
        <div onMouseDown={this.onRightMouseDown} className="right"></div>
        <div onMouseDown={this.onBottomMouseDown} className="bottom"></div>
        <div onMouseDown={this.onBottomRightMouseDown} className="bottom-right"></div>
      </div>
    )
  }
}