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
      key,
      text,
      user,
    } = this.props.tweetData;

    return (
      <TouchableHighlight underlayColor="transparent" onPress={this.goToChat}>
        <View style={styles.tweetContainer}>
          <Image source={require('./../img/avatars/1.png')} style={styles.avatar} />
          <View style={styles.rightContainer}>
            <View style={styles.userContainer}>
              <Text style={styles.name}>{user.username}</Text>
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
  text: PropTypes.string,
  user: PropTypes.object,
};

const styles = StyleSheet.create({
  tweetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#DAE6F0',
    paddingTop: 4,
    paddingBottom: 10,
  },
  avatar: {
    backgroundColor: 'gray',
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 4,
  },
  userContainer: {
    flexDirection: 'row',
  },
  username: {
    marginLeft: 4,
    fontSize: 13,
    color: '#8999a5',
    marginTop: 2,
  },
  name: {
    fontWeight: '600',
    fontSize: 15,
  },
  text: {
    marginTop: 5,
  },
  rightContainer: {
    flex: 1,
    padding: 10,
  },
});

Tweet.propTypes = propTypes;


export default Tweet;
