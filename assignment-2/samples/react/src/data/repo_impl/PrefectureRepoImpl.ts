import {Prefecture, Prefectures} from "../../models/Prefecture";
import Papa from "papaparse";
import {PrefectureRepo} from "../repo/PrefectureRepo";

type PrefectureCSV = {
  id: string;
  prefecture_en: string;
  prefecture_id: string;
  prefecture_ja: string;
}

export default class PrefectureRepoImpl implements PrefectureRepo {
  get = async (): Promise<Prefectures> => {
    const response = await fetch('data/prefectures.csv')
    if (!response.body) {
      throw new Error("can not get prefectures data")
    }
    const reader = response.body.getReader()
    const result = await reader.read()
    const decoder = new TextDecoder('utf-8')
    const csv = decoder.decode(result.value)
    const results = Papa.parse<PrefectureCSV>(csv, {header: true, skipEmptyLines: true})
    return results.data.map((p): Prefecture => {
      return {
        id: p.prefecture_id,
        name: p.prefecture_ja
      }
    });
  }
}
