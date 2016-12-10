import React from 'react';
import { connect } from 'dva';

import LessonSelect from '../components/common/LessonSelect.js';
import AdminLesson from '../components/vocabulary/AdminLesson.js';
import LessonEntryModal from '../components/vocabulary/LessonEntryModal.js';

const AdminPage = ({ dispatch, lessons }) => {
    let { listLoading, lessonLoading, lessonList, currentLesson, lessonError, entryUpdateError, listError, editionModalVisible, entryToEdit } = lessons;

    const listProps = {
        currentLesson,
        adminMode: true,
        loading: listLoading,
        list: lessonList,
        error: listError,
        onSelect: (lessonId) => {
            dispatch({
                type: 'lessons/loadLesson',
                payload: { lessonId }
            });
        },
        onAdd: (name) => {
            dispatch({
                type: 'lessons/create',
                payload: { name }
            });
        },
        onDelete: (_id) => {
            dispatch({
                type: 'lessons/delete',
                payload: { _id }
            });
        }
    };

    const adminProps = {
        lesson: currentLesson,
        loading: lessonLoading,
        error: lessonError,
        onEdit: (entry) => {
            dispatch({
                type: 'lessons/showEditionModal',
                payload: { entry }
            });
        },
        onDelete: (entry) => {
            dispatch({
                type: 'lessons/deleteEntry',
                payload: { lessonId: currentLesson._id, entryId: entry._id }
            });
        }
    };

    const modalProps = {
        visible: editionModalVisible,
        error: entryUpdateError,
        entry: entryToEdit,
        onOk: (entry) => {
            const type = entry._id === undefined ? 'lessons/createEntry' : 'lessons/updateEntry';
            dispatch({
                type,
                payload: { lessonId: currentLesson._id, entry }
            });
        },
        onCancel: () => {
            dispatch({
                type: 'lessons/hideEditionModal'
            });
        }
    };

    return (
        <div>
            <header>
                <h1>Administration</h1>
            </header>
            <section>
                <LessonSelect { ...listProps } />
                <AdminLesson { ...adminProps } />
                <LessonEntryModal { ...modalProps } />
            </section>
        </div>
    );
};

function mapStateToProps({ lessons }) {
    return { lessons };
}

export default connect(mapStateToProps)(AdminPage);
