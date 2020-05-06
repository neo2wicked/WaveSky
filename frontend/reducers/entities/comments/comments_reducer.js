import {
    RECEIVE_COMMENTS,
    RECEIVE_COMMENT,
    DELETE_COMMENT
} from "../../../actions/comments/comments_actions"

const commentsReducers = (state = [], action) => {
    Object.freeze(state)

    let nextState = Object.assign([], state)

    switch (action.type) {
        case RECEIVE_COMMENTS:
            nextState = action.comments
            return nextState;
        case RECEIVE_COMMENT:
            nextState.push(action.comment)
            return nextState;
        case DELETE_COMMENT:
            delete nextState[action.commentId]
            return nextState;
        default:
            return state;
    }

}

export default commentsReducers;