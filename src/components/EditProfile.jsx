import { useRef, useState } from "react";


export  function EditProfileModal({ onClose, currentName, currentBio, onSave }) {
  const [formName, setFormName] = useState(currentName);
  const [formBio, setFormBio] = useState(currentBio);
  const [formFile, setFormFile] = useState(null);
  
  
  const fileInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formName || !formBio || !formFile) {
      alert("Please fill in all fields.");
      return;
    }
    if (formName.length < 3 || formName.length > 30) {
      alert("Name must be between 3 and 30 characters.");
      return;
    }
    if (formBio.length < 10 || formBio.length > 100) {
      alert("Biography must be between 10 and 100 characters.");
      return;
    }

    onSave(formName, formBio, URL.createObjectURL(formFile));
    onClose();
  };

  
  

  return (
    <div className="editModal-content"
      
      onClick={(e) => e.target.className.includes("fixed") && onClose()}
    >
      <div >
        <span onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <h3 >Edit Info</h3>
          <label>Full Name:</label>
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="John Doe"
            
          />
          <label>Bio:</label>
          <textarea
            value={formBio}
            onChange={(e) => setFormBio(e.target.value)}
            placeholder="Biography"
            rows="3"
            
          />
          <label>Profile Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFormFile(e.target.files[0])}
            className="mb-4"
            ref={fileInputRef}
          />
          <button type="submit" >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
