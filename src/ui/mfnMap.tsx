import * as React from 'react';
import { useCallback, useEffect } from 'react';
import { findPath } from '../data/mapCal';
import '../less/index.less';
import MapCoreComponent from './mapCore';
import { Notice, TFile } from 'obsidian';
import { FileSuggest } from './file-suggest';
import useState from 'react-usestateref';

interface Props {}

function testStartAndEnd(start: string, end: string) {
  if (start === end) return false;
  const startFile = app.metadataCache.getFirstLinkpathDest(start, '');
  const endFile = app.metadataCache.getFirstLinkpathDest(end, '');
  if (startFile instanceof TFile && endFile instanceof TFile) return true;
  else return false;
}

function unique(arr, key) {
  if (!arr) return arr;
  if (key === undefined) return [...new Set(arr)];
  const map = {
    string: (e) => e[key],
    function: (e) => key(e),
  };
  const fn = map[typeof key];
  const obj = arr.reduce((o, e) => ((o[fn(e)] = e), o), {});
  return Object.values(obj);
}

const NoteMap: React.FC<Props> = () => {
  const inputStartRef = React.useRef();
  const inputEndRef = React.useRef();
  const [start, setStart, startRef] = useState('');
  const [end, setEnd, endRef] = useState('');
  const [data, setData] = useState({
    nodes: [],
    edges: [],
  });

  useEffect(() => {
    setTimeout(() => {
      new FileSuggest(app, inputStartRef.current);
      new FileSuggest(app, inputEndRef.current);
    }, 1000);
  }, []);

  const handleStartInput = useCallback((e) => {
    setStart(e.target.value);
  }, []);

  const handleEndInput = useCallback((e) => {
    setEnd(e.target.value);
  }, []);

  const calResult = async () => {
    if (inputStartRef.current?.value != start && inputStartRef.current?.value.length > 0) {
      setStart(inputStartRef.current?.value);
    }
    if (inputEndRef.current?.value != start && inputEndRef.current?.value.length > 0) {
      setEnd(inputEndRef.current?.value);
    }
    if (!testStartAndEnd(startRef.current, endRef.current)) {
      new Notice('Wrong Nodes');
      return;
    }
    const data = await findPath(startRef.current, endRef.current);

    console.log(data);
    if (data.length === 0) {
      new Notice('No Paths between Two Nodes');
      return;
    }
    const tempNodes = [];
    const tempEdges = [];
    data.forEach((path) => {
      path.map((v) => {
        tempNodes.push({
          id: v.value,
          label: v.value,
          meta: {
            description: '',
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
        });
      });
      for (let i = 0; i < path.length - 1; i++) {
        const source = path[i].value;
        const target = path[parseInt(String(i)) + 1].value;
        tempEdges.push({
          from: source,
          to: target,
        });
      }
    });
    const uniqueNodes = unique(tempNodes, 'id');
    const uniqueEdges = tempEdges.filter(function (a) {
      const key = a.from + '|' + a.to;
      if (!this[key]) {
        this[key] = true;
        return true;
      }
    }, Object.create(null));
    setData({
      nodes: uniqueNodes,
      edges: uniqueEdges,
    });
  };

  return (
    <div className="mfn-w-full mfn-h-full mfn-pt-8 mfn-bg-paper-like ">
      <div className="mfn-h-32 mfn-w-96 mfn-ml-auto mfn-mr-auto mfn-rounded-lg mfn-shadow-xl mfn-flex mfn-flex-row mfn-justify-between bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 mfn-bg-slate-100 Note-Map-View-Container">
        <div className="Note-Map-View-Input mfn-flex mfn-flex-col mfn-justify-around">
          <div className="mfn-flex mfn-flex-row mfn-justify-center mfn-ml-6">
            <p className="mfn-pt-1">起始</p>
            <input ref={inputStartRef} className="mfn-ml-2" defaultValue={start} onChange={handleStartInput} />
          </div>
          <div className="mfn-flex mfn-flex-row mfn-justify-center mfn-ml-6">
            <p className="mfn-pt-1">终点</p>
            <input ref={inputEndRef} className="mfn-ml-2" defaultValue={end} onChange={handleEndInput} />
          </div>
        </div>
        <div className="Note-Mao-View-Button mfn-flex mfn-flex-col">
          <button
            className="mfn-bg-gray-100 mfn-w-24 mfn-h-8 mfn-mt-4 mfn-mr-6 mfn-rounded-lg mfn-shadow-md mfn-hover:mfn-bg-cyan-100"
            onClick={calResult}
          >
            计算路程
          </button>
        </div>
      </div>
      <div className="mfn-h-3/4 mfn-w-3/4 mfn-ml-auto mfn-mr-auto mfn-mt-12 mfn-mb-16 mfn-bg-slate-100 mfn-rounded-lg mfn-shadow-xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60">
        <MapCoreComponent nodes={data.nodes} edges={data.edges} />
      </div>
    </div>
  );
};

export default NoteMap;
