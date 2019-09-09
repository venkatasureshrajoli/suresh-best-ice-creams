import React from 'react';
import './App.css';
import BusinessDetailComponent from './components/business-detail.component';
import axios from "axios";
const API_URL = 'http://localhost:3001';


export class App extends React.Component {
  constructor() {
    super();
    /* State Initialization */
    this.state = {
      items: [],
      loading: true,
      error:false,
      errorMessage:""
    }
  }
  render() {
    return (
      <React.Fragment>
        {
          this.state.items.length === 0 && this.state.loading ? <h3>Items are Loading....</h3> :
            this.state.items.length === 0 ? <h3>No Items available</h3> :
              <div><h1>Top 5 Best Ice-creams</h1>
                <ol type="1">
                  {
                    this.state.items.map((item) => {
                      return <li key={item.id}><BusinessDetailComponent item={item} /></li>
                    })
                  }
                </ol>
              </div>    
        }
        {
          this.state.error && <h3>{this.state.errorMessage}</h3>
        }
      </React.Fragment>
    );
  }

  componentDidMount() {
    /* Fetching Ice-creams data sorted by rating */
    axios.get(`${API_URL}/ice-creams/5`).then((result) => {
      let itemsData = result.data;
      let businessResultPromises = [];
      result.data.forEach((business) => {
        /* To fetch review and reviewer for each business */
        businessResultPromises.push(axios.get(`${API_URL}/business/review/${business.id}`));
      });
      Promise.all(businessResultPromises).then((items) => {
        items.forEach((item, index) => {
          itemsData[index]['review'] = item.data['review'];
          itemsData[index]['reviewer'] = item.data['reviewer'];
        });
        this.setState({ items: itemsData, loading:false });
      }).catch((error)=>{
        this.setState({error:true,errorMessage:error.message, loading:false})
      })
    }).catch((error) => {
      this.setState({error:true,errorMessage:error.message, loading:false})
    })
  }
}

export default App;
