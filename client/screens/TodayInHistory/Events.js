import React, { Component } from 'react';


class Events extends Component {
  render() {
    const { currentFacts, renderFact, renderFactScreen, isReady } = this.props.screenProps;
    return renderFactScreen(currentFacts, renderFact, 'Events', isReady);
  }
}


export default Events;