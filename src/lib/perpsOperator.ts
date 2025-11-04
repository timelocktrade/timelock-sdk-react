import type {Address} from 'viem';

export type MintPerpBody = {
  marketAddr: Address;
  userAddr: Address;
  optionType: 'CALL' | 'PUT';
  amount: bigint;
  duration: number;
  strikeTick: number;
};

export type ExercisePerpBody = {
  userAddr: Address;
  marketAddr: Address;
  optionId: bigint;
  liquidities: bigint[];
};

export class PerpsOperator {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async #request<T>(path: string, body?: unknown) {
    const url = new URL(path, this.baseUrl);
    const res = await fetch(url, {
      method: body ? 'POST' : 'GET',
      headers: {
        Connection: 'keep-alive',
        'Content-Type': 'application/json',
        'Keep-Alive': 'timeout=120',
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.ok) {
      const {data} = (await res.json()) as {data: T};
      return data;
    }
    const resText = await res.text();

    try {
      const error = JSON.parse(resText) as {error: string};
      throw new Error(`${res.status} ${res.statusText}: ${error.error}`);
    } catch (error) {
      throw new Error(`${res.status} ${res.statusText}: ${resText}`);
    }
  }

  async getOperatorAddr(): Promise<Address> {
    const {address} = await this.#request<{address: Address}>(
      'api/operator/address',
    );
    return address;
  }

  async getUserPerps(
    userAddr: Address,
    marketAddr?: Address,
    type?: 'active' | 'closed',
    offset = 0,
    limit = 1000,
  ) {
    const params = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
    });
    if (type) params.append('type', type);
    if (marketAddr) params.append('marketAddr', marketAddr);

    const url = `api/positions/${userAddr}?${params.toString()}`;

    const data = await this.#request<
      {
        id: string;
        ownerAddr: Address;
        marketAddr: Address;
        optionId: string;
        perpDuration: number;
        expiresAt: number;
        closed: boolean;
      }[]
    >(url);

    return data.map(p => ({...p, optionId: BigInt(p.optionId)}));
  }

  async mintPerp(body: MintPerpBody) {
    const {txHash, optionId} = await this.#request<{
      txHash: string;
      optionId: string;
    }>('api/positions/mint', {...body, amount: body.amount.toString()});

    return {txHash, optionId: BigInt(optionId)};
  }

  async exercisePerp(body: ExercisePerpBody) {
    const {txHash, optionId} = await this.#request<{
      txHash: string;
      optionId: string;
    }>('api/positions/exercise', {
      ...body,
      optionId: body.optionId.toString(),
      liquidities: body.liquidities.map(l => l.toString()),
    });
    return {txHash, optionId: BigInt(optionId)};
  }
}
