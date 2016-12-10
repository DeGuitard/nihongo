import React from 'react';
import { Alert, Card, Tabs, Spin } from 'antd';

import StudyPane from './StudyPane.js';
import ToJapanesePane from './ToJapanesePane.js';
import FromJapanesePane from './FromJapanesePane.js';

const TabPane = Tabs.TabPane;

const VocabularyLesson = ({ loading, lesson, error, entryIndex, onNext, onPrevious }) => {
    if (error) return ( <Alert message="Mince, nous n'avons pas réussi à charger la leçon :(." type="error" showIcon />  );
    if (lesson === undefined) return null;

    const currentEntry = loading ? {} : lesson.entries[entryIndex];
    const studyProps = { lesson, entryIndex, onNext, onPrevious };
    const toJapaneseProps = { lesson, entryIndex, onNext };
    const fromJapaneseProps = { lesson, entryIndex, onNext };

    return (
        <Card>
            <Spin spinning={loading}>
                <Tabs>
                    <TabPane tab="Réviser" key="1">
                        <StudyPane { ...studyProps } />
                    </TabPane>
                    <TabPane tab="Thème" key="2">
                        <ToJapanesePane { ...toJapaneseProps } />
                    </TabPane>
                    <TabPane tab="Version" key="3">
                        <FromJapanesePane { ...fromJapaneseProps } />
                    </TabPane>
                </Tabs>
            </Spin> 
        </Card>
    );
};

VocabularyLesson.propTypes = {

};

export default VocabularyLesson;
