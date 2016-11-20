
import Promise from 'bluebird';
import myConf  from '../.env.json';

import xhr from 'axios';

function heros(page, offset = 10) {
  return xhr("/api/characters/", {
    params: {
      api_key: myConf.comicvine.key,
      "Accept": "application/json",
      "format": "json",
      "limit": offset,
      "offset": page * offset,
      "field_list": "id,name,real_name,gender,origin,image,deck,description,aliases,powers,teams"
    }
  }).then(response => {
    if (response.data.status_code === 1) {
      return Promise.resolve(response.data.results)
    } else {
      return Promise.reject(new Error("invalid status code"))
    }
  })
}
export {heros}