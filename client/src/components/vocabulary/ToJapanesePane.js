import React from 'react';
import { Button, Form, Icon, Input, Select, notification } from 'antd';
import WanaKana from 'wanakana';

class ToJapanesePane extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getStateFromProps(props);
        this.state.typedTranscription = '';
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.getStateFromProps(nextProps));
    }

    componentDidUpdate(prevProps, prevState) {
        this.next();
    }

    getStateFromProps({ lesson, entryIndex, onNext }) {
        const lessonEntry = lesson.entries[entryIndex];
        const translations = lessonEntry.translations;
        const expressionList = lesson.entries
            .map(el => el.expression)
            .sort((a,b) => a > b);
        return { lessonEntry, translations, expressionList, onNext };
    }

    handleInputChange = ({ target }) => {
        const typedTranscription = WanaKana.toKana(target.value, { IMEMode: true });
        this.setState({ typedTranscription });
    }

    handleSelectChange = (selectedExpression) => {
        this.setState({ selectedExpression });
    }

    isTranscriptionValid = () => {
        const input = this.state.typedTranscription.trim();
        const entry = this.state.lessonEntry;
        return input == entry.transcription || input == entry.expression;
    }

    isExpressionValid = () => {
        return this.state.selectedExpression == this.state.lessonEntry.expression; 
    }

    next = (e) => {
        if (e !== undefined) e.preventDefault();
        if (!this.isTranscriptionValid() && !this.isExpressionValid()) return;
        notification.success({ message: 'ブラボー!', description: 'Réponse correcte' });
        this.setState({ typedTranscription: '', selectedExpression: undefined });
        this.state.onNext();
    }

    render() {
        return (
            <Form onSubmit={this.next}>
                <Form.Item>
                    <h2 style={{textAlign: "center"}}>{ this.state.translations.join(', ') }</h2>
                </Form.Item>
                <Form.Item validateStatus={this.isExpressionValid() ? 'success' : 'error'}>
                    <Select placeholder="Expression" value={this.state.selectedExpression} onChange={this.handleSelectChange}>
                        {this.state.expressionList.map((val, i) => 
                            <Select.Option value={val} key={i}>{val}</Select.Option>
                        )}
                    </Select>
                </Form.Item>
                <Form.Item validateStatus={this.isTranscriptionValid() ? 'success' : 'error'} hasFeedback >
                    <Input placeholder="Transcription" value={this.state.typedTranscription} onChange={this.handleInputChange} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" disabled={!this.isTranscriptionValid() && !this.isExpressionValid()} onClick={this.next}>
                        Suivant <Icon type="right" />
                    </Button>
                </Form.Item>
            </Form>
        );

    }
};

export default ToJapanesePane;
