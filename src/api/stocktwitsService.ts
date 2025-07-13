import axios from 'axios';

export async function getStockTwitsMessageCount(symbol: string): Promise<number> {
  try {
    const url = `https://api.stocktwits.com/api/2/streams/symbol/${symbol}.json`;
    const response = await axios.get(url);
    const messages = response.data.messages;
    return Array.isArray(messages) ? messages.length : 0;
  } catch (error) {
    // Handle errors gracefully
    return 0;
  }
} 