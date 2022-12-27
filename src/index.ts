type Action = {
  type: string;
  payload: unknown;
}

type FirProp = {
  dispatch: (p: Action) => void;
}

type Next = (p: Action) => void

export default ({ dispatch }: FirProp) => (next: Next) => async (action: Action) => {
  // 判断action.payload是否为Promise实例
  if (action.payload instanceof Promise) {
    const res = await action.payload;
    dispatch({
      type: action.type,
      payload: res
    });
  } else {
    return next(action);
  }
};
