import React, { Component } from 'react';
import { AppRegistry, Navigator, StyleSheet, DrawerLayoutAndroid, ScrollView, View, Text,ToastAndroid } from 'react-native';
import Navigate from './src/utils/Navigate';
import { Toolbar } from './src/components';
import Navigation from './src/scenes/Navigation';
import Welcome from './src/scenes/Welcome';
import './src/utils/UserAgent';
import io from 'socket.io-client/socket.io';
import SQLite from './src/utils/sqlite';

import ChatActions from './src/actions/ChatActions';

class awesome extends Component {

	static childContextTypes = {
		drawer: React.PropTypes.object,
		navigator: React.PropTypes.object
	};

	constructor(props) {
		super(props);
		
		this.sqlite = new SQLite('Terminal');
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

	componentDidMount() {
		that=this;
		this.socket = io('10.10.10.109:3000', {jsonp: false});
		console.log(this.socket);
		this.socket.on('private message',function(msg){
			let fromUserId = msg.fromUserId;
			console.log(fromUserId);
		    sqlite.updateC2CMsg(fromUserId , msg);
		    ChatActions.updateMsg(msg);
		    //console.log(msg);
		});
	}

	componentWillUnmount() {
		this.socket.emit('disconnect');
	}

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
					configureScene={(route) => {
						if (route.path=='messages.chatpage'|| route.path=='contacts.chatpage') {
							return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight;
						}else{
                            return Navigator.SceneConfigs.FloatFromBottom;
						}
                    }}
					ref={(navigator) => { !this.state.navigator ? this.setNavigator(navigator) : null }}
					renderScene={(route) => {
                        if (this.state.navigator && route.component) {
                        	return (
                        	    <View
                        	        style={styles.scene}
                        	        showsVerticalScrollIndicator={false}>
                        	    	<route.component title={route.title} path={route.path} navigator={this.state.navigator} socket={this.socket} {...route.props} />
                        	    </View>
                        	);
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