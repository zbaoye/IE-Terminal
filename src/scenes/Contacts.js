import React, { Component , PropTypes} from 'react';
import { ScrollView, View, Image ,TextInput,Navigator} from 'react-native';
import { Button, Avatar,  COLOR ,IconToggle,Icon } from 'react-native-material-design';
import Contact from '../components/Contact';
import ChatPage from './ChatPage'
import Navigate from '../utils/Navigate';
import SQLite from '../utils/sqlite';

export default class Messages extends React.Component {
    //var sqlite = null;
    constructor(props) {
        super(props);
        sqlite = new SQLite('Terminal');
        //sqlite.createUsersTable();
        //sqlite.insertUsersTable('S003','导调员003','333333','./img.3.png');
        //var resultSet = sqlite._queryUsersTable();
        this.state = {
            route: null,
            text : "",
            contacts: null,
        };
    }
    componentDidMount() {
        this.fetchData();
    }

    fetchData(){
    
        sqlite.queryUsersTable().then(()=>{
            //console.log(sqlite.getResult())
            let result = sqlite.getUserTbleResult();
            let length = result.rows.length;
            var json=[];
            for (let i = 0 ; i<length ; i++){
                let a = {
                    key : result.rows.item(i).id,
                    username : result.rows.item(i).username,
                    avatar : result.rows.item(i).avatar,
                };
                json.push(a);
            }
            this.setState({
                contacts : json,
            });
        });
           
    }


    goToChat(props) {
        const navigator = props.navigator;
        const {
            key,
            username,
        } = props.contactData;
        if(navigator) {
            navigator.forward('chatpage',username,{userid:key});
        }
    }

    render() {  
        const  navigator  = this.props.navigator;
        if (this.state.contacts!=null){
            var Contacts = this.state.contacts.map((contactData) => {
                return <Contact key={contactData.key} contactData={contactData} navigator={navigator} goToChat={this.goToChat} />;
            });
        }else{
            var Contacts = null;
        }
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
                    {Contacts}
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