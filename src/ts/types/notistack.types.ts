
type NotistackTypes = "error" | "default" | "success" | "warning" | "info" | undefined

export type NotistackType = {
    statusCode: number | string,
    statusText: string,
    variant: NotistackTypes,
}


