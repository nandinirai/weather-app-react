import React from 'react';
import './App.css';
import Titles from './components/titles';
import Form from './components/form';
import Weather from './components/weather';

const Api_Key = "dc2e79ea5b82ec169c4329400280b744";


class App extends React.Component {
  constructor() {
    super();
    this.state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
  }
}

render() {
  return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                  <div className="title-container">
                  <Titles />
                </div>
                <div className="form-container">
                  <Form loadWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  async componentDidMount() {
    const city = "London";
    const country = "UK";
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`);
    const response = await api_call.json();

    console.log(response);

    if (city && country) {
      this.setState({
        temperature: response.main.temp,
        city: response.name,
        country: response.sys.country,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        error: "",

      })
    } else {
      this.setState({
        error: "Please input search values..."
      })
    }
  }

  componentWillUnmount() {
    clearInterval(this.response);
  }



  
}
export default App;