import React from 'react';
import Flexbox from 'flexbox-react';
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card';

export default class SedokuClass extends React.Component {
  render() {
    return (
      <Flexbox justifyContent="center" width="100%">
        <Card className="sedoku-card">
          <CardTitle
            title="Sedoku"
            subtitle="subtext!"
          />
          <CardText className="description">
            Sedouku work here
          </CardText>
        </Card>
      </Flexbox>
    );
  }
}
