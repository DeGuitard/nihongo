import React from 'react';
import { Button, Card, Form, Input, Radio, TimePicker } from 'antd';
import WanaKana from 'wanakana';

import styles from './AudioLesson.less';

class AudioLesson extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    handleGuessChange = ({ target }) => {
        const guess = WanaKana.toKana(target.value, { IMEMode: true });
        this.setState({ guess });
    }

    handleSpeedChange = ({ target }) => {
        this.state.onParamChange({ speed: target.value });
    }

    handleModeChange = ({ target }) => {
        this.state.onParamChange({ mode: target.value });
        this.state.onNext();
    }

    next = (e) => {
        if (!this.isValid()) return;
        if (e !== undefined) e.preventDefault();
        this.setState({ guess: '' })
        this.state.onNext();
        this.state.onPlay();
    }

    isValid = () => {
        return this.state.guess && this.state.guess.replace(' ', '') == this.state.solution;
    }

    render() {
        let placeholder;
        if (this.state.mode == 'hour') placeholder = 'Ex: 12:34';
        if (this.state.mode == 'date') placeholder = 'Ex: 1970/12/25';

        return (
            <div>
                <Card>
                    <h3 className={styles.title}>Paramétrage</h3>
                    <Form horizontal>
                        <Form.Item label='Mode'>
                            <Radio.Group value={this.state.mode} onChange={this.handleModeChange}>
                                <Radio.Button value='number'>Nombres</Radio.Button>
                                <Radio.Button value='date'>Dates</Radio.Button>
                                <Radio.Button value='hour'>Heures</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label='Élocution'>
                            <Radio.Group value={this.state.speed} onChange={this.handleSpeedChange}>
                                <Radio.Button value='75'>Lente</Radio.Button>
                                <Radio.Button value='100'>Normale</Radio.Button>
                                <Radio.Button value='125'>Rapide</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </Card>
                <Card>
                    <h3 className={styles.title}>Exercice</h3>
                    <Form inline onSubmit={this.next}>
                        <Form.Item>
                            <Button icon='play-circle-o' onClick={this.state.onPlay} loading={this.state.loading}>Écouter</Button>
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder={placeholder} value={this.state.guess} onChange={this.handleGuessChange} />
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={this.next} disabled={!this.isValid()}>Suivant</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default AudioLesson;
