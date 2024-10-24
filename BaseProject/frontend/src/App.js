import React from "react";
import axios from "axios";

class App extends React.Component { 
    state = { 
        quotes: [],     // Array to store fetched quotes
        author: "",     // Input value for the author
        quoteText: "",  // Input value for the quote text
    }; 

    // Fetch quotes from the backend when the component mounts
    componentDidMount() { 
        axios.get("http://localhost:8000/quotes/") 
            .then((res) => { 
                this.setState({ quotes: res.data });
            }) 
            .catch((err) => console.log(err)); 
    } 

    // Handle input change for the form
    handleInput = (e) => { 
        this.setState({ [e.target.name]: e.target.value });
    }; 

    // Handle form submission and post the new quote
    handleSubmit = (e) => { 
        e.preventDefault(); 

        axios.post("http://localhost:8000/quotes/", { 
            name: this.state.author, 
            detail: this.state.quoteText, 
        }) 
        .then(() => { 
            this.setState({ author: "", quoteText: "" });
            this.componentDidMount();  // Refetch quotes after submission
        })
        .catch((err) => console.log(err)); 
    }; 

    render() { 
        return ( 
            <div className="container jumbotron"> 
                <h1>Quote Submission</h1>
                <form onSubmit={this.handleSubmit}> 
                    <div className="input-group mb-3"> 
                        <input 
                            type="text" 
                            className="form-control"
                            placeholder="Author Name"
                            value={this.state.author} 
                            name="author"
                            onChange={this.handleInput}
                        /> 
                    </div> 

                    <div className="input-group mb-3"> 
                        <textarea 
                            className="form-control"
                            placeholder="Enter the quote"
                            value={this.state.quoteText} 
                            name="quoteText"
                            onChange={this.handleInput}
                        /> 
                    </div> 

                    <button type="submit" className="btn btn-primary"> 
                        Submit Quote 
                    </button> 
                </form>

                <hr />

                <h2>Submitted Quotes</h2>
                {this.state.quotes.map((quote, id) => ( 
                    <div key={id} className="card my-3"> 
                        <div className="card-header">Quote {id + 1}</div> 
                        <div className="card-body"> 
                            <blockquote className="blockquote mb-0"> 
                                <p>{quote.detail}</p>
                                <footer className="blockquote-footer">{quote.name}</footer> 
                            </blockquote> 
                        </div> 
                    </div> 
                ))} 
            </div> 
        ); 
    } 
} 

export default App;
