import React, { Component } from 'react';
import Intro from './Intro';

class IntroScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_Main_App: false,
    };
  }

  onDoneAllSlides = () => this.setState({ show_Main_App: true });

  onSkipSlides = () => this.setState({ show_Main_App: true });

  goToLogin = () => this.props.navigation.navigate('Login');
  

  render() {
    return (
        <Intro
          goToLogin={this.goToLogin}
          onSkipSlides={this.onSkipSlides}
          onDoneAllSlides={this.onDoneAllSlides}
        />
      );
    }
}

export default IntroScreen;
