

export type ConnectPowerMeterBluetoothType = {
    serialNumber: string,
    type: string,
    personalAccountNumber: string,
    roleName: string,
    firstname: string,
    lastname: string,
    fathersname: string,
    organizationName: string,
    phoneNumber: string,
    email: string,
    position: string,
    city: string,
    district: string,
    street: string,
    house: string,
    flat: string
}


export type GetBluetoothResponseBody = {
    serialNumber: string, 
    type: string,
    meterId: string,
    setUpOrganization: string, 
    manufacturer: string, 
    userInfo: personalAccountInitialValuesType
} 



export type EditPowerMeterBluetoothType = {
    meterId: string
    setUpOrganization: string, 
    manufacturer: string,
    serialNumber: string,
    type: string,
    personalAccountNumber: string,
    roleName: string,
    firstname: string,
    lastname: string,
    fathersname: string,
    organizationName: string,
    phoneNumber: string,
    email: string,
    position: string,
    city: string,
    district: string,
    street: string,
    house: string,
    flat: string
}



export type personalAccountInitialValuesType = {
    personalAccountNumber: string
    roleName: string,
    firstname: string
    lastname: string
    fathersname: string
    organizationName: string
    phoneNumber: string
    email: string
    position: string
    city: string
    district: string
    street: string
    house: string
    flat: string
}



