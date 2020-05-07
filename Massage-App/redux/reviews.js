import * as ActionTypes from './ActionTypes';

export const reviews = (state = { errMess: null, reviews: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_REVIEWS:
            return {...state, errMess: null, reviews: action.payload};

        case ActionTypes.REVIEWS_FAILED:
            return {...state, errMess: action.payload};

        case ActionTypes.ADD_REVIEW:
            const newReview = action.payload;
            newReview.id = state.reviews.length;
            return {...state, errMess: null, review: state.reviews.concat(newReview)};

        default:
            return state;
    }
};