import { createStore, compose} from 'redux';
import { reducer } from '../t_reducers';

export const store = createStore(reducer, {}, compose(
   window.devToolsExtension ? window.devToolsExtension() : f => f
));
