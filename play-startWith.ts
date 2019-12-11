import {log, insertButton} from './utils'
import {Subject} from 'rxjs';
import { startWith } from 'rxjs/operators';
log('startWith', 'title');

const subject = new Subject<string>();
const subjectB = new Subject<number>();
const subjectC = new Subject<number>();

insertButton('say hello', () => {
  subject.next('world!');
});
subject
  .pipe(startWith('Hello'))
  .subscribe(message => log(message));
  