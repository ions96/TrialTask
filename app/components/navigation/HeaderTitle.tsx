import React from 'react';
import Text from '@component/Text';
import Box from '@component/Box';

export default function HeaderTitle({title = ''}: {title?: string}) {
  return (
    <Box flex={1}>
      <Text variant="headerMedium" numberOfLines={1}>
        {title}
      </Text>
    </Box>
  );
}
