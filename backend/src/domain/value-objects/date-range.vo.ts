export class DateRange {
  constructor(
    public readonly startDate: Date,
    public readonly endDate: Date
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.startDate || !this.endDate) {
      throw new Error('Start date and end date are required');
    }
    if (this.startDate > this.endDate) {
      throw new Error('Start date must be before end date');
    }
    const diffDays = Math.ceil((this.endDate.getTime() - this.startDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays > 365) {
      throw new Error('Date range cannot exceed 365 days');
    }
  }

  toSQLCondition(): string {
    return `order_purchase_timestamp BETWEEN '${this.startDate.toISOString()}' AND '${this.endDate.toISOString()}'`;
  }
}