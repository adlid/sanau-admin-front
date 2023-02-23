export const changedToSend = (data) => {
  return data?.map((item) => {
    const { iconName, ...rest } = item;
    return {
      ...rest,
      icon: item.iconName || item.icon,
      title: item.titleName || item.title,
      children: item.children ? changedToSend(item.children) : [],
    };
  });
};
