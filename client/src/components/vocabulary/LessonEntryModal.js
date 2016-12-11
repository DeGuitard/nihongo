import React from 'react';
import { Alert, Button, Form, Input, Modal, Switch, Tag, Tooltip } from 'antd';
import WanaKana from 'wanakana';
import KanjiInput from '../common/KanjiInput.js';

class LessonEntryModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getStateFromProps(props); 
        this.state.inputVisible = false;
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
        this.setState({ newTranslation: target.value });
    }

    handleTranscriptionChange = ({ target }) => {
        const transcription = WanaKana.toKana(target.value, { IMEMode: true });
        const newEntry = { ...this.state.entry, transcription }; 
        this.setState({ entry: newEntry });
    }

    handleNewTranslation = () => {
        const { entry, newTranslation } = this.state;
        if (newTranslation && entry.translations.indexOf(newTranslation) === -1) {
            entry.translations  = [ ...entry.translations, newTranslation ];
        }
        this.setState({ entry, inputVisible: false, newTranslation: '' });
    }

    handleRemoveTranslation = (translation) => {
        const newEntry = this.state.entry;
        newEntry.translations = newEntry.translations.filter(val => val !== translation);
        this.setState({ entry: newEntry });
    }

    showInput = () => {
        this.setState({ inputVisible: true })
    };

    render() {
        const { entry, visible, onCancel, onOk, error, inputVisible } = this.state;
        if (entry === undefined) return null;

        const modalProps = {
            title: "Édition d'entrée",
            okText: "OK",
            cancelText: "Annuler",
            visible,
            onOk: () => { onOk(this.state.entry) },
            onCancel
        };

        return (
            <Modal { ...modalProps }>
                { error ? <Alert message="Mince, nous n'avons pas réussi à sauvegarder les modifications :(." type="error" showIcon /> : undefined }
                <Form onSubmit={this.submit}>
                    <Form.Item label="Expression">
                        <KanjiInput onChange={this.handleExpressionChange} value={entry.expression} /> 
                    </Form.Item>
                    <Form.Item label="Transcription">
                        <Input onChange={this.handleTranscriptionChange} value={entry.transcription} />
                    </Form.Item>
                    <Form.Item label="Traductions">
                        {entry.translations.map((tag, index) => {
                            const isLongTag = tag.length > 20;
                            const tagElem = (
                                <Tag key={tag} closable={index !== 0} afterClose={() => this.handleRemoveTranslation(tag)}>
                                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                </Tag>
                            );
                            return isLongTag ? <Tooltip key={tag} title={tag}>{tagElem}</Tooltip> : tagElem;
                        })}
                        { inputVisible && <Input style={{width: 150}} size="small" onChange={this.handleTranslationChange} onBlur={this.handleNewTranslation} onPressEnter={this.handleNewTranslation} /> }
                        { !inputVisible && <Button size="small" type="dashed" onClick={this.showInput}>+ Ajouter</Button> }
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default LessonEntryModal;
