import * as React from 'react';
import { CustomNodeLabelProps } from 'dagre-reactjs';
import { replaceMd } from '../utils/obInternalLink';
import { Platform } from 'obsidian';

export const Foreign: React.FC<CustomNodeLabelProps> = ({ node }) => {
  const boxMouseOverHandler = (e: React.MouseEvent<HTMLDivElement>, label: string) => {
    // const box: HTMLDivElement = event.currentTarget;
    // box.style.backgroundColor = 'lightblue';
    const targetEl = e.target as HTMLElement;

    if (!e.ctrlKey && !e.metaKey) return;

    if (targetEl.tagName !== 'A') return;

    if (targetEl.hasClass('internal-link')) {
      app.workspace.trigger('hover-link', {
        event: e,
        source: 'map-for-note-view',
        hoverParent: targetEl.parentElement,
        targetEl,
        linktext: targetEl.getAttr('href'),
        sourcePath: app.metadataCache.getFirstLinkpathDest(decodeURIComponent(label), '').path,
      });
    }
  };

  // This function will be triggered when the mouse pointer is moving out the box
  // const boxMouseOutHandler = (event: React.MouseEvent<HTMLDivElement>) => {
  //   const box: HTMLDivElement = event.currentTarget;
  //   box.style.backgroundColor = 'lightgreen';
  // };

  const onClickEvent = (e: React.MouseEvent<HTMLDivElement>, label: string): void => {
    const file = app.metadataCache.getFirstLinkpathDest('', label);
    let leaf;
    if (!Platform.isMobile) {
      leaf = app.workspace.splitActiveLeaf();
    } else {
      leaf = app.workspace.activeLeaf;
      if (leaf === null) {
        leaf = app.workspace.getLeaf(true);
      }
    }
    leaf.openFile(file);
    return;
  };

  return (
    <div
      style={{
        borderRadius: '5px',
        borderWidth: '2px 2px 2px 10px',
        borderColor: '#000',
        borderStyle: 'solid',
        maxWidth: '200px',
        minWidth: '180px',
        padding: '10px 10px',
        backgroundColor: '#868686',
      }}
    >
      {/*<div style={{ fontWeight: 'bold' }}>{node.label}</div>*/}
      {/*<div style={{ fontSize: '10px' }}>{node.meta.description}</div>*/}
      <div
        onMouseOver={(e) => boxMouseOverHandler(e, node.label)}
        onClick={(e) => onClickEvent(e, node.label)}
        dangerouslySetInnerHTML={{ __html: replaceMd(node.label, node.label) }}
      ></div>
    </div>
  );
};
