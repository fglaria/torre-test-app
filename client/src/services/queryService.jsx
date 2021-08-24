
const getUser = user => {
  return fetch(`/users/${ user }`, {
    method: 'GET',
  })
  .then(res => res.json())
  .then(body => checkResponse(body));
};

const getJob = job => {
  console.log("JOB: " + job);
  return fetch(`/jobs/${ job }`, {
    method: 'GET',
  })
  .then(res => res.json())
  .then(body => checkResponse(body));
};

const postUser = q => {
  const a = q.aggregate ? "true" : "false";
  return fetch(`/users/size/${ q.size }/offset/${ q.offset }/aggregate/${ a }`, {
    method: 'GET',
  })
  .then(res => res.json())
  .then(body => checkResponse(body));
};

const postJobs = q => {
  const a = q.aggregate ? "true" : "false";
  return fetch(`/jobs/size/${ q.size }/offset/${ q.offset }/aggregate/${ a }`, {
    method: 'GET',
  })
  .then(res => res.json())
  .then(body => checkResponse(body));
};

const checkResponse = res => {
  // console.log(res);
  if ("011002" === res.code)
  {
    throw (res.message);
  }
  else if ("invalid-json" === res.type) {
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
    case "post_users":
      return postUser(query);
    case "post_jobs":
      return postJobs(query);
    default:
      console.error("No valid type selected: " + query.type);
      break;
  }
};
