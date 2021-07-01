import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import { store } from "..";
import DiagramReducer from "./DiagramReducer";

export module Store{


  export type RootState = ReturnType<typeof store.getState>;
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  export type AppDispatch = typeof store.dispatch
  export const useAppDispatch = () => useDispatch<AppDispatch>()
  export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector}