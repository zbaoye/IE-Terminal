import React, { Component, PropTypes, StyleSheet } from 'react';
import { View, Text, Image, IntentAndroid,NativeModules } from 'react-native';
import { Card, Button, COLOR, TYPO } from 'react-native-material-design';
import CrosswalkWebView from 'react-native-webview-crosswalk';
import AppStore from '../stores/AppStore';
import WebViewAndroid from 'react-native-webview-android';
var CrosswalkWebViewManager = NativeModules.CrosswalkWebViewManager;
//module.exports = NativeModules.ToastCustomAndroid;
export default class Welcome extends Component {
    constructor(props) {
      super(props);
      this.state = { text: 'Goodbye World.' };
    }

    static contextTypes = {
        navigator: PropTypes.object.isRequired
    };
    componentDidMount(){
          //console.log("hello");
          //CrosswalkWebViewManager.callWithResponse('hello');
          console.log(CrosswalkWebViewManager);
          CrosswalkWebViewManager.callWithResponse(this.state.text, (text) => {
            this.setState({text});
          });
    }
    render() {
        const { navigator } = this.context;
        const theme = AppStore.getState().theme;
        const local = false;
        console.log(this.state.text);
        return (
            <CrosswalkWebView
              ref="webViewAndroidSample"
              javaScriptEnabled={true}
              geolocationEnabled={false}
              builtInZoomControls={false}
              url="http://10.10.10.115/GeoVisOL3/index.html" // or use the source(object) attribute...
              style={styles.containerWebView} 
              injectedJavaScript = { alert('hello') }
              
            />
        );

        
    }


}
var styles = {
  containerWebView: {
    flex: 1,
  }
};