import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { articles } from "./articles";

type Article = typeof articles[number];

// id only from article
export type ReadingListItem = Pick<Article, "id">;

interface ReadingListState {
  readingList: number[];
  addToReadingList: (article: number) => void;
  removeFromReadingList: (article: number) => void;
  emptyReadingList: () => void;
}

export const useReadingListStore = create<ReadingListState>()(
  devtools(
    persist(
      (set) => ({
        readingList: [],
        addToReadingList: (articleId) =>
          set((state) => ({
            readingList: state.readingList.some((b) => b === articleId)
              ? state.readingList
              : [...state.readingList, articleId],
          })),
        removeFromReadingList: (articleId) =>
          set((state) => ({
            readingList: state.readingList.filter((b) => b !== articleId),
          })),
        emptyReadingList: () => set({ readingList: [] }),
      }),
      {
        name: "reading-list",
      }
    )
  )
);
