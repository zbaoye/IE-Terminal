import Welcome from './scenes/Welcome';
import NestedExample from './scenes/NestedExample';
import Avatars from './scenes/Avatars';
import Buttons from './scenes/Buttons';
import Checkboxes from './scenes/Checkboxes';
import Dividers from './scenes/Dividers';
import List from './scenes/List';
import IconToggles from './scenes/IconToggles';
import RadioButtons from './scenes/RadioButtons';
import Subheaders from './scenes/Subheaders';
import Themes from './scenes/Themes';
import Messages from './scenes/Messages';
import ChatPage from './scenes/ChatPage';

export default {

    welcome: {

        title: 'GeoVis',
        component: Welcome,//require().default,
        children: {
            example: {
                // title: 'Child Example', // optional
                component: NestedExample//require('./scenes/NestedExample').default
            }
        }
    },
    messages: {
        initialRoute: true,
        title: 'Messages',
        component: Messages//require('./scenes/Avatars').default
    },
    chatpage: {
        title: 'ChatPage',
        component: ChatPage//require('./scenes/Avatars').default
    },
    avatars: {
        title: 'Avatars',
        component: Avatars//require('./scenes/Avatars').default
    },

    buttons: {

        title: 'Buttons',
        component: Buttons//require('./scenes/Buttons').default
    },

    checkboxes: {
        title: 'Checkboxes',
        component: Checkboxes//require('./scenes/Checkboxes').default
    },

    dividers: {
        title: 'Dividers',
        component: Dividers//require('./scenes/Dividers').default
    },

    list: {

        title: 'List',
        component: List//require('./scenes/List').default
    },

    'icon-toggles': {
        title: 'Icon Toggles',
        component: IconToggles//require('./scenes/IconToggles').default
    },

    'radio-buttons': {

        title: 'Radio Buttons',
        component: RadioButtons//require('./scenes/RadioButtons').default
    },

    subheaders: {
        title: 'Subheaders',
        component: Subheaders//require('./scenes/Subheaders').default
    },

    themes: {
        title: 'Change Theme',
        component: Themes//require('./scenes/Themes').default
    }
}