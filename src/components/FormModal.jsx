import { useRef, useState } from "react";

export  function NewPostModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const fileInputRef = useRef();

  const validateForm = (newTitle, newFile) => {
    const validTypes = ["image/jpeg", "image/png"];
    const isFormValid = newTitle.length > 2 && newFile && validTypes.includes(newFile.type);
    setIsValid(isFormValid);
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    validateForm(newTitle, imageFile);
  };

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    setImageFile(newFile);
    validateForm(title, newFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageFile) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result;
      onSubmit({ title, imageUrl });
      onClose();
      setTitle("");
      setImageFile(null);
      fileInputRef.current.value = ""; // Optional reset
      setIsValid(false);
    };
    reader.readAsDataURL(imageFile);
  };

  return (
    <div className="modal-overlay open-modal" onClick={(e) => {
      if (e.target.classList.contains("modal-overlay")) onClose();
    }}>
      <div className="modal-container">
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
        <form className="modal-form" onSubmit={handleSubmit}>
          <p>Image Upload Form</p>

          <div className="form-row-1">
            <label htmlFor="image-title" className="form-label">
              Image Title
            </label>
            <input
              type="text"
              className="form-input"
              id="image-title"
              placeholder="Enter a descriptive title..."
              value={title}
              onChange={handleTitleChange}
            />
          </div>

          <div className="form-row-2">
            <input
              type="file"
              className="upload"
              id="image-file"
              ref={fileInputRef}
              accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
            />
          </div>

          <div>
            <input type="submit" value="Submit" className="submit-btn" disabled={!isValid} />
          </div>
        </form>
      </div>
    </div>
  );
}
