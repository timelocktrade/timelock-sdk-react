import type {Address, Hex} from 'viem';
import {useEffect} from 'react';
import {useAccount, useSignMessage} from 'wagmi';
import {z} from 'zod';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useTimelockConfig} from '~/providers/TimelockProvider';

const ZHex = z
  .string()
  .regex(/^0x[a-fA-F0-9]+$/, 'Invalid hex string')
  .transform(v => v as Hex);

const ZSavedSignature = z.object({
  signature: ZHex,
  message: z.string(),
});

const getSavedSignature = (userAddr: Address) => {
  const key = `perps-auth-${userAddr.toLowerCase()}`;
  const raw = localStorage.getItem(key);
  if (!raw) return;

  try {
    return ZSavedSignature.parse(JSON.parse(raw));
  } catch (error) {
    clearSignature(userAddr);
    throw new Error('Invalid stored signature: ' + raw);
  }
};

const saveSignature = (userAddr: Address, message: string, signature: Hex) => {
  const key = `perps-auth-${userAddr.toLowerCase()}`;
  const data = JSON.stringify({message, signature});
  localStorage.setItem(key, data);
};

const clearSignature = (userAddr: Address) => {
  const key = `perps-auth-${userAddr.toLowerCase()}`;
  localStorage.removeItem(key);
};

export const usePerpsOperator = () => {
  const {address: userAddr} = useAccount();
  const {perpsOperatorUrl, perpsOperator: operator} = useTimelockConfig();
  const {signMessageAsync} = useSignMessage();

  const {data: address} = useQuery({
    queryKey: ['perpsOperatorAddr', perpsOperatorUrl || '--'],
    queryFn: () => operator?.getOperatorAddr(),
    staleTime: 10000,
    refetchInterval: 10000,
    enabled: !!operator,
  });

  const validateAndSetAuth = async (message: string, signature: Hex) => {
    if (!operator || !userAddr) return;

    try {
      const {address, validUntil} = await operator.validateAuthMessage(
        message,
        signature,
      );
      if (validUntil < Date.now()) {
        throw new Error('Signature expired');
      }
      if (address.toLowerCase() !== userAddr.toLowerCase()) {
        throw new Error('Valid signature but different user address');
      }
      operator.setAuth(message, signature);
    } catch (error) {
      clearSignature(userAddr);
      console.error(error);
    }
  };

  useEffect(() => {
    if (!userAddr || !operator) return;

    const sig = getSavedSignature(userAddr);
    if (!sig) return;

    void validateAndSetAuth(sig.message, sig.signature);
  }, [userAddr, operator]);

  const signMessage = useMutation({
    mutationFn: async () => {
      if (!operator) throw new Error('Operator not initialized');
      if (!userAddr) throw new Error('Wallet not connected');

      const message = await operator.genAuthMessage(userAddr);
      const signature = await signMessageAsync({message});

      saveSignature(userAddr, message, signature);
      operator.setAuth(message, signature);
    },
  });

  return {operator, address, signMessage};
};
