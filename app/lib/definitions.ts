export type Traveler = {
  id: string; // Will be created on the database
  name: string;
  game: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Piece = {
  id: string; // Will be created on the database
  userid: string;
  pieceid: number;
  partnerid: string | null;
  status: number;
  answer: string | null;
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
