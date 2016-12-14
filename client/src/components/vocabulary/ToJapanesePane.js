import React from 'react';
import { Button, Form, Icon, Input, Select } from 'antd';
import WanaKana from 'wanakana';

class ToJapanesePane extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getStateFromProps(props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.getStateFromProps(nextProps));
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
        return this.state.typedTranscription == this.state.lessonEntry.transcription;
    }

    isExpressionValid = () => {
        return this.state.selectedExpression == this.state.lessonEntry.expression; 
    }

    next = (e) => {
        if (!this.isTranscriptionValid() || !this.isExpressionValid()) return;
        if (e !== undefined) e.preventDefault();
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
                    <Button type="primary" disabled={!this.isTranscriptionValid() || !this.isExpressionValid()} onClick={this.next}>
                        Suivant <Icon type="right" />
                    </Button>
                </Form.Item>
            </Form>
        );

    }
};

export default ToJapanesePane;
