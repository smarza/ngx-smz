import { ɵmarkDirty } from '@angular/core';

/*
  Based on: https://dev.to/angular/decorators-do-not-work-as-you-might-expect-3gmj
  Meant to be used in conjunction with @Input()
*/
// Can't export as a const lambda, AOT compilation would break.
export function Dynamic<T>(instanceCallbackName?: keyof T): any {
  // Runs on the property when the container class prototype (not instance!)
  // is first loaded.
  return (target: Object, propName: string | symbol) => {
    const key = Symbol();
    // Used when accessing the instance property.
    return {
      // 'this' now refers to the instance.
      get() {
        return this[key];
      },
      set(newVal: any) {
        const prevVal = this[key];
        if (prevVal !== newVal) {
          this[key] = newVal;
          // Since change detection can now be requested inside the decorator
          // there isn't a need for providing a callback unless we want to
          // do something other than requesting change detection.
          if (instanceCallbackName) {
            this[instanceCallbackName](prevVal, newVal);
          }
          // Waiting for production ready Ivy (should arrive with Angular 9).
          // ----
          // This enables requesting change detection from inside the decorator
          // so there'd be no need to do it inside the provided callback.
          ɵmarkDirty(this);
        }
      }
    };
  };
}