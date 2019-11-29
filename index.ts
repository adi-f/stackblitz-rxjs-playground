import './style.css';
import {log, insertListLink} from './utils'



insertListLink('withLatestFrom', () => require('./play-withLatestFrom'));
insertListLink('startWith', () => require('./play-startWith'));