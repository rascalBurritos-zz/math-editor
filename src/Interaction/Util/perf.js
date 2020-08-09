export class Perf {
  /**
   *
   */
  static start() {
    performance.mark('vm');
  }
  /**
   *
   */
  static end() {
    performance.mark('vmOver');
    const x = performance.measure('measure viewmaster', 'vm', 'vmOver');
    console.log(x);
    performance.clearMarks();
    performance.clearMeasures();
  }
}
