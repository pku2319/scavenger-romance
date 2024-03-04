export type Traveler = {
  id: string; // Will be created on the database
  name: string;
  game: string;
  board: Array<number>;
};

export interface Pieces {
  [key: string]: {
    type: string;
    prompts: {
      prompt: string;
      shortName: string;
      question: string;
    }[];
  };
}
