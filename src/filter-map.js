import React from 'react'



export default class FilterMap extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            value:'',
        }
        this.inputChanged.bind = this.inputChanged.bind(this);
        this.handleChange.bind = this.handleChange.bind(this);
    }

    inputChanged = () => {

            this.props.filterPlaces(this.state.value);


    
}
handleChange = (event) => {
    this.setState({
        value: event.target.value,
    })

}

    render() {
        return (
            <React.Fragment>
                <form className="form-filter">
                <div className="innerform">
                <div className="title">
                    <img alt="logo" width="50px" height="50px" src="https://image.flaticon.com/icons/svg/123/123285.svg"></img>
                    <h2>Restaurant.Me</h2>
                </div>
                <div>
                    <input value={this.state.value} onChange={this.handleChange} type="text"></input>

                </div>
                </div>

                </form>
                <button onClick={this.inputChanged} value="Submit">Submit</button>
            </React.Fragment>
        )
    }
}