import React, { Component, PropTypes } from 'react';
import  {  View, Text ,StyleSheet,TextInput, Image,TouchableWithoutFeedback,ToastAndroid} from 'react-native';
import { Button, Subheader, COLOR } from 'react-native-material-design';

import AppStore from '../stores/AppStore';

export default class Login extends React.Component {
    constructor(props) {
      super(props);
      //console.log(props);
    }

    login(){
        var username = this.refs.username._lastNativeText;
        var password = this.refs.password._lastNativeText;
        this.refs.username.clear();
        this.refs.password.clear();

        fetch('http://10.10.10.124:3000/index', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: username,
              password: password,
            })
        }).then((response)=>{
          console.log(response);
          response.json().then((json)=>{
            console.log(json);
            //global.userToken = json;
            const navigator = this.props.navigator;
            navigator.to('welcome');
          }).catch(function(e) {
            console.log('error');
            ToastAndroid.show('数据解析失败', ToastAndroid.SHORT)
          });
        }).catch(function(e) {
          console.log('error');
          ToastAndroid.show('登录失败，请稍后重试', ToastAndroid.SHORT)
        });
    }
    togoRegister(){
        const navigator = this.props.navigator;
        navigator.to('register');
    }
    render() {
        
        return (
            <View style={{backgroundColor:'#f4f4f4',flex:1,padding:10}}>
                <Image
                  style={styles.style_image}
                  source={require('../img/avatars/1.png')}/>
                <TextInput style={styles.style_user_input}
                  placeholder='请输入用户名'
                  numberOfLines={1}
                  ref='username'
                  autoFocus={true}
                  underlineColorAndroid={'transparent'}
                  textAlign='center'/>
                <View
                     style={{height:3,backgroundColor:'#f4f4f4'}}
                 />
                 <TextInput style={styles.style_pwd_input}
                   placeholder='请输入密码'
                   numberOfLines={1}
                   ref='password'
                   secureTextEntry={true}
                   textAlign='center'/>
  
                <TouchableWithoutFeedback onPress={() => this.login()}>  
                    
                    <View style={styles.style_view_commit}>  
                        <Text style={{color:'#fff'}}>
                            登录
                        </Text> 
                    </View>  
                    
                </TouchableWithoutFeedback>
                <View style={{flex:1,}}>
                </View>
                <TouchableWithoutFeedback onPress={() => this.togoRegister()} >  
                 <View style={{flexDirection:'row',alignItems:'flex-end',justifyContent:'space-around',marginBottom:10}}>
                   <Text style={styles.style_view_unlogin}>无法登录？
                   </Text>
                   <Text style={styles.style_view_register}>注册新用户
                   </Text>
                 </View>
                 </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  style_image:{
    borderRadius:35,
    height:70,
    width:70,
    marginTop:40,
    alignSelf:'center',
  },
  style_user_input:{
      textAlign:'center',
      textAlignVertical: "center",
      backgroundColor:'#fff',
      marginTop:10,
      height:40,
      padding:1,
  },
   style_pwd_input:{
      textAlign:'center',
      textAlignVertical: "center",
      backgroundColor:'#fff',
      height:40,
      padding:1,
  },
   style_view_commit:{
      margin:15,
      backgroundColor:'#63B8FF',
      height:40,
      borderRadius:5,
      justifyContent: 'center',
      alignItems: 'center',
  },
  style_view_unlogin:{
    fontSize:15,
    color:'#63B8FF',
    marginLeft:10,
  },
  style_view_register:{
    fontSize:15,
    color:'#63B8FF',
    marginRight:10,
    alignItems:'flex-end',
    flex:1,
    flexDirection:'row',
    textAlign:'right',
  }
});