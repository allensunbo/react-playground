var SubmitWidget;

(function () {
   var React = require("react");
   console.log('creating component SubmitWidget');
   SubmitWidget = React.createClass({
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
         console.log('receive event from:' + e.detail.from);
         this.setState({
            value: 'speed=' + e.detail.data.speed + ', degree=' + e.detail.data.degree
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
            <input onChange={this.doChange} value={this.state.value} className={this.props.className}></input>
            <button onClick={this.doClick}>Submit</button>
         </div>
      }
   });

})();

module.exports = {
   component: SubmitWidget
};