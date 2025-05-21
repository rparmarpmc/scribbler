import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import rootSaga from '../middlewares/index'
import { composeWithDevTools } from '@redux-devtools/extension'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]

const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middlewares)))

sagaMiddleware.run(rootSaga)

export default store
