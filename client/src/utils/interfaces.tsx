export interface GetInfinitePagesInterface<T> {
  len: any;
  nextId?: number;
  previousId?: number;
  data: T;
  count: number;
}
