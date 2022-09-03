
export interface MenuInfo {
  title: string;
  path: string;
  icon?: string
}
//! request 相关
export interface Result<T> {
  code: number;
  msg: string;
  data: T;
}

export interface instanceObject {
  [key: string]: string;
}