import {CardContact} from "../CardContact/CardContact";
import React from "react";
import {Contact} from "../../types";

type Props = {
  users: Contact[],
  onDelete: (id: number) => void,
  onMore: (id: number) => void,
}


export class ContactList extends React.Component<Props, {}> {

  render() {
    return (
      <ul className="list">
        {this.props.users.map(user => (
          <li key={user.id}>
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
                onClick={()=> this.props.onMore(user.id)}
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
