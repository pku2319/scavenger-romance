export type Traveler = {
  id: string; // Will be created on the database
  name: string;
  game: string;
};

export type Piece = {
  id: string; // Will be created on the database
  userid: string;
  pieceid: number;
  partnerid: string;
  status: number;
  answer: string;
}

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
