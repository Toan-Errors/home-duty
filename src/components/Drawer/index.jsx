import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";

export default function Drawer({ items = [], height }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      id="drawer"
      className={`${open ? "active" : ""}`}
      style={{
        height: height || items.length * 50,
        top: `calc(50% - ${(items.length * 50) / 2}px)`,
      }}
    >
      <div className="navigation">
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <Link to={item.link}>
                <span className="icon">{item.icon}</span>
                <span className="title">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`toggle ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        {open ? <BsFillCaretLeftFill /> : <BsFillCaretRightFill />}
      </div>
    </div>
  );
}
