import { isExist, invariant } from './lib';
import { GraphEdge } from './edge';

export class GraphVertex {
  value: any;
  edges: Map<string, GraphEdge>;

  /**
   * Creates an instance of GraphVertex.
   * @param {*} value - 节点值
   * @memberof GraphVertex
   */
  constructor(value: any) {
    invariant(isExist(value), 'Graph vertex must have a value');

    // Normally you would store string value like vertex name.
    // But generally it may be any object as well
    this.value = value;

    // 使用链表保存当前节点的边的集合
    this.edges = new Map<string, GraphEdge>();
  }

  /**
   * 将 edge 添加到当前节点的边链表中
   *
   * @param {GraphEdge} edge - edge 实例
   * @returns {GraphVertex}
   * @memberof GraphVertex
   */
  addEdge(edge: GraphEdge) {
    this.edges.set(edge.getKey(), edge);
    return this;
  }

  /**
   * 将 edge 从当前节点的边链表中删除
   *
   * @param {GraphEdge} edge  - edge 实例
   * @memberof GraphVertex
   */
  deleteEdge(edge: GraphEdge) {
    this.edges.delete(edge.getKey());
  }

  /**
   * 获取所有当前节点的相邻节点
   *
   * @returns {GraphVertex[]}
   * @memberof GraphVertex
   */
  getNeighbors(): GraphVertex[] {
    const edges = this.getEdges();

    const neighborsConverter = (edge: GraphEdge) => {
      return edge.startVertex.value === this.value ? edge.endVertex : edge.startVertex;
    };

    // Return either start or end vertex.
    // For undirected graphs it is possible that current vertex will be the end one.
    return edges.map(neighborsConverter);
  }

  /**
   * 获取所有的边
   *
   * @returns {GraphEdge[]}
   * @memberof GraphVertex
   */
  getEdges(): GraphEdge[] {
    return Array.from(this.edges.values());
  }

  /**
   * 获取当前节点的度
   *
   * @returns {number}
   * @memberof GraphVertex
   */
  getDegree(): number {
    return this.getEdges().length;
  }

  /**
   * 判断某条边是否存在于当前节点上
   *
   * @param {GraphEdge} requiredEdge
   * @returns {boolean}
   * @memberof GraphVertex
   */
  hasEdge(requiredEdge: GraphEdge): boolean {
    const edgeNode = this.getEdges().find((edge: GraphEdge) => edge === requiredEdge);
    return !!edgeNode;
  }

  /**
   * 判断某个节点是否是和当前节点连接
   *
   * @param {GraphVertex} vertex
   * @returns {boolean}
   * @memberof GraphVertex
   */
  hasNeighbor(vertex: GraphVertex): boolean {
    const vertexNode = this.getEdges().find(
      (edge: GraphEdge) => edge.startVertex === vertex || edge.endVertex === vertex,
    );

    return !!vertexNode;
  }

  /**
   * 查找当前节点到指定节点的边，
   * 如果存在返回该边，否则返回 null
   *
   * @param {GraphVertex} vertex
   * @returns {*}
   * @memberof GraphVertex
   */
  findEdge(vertex: GraphVertex): any {
    const edgeFinder = (edge: GraphEdge) => {
      return edge.startVertex === vertex || edge.endVertex === vertex;
    };

    const edge = this.getEdges().find(edgeFinder);

    return edge ? edge : null;
  }

  /**
   * 返回当前节点 key 值
   *
   * @returns {*}
   * @memberof GraphVertex
   */
  getKey(): any {
    return this.value;
  }

  /**
   * 删除当前节点所有的边
   *
   * @returns {GraphVertex}
   * @memberof GraphVertex
   */
  deleteAllEdges(): GraphVertex {
    this.getEdges().forEach((edge: GraphEdge) => this.deleteEdge(edge));
    return this;
  }

  /**
   * 重写 toString 方法
   *
   * @param {(value: any)=>string} [callback] - 支持自定义 toString 格式
   * @returns {string}
   * @memberof GraphVertex
   */
  toString(callback?: (value: any) => string): string {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
