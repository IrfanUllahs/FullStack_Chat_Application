import { createContext, useEffect, useState } from "react";

const CloudinaryScriptContext = createContext();

function UploadWidget({ uwConfig, setPublicId, setImage }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    }
  }, [loaded]);

  useEffect(() => {
    if (loaded) {
      const handleClick = () => {
        if (window.cloudinary && window.cloudinary.createUploadWidget) {
          var myWidget = window.cloudinary.createUploadWidget(
            uwConfig,
            (error, result) => {
              if (!error && result && result.event === "success") {
                console.log("Done! Here is the image info: ", result.info);
                setImage(result.info.secure_url);
              }
            }
          );
          document
            .getElementById("upload_widget")
            .addEventListener("click", () => {
              myWidget.open();
            });
        }
      };
      handleClick();
      return () => {
        // Clean up event listener
        const uploadButton = document.getElementById("upload_widget");
        if (uploadButton) {
          uploadButton.removeEventListener("click", handleClick);
        }
      };
    }
  }, [loaded, uwConfig, setPublicId]);

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button id="upload_widget" className="cloudinary-button">
        Upload
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

export default UploadWidget;
export { CloudinaryScriptContext };
