const loadImage = async (file: any) => {
  const image = new window.Image();
  image.src = URL.createObjectURL(file);

  await new Promise((resolve) => {
    image.onload = () => {
      resolve(image);
    };
  });
  return image;
};

const validateFile = async (file: any) => {
  if (!file) return { valid: false, error: "nofile" };
  // const validTypes = ["image/svg+xml", "image/png", "image/jpeg", "image/gif"];
  const validTypes = ["image/png", "image/jpeg"];

  if (!validTypes.includes(file.type)) {
    console.log("Not acceptable type.");
    return { valid: false, errorType: "type" };
  }

  const validDimension = { width: 800, height: 400 };
  const image = await loadImage(file);

  if (
    !(
      image.width <= validDimension.width &&
      image.height <= validDimension.height
    )
  ) {
    console.log("Dimensions too high.");
    return { valid: false, errorType: "dimension" };
  }
  console.log("Image ok.");
  return { valid: true };
};

export { loadImage, validateFile };
