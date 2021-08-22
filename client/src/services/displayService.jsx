import { Accordion } from 'react-bootstrap';

export const showUser = (info) => {
  //console.log(info);
  return (
    <div class="mt-3">
      <img src={ info.person.pictureThumbnail } alt=''></img>
      <p>{ info.person.name }</p>
      <Accordion defaultActiveKey="0" >
        <Accordion.Item eventKey="0">
          <Accordion.Header>Information</Accordion.Header>
          <Accordion.Body>
            <p>{ info.person.professionalHeadline }</p>
            <p>{ info.person.location.name }</p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Links</Accordion.Header>
          <Accordion.Body>
            {
              info.person.links.map((l, index) =>
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

export const showJob = (info) => {
  console.log("job info");
  console.log(info);
};
