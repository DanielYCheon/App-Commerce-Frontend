import react from "react";
import { useState } from "react";
/**
 *
 * This component is used to get the coordinate of the mouse pointer. In ProductDetail.jsx, it provides the product image zoom feature. 
 
 */
const Coordinate = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [coordinate, setCoordinate] = useState({ x: 0, y: 0 });

  function handleMouseEnter() {
    setIsHovering(true);
  }
  function handleMouseLeave() {
    setIsHovering(false);
  }
  function handleMouseMove(event) {
    let { left, top } = event.target.getBoundingClientRect();
    let x = event.clientX - left;
    let y = event.clientY - top;
    if (x < event.offsetX) x = 0;
    if (y < 10) y = 10;
    if (x > 90) x = 100;
    if (y > 90) y = 90;
    setCoordinate({ x, y });
  }
  return (
    <div className="Container">
      <div className="flex gap-20">
        <div
          className="relative h-[50rem] w-[45vw] border-2 border-slate-950"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isHovering && (
            <div
              className="absolute  border-2 border-slate-950"
              style={{
                top: `${coordinate.y}px`,
                left: `${coordinate.x}px`,
                width: "50px",
                height: "50px",
                pointerEvents: "none",
                zIndex: "100",
                transform: "translate(-50%,-50%)",
              }}
            ></div>
          )}
        </div>
        <div className="">
          <p>
            Coordinate : {coordinate.x} , {coordinate.y}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Coordinate;
