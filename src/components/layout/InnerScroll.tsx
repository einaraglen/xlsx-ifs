import { ReactNode } from "react";

const InnerScroll = ({ children }: { children: ReactNode }) => {
    return (
      <div className="relative">
        <div className="absolute inset-0">
          <div className="h-full overflow-y-scroll overflow-x-hidden">{children}</div>
        </div>
      </div>
    );
  };
  
  export default InnerScroll;