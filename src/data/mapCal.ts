import { Graph, GraphEdge, GraphVertex } from '../utils';
import { skipMOCs, useBackLinks, useForwardLinks } from '../mapForNoteComponent';

export const getPathsFromVertex = (startNode: GraphVertex, endNode: GraphVertex, sg: Graph): GraphVertex[][] => {
  const pathIterator = sg.findAllPath(startNode, endNode);
  return Array.from(pathIterator);
};

const setMap = async (): Promise<Graph> => {
  //Get All Resolved Links From Obsidian
  const resolvedLinks = app.metadataCache.resolvedLinks;

  // configure directed true/false
  const sg = new Graph();

  for (const key in resolvedLinks) {
    //Get Resolved Links By Specific Note
    const valueMap = resolvedLinks[key];

    //Get MOC links
    let outboundLinkCounter = 0;
    if (skipMOCs) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const linkKey in valueMap) {
        outboundLinkCounter++;
      }
    }

    if (skipMOCs && !(outboundLinkCounter > 20) && !key.includes('MOC')) {
      const baseNode = new GraphVertex(key);
      // look at each link
      for (const linkKey in valueMap) {
        if (linkKey.includes('MOC')) continue;
        const targetNode = new GraphVertex(linkKey);

        if (useForwardLinks) {
          // console.log("     Adding FORWARDLINK edge " + nodeBasename + " -> " + target);
          if (baseNode?.value != targetNode?.value) {
            if (sg.findEdge(baseNode, targetNode) == null) {
              sg.addEdge(new GraphEdge(baseNode, targetNode));
            }
          }
        }

        // allow backlinks
        if (useBackLinks) {
          if (baseNode?.value != targetNode?.value) {
            if (sg.findEdge(targetNode, baseNode) == null) {
              sg.addEdge(new GraphEdge(targetNode, baseNode));
            }
          }
        }
      }
    }

    // if (useTags) {
    //   const text = await app.vault.adapter.read(key);
    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   const result = text.matchAll(/#[\w|äÄöÖüÜß/\-_]+/gim);
    //   const ts = Array.from(result);
    //
    //   for (let i = 0; i < ts.length; i++) {
    //     let tag = String(ts[i]);
    //     tag = tag.trim();
    //     let tagNode = sg.getVertexByKey(tag);
    //
    //     if (tagNode == null) {
    //       tagNode = new GraphVertex(tag);
    //     }
    //
    //     if (sg.findEdge(baseNode, tagNode) == null) {
    //       const edge = new GraphEdge(baseNode, tagNode, 0);
    //       sg.addEdge(edge);
    //     }
    //
    //     if (sg.findEdge(tagNode, baseNode) == null) {
    //       const edge = new GraphEdge(tagNode, baseNode, 0);
    //       sg.addEdge(edge);
    //     }
    //   }
    // }
  }
  return sg;
};

export const findPath = async (start: string, end: string): Promise<GraphVertex[][]> => {
  const map = await setMap();
  const endNode = map.getVertexByKey(end);
  const startNode = map.getVertexByKey(start);
  return getPathsFromVertex(startNode, endNode, map);
};
