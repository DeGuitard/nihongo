import React from 'react';
import { Alert, Form, Input, Modal, Switch } from 'antd';
import WanaKana from 'wanakana';
import KanjiInput from '../common/KanjiInput.js';

class LessonEntryModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getStateFromProps(props); 
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.getStateFromProps(nextProps));
    }

    getStateFromProps({ visible, onOk, onCancel, entry, error }) {
        return { visible, onOk, onCancel, entry, error };
    }

    handleExpressionChange = ({ target }) => {
        const newEntry = { ...this.state.entry, expression: target.value }; 
        this.setState({ entry: newEntry });
    }

    handleTranslationChange = ({ target }) => {
        const newEntry = { ...this.state.entry, translation: target.value }; 
        this.setState({ entry: newEntry });
    }

    handleTranscriptionChange = ({ target }) => {
        const transcription = WanaKana.toKana(target.value, { IMEMode: true });
        const newEntry = { ...this.state.entry, transcription }; 
        this.setState({ entry: newEntry });
    }

    submit = () => {
        console.log('lol');
    }

    render() {
        const entry = this.state.entry;
        if (entry === undefined) return null;

        const modalProps = {
            title: "Édition d'entrée",
            okText: "OK",
            cancelText: "Annuler",
            visible: this.state.visible,
            onOk: () => { this.state.onOk(this.state.entry) },
            onCancel: this.state.onCancel
        };

        return (
            <Modal { ...modalProps }>
                { this.state.error ? <Alert message="Mince, nous n'avons pas réussi à sauvegarder les modifications :(." type="error" showIcon /> : undefined }
                <Form onSubmit={this.submit}>
                    <Form.Item label="Expression">
                        <KanjiInput onChange={this.handleExpressionChange} value={entry.expression} /> 
                    </Form.Item>
                    <Form.Item label="Transcription">
                        <Input onChange={this.handleTranscriptionChange} value={entry.transcription} />
                    </Form.Item>
                    <Form.Item label="Traduction">
                        <Input onChange={this.handleTranslationChange} value={entry.translation} />
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default LessonEntryModal;
