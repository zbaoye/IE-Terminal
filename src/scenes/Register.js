import React, { Component, PropTypes } from 'react';
import  {  View, Text ,StyleSheet,TextInput, Image,TouchableWithoutFeedback,ToastAndroid,} from 'react-native';
import { Button, Subheader, COLOR } from 'react-native-material-design';

import AppStore from '../stores/AppStore';

export default class Register extends React.Component {
    register(){
        var username = this.refs.username._lastNativeText;
        var pwd = this.refs.pwd._lastNativeText;
        var pwdCheck = this.refs.pwdCheck._lastNativeText;
        this.refs.username.clear();
        this.refs.pwd.clear();
        this.refs.pwdCheck.clear();
        if (pwd == pwdCheck) {
          fetch('http://10.10.10.124:3000/register', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: username,
              password: pwd,
            })
          }).then((response)=>{
            console.log(response);
            response.json().then((json)=>{
              console.log(json);
              
              const navigator = this.props.navigator;
              navigator.to('welcome');
            }).catch(function(e) {
              ToastAndroid.show('数据解析失败', ToastAndroid.SHORT);
            });
          }).catch(function(e) {
            ToastAndroid.show('数据解析失败', ToastAndroid.SHORT);
          });
          
        }else{
          //console.log('密码输入不符');
          ToastAndroid.show('密码输入不符，请重新输入', ToastAndroid.SHORT);
        }
        
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
                />
                <View
                     style={{height:5,backgroundColor:'#f4f4f4'}}
                 />
                 <TextInput style={styles.style_pwd_input}
                   placeholder='请输入密码'
                   numberOfLines={1}
                   ref='pwd'
                   secureTextEntry={true}
                   textAlign='center'/>
                <View
                     style={{height:1,backgroundColor:'#f4f4f4'}}
                />
                <TextInput style={styles.style_pwd_input}
                   placeholder='请再次输入密码'
                   numberOfLines={1}
                   ref='pwdCheck'
                   secureTextEntry={true}
                   textAlign='center'/>
  
                <TouchableWithoutFeedback onPress={() => this.register()}>  
                    <View style={styles.style_view_register}>  
                        <Text style={{color:'#fff'}}>
                            注册
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
      backgroundColor:'#fff',
      marginTop:10,
      height:40,
      padding:1,
  },
   style_pwd_input:{
      textAlign:'center',
      backgroundColor:'#fff',
      height:40,
      padding:1,
  },
   style_view_register:{
      marginTop:15,
      marginLeft:15,
      marginRight:15,
      backgroundColor:'#63B8FF',
      height:40,
      borderRadius:5,
      justifyContent: 'center',
      alignItems: 'center',
  },
});