import React from 'react';
import { Button } from '@mantine/core';
import Link from 'next/link';
import { IconExternalLink } from '@tabler/icons-react';

const AtlasDataDictionaryButton = () => (
  <div
    className='atlas-data-dictionary-button'
    data-testid='atlas-data-dictionary-button'
  >
    <Link
      href='/analysis/AtlasDataDictionary'
      target='_blank'
      rel='noopener noreferrer'
      data-testid='atlas-data-dictionary-link'
    >
      <Button
        variant="outline"
        rightSection={<IconExternalLink size={14} />}
      >
        Atlas Data Dictionary
      </Button>
    </Link>
  </div>
);

export default AtlasDataDictionaryButton;
