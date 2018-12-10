import React from 'react'



export default class FilterMap extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            value:'',
        }
        this.inputChanged.bind = this.inputChanged.bind(this);
        this.handleChange.bind = this.handleChange.bind(this);
        this.inputReset.bind = this.inputReset.bind(this);
    }

inputChanged = () => {

            this.props.filterPlaces(this.state.value);

}
inputReset = () => {
    this.props.inputReset();
}
handleChange = (event) => {
    this.setState({
        value: event.target.value,
    })

}

    render() {
        return (
            <React.Fragment>
            <div className="innerform">
                <form className="form-filter">

                <div className="title">
                    <img alt="logo" width="50px" height="50px" src="https://image.flaticon.com/icons/svg/123/123285.svg"></img>
                    <h2>Restaurant.Me</h2>
                </div>
                <div>
                    <input aria-label="Search restaurants in London" tabIndex='1' value={this.state.value} onChange={this.handleChange} type="text"></input>

                </div>


                </form>
                <button aria-label="Submit query" tabIndex='2' onClick={this.inputChanged}>Submit</button>
                <button aria-label="Show all listings" tabIndex='4' onClick={this.inputReset}>Show all</button>

                </div>
            </React.Fragment>
        )
    }
}