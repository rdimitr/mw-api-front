import React from 'react';
import ContactForm from '../../components/ContactForm/ContactForm';

class HomePage extends React.Component {
    state = {
        closed: true,
    };

    openForm() {
        this.setState({
            closed: false,
        });
    }

    closeForm() {
        this.setState({
            closed: true,
        });
    }

    render() {
        return (
            <div>
                <div className='contacts'>
                    <div className='container'>
                    <p>
                        Введите номер амбулаторной карты
                    </p>
                        <div>
                            <ContactForm onSubmit={() => this.closeForm()} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;
