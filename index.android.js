import React, { Component } from 'react';
import { AppRegistry, Navigator, StyleSheet, DrawerLayoutAndroid, ScrollView, View, Text } from 'react-native';
import Navigate from './src/utils/Navigate';
import { Toolbar } from './src/components';
import Navigation from './src/scenes/Navigation';
import Welcome from './src/scenes/Welcome';
import io from 'socket.io-client/socket.io';
import CrosswalkWebView from 'react-native-webview-crosswalk';
class awesome extends Component {

	static childContextTypes = {
		drawer: React.PropTypes.object,
		navigator: React.PropTypes.object
	};

	constructor(props) {
		super(props);
		this.socket = io('10.10.10.124:3000', {jsonp: false});
		this.state = {
			drawer: null,
			navigator: null,
			token: null
		};
	}

	getChildContext = () => {
		return {
			drawer: this.state.drawer,
			navigator: this.state.navigator
		}
	};

	setDrawer = (drawer) => {
		this.setState({
			drawer
		});
	};

	setNavigator = (navigator) => {
		this.setState({
			navigator: new Navigate(navigator)
		});
	};


	render() {
		const { drawer, navigator } = this.state;
		const navView = React.createElement(Navigation);

		return (
      
			<DrawerLayoutAndroid
				drawerWidth={300}
				drawerPosition={DrawerLayoutAndroid.positions.Left}
				renderNavigationView={() => {
                    if (drawer && navigator) {
                        return navView;
                    }
                    return null;
                }}
				ref={(drawer) => { !this.state.drawer ? this.setDrawer(drawer) : null }}
			>
				{drawer &&
          
				<Navigator
					initialRoute={Navigate.getInitialRoute()}
					navigationBar={<Toolbar onIconPress={drawer.openDrawer} />}
					configureScene={() => {
                            return Navigator.SceneConfigs.FadeAndroid;
                        }}
					ref={(navigator) => { !this.state.navigator ? this.setNavigator(navigator) : null }}
					renderScene={(route) => {
                        //console.log(route);
                        if (this.state.navigator && route.component) {
                        	//console.log(this.state.navigator);
                            
                        	if (route.path=='login') {
                        		return(
                        			<View
                        			    style={styles.scene}
                        			    showsVerticalScrollIndicator={false}>
                        				<route.component title={route.title} path={route.path} navigator={this.state.navigator} socket={this.socket} {...route.props} onLogin={this.handleLogin}/>
                        			</View>
                        		);
                        	}else{
                            	return (
                            	    <View
                            	        style={styles.scene}
                            	        showsVerticalScrollIndicator={false}>
                            	    	<route.component title={route.title} path={route.path} navigator={this.state.navigator} socket={this.socket} {...route.props} />
                            	    </View>
                            	);
                            }
                        }
                    }}
				/>
				}

			</DrawerLayoutAndroid>
		);
	}
}

AppRegistry.registerComponent('Terminal', () => awesome);

const styles = {
	scene: {
		flex: 1,
		marginTop: 56
	}
};