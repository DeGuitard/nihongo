import React from 'react';
import { connect } from 'dva';

import AudioLesson from '../components/audio/AudioLesson.js';

const AudioPage = ({ dispatch, audio }) => {
    const { solution, mode, loading, speed } = audio;

    const lessonProps = {
        solution, mode, speed, loading,
        onNext: () => dispatch({ type: 'audio/next' }),
        onPlay: () => dispatch({ type: 'audio/play' }),
        onParamChange: (payload) => dispatch({ type: 'audio/changeParam', payload })
    }

    return (
        <div>
            <header>
                <h1>Compréhension Orale</h1>
            </header>
            <section>
                <AudioLesson { ...lessonProps } />
            </section>
        </div>
    );
};

function mapStateToProps({ audio }) {
    return { audio };
}

export default connect(mapStateToProps)(AudioPage);
