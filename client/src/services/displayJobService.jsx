import { Col, Accordion } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/jobs.css';


export const show = (jobResult) => {
    console.log(jobResult);
    const job = jobExtractInfo(jobResult);
  
    return (
      <div class="mt-3 mb-5">
        {
          job.organizationsImg.map((o, index) => 
            <Col key={ index }>
              <img src={ o.picture } class="organization" alt={ o.name } rounded="true"></img>
            </Col>
          )
        }
        <p>{ job.objective }</p>
        <Accordion defaultActiveKey="0" >
          <Accordion.Item eventKey="0">
            <Accordion.Header>Job opening</Accordion.Header>
            <Accordion.Body>
              <p>{ job.reason }</p>
            </Accordion.Body>
          </Accordion.Item>
  
          <Accordion.Item eventKey="1">
            <Accordion.Header>Organization</Accordion.Header>
            <Accordion.Body>
            <p>{ job.organizations }</p>
            </Accordion.Body>
          </Accordion.Item>
  
          <Accordion.Item eventKey="2">
            <Accordion.Header>Responsabilities</Accordion.Header>
            <Accordion.Body>
            { job.responsibilities.map((r, index) => 
                <p key={ index }>{ r }</p>
              ) }
            </Accordion.Body>
          </Accordion.Item>
  
          <Accordion.Item eventKey="3">
            <Accordion.Header>Requirements</Accordion.Header>
            <Accordion.Body>
              { job.requirements.map((r, index) => 
                <p key={ index }>{ r }</p>
              ) }
            </Accordion.Body>
          </Accordion.Item>
  
          <Accordion.Item eventKey="4">
            <Accordion.Header>Benefits</Accordion.Header>
            <Accordion.Body>
              { job.benefits.map((b, index) => 
                <p key={ index }>{ b }</p>
              ) }
            </Accordion.Body>
          </Accordion.Item>
  
          <Accordion.Item eventKey="5">
            <Accordion.Header>Challenges</Accordion.Header>
            <Accordion.Body>
              { job.challenges.map((c, index) => 
                <p key={ index }>{ c }</p>
              ) }
            </Accordion.Body>
          </Accordion.Item>
          
          <Accordion.Item eventKey="6">
            <Accordion.Header>Career Path</Accordion.Header>
            <Accordion.Body>
              { job.careerPath.map((c, index) => 
                <p key={ index }>{ c }</p>
              ) }
            </Accordion.Body>
          </Accordion.Item>
          
          <Accordion.Item eventKey="7">
            <Accordion.Header>Team Culture</Accordion.Header>
            <Accordion.Body>
              { job.teamCulture.map((t, index) => 
                <p key={ index }>{ t }</p>
              ) }
            </Accordion.Body>
          </Accordion.Item>
          
          <Accordion.Item eventKey="8">
            <Accordion.Header>Additional</Accordion.Header>
            <Accordion.Body>
              { job.additional.map((a, index) => 
                <p key={ index }>{ a }</p>
              ) }
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    );
  };
  
  
  
  const jobExtractInfo = (info) => {
    let job = {"benefits": []};
  
    job.organizationsImg = info.organizations;
    job.objective = info.objective;

    for (let d of info.details) {
      switch (d.code) {
        case "benefits":
          job.benefits.push('• '+d.content);
          break;
        case "reason":
          job.reason = d.content;
          break;
        case "responsibilities":
          job.responsibilities = d.content.split('\n');
          break;
        case "organizations":
          job.organizations = d.content;
          break;
        case "requirements":
          job.requirements = d.content.split('\n');
          break;
        case "challenges":
          job.challenges = d.content.split('\n');
          break;
        case "career-path":
          job.careerPath = d.content.split('\n');
          break;
        case "team-culture":
          job.teamCulture = d.content.split('\n');
          break;
        case "additional":
          job.additional = d.content.split('\n');
          break;
        default:
          break;
      };
    };
  
    return job;
  };
