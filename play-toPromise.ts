import {log, insertButton} from './utils'
import {ReplaySubject} from 'rxjs';
import { startWith } from 'rxjs/operators';
log('toPromise', 'title');

const subject = new ReplaySubject<string>();
let count = 0;

insertButton('.toPrimise()', () => {
  subject.toPromise().then(message => log(message));
});

insertButton('.subscribe()', () => {
  subject.subscribe(message => log(message));
});

insertButton('+1', () => {
  subject.next(++count + '');
  return count;
});

insertButton('complete', () => {
  subject.next('complete');
});