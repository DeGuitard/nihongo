import React from 'react';
import { Button, Icon } from 'antd';

import styles from './StudyPane.less';

const StudyPane = ({ lesson, entryIndex, onNext, onPrevious }) => {
    const lessonEntry = lesson.entries[entryIndex];
    const expression = lessonEntry.expression;
    const transcription = lessonEntry.transcription;
    const translation = lessonEntry.translation;

    const canNext = entryIndex < lesson.entries.length - 1;
    const canPrevious = entryIndex > 0;

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.expression}>
                {expression}
            </h2>

            <div className={styles.transcription}>
                <span>{ transcription }</span>
            </div>

            <h3 className={styles.translation}>{ translation }</h3>

            <Button.Group>
                <Button type="primary" onClick={onPrevious} disabled={!canPrevious}>
                    <Icon type="left" /> Précédent
                </Button>
                <Button type="primary" onClick={onNext} disabled={!canNext}>
                    Suivant <Icon type="right" />
                </Button>
            </Button.Group>
        </div>
    );
};

StudyPane.propTypes = {

};

export default StudyPane;
