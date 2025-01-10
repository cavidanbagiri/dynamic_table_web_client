import { div } from "framer-motion/client";
import React from "react";

function TextareaInformationComponent() {
    const textareaStyle = {
        width: 'calc(100% - 410px)',
      };
  return (
    <div className="flex flex-row h-96">

      <div className="w-96 p-2 m-2 border border-gray-300 rounded-md">
        <span className="text-md text-gray-500">Information</span>
      </div>

      <textarea
        style={{ fontFamily: "JetBrains Mono", ...textareaStyle }}
        className=" w-full rounded-md p-2 border border-gray-300 my-2 outline-gray-400 text-sm"
      ></textarea>
    </div>
  );
}

export default TextareaInformationComponent;
