'use client';
import { useState } from 'react';
import { RadioGroup, Radio } from '@mantine/core';

export function FoodCategory() {
  const [value, setValue] = useState('fruits');

  return (
    <RadioGroup value={value} onChange={setValue} required>
      <Radio value="fruits" label="Fruits" mb={2} />
      <Radio value="veg" label="Veg" mb={2} />
      <Radio value="non-veg" label="Non-Veg" mb={2} />
      <Radio value="none" label="None" />
    </RadioGroup>
  );
}
