import { Modal } from 'react-overlays';
import React from 'react';
import Rnd from 'react-rnd';

const ShadowLeft = () => (
  <div
    style={{
      position: 'absolute',
      width: '40%',
      height: 10,
      left: 12,
      bottom: 12,
      background: 'transparent',

      transform: 'skew(-5deg) rotate(-5deg)',

      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
      zIndex: -1,
    }}
  />
);


const ShadowRight = () => (
  <div
    style={{
      position: 'absolute',
      width: '40%',
      height: 10,
      right: 12,
      bottom: 12,
      background: 'transparent',

      transform: 'skew(5deg) rotate(5deg)',

      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
      zIndex: -1,
    }}
  />
);

const DraggableWindow = (
  { children, x = 0, y = 0, width = 300, height = 300, disableDragging },
) => (
  <Modal show>
    <div style={{ position: 'fixed', left: 0, top: 0, bottom: 0, right: 0 }}>
      <Rnd
        disableDragging={disableDragging}
        default={{
          x, y, width, height,
        }}
        style={{
          backgroundColor: 'white',
          padding: 20,
          boxShadow: '0 0 5px rgba(0, 0, 0, 0.2), inset 0 0 50px rgba(0, 0, 0, 0.1)',
        }}
      >
        <ShadowLeft />
        <ShadowRight />
        {children}

      </Rnd>
    </div>
  </Modal>
);


export default DraggableWindow;
