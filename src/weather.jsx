(function () {
   var React = require("react");
   var renderId = 'weather';

   var App = React.createClass({
      getInitialState: function () {
         return {
            speed: undefined,
            degree: undefined
         };
      },
      getData: getData,
      render() {
         return <div>
            <button onClick={this.getData}>Get Data</button>
            <p>wind speed = {this.state.speed}</p>
            <p>wind degree = {this.state.degree}</p>
         </div>
      }
   });

   React.render(<App/>, document.getElementById(renderId));

   function getData() {
      var self = this;
      console.log(self);
      // example of using bind here
      var callback = function (request, scope) {
         if (request.status >= 200 && request.status < 400) {
            // console.log(request.responseText);
            var r = JSON.parse(request.responseText);
            scope.setState({
               speed: r.wind.speed,
               degree: r.wind.deg
            });

            // also fire event to the second component to test communication
            sendEvent('#submit', self.state);

         } else {
            console.log('error getting weather data');
         }
      };
      var doGetBind = doGet.bind(self);
      doGetBind('http://api.openweathermap.org/data/2.5/weather?q=London,uk', callback);
   }

   function doGet(url, callback) {
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.onload = callback.bind(undefined, request, this);
      request.send();
      console.log(this);
   }

   function sendEvent(toId, data) {
      if ("createEvent" in document) {
         // var evt = document.createEvent("HTMLEvents");
         // evt.initEvent("my event", true, true);
         var evt = new CustomEvent('WeatherEvent', {
            'detail': data
         });
         document.querySelector(toId).dispatchEvent(evt);
      }
      else {
         document.querySelector(toId).fireEvent('WeatherEvent');
      }
   }

})();
