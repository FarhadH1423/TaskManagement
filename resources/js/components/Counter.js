// import React from 'react';
import ReactDOM from 'react-dom';

import React, {Component} from 'react';

class Counter extends Component {
   
    state= {
        counter: 5,
    };


    incrementCounter =(value) => {
        let counterNew = this.state.counter+ value;
        this.setState({
            counter: counterNew,
        })
    }

    decrementCounter =(value) => {
        let counterNew = this.state.counter-value;
        this.setState({
            counter: counterNew,
        })
    }

    render() { 
        return ( 
            <div>
                <div className="container">
                    <h2>Count: {this.state.counter}</h2>
                    <p>
                        <button className="btn btn-success btn-lg" onClick={()=> this.incrementCounter(10)}>
                            +
                        </button>

                        <button className="btn btn-danger btn-lg ml-2 " onClick={() =>this.decrementCounter(5)}>
                            -
                        </button>
                    </p>
                </div>
            </div>
         );
    }
}
 
export default Counter;



if (document.getElementById('counter')) {
    ReactDOM.render(<Counter />, document.getElementById('counter'));
}
