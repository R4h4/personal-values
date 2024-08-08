type Value = {
  id: number;
  name: string;
  description: string;
  importance: Importance | null;
  secondRoundImportance?: Importance;
};

type Importance = 'Very Important' | 'Important' | 'Not Important' | 'Unsorted';

type Columns = Record<Importance | 'Unsorted', Value[]>;

export type { Value, Columns, Importance };
