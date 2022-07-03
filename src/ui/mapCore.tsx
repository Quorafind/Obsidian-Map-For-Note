import * as React from 'react';
import useState from 'react-usestateref';
import { DagreReact, NodeOptions, EdgeOptions, RecursivePartial } from 'dagre-reactjs';
import { Foreign } from './mfnNode';
import '../less/index.less';
import { Size } from 'dagre-reactjs';

interface Props {
  nodes: Array<RecursivePartial<NodeOptions>>;
  edges: Array<RecursivePartial<EdgeOptions>>;
}

const DEFAULT_NODE_CONFIG = {
  styles: {
    node: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
    shape: {},
    label: {},
  },
};

const MapCoreComponent: React.FC<Props> = (props) => {
  const [, setNodes, nodesRef] = useState(props.nodes);
  const [, setEdges, edgesRef] = useState(props.edges);
  const [, setStage, stageRef] = useState(1);
  React.useEffect(() => {
    setNodes(props.nodes);
    setEdges(props.edges);
    setStage(stageRef.current + 1);
  }, [props.nodes, props.edges]);

  const customNodeLabels = {
    foreign: {
      renderer: Foreign,
      html: true,
    },
  };

  const svgSet = (width: number, height: number) => {
    setTimeout(() => {
      const svg = document.getElementById('schedule');
      // svg.setAttribute('width', width + 'px');
      // svg.setAttribute('height', height + 'px');
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    }, 100);
    // svg.setAttribute('viewBox', `${x} ${bbox.y} ${bbox.width} ${bbox.height}`);
  };

  return (
    <>
      <div className="mfn-place-content-center mfn-ml-auto mfn-mr-auto mfn-scroll-auto mfn-block">
        <svg id="schedule" className="mfn-w-2/3 mfn-h-2/3 mfn-mr-auto mfn-scroll-auto">
          <DagreReact
            nodes={nodesRef.current}
            edges={edgesRef.current}
            customNodeLabels={customNodeLabels}
            defaultNodeConfig={DEFAULT_NODE_CONFIG}
            stage={stageRef.current}
            graphLayoutComplete={(width, height) => svgSet(width, height)}
            graphOptions={{
              marginx: 15,
              marginy: 15,
              rankdir: 'TB',
              ranksep: 55,
              nodesep: 35,
            }}
          />
        </svg>
      </div>
    </>
  );
};

export default MapCoreComponent;
