import { NotistackType } from "../../../ts/types/notistack.types"


type RedirectAndNotificationType = {
    redirectTo: string,
    notistack: [] | Array<NotistackType>,
}

export const redirectAndNotification: RedirectAndNotificationType = {
    redirectTo: "",
    notistack: [],
}   