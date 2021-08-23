import { Accordion } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/images.css';

export const show = (userResult) => {
  // console.log(userResult);
  const user = userExtractInfo(userResult);

  return (
    <div class="mt-3 mb-5">
      <img src={ user.thumbnail } class="thumbnail" alt='' rounded="true"></img>
      <p>{ user.name }</p>
      <Accordion defaultActiveKey="0" >
        <Accordion.Item eventKey="0">
          <Accordion.Header>Information</Accordion.Header>
          <Accordion.Body>
            <p>{ user.profession }</p>
            <p>{ user.location }</p>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Biography</Accordion.Header>
          <Accordion.Body>
            <p>{ user.bio }</p>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Jobs</Accordion.Header>
          <Accordion.Body>
            {
              user.jobs.map((j, index) =>
                <p key={ index }>
                  { j.name }, { j.organization } ({ j.from })
                </p>
              )
            }
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Languages</Accordion.Header>
          <Accordion.Body>
            {
              user.languages.map((l, index) =>
                <p key={ index }>
                  { l.language }, { l.fluency }
                </p>
              )
            }
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>Interests</Accordion.Header>
          <Accordion.Body>
            {
              user.interests.map((i, index) =>
                <p key={ index }>
                  { i.name }
                </p>
              )
            }
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="5">
          <Accordion.Header>Links</Accordion.Header>
          <Accordion.Body>
            {
              user.links.map((l, index) =>
                <p key={ index }>
                  <a href={ l.address }>{ l.name }</a>
                </p>
              )
            }
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};


const userExtractInfo = (info) => {
  let user = {};

  user.name = info.person.name;
  user.thumbnail = info.person.pictureThumbnail;
  user.profession = info.person.professionalHeadline;
  user.location = info.person.location.name;
  user.links = info.person.links;
  user.languages = info.languages;
  user.interests = info.interests;
  user.bio = info.person.summaryOfBio;

  user.jobs = [];
  for (let j of info.jobs) {
    let job = {};
    job.name = j.name;
    job.from = j.fromMonth + " " + j.fromYear;
    job.organization = (j.organizations.length !== 0) ? j.organizations[0].name : '';

    user.jobs.push(job);
  };


  return user;
};