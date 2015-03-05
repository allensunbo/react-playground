(function () {
   var React = require("react");

   var MyButton = React.createClass({
      getInitialState: function () {
         return {
            speed: undefined,
            degree: undefined
         };
      },
      componentDidMount: function () {
         this.getDOMNode().parentElement.addEventListener('WeatherEvent', this.handleEvent);
      },

      componentWillUnmount: function () {
         this.getDOMNode().parentElement.removeEventListener('WeatherEvent');
      },

      handleEvent: function (e) {
         console.log('receive event:' + e.detail);
         this.setState({
            value: 'speed=' + e.detail.speed + ', degree=' + e.detail.degree
         });
      },

      doClick: function () {
         console.log(this.state.value);
      },
      doChange: function (e) {
         this.setState({
            value: e.target.value
         });
      },
      render() {
         return <div>
            <input onChange={this.doChange} value={this.state.value}></input>
            <button onClick={this.doClick}>Submit</button>
         </div>
      }
   });

   React.render(<MyButton/>, document.getElementById('example2'));

})();
