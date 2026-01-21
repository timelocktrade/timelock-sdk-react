import type {Address, Hex} from 'viem';

export type MintPerpBody = {
  marketAddr: Address;
  optionType: 'CALL' | 'PUT';
  amount: bigint;
  duration: number;
  strikeTick: number;
};

export type ExercisePerpBody = {
  marketAddr: Address;
  optionId: bigint;
  liquidities: bigint[];
};

export class PerpsOperator {
  #readUrl: string;
  #writeUrl: string;
  auth?: {message: string; signature: Hex};

  constructor(readUrl: string, writeUrl: string) {
    this.#readUrl = readUrl;
    this.#writeUrl = writeUrl;
  }

  #request = async <T>(baseUrl: string, path: string, body?: unknown) => {
    const url = new URL(path, baseUrl);
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
      console.error(error);
      throw new Error(`${res.status} ${res.statusText}: ${resText}`);
    }
  };

  #readRequest = async <T>(path: string, body?: unknown) => {
    try {
      return await this.#request<T>(this.#readUrl, path, body);
    } catch {
      return await this.#request<T>(this.#writeUrl, path, body);
    }
  };

  #writeRequest = async <T>(path: string, body?: unknown) => {
    return this.#request<T>(this.#writeUrl, path, body);
  };

  getOperatorAddresses = async (): Promise<Address[]> => {
    const {addresses} = await this.#readRequest<{addresses: Address[]}>(
      'api/operator/addresses',
    );
    return addresses;
  };

  getUserPerps = async (
    userAddr: Address,
    marketAddr?: Address,
    type?: 'active' | 'closed',
    offset = 0,
    limit = 1000,
  ) => {
    const params = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
    });
    if (type) params.append('type', type);
    if (marketAddr) params.append('marketAddr', marketAddr);

    const url = `api/positions/${userAddr}?${params.toString()}`;

    const data = await this.#readRequest<
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
  };

  genAuthMessage = async (userAddr: Address): Promise<string> => {
    const {message} = await this.#writeRequest<{message: string}>(
      'api/auth/gen',
      {
        userAddr,
      },
    );
    return message;
  };

  validateAuthMessage = async (message: string, signature: Hex) => {
    const {address, createdAt, validUntil} = await this.#writeRequest<{
      address: Address;
      createdAt: number;
      validUntil: number;
    }>('api/auth/validate', {message, signature});
    return {address, createdAt, validUntil};
  };

  setAuth = (message: string, signature: Hex) => {
    this.auth = {message, signature};
  };

  mintPerp = async (body: MintPerpBody) => {
    if (!this.auth) {
      throw new Error(
        'Authentication required. Call setAuth() with authMessage and signature before exercising perps.',
      );
    }
    const {txHash, optionId} = await this.#writeRequest<{
      txHash: Hex;
      optionId: string;
    }>('api/positions/mint', {
      ...body,
      amount: body.amount.toString(),
      auth: this.auth,
    });
    return {txHash, optionId: BigInt(optionId)};
  };

  exercisePerp = async (body: ExercisePerpBody) => {
    if (!this.auth) {
      throw new Error(
        'Authentication required. Call setAuth() with authMessage and signature before exercising perps.',
      );
    }
    const {txHash, optionId} = await this.#writeRequest<{
      txHash: Hex;
      optionId: string;
    }>('api/positions/exercise', {
      ...body,
      optionId: body.optionId.toString(),
      liquidities: body.liquidities.map(l => l.toString()),
      auth: this.auth,
    });
    return {txHash, optionId: BigInt(optionId)};
  };
}
