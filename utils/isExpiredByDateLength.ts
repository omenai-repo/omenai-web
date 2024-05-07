function isExpiredByDateLength(databaseDate: Date, length: number): boolean {
  const currentDate = new Date();
  const differenceInTime = currentDate.getTime() - databaseDate.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  return differenceInDays >= length;
}
