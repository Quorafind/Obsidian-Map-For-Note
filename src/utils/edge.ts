import { GraphVertex } from './vertex';
export class GraphEdge {
  weight: number;
  startVertex: GraphVertex;
  endVertex: GraphVertex;

  /**
   * Creates an instance of GraphEdge.
   * @param {GraphVertex} startVertex - 开始节点
   * @param {GraphVertex} endVertex - 结束节点
   * @param {number} [weight=0] - 边的权重
   * @memberof GraphEdge
   */
  constructor(startVertex: GraphVertex, endVertex: GraphVertex, weight = 0) {
    this.startVertex = startVertex;
    this.endVertex = endVertex;
    this.weight = weight;
  }

  /**
   * 获取 edge 的 key 值
   *
   * @returns {string}
   * @memberof GraphEdge
   */
  getKey(): string {
    const startVertexKey = this.startVertex.getKey();
    const endVertexKey = this.endVertex.getKey();

    return `${startVertexKey}_${endVertexKey}`;
  }

  /**
   * 翻转这条边的指向
   *
   * @returns {GraphEdge}
   * @memberof GraphEdge
   */
  reverse() {
    const tmp = this.startVertex;
    this.startVertex = this.endVertex;
    this.endVertex = tmp;

    return this;
  }

  /**
   * 复制边
   *
   * @returns {GraphEdge}
   * @memberof GraphEdge
   */
  clone() {
    return new GraphEdge(this.startVertex, this.endVertex, this.weight);
  }

  /**
   * 重写 toString 方法
   *
   * @returns {string}
   * @memberof GraphEdge
   */
  toString(): string {
    return this.getKey();
  }
}
