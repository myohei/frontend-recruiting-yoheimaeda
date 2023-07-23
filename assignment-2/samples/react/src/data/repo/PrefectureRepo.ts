import {Prefectures} from "../../models/Prefecture";

export type PrefectureRepo ={
  get: ()=>Promise<Prefectures>
}
