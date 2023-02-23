export type RegistrationTypes = {
    lastname: string
    firstname: string
    fathersname: string
    personalAccountNumber: string
    phoneNumber: string
    email: string
    password: string
    personalInformation: boolean,
    agree: boolean,  // for report  
}

export type RegistrationStep2Type = {
    phoneNumber: string,
    code: number
}


export type PasswordValidatorsType = {
    oneDigit: boolean
    upperCase: boolean
    minLength: boolean
    latinLetters: boolean
}

