import { useEffect, useState } from "react";

interface RandomImageButtonProps {
  getImage: React.Dispatch<
    React.SetStateAction<{
      src: string;
      naturalWidth: number;
      naturalHeight: number;
    }>
  >;
}

const RandomImageButton = ({ getImage }: RandomImageButtonProps) => {
  const [imageUrl, setImageUrl] = useState({
    src: "",
    naturalWidth: 0,
    naturalHeight: 0,
  });

  const getRandomImage = async () => {
    try {
      const response = await fetch(
        "https://api.unsplash.com/photos/random?client_id=M7Cr3FGz9wDOPSVcxZgW4ZB4ZtFUoKW18Qb6JIdgkVM"
      );
      const data = await response.json();
      setImageUrl({
        src: data.urls.regular,
        naturalWidth: data.width,
        naturalHeight: data.height,
      });
      getImage({
        src: data.urls.regular,
        naturalWidth: data.width,
        naturalHeight: data.height,
      });
    } catch (error) {
      console.error("Error fetching random image:", error);
    }
  };

  useEffect(() => {
    getRandomImage();
  }, []);

  return (
    <div>
      <button
        onClick={getRandomImage}
        className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-semibold py-2 px-4 rounded border border-gray-400 shadow"
      >
        Randomise image
      </button>
    </div>
  );
};

export default RandomImageButton;
