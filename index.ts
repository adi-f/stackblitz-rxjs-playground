import { of } from 'rxjs'; 
import { map } from 'rxjs/operators';
import {log} from './logger'
// import './play'

const source = of('World').pipe(
  map(x => `Hello ${x}!`)
);

source.subscribe(x => console.log(x));

log('test');