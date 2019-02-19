import { Button } from '@material-ui/core';
import React from 'react';

export default ({ given }) => {
  return <div>
    {
      given.map( x =>
        <Button variant='contained' color='primary'
          key={x.name}
        >
          { x.name }
        </Button>
      )
    }
  </div>
}
