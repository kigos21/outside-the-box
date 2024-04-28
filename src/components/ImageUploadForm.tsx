const ImageUploadForm = ({
  onPayment,
  selectedImage,
  setSelectedImage,
}: {
  onPayment: any;
  selectedImage: any;
  setSelectedImage: any;
}) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (!file) return;

    // Check for image type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    // Check for single file selection
    if (event.target.files && event.target.files.length > 1) {
      alert('Please only select one image.');
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedImage) {
      alert('Please select an image to upload.');
      return;
    }
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
        onPayment();
      }}
      className="flex flex-col space-y-8"
    >
      <div className="flex flex-col space-y-2 rounded-md bg-gray-100 px-6 py-4">
        <label htmlFor="image" className="font-bold">
          Upload receipt or screenshot of proof of payment.
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          className="p-4"
          required
        />
      </div>

      <button
        type="submit"
        disabled={!selectedImage}
        className="w-full  rounded-2xl bg-gradient-to-br from-cs-yellow to-cs-orange px-6 py-4 font-bold uppercase shadow-md transition-all hover:bg-black hover:text-white hover:shadow-none"
      >
        Continue
      </button>
    </form>
  );
};

export default ImageUploadForm;
