import React from 'react';
import { connect } from 'dva';

import LessonSelect from '../components/common/LessonSelect.js';
import VocabularyLesson from '../components/vocabulary/VocabularyLesson.js';

const VocabPage = ({ dispatch, lessons }) => {
    const { listLoading, lessonLoading, lessonList, currentLesson, entryIndex, lessonError, listError } = lessons;

    const listProps = {
        currentLesson: currentLesson,
        loading: listLoading,
        list: lessonList,
        error: listError,
        onSelect: (lessonId) => {
            dispatch({
                type: 'lessons/loadLesson',
                payload: { lessonId }
            });
        }
    };

    const lessonProps = {
        loading: lessonLoading,
        lesson: currentLesson,
        error: lessonError,
        entryIndex,
        onNext: () => {
            dispatch({ type: 'lessons/nextEntry' });
        },
        onPrevious: () => {
            dispatch({ type: 'lessons/previousEntry' });
        }
    };

    return (
        <div>
            <header>
                <h1>Vocabulaire</h1>
            </header>
            <section>
                <LessonSelect { ...listProps } />
                <VocabularyLesson { ...lessonProps } />
            </section>
        </div>
    );
};


function mapStateToProps({ lessons }) {
    return { lessons };
}

export default connect(mapStateToProps)(VocabPage);
