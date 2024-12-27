import React, { useState } from "react";

const ClipboardInput = ({shortId}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const inputElement = document.getElementById("copy");
    if (inputElement) {
      navigator.clipboard.writeText(inputElement.value).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      });
    }
  };

  return (
    <div className="h-14 rounded-lg w-[60vw] bg-zinc-500 mt-10 mx-auto p-2 flex gap-5">
      <input id="copy" className="w-[80%] h-10 rounded-lg text-center text-2xl font-semibold bg-white" value={"http://localhost:8000/api/url/"+shortId}/>
      <button  className="w-[15%] h-10 rounded-lg text-center text-2xl font-semibold bg-blue-600 text-white cursor-pointer" onClick={handleCopy}>{copied?"Copied":"Copy"}</button>
    </div>
  );
};

export default ClipboardInput;
