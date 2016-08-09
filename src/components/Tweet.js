import React, {PropTypes} from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  View
} from 'react-native';

class Tweet extends React.Component {
  constructor(props) {
    super(props);
    this.goToChat = this.goToChat.bind(this);
  }

  goToChat() {
    this.props.goToChat(this.props);
  }

  render() {
    const {
      userid,
      username,
      text,
      avatar,
    } = this.props.userData;

    return (
      <TouchableHighlight underlayColor="transparent" onPress={this.goToChat}>
        <View style={styles.tweetContainer}>
          <Image source={require('./../img/avatars/1.png')} style={styles.avatar} />
          <View style={styles.rightContainer}>
            <View style={styles.userContainer}>
              <Text style={styles.username}>{username}</Text>
            </View>
             <Text style={styles.text}>{text}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const propTypes = {
  goToChat: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  tweetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#DAE6F0',
    paddingTop: 4,
    paddingBottom: 5,
    height:60,
  },
  avatar: {
    backgroundColor: 'gray',
    width: 45,
    height: 45,
    marginLeft: 10,
    borderRadius: 4,
  },
  userContainer: {
    flexDirection: 'row',
    paddingTop:0,
    marginTop:0,
  },
  username: {
    marginLeft: 0,
    color: '#000',
    marginTop: 0,
    paddingTop:0,
    fontWeight: '400',
    fontSize: 15,
  },
  text: {
    marginTop: 3,
    fontWeight: '100',
    fontSize: 13,

  },
  rightContainer: {
    flex: 1,
    paddingLeft: 14,
  },
});

Tweet.propTypes = propTypes;


export default Tweet;
