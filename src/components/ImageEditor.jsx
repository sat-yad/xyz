import React, { useState, useEffect } from 'react';
import '../index.css'; // Make sure to include this line to import the CSS

function ImageEditor() {
  const [image, setImage] = useState(null);
  const [editedImage, setEditedImage] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [rotationAxisX, setRotationAxisX] = useState(0);
  const [rotationAxisY, setRotationAxisY] = useState(1); // Default to Y-axis rotation
  const [rotationAxisZ, setRotationAxisZ] = useState(0);
  const [translationX, setTranslationX] = useState(0);
  const [translationY, setTranslationY] = useState(0);
  const [translationZ, setTranslationZ] = useState(0);
  const [foregroundWeight, setForegroundWeight] = useState(1.5);
  const [backgroundWeight, setBackgroundWeight] = useState(1.25);

  useEffect(() => {
    applyTransformations();
  }, [image, rotationAngle, rotationAxisX, rotationAxisY, rotationAxisZ, translationX, translationY, translationZ, foregroundWeight, backgroundWeight]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyTransformations = () => {
    if (!image) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      const scale = Math.min(800 / img.width, 800 / img.height); // Scale image to fit within 800x800
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply transformations
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotationAngle * Math.PI) / 180);
      ctx.translate(translationX, translationY);

      // Apply weights and draw image
      ctx.drawImage(img, -img.width / 2 * scale, -img.height / 2 * scale, img.width * scale * foregroundWeight, img.height * scale * backgroundWeight);
      setEditedImage(canvas.toDataURL());
    };

    img.src = image;
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col lg:flex-row justify-between items-start bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="w-full lg:w-1/2 bg-gray-900 p-6 rounded-lg shadow-lg mb-6 lg:mb-0 lg:mr-6">
          <h2 className="text-2xl font-bold mb-4 text-white">Edit Object</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4 w-full p-2 text-black rounded"
          />
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
              {editedImage && <img src={editedImage} alt="Edited" className="variable-image" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageEditor;
