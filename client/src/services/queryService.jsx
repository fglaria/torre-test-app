const server_url = 'http://localhost:9000';

const getUser = user => {
  fetch(`${ server_url }/users/${ user }`, {
    method: 'GET',
  })
  .then(res => res.json())
  .then(body => checkResponse(body));
};

const getJob = job => {
  console.log("JOB: " + job);
  fetch(`${ server_url }/jobs/${ job }`, {
    method: 'GET',
  })
  .then(res => res.json())
  .then(body => checkResponse(body));
};

const checkResponse = res => {
  if ("011002" === res.code)
  {
    console.error(res.message);
    return;
  }

  console.log(res);
}

export const send = query => {
  switch (query.type) {
    case "users":
      getUser(query.text);
      break;
    case "jobs":
      getJob(query.text);
      break;
    default:
      console.error("No valid type selected: " + query.type);
      break;
  }
};
