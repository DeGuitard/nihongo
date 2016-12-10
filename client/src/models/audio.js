import Chance from 'chance';
const chance = new Chance();

const pad = (i, n) => ('0'.repeat(n) + String(i)).slice(String(i).length);
const random = (mode) => {
    if (mode == 'number') return chance.natural({max: 999999});
    if (mode == 'date') return chance.date().toISOString().slice(0,10).replace(/-/g,'/');
    if (mode == 'hour') {
        let hour = chance.natural({max: 12});
        let minute = chance.natural({max: 60});
        return pad(hour, 2) + ':' + pad(minute, 2);
    }
};
const play = (audio) => {
    return new Promise((resolve) => {
        audio.onended = resolve;
        audio.play();
    });
};

export default {

    namespace: 'audio',

    state: {
        loading: false,
        mode: 'number',
        speed: '100',
        solution: random('number'),
        sound: undefined
    },

    effects: {
        *play({ payload }, { call, put, select }) {
            yield put({ type: 'startLoading' });
            let sound = yield select(models => models.audio.sound);
            if (!sound) {
                const state = yield select(models => models.audio);
                sound = yield new Audio(`/api/voice?speed=${state.speed}&text=${encodeURIComponent(state.solution)}`); 
            } 
            yield play(sound);
            yield put({ type: 'endLoading', payload: { sound } });
        }
    },

    reducers: {

        startLoading(state, action) {
            return { ...state, loading: true };
        },

        endLoading(state, { payload }) {
            return { ...state, loading: false, sound: payload.sound };
        },

        next(state, action) {
            return { ...state, solution: random(state.mode), sound: undefined };
        },

        changeParam(state, { payload }) {
            return { ...state, ...payload, sound: undefined }
        }
    }
}
