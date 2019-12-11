import {addLogSection, insertButton, arrangeLogSectionVertical} from './utils'
import {Subject} from 'rxjs';
import {tap, map, switchMap, concatMap, mergeMap} from 'rxjs/operators';


///////////////////////// SETUP /////////////////////////
const subjectA = new Subject<number>();
const subjectB = new Subject<number>();
let aCounter = 0;
let bCounter = 0;

insertButton('Fire A', () => {
  subjectA.next(++aCounter);
  return aCounter;
});

insertButton('Fire B', () => {
  subjectB.next(++bCounter);
  return aCounter;
});

const logSwitchMap = addLogSection();
logSwitchMap('switchMap', 'title');

const logConcatMap = addLogSection();
logConcatMap('concatMap', 'title');

const logMergeMap = addLogSection();
logMergeMap('mergeMap', 'title');

arrangeLogSectionVertical();

///////////////////////// DEMO /////////////////////////
subjectA.pipe(
  tap(i => logSwitchMap('A ' + i)),
  switchMap( ia => subjectB.pipe(
    tap(ib => logSwitchMap('b ' + ib)),
    map(ib => `A ${ia}, B ${ib}`)
    ))
).subscribe(message => logSwitchMap(message))

subjectA.pipe(
  tap(i => logConcatMap('A ' + i)),
  concatMap( ia => subjectB.pipe(
    tap(ib => logConcatMap('b ' + ib)),
    map(ib => `A ${ia}, B ${ib}`)
    ))
).subscribe(message => logConcatMap(message))

subjectA.pipe(
  tap(i => logMergeMap('A ' + i)),
  mergeMap( ia => subjectB.pipe(
    tap(ib => logMergeMap('b ' + ib)),
    map(ib => `A ${ia}, B ${ib}`)
    ))
).subscribe(message => logMergeMap(message))
