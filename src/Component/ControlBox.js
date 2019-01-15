//

import React from 'react';
import { Container, Dropdown } from 'semantic-ui-react'
import { sctg_options } from '../Data/sctgOptions';

import './styling.css';

const control_style = { zIndex: 10, position: 'absolute', top: '20px', left: '10px'};

export const ControlBox = ({selected_sctg, toggleSctg, togglePaint}) => {
  return <Container style={control_style}>
    <div style={{width: '400px', padding: '5px', fontSize: '10px'}}>
      <Dropdown
        clearable
        fluid
        multiple
        selection
        options={sctg_options}
        placeholder='Select Category'
        value={selected_sctg}
        onChange={toggleSctg}
        onClose={()=>togglePaint(selected_sctg)}
      />
    </div>
  </Container>
};

