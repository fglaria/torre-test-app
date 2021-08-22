const server_url = 'http://localhost:9000';

const getUser = user => {
  return fetch(`${ server_url }/users/${ user }`, {
    method: 'GET',
  })
  .then(res => res.json())
  .then(body => checkResponse(body));
};

const getJob = job => {
  console.log("JOB: " + job);
  return fetch(`${ server_url }/jobs/${ job }`, {
    method: 'GET',
  })
  .then(res => res.json())
  .then(body => checkResponse(body));
};

const checkResponse = res => {
  if ("011002" === res.code)
  {
    console.error(res.message);
    throw (res.message);
  }

  return res;
}

export const send = query => {
  switch (query.type) {
    case "users":
      return getUser(query.text);
    case "jobs":
      return getJob(query.text);
    default:
      console.error("No valid type selected: " + query.type);
      break;
  }
};
