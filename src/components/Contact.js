import React, {PropTypes} from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  View
} from 'react-native';

class Contact extends React.Component {
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
      username,
    } = this.props.contactData;

    return (
      <TouchableHighlight underlayColor="transparent" onPress={this.goToChat}>
        <View style={styles.tweetContainer}>
          <Image source={require('./../img/avatars/1.png')} style={styles.avatar} />
          <View style={styles.rightContainer}>
            <View style={styles.userContainer}>
              <Text style={styles.username}>{username}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const propTypes = {
  goToChat: PropTypes.func.isRequired,
  username: PropTypes.object,
  avatar  : PropTypes.object,
};

const styles = StyleSheet.create({
  tweetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#DAE6F0',
    paddingTop: 4,
    paddingBottom: 4,
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
    marginLeft: 0,
    color: '#000',
    marginTop: 2,
    fontWeight: '300',
    fontSize: 15,

  },

  text: {
    marginTop: 5,
  },
  rightContainer: {
    flex: 1,
    padding: 13,
  },
});

Contact.propTypes = propTypes;


export default Contact;
