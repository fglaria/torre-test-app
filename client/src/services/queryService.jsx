const server_url = 'http://localhost:9000';

const getUser = user => {
  console.log("USER: " + user);
  fetch(`${ server_url }/users/${ user }`, {
    method: 'GET',
  })
  .then(res => res.json())
  .then(body => checkUser(body));
};

const getJob = job => {
  console.log("JOB: " + job);
};

const checkUser = user => {
  if ("011002" === user.code)
  {
    console.error(user.message);
    return;
  }

  console.log(user);
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
