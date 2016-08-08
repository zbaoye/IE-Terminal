import React, { Component , PropTypes} from 'react';
import { ScrollView, View, Image ,TextInput,Navigator} from 'react-native';
import { Button, Avatar,  COLOR ,IconToggle,Icon } from 'react-native-material-design';
import Tweet from '../components/Tweet';
import ChatPage from './ChatPage'
import Navigate from '../utils/Navigate';
//import SQLite from '../utils/sqlite';

export default class Messages extends React.Component {
    
    constructor(props) {
        super(props);
        console.log(props);
        //var sqlite = new SQLite('Terminal');
        //sqlite.createUsersTable();
        //sqlite.insertUsersTable('S003','003','333333','./img.3.png');
        //sqlite.queryUsersTable();
        console.log(global.userToken);
        this.state = {
            route: null,
            text : "",
            tweets: [
              {
                key: 1,
                username: '导调员1',
                avatar: './../img/avatars/1.png',
              },
              {
                key: 2,
                username: '导调员7',
                avatar: './../img/avatars/2.png',
              },
            ],
        };
    }

    changeScene = (path, name) => {
        
        this.setState({
            route: path
        });
        navigator.to(path, name);
    };

    goToChat(props) {
        const navigator = props.navigator;
        const {
            key,
            username,
            avatar
        } = props.tweetData;
        if(navigator) {
            navigator.forward('chatpage',username,{key:key});
        }
    }

    render() {  
        
        const  navigator  = this.props.navigator;
        const Tweets = this.state.tweets.map((tweetData) => {
          return <Tweet key={tweetData.key} tweetData={tweetData} navigator={navigator} goToChat={this.goToChat} />;
        });

        return (
            <ScrollView style={styles.body}>
                <View style={styles.searchBar}>
                    <TextInput 
                        style={styles.searchText}
                        placeholder='搜索'
                        numberOfLines={1}
                    />    
                    <IconToggle color="paperGrey900" style={styles.searchIcon}>
                        <Icon
                            name="search"
                            color="paperGrey900"
                        />
                    </IconToggle>
                </View>
                <View
                    style={{height:2,backgroundColor:'#f4f4f4'}}
                />
                <View>  
                    {Tweets}
                </View>
            </ScrollView>
        );
    }
}

const styles = {
    body:{
        backgroundColor: '#eeeeee'
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16
    },
    searchBar:{
        flex:1,
        flexDirection: 'row',
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 0
    },
    searchText:{
        flex:1,
        textAlign:'center',
        borderWidth:0,
        height: 40,
        padding: 5,
        margin:5,
        backgroundColor:'#ffffff'
    },
    searchIcon:{
        backgroundColor:"#fff"
    },
    
};