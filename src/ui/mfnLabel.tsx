import * as React from 'react';
import { CustomEdgeLabelProps } from 'dagre-reactjs';

export const ForeignLabel: React.FC<CustomEdgeLabelProps> = ({ edgeMeta }) => {
  return (
    <div
      style={{
        color: '#8b0000',
        minWidth: '200px',
      }}
    >
      <div className="edge-label">{edgeMeta.label}</div>
      <div className="edge-description">{edgeMeta.meta.description}</div>
    </div>
  );
};
