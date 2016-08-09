import React, { Component , PropTypes} from 'react';
import { ScrollView, View, Image ,TextInput,Navigator} from 'react-native';
import { Button, Avatar,  COLOR ,IconToggle,Icon } from 'react-native-material-design';
import Tweet from '../components/Tweet';
import ChatPage from './ChatPage'
import Navigate from '../utils/Navigate';
import SQLite from '../utils/sqlite';

export default class Messages extends React.Component {
    
    constructor(props) {
        super(props);
        sqlite = new SQLite('Terminal');
        
        sqlite.queryRecentC2CMsg().then(()=>{
            let result = sqlite.getRecentC2CMsgResult();
            let length = result.rows.length;
            var json=[];
            for (let i = length-1 ; i>-1 ; i--){
                let a = {
                    userid : result.rows.item(i).userid,
                    username : result.rows.item(i).username,
                    text : result.rows.item(i).text,
                };
                json.push(a);
            }
            this.setState({
                recentC2CMsg : json,
            });
        });
        console.log('userToken = '+global.userToken);
        this.state = {
            route: null,
            text : "",
            recentC2CMsg: [],
        };
    }

    goToChat(props) {

        const navigator = props.navigator;
        const {
            userid,
            username,
            avatar
        } = props.userData;
        if(navigator) {
            navigator.forward('chatpage',username,{userid:userid});
        }
    }

    render() {  
        
        const  navigator  = this.props.navigator;

        const recentC2CMsgs = this.state.recentC2CMsg.map((userData) => {
          return <Tweet key={userData.userid} userData={userData} navigator={navigator} goToChat={this.goToChat} />;
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
                    {recentC2CMsgs}
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