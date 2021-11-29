import React from 'react';
import users from './api/users';
import './App.scss';
import { Contact } from './types';
import {CardContact} from "./components/CardContact/CardContact";
import {ContactList} from "./components/ContactList/ContactList";


type State = {
  contacts: Contact[],
  addContactName: string,
  addContactPhone: string,
  selectedContact: Contact | null,
}

class App extends React.Component<{}, State> {
  state = {
    contacts: users,
    addContactName: '',
    addContactPhone: '',
    selectedContact: null,
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

    selectedHandler = (user: Contact) => {
      this.setState({
        selectedContact: user
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
        <div className="container">
          <header>
            <h1 className="header__title">Contact List</h1>
          </header>
          <form
              className="input__form"
              onSubmit={this.addContact}
          >
              <label className="input__label" htmlFor='input-contact'>
                  Input name of new Contact:
                <input
                    type='text'
                    id="input-contact"
                    value={this.state.addContactName}
                    onChange={this.inputHandler}
                />
              </label>
              <label className="input__label" htmlFor='input-phone'>
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
              className="button__submit"
              type="submit"
            >
              Add
            </button>
          </form>
          <div className="list__container">
            <ContactList users={this.state.contacts} onDelete={this.deleteHandler} onMore={this.selectedHandler} />
          </div>
          <div className="contact">
            <h2>Contact Info:</h2>
            {this.state.selectedContact ? (
                <CardContact
                    selected={this.state.selectedContact}
                />
            ) : <p className="App__content-container-none">
              No user selected
            </p>
            }
          </div>
        </div>
    )
  }
}

export default App;
