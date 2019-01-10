//

import React from 'react';
import { Container, Dropdown } from 'semantic-ui-react'
import { sctg_options } from '../Data/sctgOptions';


const control_style = { zIndex: 10, position: 'absolute', top: '20px', left: '10px', border: '1px solid grey',
  borderRadius: '5px'};

export const ControlBox = () => {
  return <Container style={control_style}>
    <div style={{width: '300px', padding: '5px'}}>
      <Dropdown
        clearable
        fluid
        multiple
        search
        selection
        options={sctg_options}
        placeholder='Select Category'
        value={[]}
      />
    </div>
  </Container>
};

