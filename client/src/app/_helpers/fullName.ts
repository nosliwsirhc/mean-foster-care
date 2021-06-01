export const fullName = (
  nameGiven: string,
  nameMiddle: string | null,
  nameFamily: string
) => {
  if (nameGiven && !nameMiddle && !nameFamily) return nameGiven;
  if (nameGiven && !nameMiddle && nameFamily)
    return nameGiven + ' ' + nameFamily;
  if (nameGiven && nameMiddle && nameFamily)
    return nameGiven + ' ' + nameMiddle + ' ' + nameFamily;
  if (nameGiven && nameMiddle) return nameGiven + ' ' + nameMiddle;
  if (!nameGiven && !nameMiddle && nameFamily) return nameFamily;
  return 'Jane Doe';
};
