// import { writable, get, derived } from 'svelte/store';
// import { browser } from '$app/environment';
// import type { Value, Importance, Columns } from '../routes/values/types';

// function createValueStore() {
//     const initialValues: Value[] = [];
//     const initialCurrentIndex: number = 0;

//     const { subscribe, set, update } = writable({
//         values: initialValues,
//         currentIndex: initialCurrentIndex
//     });

//     const columns = derived({ subscribe }, ($store) => {
//         const veryImportantValues = $store.values.filter(value => value.importance === 'Very Important');
//         return {
//             'Very Important': veryImportantValues.filter(value => value.secondRoundImportance === 'Very Important'),
//             'Important': veryImportantValues.filter(value => value.secondRoundImportance === 'Important'),
//             'Not Important': veryImportantValues.filter(value => value.secondRoundImportance === 'Not Important'),
//             'Unsorted': veryImportantValues.filter(value => value.secondRoundImportance === null || value.secondRoundImportance === undefined),
//         } as Columns;
//     });

//     if (browser) {
//         const storedValues = localStorage.getItem('values');
//         const storedIndex = localStorage.getItem('currentIndex');

//         if (storedValues) {
//             set({
//                 values: JSON.parse(storedValues),
//                 currentIndex: storedIndex ? parseInt(storedIndex, 10) : 0
//             });
//         }
//     }

//     return {
//         subscribe,
//         columns,
//         updateImportance: (id: number, importance: Importance, isSecondRound: boolean = false) => update(state => {
//             const newValues = state.values.map(value =>
//                 value.id === id
//                     ? isSecondRound
//                         ? { ...value, secondRoundImportance: importance }
//                         : { ...value, importance }
//                     : value
//             );
//             const newState = {
//                 values: newValues,
//                 currentIndex: state.currentIndex + 1
//             };
//             if (browser) {
//                 localStorage.setItem('values', JSON.stringify(newValues));
//                 localStorage.setItem('currentIndex', newState.currentIndex.toString());
//             }
//             return newState;
//         }),
//         clearItems: () => {
//             if (browser) {
//                 localStorage.removeItem('values');
//                 localStorage.removeItem('currentIndex');
//             }
//             set({ values: [], currentIndex: 0 });
//         },
//         setInitialValues: (values: Value[]) => {
//             if (browser) {
//                 localStorage.setItem('values', JSON.stringify(values));
//             }
//             set({ values, currentIndex: 0 });
//         },
//         getVeryImportantValues: () => {
//             return get(valueStore).values.filter(value => value.importance === 'Very Important');
//         }
//     };
// }

// export const valueStore = createValueStore();

import { browser } from '$app/environment';
import type { Value, Importance, Columns } from './types';

export function createValueStore() {
  let values: Value[] = $state(loadInitialValues());
  let currentIndex = $state(loadInitialIndex());

  function loadInitialValues(): Value[] {
    if (browser) {
      const storedValues = localStorage.getItem('values');
      return storedValues ? JSON.parse(storedValues) : [];
    }
    return [];
  }

  function loadInitialIndex(): number {
    if (browser) {
      const storedIndex = localStorage.getItem('currentIndex');
      return storedIndex ? parseInt(storedIndex, 10) : 0;
    }
    return 0;
  }

  function saveToLocalStorage() {
    if (browser) {
      localStorage.setItem('values', JSON.stringify(values));
      localStorage.setItem('currentIndex', currentIndex.toString());
    }
  }

  // Derived state for columns
  const columns = $derived(() => {
    const veryImportantValues = values.filter((value) => value.importance === 'Very Important');
    return {
      'Very Important': veryImportantValues.filter(
        (value) => value.secondRoundImportance === 'Very Important'
      ),
      Important: veryImportantValues.filter((value) => value.secondRoundImportance === 'Important'),
      'Not Important': veryImportantValues.filter(
        (value) => value.secondRoundImportance === 'Not Important'
      ),
      Unsorted: veryImportantValues.filter(
        (value) => value.secondRoundImportance === null || value.secondRoundImportance === undefined
      )
    } as Columns;
  });

  function updateImportance(id: number, importance: Importance, isSecondRound: boolean = false) {
    values = values.map((value) =>
      value.id === id
        ? isSecondRound
          ? { ...value, secondRoundImportance: importance }
          : { ...value, importance }
        : value
    );
    currentIndex++;
    saveToLocalStorage();
  }

  function clearItems() {
    values = [];
    currentIndex = 0;
    if (browser) {
      localStorage.removeItem('values');
      localStorage.removeItem('currentIndex');
    }
  }

  function setInitialValues(newValues: Value[]) {
    values = newValues;
    currentIndex = 0;
    saveToLocalStorage();
  }

  const veryImportantValues = $derived(() =>
    values.filter((value) => value.importance === 'Very Important')
  );

  return {
    get values() {
      return values;
    },
    get currentIndex() {
      return currentIndex;
    },
    get columns() {
      return columns;
    },
    get veryImportantValues() {
      return veryImportantValues;
    },
    updateImportance,
    clearItems,
    setInitialValues
  };
}

export const valueStore = createValueStore();
