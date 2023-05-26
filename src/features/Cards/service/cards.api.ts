import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "common/api";
import {
  AddCardResponseType,
  ArgCreateCardType,
  ArgGetCardsType, ArgUpdateCardType, DeleteCardResponseType,
  FetchCardsResponseType, UpdateCardResponseType
} from "features/Cards/service/cards.api.types";

export const cardsApi = createApi({
  reducerPath: "cardsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    credentials: "include"
  }),
  tagTypes: ['Card'],
  endpoints: (build) => {
    return {
      // 1 параметр - тип того, что возвращает сервер (ResultType)
      // 2 параметр - тип query аргументов (QueryArg)
      getCards: build.query<FetchCardsResponseType, ArgGetCardsType>({
        query: ({ packId, page, pageCount }) => {
          return {
            method: "GET",
            url: "cards/card",
            params: {
              cardsPack_id: packId,
              page,
              pageCount
            },
          };
        },
        providesTags: (result) =>
          result
            ? [...result.cards.map((card) => ({ type: "Card" as const, id: card._id })), "Card"]
            : ["Card"],
      }),
      addCard: build.mutation<AddCardResponseType, ArgCreateCardType>({
        query: (card) => {
          return {
            method: 'post',
            url: "cards/card",
            body: {
              card
            }
          }
        },
        invalidatesTags: ['Card']
      }),
      deleteCard: build.mutation<DeleteCardResponseType, string>({
        query: (id) => {
          return {
            method: "DELETE",
            url: "cards/card",
            params: {
              id,
            },
          };
        },
        invalidatesTags: ["Card"],
      }),
      updateCard: build.mutation<UpdateCardResponseType, ArgUpdateCardType>({
        query: (card) => {
          return {
            method: "PUT",
            url: "cards/card",
            body: {
              card,
            },
          };
        },
        invalidatesTags: (result, error, card) => [{type: "Card", id: card._id }],
      }),
    };
  }
});

export const {useGetCardsQuery, useAddCardMutation, useDeleteCardMutation, useUpdateCardMutation} = cardsApi

//types

