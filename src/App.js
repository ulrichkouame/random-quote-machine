import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [quoteState, setQuoteState] = useState({
    quote: '',
    author: '',
    color: '#333',
    colorPosition: 0,
  });

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuoteState((prev) => ({
        ...prev,
        quote: data.content,
        author: data.author,
      }));
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const handleNewQuote = () => {
    fetchQuote();
    changeColors();
  };

  const changeColors = () => {
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22', '#34495e'];
    const newColor = colors[quoteState.colorPosition];
    let position = quoteState.colorPosition >= 7 ? 0 : quoteState.colorPosition;

    setQuoteState((prev) => ({
      ...prev,
      color: newColor,
      colorPosition: position + 1,
    }));

    // Mettez à jour la couleur du fond du body
    document.body.style.transition = 'background-color 0.5s ease';
    document.body.style.backgroundColor = newColor;

    setTimeout(() => {
      document.body.style.transition = 'none';
    }, 500);
  };

  const { quote, author, color } = quoteState;
  const tweetUrl = `https://twitter.com/intent/tweet?text="${quote}" - ${author}`;
  const myGithub = `https://github.com/ulrichkouame`;

  return (
    <>
      <div id="quote-box">
        <div id="text" style={{ color: color }}>
          <span className='quote'>"</span>{quote}<span className='quote'>"</span>
        </div>
        <div id="author">{author}</div>
        <button id="new-quote" style={{ backgroundColor: color }} onClick={handleNewQuote}>
          New Quote
        </button>
        <a
          id="tweet-quote"
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Tweet Quote
        </a>
      </div>
      <div className='by'>
        <a
          href={myGithub}
          target="_blank"
          rel="noopener noreferrer"
        >
          by KOUAME Ulrich
        </a>
      </div>
    </>
  );
};

export default App;
