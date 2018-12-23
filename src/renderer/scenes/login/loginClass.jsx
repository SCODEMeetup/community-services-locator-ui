import React from 'react';
import Flexbox from 'flexbox-react';
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';

export default class Login extends React.Component {
  render() {
    return (
      <Flexbox justifyContent="center" width="100%">
        <Card className="login-card">
          <CardTitle
            title="Welcome"
            subtitle="subtext!"
          />
          <CardText className="description">
            Really cool app description
          </CardText>
          <p className="copyright">
            Simple React app
            <br />
            <a href="" className="link">Learn More</a>
          </p>
        </Card>
      </Flexbox>
    );
  }
}
