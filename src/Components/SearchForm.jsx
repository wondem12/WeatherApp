import React, { Component } from 'react';

class SearchForm extends Component{

  state = {
    countries: [],
    cities: []
}




  render() {
  return (
    <div >
      <br/>
      <form onSubmit= {this.props.onSearch}>
      {this.props.error &&  <div className="alert alert-danger mx-5" role="alert"> {this.props.error}</div>}
        <div className="row">
          <div className="col-md-3 offset-md-2">
            <input
              type="text"
             
              placeholder="City"
              name="city"
              autoComplete="off"
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              
              placeholder="Country"
              name="country"
              autoComplete="off"
            />
          </div>
          <div >
            <button className="btn">Get Weather</button>
          </div>
        </div>
       <hr/>
      </form>
    </div>
  );
  }
};



export default SearchForm;



