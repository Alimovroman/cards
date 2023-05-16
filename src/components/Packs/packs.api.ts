import { instance } from "common/api";

export const packsApi = {
  getPacks: (page: number) => {
    return instance.get(`cards/pack?pageCount=10&page=${page}`);
  },
  sortCardPacks: (num: number) => {
    return instance.get(`cards/pack?sortPacks=${num}cardsCount`);
  },
  addNewPack: (name: string) => {
    return instance.post(`cards/pack`, {"cardsPack": {"name":name }})
  }
};