import React, { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import initialPeople from './data';

function getRandomIndex(currentIndex, length) {
  if (length < 2) {
    return currentIndex;
  }

  const nextIndex = Math.floor(Math.random() * (length - 1));
  return nextIndex >= currentIndex ? nextIndex + 1 : nextIndex;
}

function App() {
  const [people] = useState(initialPeople);
  const [index, setIndex] = useState(() =>
    Math.floor(Math.random() * initialPeople.length)
  );

  useEffect(() => {
    const slider = setInterval(() => {
      setIndex(index === 0 ? people.length - 1 : index - 1);
    }, 2000);

    return () => clearInterval(slider);
  }, [index, people]);

  const showPrevious = () => {
    setIndex((currentIndex) =>
      currentIndex === 0 ? people.length - 1 : currentIndex - 1
    );
  };

  const showNext = () => {
    setIndex((currentIndex) =>
      currentIndex === people.length - 1 ? 0 : currentIndex + 1
    );
  };

  const showRandom = () => {
    setIndex((currentIndex) => getRandomIndex(currentIndex, people.length));
  };

  return (
    <main className="section">
      <header className="title">
        <p className="eyebrow">What people say</p>
        <h1>Reviews</h1>
        <span className="title-underline" aria-hidden="true" />
      </header>

      <section className="review-card" aria-label="Customer reviews">
        <div className="section-center" aria-live="polite">
          {people.map((person, personIndex) => {
            let position = 'nextSlide';
            if (personIndex === index) {
              position = 'activeSlide';
            } else if (
              personIndex === index - 1 ||
              (personIndex === people.length - 1 && index === 0)
            ) {
              position = 'lastSlide';
            }

            return (
              <article
                className={`review ${position}`}
                key={person.id}
                aria-hidden={personIndex !== index}
              >
                <div className="image-wrap">
                  <img className="person-img" src={person.image} alt={person.name} />
                  <span className="quote-mark" aria-hidden="true">
                    <FaQuoteRight />
                  </span>
                </div>
                <h2>{person.name}</h2>
                <p className="person-title">{person.title}</p>
                <p className="text">{person.quote}</p>
              </article>
            );
          })}
        </div>

        <button
          className="nav-button prev"
          type="button"
          onClick={showPrevious}
          aria-label="Previous review"
        >
          <FiChevronLeft aria-hidden="true" />
        </button>
        <button
          className="nav-button next"
          type="button"
          onClick={showNext}
          aria-label="Next review"
        >
          <FiChevronRight aria-hidden="true" />
        </button>

        <div className="review-controls">
          <span className="review-count" aria-label={`Review ${index + 1} of ${people.length}`}>
            {String(index + 1).padStart(2, '0')}
            <span aria-hidden="true"> / </span>
            {String(people.length).padStart(2, '0')}
          </span>
          <button className="random-button" type="button" onClick={showRandom}>
            Surprise me
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
