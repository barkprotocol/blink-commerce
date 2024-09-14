export function isWithinLastDays(date: Date, days: number): boolean {
    const now = new Date();
    const comparisonDate = new Date(date);
    comparisonDate.setDate(comparisonDate.getDate() + days);
    return now <= comparisonDate;
  }
  