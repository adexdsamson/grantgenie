import { CSSProperties, ReactNode } from "react";
import { ResizableBox as ReactResizableBox } from "react-resizable";

import "react-resizable/css/styles.css";

type ResizableBoxProps = {
    children: ReactNode,
    width?: number,
    height?: number,
    resizable?: boolean,
    style?: CSSProperties,
    className?: string,
  }

export default function ResizableBox({
  children,
  width = 600,
  height = 300,
  resizable = true,
  className = "",
}: ResizableBoxProps) {
  return (
    <div className="w-full">
      <div className="w-full">
        {resizable ? (
          <ReactResizableBox width={width} height={height}>
            <div
              style={{
                width: "100%",
                height: "100%",
              }}
              className={className}
            >
              {children}
            </div>
          </ReactResizableBox>
        ) : (
          <div
            style={{
              width: `${width}px`,
              height: `${height}px`,
            }}
            className={className}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
