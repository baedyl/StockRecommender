import {
  formatDateForVerticalChart,
  formatDateForChartLabels,
  formatDateForHorizontalDisplay,
  formatDateForFullDisplay,
  getMonthName,
  formatDateWithMonthName,
} from '../src/utils/dateUtils';

describe('Date Utils', () => {
  describe('formatDateForVerticalChart', () => {
    it('should format date for truly vertical chart display', () => {
      expect(formatDateForVerticalChart('2024-01-15')).toBe('0\n1\n1\n5');
      expect(formatDateForVerticalChart('2024-12-31')).toBe('1\n2\n3\n1');
      expect(formatDateForVerticalChart('2024-03-07')).toBe('0\n3\n0\n7');
    });

    it('should handle different date formats', () => {
      expect(formatDateForVerticalChart('2024-01-01')).toBe('0\n1\n0\n1');
      expect(formatDateForVerticalChart('2024-10-10')).toBe('1\n0\n1\n0');
    });
  });

  describe('formatDateForChartLabels', () => {
    it('should format date for chart labels with minimal vertical space', () => {
      expect(formatDateForChartLabels('2024-01-15')).toBe('01\n15');
      expect(formatDateForChartLabels('2024-12-31')).toBe('12\n31');
      expect(formatDateForChartLabels('2024-03-07')).toBe('03\n07');
    });

    it('should handle different date formats', () => {
      expect(formatDateForChartLabels('2024-01-01')).toBe('01\n01');
      expect(formatDateForChartLabels('2024-10-10')).toBe('10\n10');
    });
  });

  describe('formatDateForHorizontalDisplay', () => {
    it('should format date for horizontal display', () => {
      expect(formatDateForHorizontalDisplay('2024-01-15')).toBe('01/15');
      expect(formatDateForHorizontalDisplay('2024-12-31')).toBe('12/31');
      expect(formatDateForHorizontalDisplay('2024-03-07')).toBe('03/07');
    });
  });

  describe('formatDateForFullDisplay', () => {
    it('should return the full date string', () => {
      expect(formatDateForFullDisplay('2024-01-15')).toBe('2024-01-15');
      expect(formatDateForFullDisplay('2024-12-31')).toBe('2024-12-31');
    });
  });

  describe('getMonthName', () => {
    it('should return correct month abbreviations', () => {
      expect(getMonthName('01')).toBe('Jan');
      expect(getMonthName('02')).toBe('Feb');
      expect(getMonthName('03')).toBe('Mar');
      expect(getMonthName('04')).toBe('Apr');
      expect(getMonthName('05')).toBe('May');
      expect(getMonthName('06')).toBe('Jun');
      expect(getMonthName('07')).toBe('Jul');
      expect(getMonthName('08')).toBe('Aug');
      expect(getMonthName('09')).toBe('Sep');
      expect(getMonthName('10')).toBe('Oct');
      expect(getMonthName('11')).toBe('Nov');
      expect(getMonthName('12')).toBe('Dec');
    });

    it('should handle invalid month numbers', () => {
      expect(getMonthName('13')).toBe('13');
      expect(getMonthName('00')).toBe('00');
    });
  });

  describe('formatDateWithMonthName', () => {
    it('should format date with month names', () => {
      expect(formatDateWithMonthName('2024-01-15')).toBe('Jan\n15');
      expect(formatDateWithMonthName('2024-12-31')).toBe('Dec\n31');
      expect(formatDateWithMonthName('2024-03-07')).toBe('Mar\n07');
    });
  });
}); 