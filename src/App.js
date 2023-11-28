import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: '',
      color: '#333',
      clickCount: 0,
      color_position: 0,
    };
  }

  componentDidMount() {
    this.fetchQuote();
  }

  fetchQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      this.setState({
        quote: data.content,
        author: data.author,
      });
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  handleNewQuote = () => {
    this.fetchQuote();
    console.log(this.state.clickCount)
    this.setState((prevState) => ({
      clickCount: prevState.clickCount + 1,
    }), () => {
      if (this.state.clickCount % 2 === 0) {
        this.changeColors();
        this.setState({
          clickCount: 0,
        });
      }
    });
  };

  changeColors = () => {
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22', '#34495e'];
    const newColor = colors[this.state.color_position];
    let position = this.state.color_position >= 7 ? 0 : this.state.color_position;

    this.setState({
      color: newColor,
      color_position: position+1
    });

    // Mettez à jour la couleur du fond du body
    document.body.style.transition = 'background-color 0.5s ease';
    document.body.style.backgroundColor = newColor;

    setTimeout(() => {
      document.body.style.transition = 'none';
    }, 500);
  };

  render() {
    const { quote, author, color } = this.state;
    const tweetUrl = `https://twitter.com/intent/tweet?text="${quote}" - ${author}`;

    return (
      <div id="quote-box">
        <div id="text" style={{ color: color }}><span className='quote'>"</span>{quote}<span className='quote'>"</span></div>
        <div id="author" style={{ color: color }}>{author}</div>
        <button id="new-quote" style={{ backgroundColor: color }} onClick={this.handleNewQuote}>
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
    );
  }
}

export default App;
