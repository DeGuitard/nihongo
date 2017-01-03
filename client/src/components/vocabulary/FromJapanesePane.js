import React from 'react';
import { Button, Form, Icon, Input, Select } from 'antd';

const Option = Select.Option;

class FromJapanesePane extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getStateFromProps(props);
        this.state.typedTranslation = '';
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.getStateFromProps(nextProps));
    }

    getStateFromProps({ lesson, entryIndex, onNext }) {
        const lessonEntry = lesson.entries[entryIndex];
        const expression = lessonEntry.expression;
        const transcription = lessonEntry.transcription;
        const translations = lessonEntry.translations;
        return { lessonEntry, translations, expression, transcription, onNext };
    }

    handleInputChange = ({ target }) => {
        const typedTranslation = target.value;
        this.setState({ typedTranslation });
    }

    isValid = () => {
        const typedTranslation = this.state.typedTranslation.trim().toUpperCase();
        return this.state.translations.some(translation => translation.toUpperCase() === typedTranslation );
    }

    next = (e) => {
        if (e !== undefined) e.preventDefault();
        if (!this.isValid()) return;
        this.setState({ typedTranslation: '' });
        this.state.onNext();
    }

    render() {
        return (
            <Form onSubmit={this.next}>
                <Form.Item>
                    <h2 style={{"textAlign": "center"}}>{ this.state.expression }</h2>
                    <h3 style={{"textAlign": "center"}}>{ this.state.transcription }</h3>
                </Form.Item>
                <Form.Item validateStatus={this.isValid() ? 'success' : 'error'} hasFeedback>
                    <Input 
                        value={this.state.typedTranslation}
                        onChange={this.handleInputChange} 
                        placeholder="Traduction" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" disabled={!this.isValid()} onClick={this.next}>
                        Suivant <Icon type="right" />
                    </Button>
                </Form.Item>
            </Form>
        );
    };
}

export default FromJapanesePane;
