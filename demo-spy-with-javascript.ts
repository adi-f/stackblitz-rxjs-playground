import {log, insertButton} from './utils'
import {Observable, of,} from 'rxjs';
import { delay, map} from 'rxjs/operators';

log('Spy with JavaScript & Monkeypatching', 'title');

class DemoService {

  syncMethod(input: string): string {
    return input.toUpperCase();
  }

  asyncMethod(input: string): Observable<string> {
    return of(input).pipe(
      map(string => string.toUpperCase()),
      delay(3000)
      );
  }
}

const demoService = new DemoService();

insertButton('simple synchronous method', () => {
  const result: string = demoService.syncMethod('Hello world!');
  log(result, 'log1');
});

insertButton('asynchronous method', () => {
  demoService.asyncMethod('Hello all!').subscribe(result => log(result, 'log1'));
});

insertButton('install spies', () => {
  simplySpy(demoService, 'syncMethod');
  spyWithObservable(demoService, 'asyncMethod');

});

/*** pure JavaScript section (in the webbrowser console, you have to replace log(...) with console.log(...) or something similar... ) ***/

// simply monkypatching, simple spying
function simplySpy(object, method) {
  const original = object[method];
  const spyingMethod = function() {
    const inputAsString = [...arguments].toString();
    log(inputAsString, 'log3');
    const output = original.apply(object, arguments);
    log(output, 'log4');
    return output
  }
  object[method] = spyingMethod;
}

// in the JavaScript console of the web browser:
// you can't import the tap()-Operator -> implement yourself
// you can't import the Observable itelf (to implement tap())
function spyWithObservable(object, method) {
  const original = object[method];
  const spyingMethod = function() {
    const inputAsString = [...arguments].toString();
    log(inputAsString, 'log3');
    const outputObservable = original.apply(object, arguments);
    const outputSpied = outputObservable.pipe(
      myTap(output => log(output, 'log4'))
    )
    return outputSpied
  }
  object[method] = spyingMethod;

  // signatur in TypeScript: function myTap<T>(action: (input: T) => void): (observable: Observable<T>) => Observable<T>
  function myTap(action) {
    return inputObservable => {
      const ObservableConstructor = getObservableConstructor(inputObservable)
      return new ObservableConstructor (subscriber => {
        inputObservable.subscribe({
          next: input => {
            action(input);
            subscriber.next(input);
          },
          error: err => subscriber.error(err),
          complete: () => subscriber.complete()
        })
      })
    }
  }

  function getObservableConstructor(observable) {
    // often, you won't get an Observable instance, but somthing that inherits from the Observable (e.g. a Subject)
    while(observable.constructor.name !== 'Observable') {
      // log(observable.constructor.name, 'log2');
      observable = Object.getPrototypeOf(observable);
    }
    return observable.constructor;
  }
}
  