import React, { Component } from 'react';
import { ScrollView, View, Image,TextInput,Text ,Dimensions } from 'react-native';
import { Avatar, COLOR } from 'react-native-material-design';
import ReactNative from 'react-native';
import '../utils/UserAgent';
import io from 'socket.io-client/socket.io';
import SQLite from '../utils/sqlite';

const {height, width} = Dimensions.get('window');

export default class ChatPage extends React.Component {

	constructor(props) {
    super(props);
    console.log(props);
    sqlite = new SQLite('Terminal');
    this.socket = props.socket;

    this.state = {
        curText: null,
        messages:[],
    };
  }

  componentDidMount() {
    this.fetchData();
  }
  componentWillUnmount(){
    if(this.state.curText!=null){
      sqlite.updateRecentC2CMsg(this.props.userid , this.props.title , this.state.curText);  
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

	submitText(msgContent) {
    if (this.socket.connected) {
      this.socket.emit('public message',msgContent);
      this.socket.on('public message',function(msg){
        console.log(msg);
      });
    }else{
      console.log('无网络');
    }

    var timestamp = Date.parse(new Date()); 

    let msgId = timestamp+msgContent;
    console.log(msgId);
    var newMessage={
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
            	<ScrollView style = {styles.scrollContent}>
            	   	{messages}
            	</ScrollView>
            	<View style={styles.footerView}>
            	  <TextInput style = {styles.inputText}
                  numberOfLines={1}
                  ref = 'textInput'
                  returnKeyType='done' //send会提交两次
                  onSubmitEditing={(event) => this.submitText(event.nativeEvent.text)}
                /> 
                <View style={{marginTop:10,width:40,height:40}}>
            	    <Avatar icon="add" backgroundColor="paperRed"/>
            	  </View>  
            	</View>
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
  }
};
