// src/components/Header.jsx
import { useState } from "react";
import { EditProfileModal } from "./EditProfile";
import { NewPostModal } from "./FormModal";

export function Header({ onAddPost }) {
  // === State for the profile info ===
  const [name, setName] = useState("Bessie Coleman");
  const [bio, setBio] = useState("Civil Aviator");
  const [avatarSrc, setAvatarSrc] = useState("/assets/Avatar.svg");

  // === State for modals ===
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  // === Handler for saving profile edits ===
  const handleSave = (updatedName, updatedBio, newAvatarURL) => {
    setName(updatedName);
    setBio(updatedBio);
    setAvatarSrc(newAvatarURL);
  };

  // === Handler for new post submission ===
  const handleNewPostSubmit = (postData) => {
    console.log("New post submitted:", postData);
    // You can update state here or lift it up to App if needed
    setShowNewPostModal(false); // close modal after submit
  };

  return (
    <header>
      <div id="menuBar">
        <img src="/assets/Logo.svg" alt="logo" id="logoImg" />
      </div>

      <div id="first_container">
        <div id="left_container">
          {/* Dynamic avatar */}
          <img src={avatarSrc} alt="Avatar" id="avatarImg" />

          <div id="textContainer">
            <p>{name}</p>
            <p>{bio}</p>

            <button onClick={() => setShowEditModal(true)}>
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="13.0676"
                  y="4.87506"
                  width="11.6506"
                  height="3.21396"
                  transform="rotate(135 13.0676 4.87506)"
                  fill="#212121"
                />
                <path
                  d="M14.2035 1.4662C14.8311 2.09377 14.8311 3.11125 14.2035 3.73881L13.6354 4.30697L11.3628 2.03436L11.9309 1.4662C12.5585 0.83864 13.576 0.83864 14.2035 1.4662Z"
                  fill="#212121"
                />
                <path
                  d="M1.54021 13.4837L2.55674 10.8408L4.82935 13.1134L2.18637 14.1299C1.782 14.2854 1.38468 13.8881 1.54021 13.4837Z"
                  fill="#212121"
                />
              </svg>
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        <button
          id="right_container"
          className="modal-btn"
          onClick={() => setShowNewPostModal(true)}
        >
          <div>
            <img src="/assets/plus.png" alt="Plus Icon" id="plusIcon" />
          </div>
          <div>
            <p>New Post</p>
          </div>
        </button>
      </div>

      {/* === Modals === */}
      {showEditModal && (
        <EditProfileModal
          onClose={() => setShowEditModal(false)}
          currentName={name}
          currentBio={bio}
          onSave={handleSave}
        />
      )}

      {showNewPostModal && (
        <NewPostModal
          onClose={() => setShowNewPostModal(false)}
          onSubmit={(postData) => {
            onAddPost(postData);
            setShowNewPostModal(false);
          }}
        />
      )}
    </header>
  );
}
