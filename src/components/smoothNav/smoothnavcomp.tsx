import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

type NavItem = {
  name: string;
  href: string;
};

type SmoothNavProps = {
  items: NavItem[];
  direction?: "horizontal" | "vertical";
  onSelect?: (item: NavItem) => void;
};

export const SmoothNav = ({
  items,
  direction = "horizontal",
  onSelect,
}: SmoothNavProps) => {
  const [active, setActive] = useState(items[0]?.name || "");
  const [indicatorPos, setIndicatorPos] = useState(0);
  const [indicatorSize, setIndicatorSize] = useState(0);

  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const activeEl = itemRefs.current[active];
    if (activeEl) {
      // Set indicator position
      if (direction === "horizontal") {
        setIndicatorPos(activeEl.offsetLeft);
        setIndicatorSize(activeEl.offsetWidth);
      } else {
        setIndicatorPos(activeEl.offsetTop);
        setIndicatorSize(activeEl.offsetHeight);
      }

      // Scroll into view
      activeEl.scrollIntoView({
        behavior: "smooth",
        block: direction === "vertical" ? "nearest" : "center",
        inline: direction === "horizontal" ? "center" : "nearest",
      });
    }
  }, [active, direction]);

  return (
    <div
      ref={containerRef}
      className={`relative flex overflow-auto ${
        direction === "horizontal" ? "flex-row gap-6 border-b" : "flex-col border-l"
      } border-black`}
    >
      {items.map((item) => (
        
       
          <Link
            to={item.href}
            className={`flex items-center gap-2 no-underline text-inherit`}
          >
             <div
          key={item.name}
          ref={(el) => {itemRefs.current[item.name] = el}}
          onClick={() => {
            setActive(item.name);
            onSelect?.(item);
          }}
          className={`p-2  text-[var(--card-text)]  flex items-center justify-center hover:text-red-600 cursor-pointer transition-colors duration-300 ${
            active === item.name ? "font-semibold text-white" : ""
          }`}
        >
         <small>{item.name}</small>
        </div>
          
          </Link>
        
      ))}

      {/* Active Indicator */}
      <span
        className="absolute bg-red-200 rounded-full  transition-all duration-300"
        style={
          direction === "horizontal"
            ? {
                bottom: 0,
                left: indicatorPos,
                height: "100%",
                width: indicatorSize,
              }
            : {
                left: 0,
                top: indicatorPos,
                // width: "2px",
                height: indicatorSize,
              }
        }
      ></span>
    </div>
  );
};
