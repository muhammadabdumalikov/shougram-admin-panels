import moment from 'moment';

class DateService {
  format(date: string | number | Date, format: string): string {
    return moment(date).format(format);
  }

  addDays(date: string | number | Date, amount: number): Date {
    return moment(date).add(amount, 'days').toDate();
  }

  addMonths(date: string | number | Date, amount: number): Date {
    return moment(date).add(amount, 'months').toDate();
  }

  addYears(date: string | number | Date, amount: number): Date {
    return moment(date).add(amount, 'years').toDate();
  }

  isSame(
    firstDate: string | number | Date,
    secondDate: string | number | Date,
  ): boolean {
    return moment(firstDate).isSame(secondDate);
  }

  isValid(date: string | number | Date, format?: string): boolean {
    return moment(date, format, true).isValid();
  }

  diff(
    firstDate: string | number | Date,
    secondDate: string | number | Date,
    unit: 'days' | 'months' | 'years',
  ): number {
    return moment(firstDate).diff(secondDate, unit);
  }

  toISOString(date: string | number | Date): string {
    return moment(date).toISOString();
  }
}

export default Object.freeze(new DateService());
