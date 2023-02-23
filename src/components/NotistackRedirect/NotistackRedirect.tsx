import { FC, useEffect, memo } from "react";
import { useTypedSelector, useAppDispatch } from "../../utils/hooks/reduxHooks";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { removeNotistack } from "../../store/slicesAndThunks/redirectAndNotification/redirectAndNotification.slice";
import { pushRedirect } from "../../store/slicesAndThunks/redirectAndNotification/redirectAndNotification.slice";

type PropsType = {};

const NotistackRedirect: FC<PropsType> = memo(() => {
  const { redirectTo, notistack } = useTypedSelector((state) => state.redirectNotistack);

  const dispatch = useAppDispatch();

  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (redirectTo.length !== 0) {
      history.push(redirectTo);
      dispatch(pushRedirect(""));
    }
  }, [dispatch, history, redirectTo]);

  useEffect(() => {
    notistack.forEach(async (notifier, index) => {
      await enqueueSnackbar(`${notifier.statusCode} ${notifier.statusText}`, {
        variant: notifier.variant,
      });
      await dispatch(removeNotistack(index));
    });
  }, [dispatch, enqueueSnackbar, notistack]);

  return null;
});

export { NotistackRedirect };
