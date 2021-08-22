export default class EventFetcher {
  constructor(minBlocks = 2 ** 7, maxBlocks = 2 ** 10) {
    this.maxBlocks = maxBlocks;
    this.eventFetcher = new _EventFetcher(minBlocks);
  }
  async fetch(contract, event, fromBlock, toBlock, filter) {
    let events = [];
    while (fromBlock < toBlock - this.maxBlocks) {
      const batch = await this._fetch(contract, event, fromBlock, fromBlock + this.maxBlocks, filter);
      events = events.concat(batch);
      fromBlock += this.maxBlocks + 1;
    }
    const batch = await this._fetch(contract, event, fromBlock, toBlock, filter);
    return events.concat(batch);
  }
  async _fetch(contract, event, fromBlock, toBlock, filter) {
    return await this.eventFetcher.fetch(contract, event, fromBlock, toBlock, filter)
  }
}


export class _EventFetcher {
  constructor(minBlockBatch) {
    this.minBlockBatch = minBlockBatch;
  }
  async _fetch(contract, event, fromBlock, toBlock, filter) {
    if (toBlock - fromBlock < this.minBlockBatch)
      throw new Error(`Error fetching ${event} history`);
    return await this.fetch(contract, event, fromBlock, toBlock, filter);
  }
  async fetch(contract, event, fromBlock, toBlock, filter) {
    try {
      return await contract.getPastEvents(event, { fromBlock, toBlock, filter });
    } catch {
      const breakPoint = parseInt((fromBlock + toBlock) / 2);
      const batchFirst = await this._fetch(contract, event, fromBlock, breakPoint, filter);
      const batchSecond = await this._fetch(contract, event, breakPoint + 1, toBlock, filter);
      return batchFirst.concat(batchSecond);
    }
  }
}
