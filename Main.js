/**
 * Created by devworx on 5/22/17.
 */

const Quote = (props) => {
  return (
    <div style={{margin: '1em'}}>
      <div style={{display: 'inline-block', marginLeft:10}}>
        <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>
          {props.quote}
        </div>
        <br></br>
        <div>Tweet It!....</div>
      </div>
    </div>
  );
};

const QuoteRend = (props) => {
  return (
    <div>
      {props.quote}
    </div>
  );
}

// Quote.rest Attribution
const Attribution = (props) => {
  return (
    <div style={{display: 'inline-block', marginLeft:10}}>
      <a href="https://formatics.com" title="Powered by quotes from formatics.com">
        formatics.com
      </a>
    </div>
  );
}

// add button to generate new quote
class Button extends React.Component {
//   disable cors for this to work. `open -a Google\ Chrome --args --disable-web-security --user-data-dir`
  handleClick = (event) => {
    event.preventDefault();
    // console.log("Event: Handle Click");
    axios.get(`https://crossorigin.me/https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en`)
      .then(resp => {
        const quote = resp.data.quoteText;
        // this.setState({quote});
        this.props.onClick({quote})
        // console.log({quote});
      });
  };
  render() {
    return (
      <button onClick={this.handleClick}>Get Quote</button>
    )
  }
}

class QuoteApp extends React.Component {
  state = { quote:"Hey There! This is not a Quote but go ahead and click the button to get one!"}
  // this.addNewQuote = this.addNewQuote.bind(this)

  // handler for adding new quote. can call this from button component for it to do what we want.
  addNewQuote = (quoteInfo) => {
    this.setState(quoteInfo);
  }
  render () {
    return (
      <div>
        <Button onClick={this.addNewQuote}/>
        <QuoteRend quote={this.state.quote}/>
        <Attribution />
      </div>
    )
  }
}
ReactDOM.render(<QuoteApp />, mountNode);