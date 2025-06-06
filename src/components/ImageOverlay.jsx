import React, { useEffect, useState, useRef } from "react";

export  function ImageOverlay() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const overlayRef = useRef(null);

  // Add styles once on mount
  useEffect(() => {
    if (!document.getElementById("image-overlay-styles")) {
      const style = document.createElement("style");
      style.id = "image-overlay-styles";
      style.textContent = `
        .image-modal-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background-color: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(10px);
          display: none;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .image-modal-overlay.active {
          display: flex;
          opacity: 1;
        }
        .image-overlay-container {
          position: relative;
          max-width: 95vw;
          max-height: 85vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .image-wrapper {
          max-width: 100%;
          max-height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .overlay-image {
          max-width: 100%;
          max-height: 95vh;
          min-width: 50vw;
          min-height: 50vh;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          transition: transform 0.3s ease;
        }
        .close-btn {
          position: absolute;
          top: -50px;
          right: 0;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          font-size: 30px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.3s ease;
          z-index: 1001;
        }
        .image-modal-overlay .close-btn:hover {
          background: rgba(255, 255, 255, 0.4);
        }
        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          font-size: 24px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.3s ease, opacity 0.3s ease;
          z-index: 1001;
        }
        .nav-btn:hover {
          background: rgba(255, 255, 255, 0.4);
        }
        .nav-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .prev-btn {
          left: -70px;
        }
        .next-btn {
          right: -70px;
        }
        .image-counter {
          position: absolute;
          bottom: -50px;
          left: 50%;
          transform: translateX(-50%);
          color: white;
          background: rgba(0, 0, 0, 0.5);
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 14px;
        }
        @media (max-width: 768px) {
          .image-overlay-container {
            max-width: 100vw;
            max-height: 100vh;
            padding: 0 60px;
          }
          .nav-btn {
            width: 40px;
            height: 40px;
            font-size: 20px;
          }
          .prev-btn {
            left: 10px;
          }
          .next-btn {
            right: 10px;
          }
          .close-btn {
            top: 20px;
            right: 20px;
            width: 35px;
            height: 35px;
            font-size: 24px;
          }
          .overlay-image {
            min-width: auto;
            min-height: auto;
            max-height: 80vh;
          }
          .image-counter {
            bottom: 20px;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Handle keydown for Escape, Left, Right
  useEffect(() => {
    function handleKeydown(e) {
      if (!isActive) return;
      if (e.key === "Escape") closeOverlay();
      else if (e.key === "ArrowLeft") prevImage();
      else if (e.key === "ArrowRight") nextImage();
    }
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [isActive, currentIndex, images]);

  // Prevent scroll when overlay active
  useEffect(() => {
    document.body.style.overflow = isActive ? "hidden" : "";
  }, [isActive]);

  // Bind image clicks on cards dynamically
  useEffect(() => {
    function handleImageClick(e) {
      const target = e.target;
      if (
        target.tagName === "IMG" &&
        target.closest(".card-component") &&
        !target.closest(".modal-btn")
      ) {
        e.preventDefault();
        openImage(target);
      }
    }
    document.addEventListener("click", handleImageClick);
    return () => document.removeEventListener("click", handleImageClick);
  }, []);

  function openImage(img) {
    const container = img.closest(".post, .gallery, section") || document;
    const imgs = Array.from(container.querySelectorAll("img")).filter(
      (image) =>
        image.closest(".card-component") && !image.closest(".modal-btn")
    );
    setImages(imgs);
    setCurrentIndex(imgs.indexOf(img));
    setIsActive(true);
  }

  function closeOverlay() {
    setIsActive(false);
    setImages([]);
    setCurrentIndex(0);
  }

  function prevImage() {
    setCurrentIndex((i) => (i > 0 ? i - 1 : i));
  }

  function nextImage() {
    setCurrentIndex((i) => (i < images.length - 1 ? i + 1 : i));
  }

  if (!isActive) return null;

  return (
    <div
      ref={overlayRef}
      className={`image-modal-overlay ${isActive ? "active" : ""}`}
      onClick={(e) => {
        if (e.target === overlayRef.current) closeOverlay();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="image-overlay-container">
        <button
          className="close-btn"
          aria-label="Close overlay"
          onClick={closeOverlay}
        >
          &times;
        </button>

        <button
          className="nav-btn prev-btn"
          aria-label="Previous image"
          onClick={prevImage}
          disabled={currentIndex === 0}
        >
          &#8249;
        </button>

        <div className="image-wrapper">
          <img
            className="overlay-image"
            src={images[currentIndex]?.src}
            alt={images[currentIndex]?.alt || "Image"}
          />
        </div>

        <button
          className="nav-btn next-btn"
          aria-label="Next image"
          onClick={nextImage}
          disabled={currentIndex === images.length - 1}
        >
          &#8250;
        </button>

        <div className="image-counter">
          <span className="current-index">{currentIndex + 1}</span> /{" "}
          <span className="total-images">{images.length}</span>
        </div>
      </div>
    </div>
  );
}
