import React from 'react';
import { Button, Input, Popover, Switch } from 'antd';
import { kanjidic } from './kanjidic.js';
import WanaKana from 'wanakana';

class KanjiInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getStateFromProps(props);
        this.state.toKanji = true;
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.getStateFromProps(nextProps));
    }

    getStateFromProps(props) {
        return { text: props.value, matches: [], onChange: props.onChange };
    }

    handleSwitch = (checked) => {
        this.setState({ toKanji: checked, matches: [] });
    }

    handleInput = ({ target }) => {
        if (this.state.toKanji) {
            // Find the first non-kana character (i.e. romaji), that will be used to look for kanjis, then converts it to kana.
            const romaji = target.value.match(/[a-zA-Z\.]+/)[0];
            const transcription = WanaKana.toKana(romaji);
            const kunMatches = kanjidic.filter(kanji => kanji.kunyomi ? kanji.kunyomi.some(val => val === transcription) : false);
            const onMatches = kanjidic.filter(kanji => kanji.onyomi ? kanji.onyomi.some(val => val === transcription) : false);
            this.setState({ matches: onMatches.concat(kunMatches), text: target.value }); 
        } else {
            const transcription = WanaKana.toKana(target.value, { IMEMode: true });
            this.setState({ text: transcription });
            this.state.onChange({ target: { value: transcription } });
        }
    }

    handleKanjiClick = ({ kanji }) => {
        const text = this.state.text.replace(/[a-zA-Z\.]+/, kanji);
        this.setState({ text, matches: [] });
        this.state.onChange({ target: { value: text } });
    }

    render() {
        const switchProps = { size: 'small', checkedChildren: '漢字', unCheckedChildren: 'あア', onChange: this.handleSwitch, defaultChecked: this.state.toKanji }
        return (
            <div>
                <Input onChange={this.handleInput} value={this.state.text} size='large' addonAfter={<Switch { ...switchProps } />} />
                {this.state.matches.map(
                    match => <Popover title={match.kanji} content={match.meaning.join(', ')} key={match.kanji}>
                                <Button style={{marginRight: '3px'}} onClick={() => this.handleKanjiClick(match)}>{match.kanji}</Button>
                             </Popover>
                )}
            </div>
        );
    }
}

export default KanjiInput;
