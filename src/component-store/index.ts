import {
  Observable,
  BehaviorSubject,
  ReplaySubject,
  Subject,
  combineLatest,
  of,
  Subscription,
} from 'rxjs';
import { OnDestroy } from '@angular/core';
import {
  takeUntil,
  map,
  distinctUntilChanged,
  shareReplay,
} from 'rxjs/operators';

interface EffectReturnFn<T> {
  (): void;
  (t: T | Observable<T>): Subscription;
}

export abstract class ComponentStore<T> implements OnDestroy {
  private readonly stateSubject$: BehaviorSubject<T>;
  readonly state$: Observable<T>;

  // Should be used only in ngOnDestroy
  private readonly destroySubject$ = new ReplaySubject<void>();
  // Exposed to any extending Store to be used for the teardowns.
  readonly destroy$ = this.destroySubject$.asObservable();

  constructor(defaultState: T) {
    this.stateSubject$ = new BehaviorSubject(defaultState);

    this.state$ = this.selector((s) => s)();
  }

  /** Completes all relevant Observable streams. */
  ngOnDestroy() {
    this.stateSubject$.complete();
    this.destroySubject$.next();
  }

  /**
 * Creates a reducer.
 *
 * @param reducerFn A static reducer function that takes 2 parameters (the
current state and an argument object) and returns a new instance of the
 *     state.
 * @return A function that accepts one argument which is forwarded as the
 *     second argument to `reducerFn`. Everytime this function is called
 *     subscribers will be notified of the state change.
 */
  updater(reducerFn: (state: T) => T): () => void;
  updater<V>(
    reducerFn: (state: T, value: V) => T
  ): (observableOrValue: V | Observable<V>) => Subscription;
  updater<V>(
    reducerFn: (state: T, value?: V) => T
  ): (observableOrValue?: V | Observable<V>) => Subscription {
    return (observableOrValue?: V | Observable<V>): Subscription => {
      const observable$: Observable<V | undefined> = isObservable(
        observableOrValue
      )
        ? observableOrValue
        : of(observableOrValue);
      return observable$
        .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
        .subscribe((value) =>
          this.stateSubject$.next(reducerFn(this.stateSubject$.value, value))
        );
    };
  }

  setState(reducerFn: (state: T) => T): void {
    return this.updater(reducerFn)();
  }

  /**
   * Creates an effect.
   *
   * This effect is subscribed to for the life of the @Component.
   * @param generator A function that takes an origin Observable input and
   *     returns an Observable. The Observable that is returned will be
   *     subscribed to for the life of the component.
   * @return A function that, when called, will trigger the origin Observable.
   */
  effect<V, R = unknown>(
    generator: (origin$: Observable<V>) => Observable<R>
  ): EffectReturnFn<V> {
    const origin$ = new Subject<V>();
    // 👇 Wrapped with retryable function, similar to ngrx/effect
    generator(origin$)
      // tied to the lifecycle 👇 of ComponentStore
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    return (observableOrValue?: V | Observable<V>): Subscription => {
      const observable$ = isObservable(observableOrValue)
        ? observableOrValue
        : of(observableOrValue);
      return observable$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
        // any new 👇 value is pushed into a stream
        origin$.next(value);
      });
    };
  }

  /**
   * Creates a selector.
   *
   * This supports chaining up to 4 selectors. More could be added as needed.
   *
   * @param mapFn A pure projection function that takes the current state and
   *   returns some new slice/projection of that state.
   * @return A function that returns an observable of the mapFn results.
   */
  selector<R>(projector: (s: T) => R): () => Observable<R>;
  selector<R, S1>(
    s1: () => Observable<S1>,
    projector: (s1: S1) => R
  ): () => Observable<R>;
  selector<R, S1, S2>(
    s1: () => Observable<S1>,
    s2: () => Observable<S2>,
    projector: (s1: S1, s2: S2) => R
  ): () => Observable<R>;
  selector<R, S1, S2, S3>(
    s1: () => Observable<S1>,
    s2: () => Observable<S2>,
    s3: () => Observable<S3>,
    projector: (s1: S1, s2: S2, s3: S3) => R
  ): () => Observable<R>;
  selector<R, S1, S2, S3, S4>(
    s1: () => Observable<S1>,
    s2: () => Observable<S2>,
    s3: () => Observable<S3>,
    s4: () => Observable<S4>,
    projector: (s1: S1, s2: S2, s3: S3, s4: S4) => R
  ): () => Observable<R>;
  selector<R>(...args: any[]): () => Observable<R> {
    let observable$: Observable<R>;
    const projector: (...args: any[]) => R = args.pop();
    if (!args.length) {
      // If there's only one argument, it's just a map function.
      observable$ = this.stateSubject$.pipe(map(projector));
    } else {
      // If there are multiple arguments, we're chaining selectors, so we need
      // to take the combineLatest of them before calling the map function.
      observable$ = combineLatest(args.map((a) => a())).pipe(
        map((args: any[]) => projector(...args))
      );
    }
    const distinctSharedObservable$ = observable$.pipe(
      distinctUntilChanged(),
      shareReplay({
        refCount: true,
        bufferSize: 1,
      }),
      takeUntil(this.destroy$)
    );
    return () => distinctSharedObservable$;
  }

  // Alternative API, just return Observable
  select<R>(projector: (s: T) => R): Observable<R>;
  select<R, S1>(s1: Observable<S1>, projector: (s1: S1) => R): Observable<R>;
  select<R, S1, S2>(
    s1: Observable<S1>,
    s2: Observable<S2>,
    projector: (s1: S1, s2: S2) => R
  ): Observable<R>;
  select<R, S1, S2, S3>(
    s1: Observable<S1>,
    s2: Observable<S2>,
    s3: Observable<S3>,
    projector: (s1: S1, s2: S2, s3: S3) => R
  ): Observable<R>;
  select<R, S1, S2, S3, S4>(
    s1: Observable<S1>,
    s2: Observable<S2>,
    s3: Observable<S3>,
    s4: Observable<S4>,
    projector: (s1: S1, s2: S2, s3: S3, s4: S4) => R
  ): Observable<R>;
  select<R>(...args: any[]): Observable<R> {
    let observable$: Observable<R>;
    const projector: (...args: any[]) => R = args.pop();
    if (!args.length) {
      // If there's only one argument, it's just a map function.
      observable$ = this.stateSubject$.pipe(map(projector));
    } else {
      // If there are multiple arguments, we're chaining selectors, so we need
      // to take the combineLatest of them before calling the map function.
      observable$ = combineLatest(args).pipe(
        map((args: any[]) => projector(...args))
      );
    }
    const distinctSharedObservable$ = observable$.pipe(
      distinctUntilChanged(),
      shareReplay({
        refCount: true,
        bufferSize: 1,
      }),
      takeUntil(this.destroy$)
    );
    return distinctSharedObservable$;
  }
}

function isObservable<V>(
  observableOrValue?: V | Observable<V>
): observableOrValue is Observable<V> {
  return (
    !!observableOrValue &&
    typeof (observableOrValue as Observable<V>).pipe !== 'undefined'
  );
}
// Wraps an observable in a retryable catchError pipeline ensuring that the
// origin Observable doesn't complete on errors.
// function getRetryableObservable<T>(obs$: Observable<T>): Observable<T> {
//   // console.log(obs$);
//   return obs$.pipe(
//     catchError(error => {
//       // Needs to be completed similar to what NgRx Effect does.
//       return getRetryableObservable(obs$);
//     })
//   );
// }
