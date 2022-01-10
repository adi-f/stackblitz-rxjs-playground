import './style.css';
import {log, insertListLink} from './utils'

insertListLink('withLatestFrom', () => require('./play-withLatestFrom'));
insertListLink('startWith', () => require('./play-startWith'));
insertListLink('switch/conat/mergeMap', () => require('./play-switchConatMergeMap'));
insertListLink('toPromise', () => require('./play-toPromise'));
insertListLink('concatMap + of + withLatestFrom', () => require('./play-concatMap-of-withLatestFrom'));
insertListLink('Spy with pure JavaScript', () => require('./demo-spy-with-javascript'));