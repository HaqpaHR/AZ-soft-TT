import React from "react";
import {Contact} from "../../types";
import './ContactList.scss'

type Props = {
  users: Contact[],
  onDelete: (id: number) => void,
  onMore: (user: Contact) => void,
}


export class ContactList extends React.Component<Props, {}> {

  render() {
    return (
      <ul className="list">
        {this.props.users.map(user => (
          <li
              key={user.id}
              className="list__item"
          >
            <p>{user.name}</p>
            <p>{user.phone}</p>
            <button
                type="button"
                onClick={() => this.props.onDelete(user.id)}
            >
                Delete
            </button>
            <button
                type="button"
                onClick={()=> this.props.onMore(user)}
            >
                More...
            </button>
          </li>
        ))
        }
      </ul>
    )
  }
}
