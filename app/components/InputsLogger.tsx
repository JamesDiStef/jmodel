'use client';
import { useEffect } from 'react';

type Props = {
  inputs: Record<string, string>[]
};

export default function InputsLogger({ inputs }: Props) {
  useEffect(() => {
    if (!inputs) return;
    console.log('Inputs (browser):', inputs);
  }, [inputs]);

  return null; // or render a small UI if desired
}
