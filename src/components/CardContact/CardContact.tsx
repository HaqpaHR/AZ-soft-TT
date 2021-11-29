import React,{ChangeEvent} from "react";
import {Contact} from "../../types";
import './CardContact.scss'

interface State {
  contact: any,
  key: string,
  value: string,
}

type Props = {
  selected: Contact | null,
}

export class CardContact extends React.Component<{ selected: Contact },State> {
  state = {
    contact: {},
    key: '',
    value: '',
  }

  componentDidMount() {
    this.setState({
      contact: this.props.selected
    })
  }

  addKeyHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    this.setState((state) => ({
      ...state,
      [name]: event.target.value,
    }))
  }

  submitHandler = (event: any) => {
    event.preventDefault();
    const key = this.state.key;
    const value = this.state.value;

    this.setState(state => ({
      contact: { ...state.contact, [key]: value },
      key: '',
      value: '',
    }))
  }

  render() {
    const { contact } = this.state;

    return (
      <>
        <form
          onSubmit={this.submitHandler}
        >
          <label className="input_label" htmlFor='input-key'>
            Input key:
            <input
                type='text'
                id="input-key"
                name="key"
                value={this.state.key}
                onChange={this.addKeyHandler}
            />
          </label>
          <label className="input_label" htmlFor='input-value'>
            Input value:
            <input
                type='text'
                id="input-value"
                name="value"
                value={this.state.value}
                onChange={this.addKeyHandler}
            />
          </label>
          <button
            type="submit"
          >
            Add
          </button>
        </form>
        {
          Object.entries(contact).map(([key, value]) => (
              <li
                key={key}
                className="contact__info"
              >{ key.toUpperCase() } : { value }</li>
          ))
        }
      </>
    )
  }
}
