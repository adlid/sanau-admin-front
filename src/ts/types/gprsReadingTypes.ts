import { DateType } from "./indication.types";

//gprs table
export type GPRSMainTableType = {
  deviceId: number;
  fixedAt: DateType;
  index: number;
  amperage: GPRSAmperageType;
  event: GPRSEventType;
  positiveActiveEnergy: GPRSEnergyType;
  positiveReactiveEnergy: GPRSEnergyType;
  power: GPRSPowerType;
  reverseActiveEnergy: GPRSEnergyType;
  reverseReactiveEnergy: GPRSEnergyType;
  voltage: GPRSVoltageType;
};

export type GRPSEventsTableItemType = {
  startFixedAt: DateType;
  endFixedAt: DateType;
  fixedAt: DateType;
  phaseA: number;
  phaseB: number;
  phaseC: number;
  totalActiveEnergyBefore: string;
  totalActiveEnergyAfter: string;
  meter: {
    id: string;
    deviceId: number;
  };
};

export type GPRSEventsTableType = {
  index: number;
  deviceId: number;
  magneticAttack: null | GRPSEventsTableItemType;
  overVoltage: null | GRPSEventsTableItemType;
  moduleCover: null | GRPSEventsTableItemType;
  tailCover: null | GRPSEventsTableItemType;
};

export type GPRSAmperageType = {
  diff: number;
  fixedAt: string;
  phaseA: null | number;
  phaseB: null | number;
  phaseC: null | number;
  type: string;
};

export type GPRSEventType = {
  coverCount: number;
  fixedAt: string;
  powerOffCount: number;
  powerOnCount: number;
  relay: boolean;
  type: string;
};

export type GPRSPowerType = {
  activePower: number;
  coefficient: number;
  diff: number;
  fixedAt: string;
  frequency: number;
  fullPower: number;
  reactivePower: number;
  type: string;
};

export type GPRSEnergyType = {
  diff: number;
  fixedAt: string;
  t1: number;
  t2: number;
  t3: number;
  t4: number;
  total: number;
  type: string;
};

export type GPRSVoltageType = {
  diff: number;
  fixedAt: string;
  phaseA: number;
  phaseB: number;
  phaseC: number;
  type: string;
};

//gprs graph

export type GPRSGraphType = {
  deviceId: number;
  fixedAt: DateType;
  amperage: GPRSGraphItem;
  positiveActiveEnergy: GPRSGraphItem;
  positiveReactiveEnergy: GPRSGraphItem;
  power: GPRSGraphItem;
  reverseActiveEnergy: GPRSGraphItem;
  reverseReactiveEnergy: GPRSGraphItem;
  voltage: GPRSGraphItem;
};

type GPRSGraphItem = {
  fixedAt: DateType;
  value: number;
  phaseA: number;
  phaseB: number;
  phaseC: number;
};

export type OtanCurrentTableType = {
  deviceId: number;
  meterId: string;
  fixedAt: DateType;
  positiveActiveEnergy: null | {
    positiveActiveEnergyPhaseA: number;
    positiveActiveEnergyPhaseB: number;
    positiveActiveEnergyPhaseC: number;
  };
  negativeActiveEnergy: null | {
    negativeActiveEnergyPhaseA: number;
    negativeActiveEnergyPhaseB: number;
    negativeActiveEnergyPhaseC: number;
  };
  positiveReactiveEnergy: null | {
    positiveReactiveEnergyPhaseA: number;
    positiveReactiveEnergyPhaseB: number;
    positiveReactiveEnergyPhaseC: number;
  };
  negativeReactiveEnergy: null | {
    negativeReactiveEnergyPhaseA: number;
    negativeReactiveEnergyPhaseB: number;
    negativeReactiveEnergyPhaseC: number;
  };
  voltage: null | {
    voltagePhaseA: number;
    voltagePhaseB: number;
    voltagePhaseC: number;
  };
  current: null | {
    currentPhaseA: number;
    currentPhaseB: number;
    currentPhaseC: number;
  };
  totalActivePower: null | { totalActivePower: number };
  totalReactivePower: null | { totalReactivePower: number };
};

export type NewOtanCurrentTableType = {
  data: {
    data: Array<OtanCurrentTableType>
    elementsSize: number
    hasNext: boolean
    page: number
    size: number
    totalElementsOnPage: number
    totalPage: number
  }
  deviceName: number
}

export type OtanHourlyTableType = {
  deviceId: number;
  meterId: string;
  fixedAt: DateType;
  positiveActiveEnergy: null | {
    positiveActiveI: number;
    positiveActiveIV: number;
    positiveActiveTotal: number;
  };
  reverseActiveEnergy: null | {
    reverseActiveII: number;
    reverseActiveIII: number;
    reverseActiveTotal: number;
  };
  positiveReactiveEnergy: null | {
    positiveReactiveI: number;
    positiveReactiveII: number;
    positiveReactiveTotal: number;
  };
  reverseReactiveEnergy: null | {
    reverseReactiveIV: number;
    reverseReactiveIII: number;
    reverseReactiveTotal: number;
  };
};

export type NewOtanHourlyTableType = {
  data: {
    data: Array<OtanHourlyTableType>
    elementsSize: number
    hasNext: boolean
    page: number
    size: number
    totalElementsOnPage: number
    totalPage: number
  }
  deviceName: number
}

export type OtanDailyTableType = {
  deviceId: number;
  meterId: string;
  fixedAt: DateType;
  positiveActiveEnergy: null | {
    t1: number;
    t2: number;
    t3: number;
    t4: number;
    total: number;
  };
  reverseActiveEnergy: null | {
    t1: number;
    t2: number;
    t3: number;
    t4: number;
    total: number;
  };
  positiveReactiveEnergy: null | {
    t1: number;
    t2: number;
    t3: number;
    t4: number;
    total: number;
  };
  reverseReactiveEnergy: null | {
    t1: number;
    t2: number;
    t3: number;
    t4: number;
    total: number;
  };
};

export type NewOtanDailyTableType = {
  data: {
    data: Array<OtanDailyTableType>
    elementsSize: number
    hasNext: boolean
    page: number
    size: number
    totalElementsOnPage: number
    totalPage: number
  }
  deviceName: number
}

export type OtanGraphType = {
  amperage: GPRSGraphItem;
  positiveActiveEnergy: GPRSGraphItem;
  positiveReactiveEnergy: GPRSGraphItem;
  power: GPRSGraphItem;
  reverseActiveEnergy: GPRSGraphItem;
  reverseReactiveEnergy: GPRSGraphItem;
  voltage: GPRSGraphItem;
  fixedAt: DateType;
  deviceId: number;
};

export type NewOtanGraphType = {
  data: Array<OtanGraphType>
  deviceName: number
}

export type GPRSTableResponse = {
  deviceName: number
  data: {
    page: number,
    size: number,
    hasNext: boolean,
    totalPage: number,
    totalElementsOnPage: number,
    elementsSize: number,
    data: Array<GPRSMainTableType>
  }
}

export type GPRSGraphResponse = {
  deviceName: number
  data: Array<GPRSGraphType>
}