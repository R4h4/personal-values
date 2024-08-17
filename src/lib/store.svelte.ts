/* eslint-disable prefer-const */
import { browser } from '$app/environment';
import type { Value, Importance } from './types';

export function createValueStore() {
  let values = $state(loadInitialValues());
  let currentIndex = $state(loadInitialIndex());

  function moveIndexBackByOne() {
    currentIndex--;
  }

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

  let veryImportantValues = $derived(
    values.filter((value) => value.importance === 'Very Important')
  );

  const hasUnsortedValues = $derived(
    veryImportantValues.filter(
      (value) => value.secondRoundImportance === null || value.secondRoundImportance === undefined
    ).length > 0
  );

  const coreValues = $derived(
    values.filter((value) => value.isCoreValue)
  );

  // Derived state for columns
  const columns = $derived( 
    {
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
  });

  function updateImportance(id: number, importance: Importance, isSecondRound: boolean = false) {
    console.log('updateImportance', id, importance, isSecondRound);
    values = values.map((value) =>
      value.id === id
        ? isSecondRound
          ? { ...value, secondRoundImportance: importance }
          : { ...value, importance }
        : value
    );
    if (!isSecondRound) {
      currentIndex++;
    }
    saveToLocalStorage();
  }

  function updateCoreValues(id: number) {
    console.log('updateCoreValues', id);
    values = values.map((value) =>
      value.id === id
        ? { ...value, isCoreValue: !value.isCoreValue }
        : value
    );
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

  return {
    get values() {
      return values;
    },
    get currentIndex() {
      return currentIndex;
    },
    get coreValues() {
      return coreValues;
    },
    get columns() {
      return columns;
    },
    get hasUnsortedValues() {
        return hasUnsortedValues;
    },
    get veryImportantValues() {
      return veryImportantValues;
    },
    moveIndexBackByOne,
    updateImportance,
    clearItems,
    setInitialValues,
    updateCoreValues
  };
}

export const valueStore = createValueStore();
