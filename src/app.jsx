var React = require("react");

var App = React.createClass({
   getInitialState: function () {
      return {
         speed: 0,
         degree: 0
      };
   },

   getData: function () {
      var self = this;
      var request = new XMLHttpRequest(), self = this;
      request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=London,uk', true);
      request.onload = function () {
         if (request.status >= 200 && request.status < 400) {
            console.log(request.responseText);
            var r = JSON.parse(request.responseText);
            self.setState({
               speed: r.wind.speed,
               degree: r.wind.deg
            });
         } else {
            console.log('error getting weather data');
         }
      };

      // Fire!
      request.send();
   },
   render() {
      return <div>
         <button onClick={this.getData}>Get Data</button>
         <p>wind speed = {this.state.speed}</p>
         <p>wind degree = {this.state.degree}</p>
      </div>
   }
});

React.render(<App/>, document.getElementById("example"));


