import {log, insertButton} from './utils'
import {Subject} from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
log('withLatestFrom', 'title');

let aCounter = 0;
let bCounter = 0;
let cCounter = 0;

const subjectA = new Subject<number>();
const subjectB = new Subject<number>();
const subjectC = new Subject<number>();

insertButton('Fire A', () => {
  subjectA.next(++aCounter);
  return aCounter;
});

insertButton('Fire B', () => {
  subjectB.next(++bCounter);
  return bCounter;
});

insertButton('Fire C', () => {
  subjectC.next(++cCounter);
  return cCounter;
});

subjectA
  .pipe(withLatestFrom(subjectB, subjectC))
  .subscribe(([a, b, c]) => log(`A: ${a}, B: ${b}, C: ${c}`));



