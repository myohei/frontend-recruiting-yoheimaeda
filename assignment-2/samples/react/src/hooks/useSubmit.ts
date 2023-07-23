import {useMutation} from "react-query";
import {FormRepo} from "../data/repo/FormRepo";
import FormRepoImpl from "../data/repo_impl/FormRepoImpl";

type Deps = {
  repo: FormRepo;
};

const defaultDeps: Deps = {
  repo: new FormRepoImpl(),
};


const useSubmit = (deps: Deps = defaultDeps) => {
  const {repo} = deps
  return useMutation(repo.post)
}

export default useSubmit
