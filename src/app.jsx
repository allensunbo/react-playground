(function () {
   var React = require("react");


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

   React.render(<App/>, document.getElementById("example"));

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
         } else {
            console.log('error getting weather data');
         }
      };
      var doGetBind = doGet.bind(self);
      doGetBind('http://api.openweathermap.org/data/2.5/weather?q=London,uk', callback);

      // also fire event to the second component to test communication
      if ("createEvent" in document) {
         // var evt = document.createEvent("HTMLEvents");
         // evt.initEvent("my event", true, true);
         var evt = new CustomEvent('my event', {'detail': 'from first component'});
         document.querySelector('#example2').dispatchEvent(evt);
      }
      else
         document.querySelector('#example2').fireEvent("my event");
   }

   function doGet(url, callback) {
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.onload = callback.bind(undefined, request, this);
      request.send();
      console.log(this);
   }

})();
