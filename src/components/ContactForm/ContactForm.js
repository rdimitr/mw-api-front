import React, { Component } from 'react';
import './ContactForm.css';
import ComponentMWData from '../SQL/componentMWData';

class ContactForm extends Component {
    state = {
        cardAmb: '',
        cardAmbError: false,
        resTableShow: false
    };

    cardAmbChangeHandler = event => {
        const cardAmb = event.target.value;
        this.setState({
            cardAmb,
            cardAmbError: !cardAmb
        });
    };

    cardAmbFocusHandler = event => {
        this.setState({
            resTableShow: false
        });
    }

    resTableChangeHandler = event => {
        this.setState({
            resTableShow: false
        });
    };

    submitHandler = event => {
        event.preventDefault();

        const { cardAmb } = this.state;

        if(!/^[0-9]+$/.test(cardAmb)){
            alert("Номер амбулаторной карты должен быть числом!");
            return;
          }

        if (cardAmb) {
            this.setState({
                cardAmbError: false,
                resTableShow: true
            });
            this.props.onSubmit();
            return;
        }

        this.setState({
            cardAmbError: !cardAmb,
            resTableShow: !cardAmb?false:true
        });
    };

    render() {
        const { cardAmb, cardAmbError, resTableShow } = this.state;

        return (
            <form className='contact-form' onSubmit={this.submitHandler}>
                <div className='contact-form__field'>
                    <input
                        value={cardAmb}
                        onChange={this.cardAmbChangeHandler}
                        onFocus={this.cardAmbFocusHandler}
                        placeholder='№ карты'
                    />
                    {cardAmbError ? (
                        <div className='error'>Заполните поле</div>
                    ) : null}
                </div>

                <button className='button' type='submit'>
                    Отправить
                </button>

                
                
                <div className='contact-form__field'>
                    {resTableShow ? (
                       <ComponentMWData idCard ={cardAmb} />
                    ) : null}
                </div>
            </form>
        );
    }
}

export default ContactForm;
