import { IMember } from "./IMember";

export interface IMyCenter {
  name: string;
  location: string;
  memberCount: number;
  members: Array<IMember>;
}
