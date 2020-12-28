export default {
  get: (url, query) => __fetch({
    url, query,
    method: 'get'
  }),
  post: (url, data) => __fetch({
    url, data,
    method: 'post'
  }),
  delete: (url, data) => __fetch({
    url, data,
    method: 'delete'
  }),

  upload: (url, input) =>
    fetch(url, {
      method: 'post',
      data: input.files[0],
      headers: {
        'Content-Type': 'application/octet-stream'
      }
    }).then(__jsonRes)
}

function __fetch({ url, method, query, data }){
  return fetch(url + __getQuery(query) , {
    method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: data && JSON.stringify(data)
  }).then(__jsonRes)
}

function __getQuery(query){
  if(!query) return ''

  let result = '?'
  for(let key in query)
    result += key + '=' + query[key] + '&'

  return result.slice(0, result.length-1)
}

function __jsonRes(res){
  return res.json()
}