import React, { Component , PropTypes} from 'react';
import { ScrollView, View, Image ,TextInput,Navigator} from 'react-native';
import { Button, Avatar,  COLOR ,IconToggle,Icon } from 'react-native-material-design';
import Tweet from '../components/Tweet';
import ChatPage from './ChatPage'
import Navigate from '../utils/Navigate';
export default class Messages extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            route: null,
            text : "",
            tweets: [
              {
                key: 1,
                text: 'The React Native Router is awesome!',
                user: {
                  username: '导调员1',
                  avatar: './../img/avatars/1.png',
                },
              },
              {
                key: 2,
                text: 'Hello world!',
                user: {
                  username: '导调员2',
                  avatar: './../img/avatars/2.png',
                },
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
            text,
            user,
        } = props.tweetData;
        //console.log(key);
        if(navigator) {
            navigator.to('chatpage',user.username,{key:key});
        }
        //const { navigator } = this.props.navigator
        // this.setState({
        //     route: ""
        // });

        //console.log(tweetData);
        //navigator.to(path, name);
        //console.log(this.props);
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
                        underlineColorAndroid={'transparent'}
                        textAlign='center'
                    />    
                    <IconToggle color="paperGrey900">
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
        
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 0
    },
    searchText:{
        borderWidth:0,
        height: 40,
        padding: 10,
        margin:5,
        backgroundColor:'#ffffff'
    }
    
};