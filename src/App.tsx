import React from 'react';
import users from './api/users';
import { Link } from 'react-router-dom';
import './App.css';
import { Contact } from './types';
import {CardContact} from "./components/CardContact/CardContact";
import {ContactList} from "./components/ContactList/ContactList";
// import { CardContact } from './components/CardContact/CardContact';


type State = {
  contacts: Contact[],
  addContactName: string,
  addContactPhone: string,
  selectedContact: number,
}
console.log(users)
class App extends React.Component<{}, State> {
  state = {
    contacts: users,
    addContactName: '',
    addContactPhone: '',
    selectedContact: 0,
  }

    inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
        addContactName: event.target.value,
        })
    };

    inputPhoneHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            addContactPhone: event.target.value,
        })
    }

    deleteHandler = (id: number) => {
      this.setState({
        contacts: this.state.contacts.filter(user => user.id !== id)
      })
    }

    selectedHandler = (id: number) => {
      this.setState({
        selectedContact: id
      })
    }

    addContact = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newContact = {
            id: this.state.contacts.length + 1,
            name: this.state.addContactName,
            phone: this.state.addContactPhone,
        };

        this.setState(prevState => ({
            contacts: [...prevState.contacts, newContact],
            addContactName: '',
            addContactPhone: '',
        }))

    }

  render() {
      return (
        <div>
          <form
              onSubmit={this.addContact}
          >
              <label className="input_label" htmlFor='input-contact'>
                  Input name of new Contact:
                <input
                    type='text'
                    id="input-contact"
                    value={this.state.addContactName}
                    onChange={this.inputHandler}
                />
              </label>
              <label className="input_label" htmlFor='input-phone'>
                  Input phone of new Contact:
                  <input
                      type='number'
                      pattern="[0-9]*"
                      id="input-phone"
                      value={this.state.addContactPhone}
                      onChange={this.inputPhoneHandler}
                  />
              </label>
            <button
              type="submit"
            >
              Add
            </button>
          </form>
          <ContactList users={this.state.contacts} onDelete={this.deleteHandler} onMore={this.selectedHandler} />
          <div>
            <CardContact users={this.state.contacts} selectedContact={this.state.selectedContact}/>
          </div>
        </div>
    )
  }
}

export default App;
