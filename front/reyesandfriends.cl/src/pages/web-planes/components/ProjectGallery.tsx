import React, { useState } from "react";

interface ProjectGalleryProps {
  images: string[];
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return <div className="text-center text-gray-500">No hay imágenes disponibles.</div>;
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-4 w-full flex justify-center">
        <div className="bg-white rounded-lg shadow-lg w-[1280px] aspect-video flex items-center justify-center">
          <img
            src={images[selectedIndex]}
            alt={`Imagen ${selectedIndex + 1}`}
            className="object-cover w-full h-full rounded-lg pointer-events-none"
          />
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={`border-2 rounded-lg p-1 transition-all ${
              selectedIndex === idx
                ? "border-reyes"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <div className="bg-white w-[80px] aspect-video flex items-center justify-center rounded">
              <img
                src={img}
                alt={`Miniatura ${idx + 1}`}
                className="object-cover w-full h-full rounded pointer-events-none"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectGallery;
