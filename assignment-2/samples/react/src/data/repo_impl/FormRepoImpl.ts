import {FormRepo, Body} from "../repo/FormRepo";

const url = 'https://httpstat.us/201'

export default class FormRepoImpl implements FormRepo {
  post = async (body: Body): Promise<void> => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    console.log(response.status);
  }

}
