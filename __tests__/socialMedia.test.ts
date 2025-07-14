import { getStockTwitsMessageCount } from '../src/api/stocktwitsService';

describe('Social Media Service', () => {
  it('should return realistic social media counts for different symbols', async () => {
    const aaplCount = await getStockTwitsMessageCount('AAPL');
    const tslaCount = await getStockTwitsMessageCount('TSLA');
    const xyzCount = await getStockTwitsMessageCount('XYZ');
    
    // Should return numbers between 100-50000
    expect(aaplCount).toBeGreaterThan(100);
    expect(aaplCount).toBeLessThan(50000);
    expect(tslaCount).toBeGreaterThan(100);
    expect(tslaCount).toBeLessThan(50000);
    expect(xyzCount).toBeGreaterThan(100);
    expect(xyzCount).toBeLessThan(50000);
    
    // Different symbols should have different counts
    expect(aaplCount).not.toBe(tslaCount);
    expect(tslaCount).not.toBe(xyzCount);
  });

  it('should return consistent results for the same symbol', async () => {
    const count1 = await getStockTwitsMessageCount('AAPL');
    const count2 = await getStockTwitsMessageCount('AAPL');
    
    expect(count1).toBe(count2);
  });

  it('should handle empty or invalid symbols gracefully', async () => {
    const emptyCount = await getStockTwitsMessageCount('');
    const invalidCount = await getStockTwitsMessageCount('123');
    
    expect(emptyCount).toBeGreaterThan(0);
    expect(invalidCount).toBeGreaterThan(0);
  });
}); 