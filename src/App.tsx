import React from 'react';
import users from './api/users';
import './App.css';
// import { ContactList } from './components/ContactList/ContactList';
import { Contact } from './types';


type State = {
  contacts: Contact[],
  // isAddingContact: boolean,
    addContactName: string,
    addContactPhone: string,
}

class App extends React.Component<{}, State> {
  state = {
    contacts: users,
    addContactName: '',
    addContactPhone: '',
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

    addContact = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newContact = {
            id: this.state.contacts.length + 1,
            name: this.state.addContactName,
            username: '',
            email: '',
            address: '',
            phone: this.state.addContactPhone,
            website: '',
            company: '',
        };

        this.setState(prevState => ({
            contacts: [...prevState.contacts, newContact],
            addContactName: '',
            addContactPhone: '',
        }))

    }



  render() {
    // @ts-ignore
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
          <ul className="list">
              {this.state.contacts.map(user => (
                  <li key={user.id}>
                      <p>{user.name}</p>
                      <p>{user.phone}</p>
                      <button
                          type="button"
                          onClick={() => this.deleteHandler(user.id)}
                      >
                        Delete
                      </button>
                      <button>More...</button>
                  </li>
              ))
              }
          </ul>
        </div>
    )
  }
}

export default App;
