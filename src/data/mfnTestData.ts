import { RecursivePartial, NodeOptions, EdgeOptions } from 'dagre-reactjs';

export const foreignObjects: {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
} = {
  nodes: [
    {
      id: '0',
      label: 'Scan for tests',
      meta: {
        description: 'run a scan on the test directory',
      },
      styles: {
        shape: {
          styles: { fill: '#fff', stroke: '#000', strokeWidth: '0' },
        },
        node: {
          padding: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          },
        },
        label: {},
      },
      labelType: 'foreign',
    },
    {
      id: '1',
      label: 'Scan for tests',
      meta: {
        description: 'run a scan on the test directory',
      },
      styles: {
        shape: {
          styles: { fill: '#fff', stroke: '#000', strokeWidth: '0' },
        },
        node: {
          padding: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          },
        },
        label: {},
      },
      labelType: 'foreign',
    },
    {
      id: '2',
      label: 'Add new tests',
      meta: {
        description: 'add the new test cases to the database',
      },
      styles: {
        shape: {
          styles: { fill: '#fff', stroke: '#000', strokeWidth: '0' },
        },
        node: {
          padding: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          },
        },
        label: {},
      },
      labelType: 'foreign',
    },
  ],
  edges: [
    {
      from: '0',
      to: '2',
      label: 'Execute in memory',
      labelType: 'foreign',
      meta: {
        description: 'I have no idea what to say about this so here is some text',
      },
    },
    {
      from: '1',
      to: '2',
      label: 'Execute in memory',
      labelType: 'foreign',
      meta: {
        description: 'I have no idea what to say about this so here is some text',
      },
    },
  ],
};
