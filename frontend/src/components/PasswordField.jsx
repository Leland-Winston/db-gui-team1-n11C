import React from 'react';

import { Hide, View } from 'grommet-icons';
import { Box, Button, TextInput } from 'grommet';

export const PasswordField = () => {
    const [value, setValue] = React.useState('');
    const [reveal, setReveal] = React.useState(false);

  return (
    <Box width="medium"
          direction="row"
          margin="none"
          align="center"
          round="small"
          border
          >
      <TextInput plain name="password" type={reveal ? 'text' : 'password'}
        value={value} onChange={(event) => setValue(event.target.value)}/>
      <Button
        icon={reveal ? <View size="medium" /> : <Hide size="medium" />}
        onClick={() => setReveal(!reveal)}
      />
    </Box>
  );
};
