import { list, get, create, remove, createEntry, updateEntry, deleteEntry } from '../services/lessons.js';

// Function helper.
function delay(timeout){
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}


export default {

    namespace: 'lessons',

    state: {
        lessonList: [],
        currentLesson: undefined,
        entryIndex: 0,
        lessonLoading: false,
        listLoading: false,
        listError: false,
        lessonError: false,
        entryUpdateError: false,
        editionModalVisible: true,
        entryToEdit: undefined
    },

    subscriptions: {
        setup({ dispatch }) {
            dispatch({ type: 'loadLessonList' });
        }
    },

    effects: {
        *create({ payload }, { call, put }) {
            try {
                const { data } = yield call(create, payload.name);
                yield put({ type: 'lessonAddSuccess', payload: { lesson: data } });
            } catch (error) {
                yield put({ type: 'lessonFailure' });
            }
        },

        *delete({ payload }, { call, put }) {
            try {
                yield call(remove, payload._id);
                yield put({ type: 'lessonDeleteSuccess', payload });
            } catch (error) {
                yield put({ type: 'lessonFailure' });
            }
        },

        *loadLessonList(action, { call, put }) {
            yield put({ type: 'showListLoading' });
            const { data } = yield call(list);
            yield put({
                type: 'listLoadSuccess',
                payload: { lessonList: data }
            });
        },

        *loadLesson({ payload }, { call, put }) {
            yield put({ type: 'showLessonLoading' });
            try {
                const { data } = yield call(get, payload.lessonId);
                yield put({
                    type: 'lessonLoadSuccess',
                    payload: {
                        currentLesson: data 
                    }
                });
            } catch (error) {
                console.log('Error retrieving lesson info.', error);
                yield put({ type: 'lessonLoadFailure' });
            }
        },

        *createEntry({ payload }, { call, put }) {
            const { data } = yield call(createEntry, payload.lessonId, payload.entry);
            let updatedEntry = data;
            if (data) {
                yield put({
                    type: 'lessonUpdateSuccess',
                    payload: { updatedEntry  }
                });
            } else {
                yield put({ type: 'lessonUpdateFailure' });
            }
        },

        *updateEntry({ payload }, { call, put }) {
            const { data } = yield call(updateEntry, payload.lessonId, payload.entry);
            let updatedEntry = data;
            if (data) {
                yield put({
                    type: 'lessonUpdateSuccess',
                    payload: { updatedEntry }
                });
            } else {
                yield put({ type: 'lessonUpdateFailure' });
            }
        },

        *deleteEntry({ payload }, { call, put }) {
            try {
                const data = yield call(deleteEntry, payload.lessonId, payload.entryId);
                yield put ({
                    type: 'lessonEntryDeleteSuccess',
                    payload: { entryId: payload.entryId }
                });
            } catch (error) {
                console.log('error', error);
            }
        }

    },

    reducers: {
        showListLoading(state, action) {
            return { ...state, listLoading: true, listError: false };
        },

        listLoadFailure(state, action) {
            return { ...state, listError: true, listLoading: false }
        },

        listLoadSuccess(state, action) {
            return { ...state, ...action.payload, listLoading: false };
        },

        showLessonLoading(state, action) {
            return { ...state, lessonLoading: true, lessonError: false };
        },

        lessonLoadFailure(state, action) {
            return { ...state, lessonError: true, lessonLoading: false }
        },

        lessonLoadSuccess(state, action) {
            return { ...state, ...action.payload, lessonLoading: false, entryIndex: 0, lessonError: false };
        },

        lessonAddSuccess(state, action) {
            let lessonList = state.lessonList.slice();
            lessonList.push(action.payload.lesson);
            return { ...state, lessonList };
        },
        
        lessonDeleteSuccess(state, { payload }) {
            return { ...state, currentLesson: undefined, lessonList: state.lessonList.filter(lesson => lesson._id !== payload._id) };
        },

        nextEntry(state, action) {
            let newEntryIndex;
            if (state.entryIndex == state.currentLesson.entries.length - 1) newEntryIndex = 0;
            else newEntryIndex = state.entryIndex + 1;
            return { ...state, entryIndex: newEntryIndex };
        },

        previousEntry(state, action) {
            const newEntryIndex = state.entryIndex - 1;
            return { ...state, entryIndex: newEntryIndex };
        },

        showEditionModal(state, action) {
            return { ...state, editionModalVisible: true, entryToEdit: action.payload.entry };
        },

        hideEditionModal(state, action) {
            return { ...state, editionModalVisible: false, entryUpdateError: false };
        },

        lessonUpdateSuccess(state, action) {
            const updatedEntry = action.payload.updatedEntry;
            let currentLesson = { ...state.currentLesson };
            let index = currentLesson.entries.findIndex(entry => entry._id === updatedEntry._id);
            index === -1 ? currentLesson.entries.push(updatedEntry) : currentLesson.entries[index] = updatedEntry;
            return { ...state, editionModalVisible: false, entryUpdateError: false, currentLesson };
        },

        lessonUpdateFailure(state, action) {
            return { ...state, entryUpdateError: true };
        },

        lessonEntryDeleteSuccess(state, action) {
            const entryId = action.payload.entryId;
            let currentLesson = { ...state.currentLesson };
            currentLesson.entries = currentLesson.entries.filter(entry => entry._id !== entryId);
            return { ...state, entryUpdateError: false, currentLesson };
        }
    }
}
