import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "common/api";
import {
  AddCardResponseType,
  ArgCreateCardType,
  ArgGetCardsType, ArgUpdateCardType, ArgUpdateGradeType, DeleteCardResponseType,
  FetchCardsResponseType, UpdateCardResponseType, UpdateGradeResponseType
} from "features/Cards/service/cards.api.types";

export const cardsApi = createApi({
  reducerPath: "cardsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    credentials: "include"
  }),
  tagTypes: ["Card"],
  endpoints: (build) => {
    return {
      // 1 параметр - тип того, что возвращает сервер (ResultType)
      // 2 параметр - тип query аргументов (QueryArg)
      getCards: build.query<FetchCardsResponseType, ArgGetCardsType>({
        query: ({ packId, page, pageCount, cardQuestion, sortCards }) => {
          return {
            method: "GET",
            url: "cards/card",
            params: {
              cardsPack_id: packId,
              page,
              pageCount,
              cardQuestion,
              sortCards
            }
          };
        },
        providesTags: (result) =>
          result
            ? [...result.cards.map((card) => ({ type: "Card" as const, id: card._id })), "Card"]
            : ["Card"]
      }),
      addCard: build.mutation<AddCardResponseType, ArgCreateCardType>({
        query: (card) => {
          return {
            method: "post",
            url: "cards/card",
            body: {
              card
            }
          };
        },
        invalidatesTags: ["Card"]
      }),
      deleteCard: build.mutation<DeleteCardResponseType, string>({
        query: (id) => {
          return {
            method: "DELETE",
            url: "cards/card",
            params: {
              id
            }
          };
        },
        invalidatesTags: ["Card"]
      }),
      updateCard: build.mutation<UpdateCardResponseType, ArgUpdateCardType>({
        query: (card) => {
          return {
            method: "PUT",
            url: "cards/card",
            body: {
              card
            }
          };
        },
        invalidatesTags: (result, error, card) => [{ type: "Card", id: card._id }]
      }),
      updateGrade: build.mutation<UpdateGradeResponseType, ArgUpdateGradeType>({
        query: (gradeCard) => {
          return {
            method: "PUT",
            url: "cards/grade",
            body: {
              ...gradeCard
            }
          };
        },
        invalidatesTags: (result, error, card) => [{ type: "Card", id: card.card_id }]
      })
    };
  }
});

export const {
  useGetCardsQuery,
  useAddCardMutation,
  useDeleteCardMutation,
  useUpdateCardMutation,
  useUpdateGradeMutation
} = cardsApi;

//types

