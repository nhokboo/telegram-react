import React from 'react';
import PropTypes from 'prop-types';
import './ContactControl.css';
import UserTileControl from '../UserTileControl';
import UserStore from '../../Stores/UserStore';
import {formatNumber} from 'libphonenumber-js';

class ContactControl extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        let message = this.props.message;
        if (typeof message === 'undefined'){
            console.log('undefined');
        }
        if (!message) return null;
        if (!message.content) return null;

        let contact = message.content.contact;
        if (!contact) return null;

        let user = UserStore.get(contact.user_id) || { 'id': contact.user_id, 'first_name' : contact.first_name, 'last_name': contact.last_name };
        let fullName = `${contact.first_name} ${contact.last_name}`;
        let unformattedNumber = contact.phone_number && contact.phone_number.startsWith('+') ? contact.phone_number : '+' + contact.phone_number;
        let number = formatNumber(unformattedNumber, 'International');
        let containsUserId = contact.user_id && contact.user_id > 0;

        return (
            <div className='contact'>
                <div className='contact-tile'>
                    <UserTileControl user={user}/>
                </div>
                <div className='contact-content'>
                    <div className='contact-name'>
                        {
                            containsUserId
                                ? (<a onClick={this.props.openMedia}>{fullName}</a>)
                                : (<span>{fullName}</span>)
                        }
                    </div>
                    <div className='contact-phone'>{number}</div>
                </div>
            </div>
        );
    }
}

ContactControl.propTypes = {
    message : PropTypes.object.isRequired,
    openMedia : PropTypes.func.isRequired
};

export default ContactControl;