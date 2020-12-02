import {log, insertButton} from './utils'
import {of, ReplaySubject,  Subject} from 'rxjs';
import { concatMap, tap,  withLatestFrom } from 'rxjs/operators';
log('concatMap-of-withLatestFrom', 'title');

let aCounter = 0;
let bCounter = 0;

const subjectA = new Subject<number>();
const subjectB = new Subject<number>(); // new ReplaySubject<number>(1);

insertButton('Fire A', () => {
  subjectA.next(++aCounter);
  return aCounter;
});

insertButton('Fire B', () => {
  subjectB.next(++bCounter);
  return bCounter;
});

subjectA
  .pipe(
    tap(a => log(`A (1): ${a}`)),
    concatMap(a => of(a).pipe(
      tap(a => log(`A (2): ${a}`)),
      withLatestFrom(subjectB))
    )
  )
  .subscribe(([a, b]) => log(`A (final): ${a}, B: ${b}`));
  // doesn't work (takes the last already present value in b, so B must be a Reply/BehaviorSubject)
