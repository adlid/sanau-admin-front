type ReleHistoryState = {
  history: {
    action: string;
    deviceName: string;
    fixedAt: string;
    id: string;
    login: string;
  }[] | null;
};

export const releHistoryState: ReleHistoryState = {
  history: null,
};
