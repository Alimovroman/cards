export type CardType = {
  _id: string;
  cardsPack_id: string;
  user_id: string;
  answer: string;
  question: string;
  grade: CardGradeType;
  shots: number;
  comments: string;
  type: string;
  rating: number;
  more_id: string;
  created: string;
  updated: string;
  __v: number;
  answerImg?: string;
  answerVideo?: string;
  questionImg?: string;
  questionVideo?: string;
};

// response
export type FetchCardsResponseType = {
  cards: CardType[];
  packUserId: string;
  packName: string;
  packPrivate: boolean;
  packCreated: string;
  packUpdated: string;
  page: number;
  pageCount: number;
  cardsTotalCount: number;
  minGrade: number;
  maxGrade: number;
  token: string;
  tokenDeathTime: number;
};
type CommonCardResponseType = {
  newCard: CardType;
  deletedCard: CardType;
  updatedCard: CardType;
  token: string;
  tokenDeathTime: number;
};

export type AddCardResponseType = Omit<CommonCardResponseType, "deletedCard" | "updatedCard">;
export type DeleteCardResponseType = Omit<CommonCardResponseType, "newCard" | "updatedCard">;
export type UpdateCardResponseType = Omit<CommonCardResponseType, "newCard" | "deletedCard">;

// arguments
type CardGradeType = 0 | 1 | 2 | 3 | 4 | 5;

export type ArgGetCardsType = {
  packId: string;
  page?: number;
  pageCount?: number;
};

// Просто создаем родительский тип и в дочерних убираем ненужные свойства 🤘

type CreateUpdateCardType = {
  _id: string;
  cardsPack_id: string;
  question?: string;
  answer?: string;
  grade?: CardGradeType;
  shots?: number;
  answerImg?: string;
  questionImg?: string;
  questionVideo?: string;
  answerVideo?: string;
};

export type ArgCreateCardType = Omit<CreateUpdateCardType, "_id">;
export type ArgUpdateCardType = Omit<CreateUpdateCardType, "cardsPack_id">;

