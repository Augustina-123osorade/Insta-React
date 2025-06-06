
import React, { useState } from 'react';
export const CardList = ({ posts }) => {
  const cardData = [
    {
      img: "/assets/Card-1.svg",
      alt: "A_Snowed_House",
      title: "Val Thorens"
    },
    {
      img: "/assets/Card-2.svg",
      alt: "A_Restaurant",
      title: "Restaurant terrace"
    },
    {
      img: "/assets/Card-3.svg",
      alt: "A_Cafe",
      title: "An outdoor cafe"
    },
    {
      img: "/assets/Card-4.svg",
      alt: "A_Bridge",
      title: "A very long bridge, over the forest..."
    },
    {
      img: "/assets/Card-5.svg",
      alt: "A_Tunnel",
      title: "Tunnel with morning light"
    },
    {
      img: "/assets/Card-6.svg",
      alt: "A_Mountain_House",
      title: "Mountain house"
    }
  ];

  const allCards = [...cardData, ...posts];

  const [likedStates, setLikedStates] = useState(Array(cardData.length).fill(false));

  const toggleLike = (index) => {
    const updatedLikes = [...likedStates];
    updatedLikes[index] = !updatedLikes[index];
    setLikedStates(updatedLikes);
  };

  const idPrefixes = ["first", "second", "third", "fourth", "fifth", "sixth"];

  return (
    <div id="bodyPart">
      {allCards.map((item, index) => (
        <div
          key={index}
          className="card-component"
          id={`${idPrefixes[index]}Section_1a`}
        >
          <img src={item.img || item.imageUrl} alt={item.alt || item.title} />
          <div className="card-data" id={`${idPrefixes[index]}Section_1b`}>
            <p>{item.title}</p>
            <button className="like-button" onClick={() => toggleLike(index)}>
              <svg
                width="23"
                height="20"
                viewBox="0 0 23 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <g id="Like Icon">
                  <path
                    id="Union"
                    className="heart-icon"
                    fill={likedStates[index] ? "red" : "none"}
                    stroke={likedStates[index] ? "red" : "black"}
                    strokeWidth="2"
                    d="M15.9512 1.05664C17.3161 0.856584 18.8067 1.15981 20.1602 2.32812L20.4287 2.57324C22.6597 4.72264 22.3285 8.02556 20.5967 9.89355L20.4248 10.0693L11.5 18.6025L2.57422 10.0693H2.5752C0.754421 8.29659 0.296669 5.00618 2.36328 2.78516L2.57129 2.57324C3.99417 1.20243 5.593 0.843258 7.04883 1.05664C8.5402 1.27524 9.89546 2.09997 10.7266 3.11523L11.5 4.06055L12.2734 3.11523C13.1045 2.09997 14.4598 1.27524 15.9512 1.05664Z"
                  />
                </g>
              </svg>
              <span className="sr-only">Like Button</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

