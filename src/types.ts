export type Solver = (puzzleBuffer: Uint8Array, threshold: number, n?: number) => Uint8Array[];

export type MessageFromWorker = ReadyMessage | StartedMessage | ProgressPartMessage | DonePartMessage | ErrorMessage;
export type MessageToWorker = StartMessage | SolverMessage;

export interface StartMessage {
  type: "start";
  puzzleSolverInputs: Uint8Array[];
  threshold: number;
  /**
   * Number of puzzles to be solved.
   */
  n: number;
  numWorkers: number;
  startIndex: number;
}

export interface SolverMessage {
  type: "solver";
  forceJS: boolean;
}

export interface ReadyMessage {
  type: "ready";
  solver: 1 | 2;
}

export interface StartedMessage {
  type: "started";
}

export interface ErrorMessage {
  type: "error";
  message: string;
}

export interface ProgressPartMessage {
  type: "progress";
  /**
   * Number of hashes it took to find this solution
   */
  h: number;
}

export interface ProgressMessage {
  /**
   * Number of solutions to be found in total
   */
  n: number;
  /**
   * Number of all hashes calculated
   */
  h: number;
  /**
   * Time this solution took in seconds
   */
  t: number;
  /**
   * This is the i'th solution.
   */
  i: number;
}

export interface DonePartMessage {
  type: "done";
  solution: Uint8Array;
  startIndex: number;
  /**
   * Hashes attempted for this solution
   */
  totalH: number;
}

export interface DoneMessage {
  solution: Uint8Array;
  /**
   * Total number of hashes that were required
   */
  h: number;
  /**
   * Total time it took in seconds
   */
  t: number;
  diagnostics: Uint8Array;
  solver: 1 | 2;
}
