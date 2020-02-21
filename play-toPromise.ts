import {log, insertButton} from './utils'
import {ReplaySubject} from 'rxjs';
import { startWith } from 'rxjs/operators';
log('toPromise', 'title');

const subject = new ReplaySubject<string>();
let count = 0;

insertButton('.toPromise()', () => {
  subject.toPromise().then(message => log(message, 'log1'));
});

insertButton('.subscribe()', () => {
  subject.subscribe(message => log(message, 'log2'));
});

insertButton('+1', () => {
  subject.next(++count + '');
  return count;
});

insertButton('complete', () => {
  subject.complete();
});