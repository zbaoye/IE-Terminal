import React, { Component, PropTypes } from 'react';
import　{  View, Text, Image }　from 'react-native';
import { Avatar, Drawer, Divider, COLOR, TYPO } from 'react-native-material-design';
export default class Navigation extends Component {

    static contextTypes = {
        drawer: PropTypes.object.isRequired,
        navigator: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            route: null
        }
    }

    changeScene = (path, name) => {
        const { drawer, navigator } = this.context;
        this.setState({
            route: path
        });
        navigator.to(path, name);
        drawer.closeDrawer();
    };

    render() {
        const { route } = this.state;

        return (
            <Drawer theme='light'>
                <Drawer.Header image={<Image source={require('./../img/nav.jpg')} />}>
                    <View style={styles.header}>
                        <Avatar size={80} image={<Image source={{ uri: "http://facebook.github.io/react-native/img/opengraph.png?2" }}/>} />
                        <Text style={[styles.text, COLOR.paperGrey50, TYPO.paperFontSubhead]}>GeoVis Material Design</Text>
                    </View>
                </Drawer.Header>


                <Drawer.Section
                    //title="Components"
                    items={[{
                        icon: 'home',
                        value: '地图',
                        active: !route || route === 'welcome',
                        onPress: () => this.changeScene('welcome'),
                        onLongPress: () => this.changeScene('welcome')
                    },{
                        icon: 'face',
                        value: '通讯录',
                        label: '12',
                        active: route === 'contacts',
                        onPress: () => this.changeScene('contacts'),
                        onLongPress: () => this.changeScene('contacts')
                    }, {
                        icon: 'label',
                        value: '消息中心',
                        active: route === 'messages',
                        label: '8',
                        onPress: () => this.changeScene('messages'),
                        onLongPress: () => this.changeScene('messages')
                    }, {
                        icon: 'check-box',
                        value: '登录',
                        label: '10',
                        active: route === 'login',
                        onPress: () => this.changeScene('login'),
                        onLongPress: () => this.changeScene('login')
                    }, {
                        icon: 'label',
                        value: '信息识别',
                        label: '10',
                        active: route === 'dividers',
                        onPress: () => this.changeScene('dividers'),
                        onLongPress: () => this.changeScene('dividers')
                    }, {
                        icon: 'label',
                        value: '调理控制',
                        label: 'NEW',
                        active: route === 'icon-toggles',
                        onPress: () => this.changeScene('icon-toggles'),
                        onLongPress: () => this.changeScene('icon-toggles')
                    }, {
                        icon: 'radio-button-checked',
                        value: '资料查询',
                        label: '8',
                        active: route === 'radio-buttons',
                        onPress: () => this.changeScene('radio-buttons'),
                        onLongPress: () => this.changeScene('radio-buttons')
                    },
                     //{
                     //   icon: 'list',
                     //   value: '资料查询',
                     //   label: 'NEW',
                     //   active: route === 'list',
                     //   onPress: () => this.changeScene('list'),
                     //   onLongPress: () => this.changeScene('list')
                     //},
                    {
                        icon: 'label',
                        value: '数据采集',
                        label: '4',
                        active: route === 'subheaders',
                        onPress: () => this.changeScene('subheaders'),
                        onLongPress: () => this.changeScene('subheaders')
                    },
                    {
                        icon: 'invert-colors',
                        value: '设置主题',
                        label: '24',
                        active: route === 'themes',
                        onPress: () => this.changeScene('themes'),
                        onLongPress: () => this.changeScene('themes')
                    }]}
                />

            </Drawer>
        );
    }
}

const styles = {
    header: {
        paddingTop: 16
    },
    text: {
        marginTop: 20
    }
};