import React, { Component } from 'react';
import { ScrollView, View, Image,TextInput,Text ,Dimensions } from 'react-native';
import { Avatar, COLOR } from 'react-native-material-design';
import ReactNative from 'react-native';
import '../utils/UserAgent';
import io from 'socket.io-client/socket.io';

const {height, width} = Dimensions.get('window');

export default class ChatPage extends React.Component {

	constructor(props) {
    super(props);
    console.log(props);
    this.socket = props.socket;

    this.state = {
        curText: null,
        keyCount:4,
        messages:[
        	{
            key: 1,
        		timestamp : 1469605874,
        		type : 0,
        		text : "洞拐洞拐，收到请回答！"
        	},{
            key:2,
		        timestamp : 1469605974,
        		type : 1,
        		text : "洞幺洞幺，洞拐收到！" 
        	},{
            key:3,
        		timestamp : 1469615874,
        		type : 0,
        		text : "洞拐洞拐，晚上吃什么？"
        	},{
            key:4,
        		timestamp : 1469705874,
        		type : 1,
        		text : "洞幺洞幺，麻辣香锅。"
        	}
        ]
    };
  }

  // login(){
  //   {
  //     id:
  //     password:
  //   }
  // }


	updateText(text) {
    
    if (this.socket.connected) {
      this.socket.emit('public message',text);
      this.socket.on('public message',function(msg){
        console.log(msg);
      });
    }else{
      console.log('无网络');
    }


    var timestamp = Date.parse(new Date()); 

    var newMessage={
      key: this.state.keyCount+1,
      timestamp: timestamp,
      type:1,
      text:text
    };
      this.state.messages.push(newMessage);
    	this.setState({
      		curText: text,
          keyCount:this.state.keyCount + 1
    	});
    	this.refs.textInput.clear();
  	}
    render() {

      //var ws = new WebSocket('ws://10.10.10.16:3002');
      //console.log(ws);
    	//console.log(this.state.messages);
    	const messages = this.state.messages.map((message) => {
          	if(message.type == 0){
          		return (
          			<View style = {styles.rowLeft} key={message.key}>
          				<Image source={{ uri: 'sdfs' }} style={styles.avatar} />
          				<View style = {styles.messageLeft}>
          					<Text style ={styles.messageText}>
          						{message.text} 
          					</Text>
          				</View>
          			</View>
          		);
          	}else{
          		return(
          			<View style ={styles.rowRight} key={message.key}>
          				<View style ={styles.messageRight}>
          					<Text  style ={styles.messageText}>
          						{message.text} 
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
                  onSubmitEditing={(event) => this.updateText(event.nativeEvent.text)}
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
		borderRadius: 4,
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
		borderRadius: 15,
	},
	messageText:{
		margin:10,
		fontSize: 18,
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
