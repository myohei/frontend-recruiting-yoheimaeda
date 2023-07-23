import {useQuery} from "react-query";
import {PrefectureRepo} from "../data/repo/PrefectureRepo";
import PrefectureRepoImpl from "../data/repo_impl/PrefectureRepoImpl";

type Deps = {
  repo: PrefectureRepo;
};

const defaultDeps: Deps = {
  repo: new PrefectureRepoImpl(),
};

const usePrefectures = (deps: Deps = defaultDeps) => {
  const {repo} = deps
  return useQuery('prefectures', repo.get)
}
export default usePrefectures
