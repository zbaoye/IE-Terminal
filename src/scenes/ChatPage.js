import React, { Component } from 'react';
import { ScrollView, View, Image,TextInput,Text ,Dimensions } from 'react-native';
import { Avatar, COLOR } from 'react-native-material-design';
import ReactNative from 'react-native';
import '../utils/UserAgent';
import io from 'socket.io-client/socket.io';
import SQLite from '../utils/sqlite';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ChatStore from '../stores/ChatStore';


const {height, width} = Dimensions.get('window');

export default class ChatPage extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
        curText: null,
        messages:[],
    };
    //console.log(props);
    sqlite = new SQLite('Terminal');
    
    this.socket = props.socket;


  }

  componentDidMount() {

    this.fetchData();
    ChatStore.listen(this.handleChatStore);
  }

  componentWillUnmount(){
    ChatStore.unlisten(this.handleChatStore);
    console.log('componentWillUnmount');
    if(this.state.curText!=null){
      sqlite.updateRecentC2CMsg(this.props.userid , this.props.title , this.state.curText);  
    }
  }

  handleChatStore=(store)=>{
    if (this.props.navigator.currentRoute.path=='messages.chatpage'|| this.props.navigator.currentRoute.path=='contacts.chatpage' && this.props.userid==store.newMessage.toUserId){
      this.state.messages.push(store.newMessage);
      console.log(this);
      this.setState({
        curText: store.newMessage.msgContent,

      });
      
    }else{
      //sqlite.updateC2CMsg(store.newMessage.toUserId , store.newMessage);
    }
    
  }


  fetchData(){
    sqlite.queryC2CMsg(this.props.userid).then(()=>{
        //console.log(sqlite.getResult())
        let result = sqlite.getC2CMsgResult();
        let length = result.rows.length;
        var json=[];
        for (let i = 0 ; i<length ; i++){
            let a = {
                key : result.rows.item(i).msgId,
                userType : result.rows.item(i).userType,
                timestamp :result.rows.item(i).timestamp,
                msgType : result.rows.item(i).msgType,
                msgContent : result.rows.item(i).msgContent,
            };
            json.push(a);
        }
        console.log(json);
        this.setState({
          messages:json
        });
    });
  }


	handleSubmitText(msgContent) {

    var timestamp = Date.parse(new Date()); 
    let msgId = timestamp+msgContent;
    console.log(msgId);
    var newMessage={
      fromUserId: global.username,
      toUserId: this.props.userid,
      key: msgId,
      timestamp: timestamp,
      userType:1,
      msgContent:msgContent,
      msgType:'text',
    };
    this.state.messages.push(newMessage);
    this.setState({
    		curText: msgContent
    });
    this.refs.textInput.clear();
    sqlite.updateC2CMsg(this.props.userid,newMessage);
    this.submitToServers(newMessage);
    //console.log(this.refs.scrollContent);
    //this.refs.scrollContent.scrollTo({y: 100});
  }

  submitToServers(newMessage){
    if (this.socket.connected) {
      this.socket.emit('private message',this.props.userid,newMessage);
    }else{
      console.log('无网络');
    }
  }

    render() {
    	const messages = this.state.messages.map((message) => {
          	if(message.userType == 0){
          		return (
          			<View style = {styles.rowLeft} key={message.key}>
          				<Image source={{ uri: 'sdfs' }} style={styles.avatar} />
          				<View style = {styles.messageLeft}>
          					<Text style ={styles.messageText}>
          						{message.msgContent} 
          					</Text>
          				</View>
          			</View>
          		);
          	}else{
          		return(
          			<View style ={styles.rowRight} key={message.key}>
          				<View style ={styles.messageRight}>
          					<Text  style ={styles.messageText}>
          						{message.msgContent} 
          					</Text>
          				</View>
          				<Image source={{ uri: 'sdfsd' }} style={styles.avatar} />
          			</View>
          		);
          	}
        });
        return (
        		<ScrollView ref='scroll' scrollEnabled={false} style={{backgroundColor:'#EBEBEB'}}>
            	<ScrollView style = {styles.scrollContent} ref='scrollContent'>
            	   	{messages}
            	</ScrollView>
            	<View style={styles.footerView}>
            	  <TextInput style = {styles.inputText}
                  numberOfLines={1}
                  ref = 'textInput'
                  returnKeyType='done' //send会提交两次
                  onSubmitEditing={(event) => this.handleSubmitText(event.nativeEvent.text)}
                /> 
                
            	</View>
                  <ActionButton  buttonColor="rgba(63,159,107,1)"  key={1} offsetX={1} offsetY={5}>
                    <ActionButton.Item buttonColor='#9b59b6' key={1} title="New Task" onPress={() => console.log("new task tapped!")}>
                      <Icon name="md-create"  style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#3498db' key={2} title="My Notifications" onPress={() => {}}>
                      <Icon name="md-notifications-off"  style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                  </ActionButton>
              
            </ScrollView>

            
        );
    }
}

const styles = {
	
 

	scrollContent:{
		flex: 1,
		height:height-100-40,
		backgroundColor:'#EBEBEB',
		marginLeft:5,
    marginRight:5,

	},
	rowLeft:{
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
    marginTop: 5,
	},
	messageLeft:{
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		borderRadius: 10,
	},
	rowRight:{
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
    marginTop:5,
	},
	messageRight:{
		flexDirection: 'row',
		justifyContent: 'flex-end',
		backgroundColor:'#9EE863',
		alignItems: 'center',
		borderRadius: 10,
	},
	messageText:{
		margin:10,
		fontSize: 16,
    color:'#000',
    fontWeight: '100',
	},
	avatar: {
    	backgroundColor: 'gray',
    	width: 50,
    	height: 50,
    	borderRadius: 4,
  	},
	footerView:{
		flexDirection: 'row',
	},
	inputText: {
		width:width-60,
		backgroundColor:'#F4F4F6',
		height:40,
    paddingHorizontal: 16,
    margin: 10,
    marginRight:5
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'black',
  },
};
