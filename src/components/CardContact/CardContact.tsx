import React from "react";
import {Contact} from "../../types";

interface State {
  contact: Contact,
}

type Props = {
  selectedContact: number,
  users: Contact[],
}

export class CardContact extends React.Component<Props, State> {
    // state = {
    //   contact: {} as Contact,
    // }

    render() {
        const { selectedContact, users } = this.props;
        const contact = users.find(contact => contact.id === selectedContact);

        return (
            <h2>{contact?.name}</h2>
        )
    }
}
