import React, { useState } from "react";
import axios from "axios";
import "../index.css"; // Ensure CSS import for styles

function ImageEditor() {
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [mask, setMask] = useState("");
  const [depth, setDepth] = useState("");
  const [harmonizedBackgroundDepth, setHarmonizedBackgroundDepth] =
    useState("");
  const [imageIdentity, setImageIdentity] = useState("");
  const [rotationAngle, setRotationAngle] = useState(0);
  const [rotationAxisX, setRotationAxisX] = useState(0);
  const [rotationAxisY, setRotationAxisY] = useState(1); // Default to Y-axis rotation
  const [rotationAxisZ, setRotationAxisZ] = useState(0);
  const [translationX, setTranslationX] = useState(0);
  const [translationY, setTranslationY] = useState(0);
  const [translationZ, setTranslationZ] = useState(0);
  const [foregroundWeight, setForegroundWeight] = useState(1.5);
  const [backgroundWeight, setBackgroundWeight] = useState(1.25);

  const handlePromptSubmit = async (e) => {
    e.preventDefault();
    if (prompt) {
      try {
        const response = await axios.post("http://127.0.0.1:7860/api/predict", {
          prompt,
          mask: mask || null,
          depth: depth || null,
          harmonized_background_depth: harmonizedBackgroundDepth || null,
          image_identity: imageIdentity || null,
          rotation_angle: rotationAngle,
          rotation_axis_x: rotationAxisX,
          rotation_axis_y: rotationAxisY,
          rotation_axis_z: rotationAxisZ,
          translation_x: translationX,
          translation_y: translationY,
          translation_z: translationZ,
          foreground_weight: foregroundWeight,
          background_weight: backgroundWeight,
        });
        const imageData = response.data.image; // Adjust based on actual API response structure
        setImage(imageData);
      } catch (error) {
        console.error("Error fetching the image:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col lg:flex-row justify-between items-start bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="w-full lg:w-1/2 bg-gray-900 p-6 rounded-lg shadow-lg mb-6 lg:mb-0 lg:mr-6">
          <h2 className="text-2xl font-bold mb-4 text-white">Edit Object</h2>
          <form onSubmit={handlePromptSubmit}>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter a prompt"
              className="mb-4 w-full p-2 text-black rounded"
            />
            <input
              type="text"
              value={mask}
              onChange={(e) => setMask(e.target.value)}
              placeholder="Mask URL (optional)"
              className="mb-4 w-full p-2 text-black rounded"
            />
            <input
              type="text"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
              placeholder="Depth URL (optional)"
              className="mb-4 w-full p-2 text-black rounded"
            />
            <input
              type="text"
              value={harmonizedBackgroundDepth}
              onChange={(e) => setHarmonizedBackgroundDepth(e.target.value)}
              placeholder="Harmonized Background Depth URL (optional)"
              className="mb-4 w-full p-2 text-black rounded"
            />
            <input
              type="text"
              value={imageIdentity}
              onChange={(e) => setImageIdentity(e.target.value)}
              placeholder="Image Identity URL (optional)"
              className="mb-4 w-full p-2 text-black rounded"
            />
            <button
              type="submit"
              className="mb-4 w-full p-2 text-white bg-blue-500 rounded"
            >
              Fetch Image
            </button>
          </form>
          <div className="mb-4">
            <label className="block mb-2 text-white">Rotation Angle</label>
            <input
              type="range"
              min="0"
              max="360"
              value={rotationAngle}
              onChange={(e) => setRotationAngle(e.target.value)}
              className="w-full"
            />
            <span className="text-white">{rotationAngle}°</span>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-white">Rotation Axis X</label>
            <input
              type="number"
              value={rotationAxisX}
              onChange={(e) => setRotationAxisX(e.target.value)}
              className="w-full p-2 text-black rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-white">Rotation Axis Y</label>
            <input
              type="number"
              value={rotationAxisY}
              onChange={(e) => setRotationAxisY(e.target.value)}
              className="w-full p-2 text-black rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-white">Rotation Axis Z</label>
            <input
              type="number"
              value={rotationAxisZ}
              onChange={(e) => setRotationAxisZ(e.target.value)}
              className="w-full p-2 text-black rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-white">Translation X</label>
            <input
              type="number"
              value={translationX}
              onChange={(e) => setTranslationX(e.target.value)}
              className="w-full p-2 text-black rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-white">Translation Y</label>
            <input
              type="number"
              value={translationY}
              onChange={(e) => setTranslationY(e.target.value)}
              className="w-full p-2 text-black rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-white">Translation Z</label>
            <input
              type="number"
              value={translationZ}
              onChange={(e) => setTranslationZ(e.target.value)}
              className="w-full p-2 text-black rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-white">Foreground Weight</label>
            <input
              type="number"
              step="0.1"
              value={foregroundWeight}
              onChange={(e) => setForegroundWeight(e.target.value)}
              className="w-full p-2 text-black rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-white">Background Weight</label>
            <input
              type="number"
              step="0.1"
              value={backgroundWeight}
              onChange={(e) => setBackgroundWeight(e.target.value)}
              className="w-full p-2 text-black rounded"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2 text-white">Input Image</h3>
            <div className="fixed-image-container">
              {image && <img src={image} alt="Input" className="fixed-image" />}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 text-white">Edited Image</h3>
            <div className="variable-image-container">
              {image && (
                <img src={image} alt="Edited" className="variable-image" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageEditor;
