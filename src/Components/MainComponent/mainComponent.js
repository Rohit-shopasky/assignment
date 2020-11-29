import React, { Component } from "react";
import { observer } from "mobx-react";
import stores from "../../stores";
import Filters from "../Filters/filterComponent";
import MissionCard from "../MissionCard/CardComponent";
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";

import {
  Heading,
  Container,
  MissionsList,
  InfoContainer,
  Loader,
  Footer,
  FooterText,
  DeveloperName,
} from "./styledComponents.js";
import "./styles.css";

const override = css`
  display: block;
  position: fixed; /* or absolute */
  top: 50%;
  left: 50%;
`;

@observer
class MainComponent extends Component {
  componentDidMount() {
    stores.storeInstance.fetchData();
  }

  renderMissionsList = () => {
    if (stores.storeInstance.missionsList.length > 0)
      return (
        <MissionsList>
          {stores.storeInstance.missionsList.map((mission) => (
            <MissionCard
              mission={mission}
              key={`${mission.mission_name}${mission.flight_number}`}
            />
          ))}
        </MissionsList>
      );
    else return <Loader>{`No Items to Show`}</Loader>;
  };

  render() {
    return (
      <Container>
        <Heading>{`SpaceX Launch Programs`}</Heading>
        <InfoContainer>
          <Filters />
          {!stores.storeInstance.missionsList ? (
            <PulseLoader
              css={override}
              size={10}
              color={"#3498db"}
              loading={true}
            />
          ) : (
            this.renderMissionsList()
          )}
        </InfoContainer>
        <Footer>
          <FooterText>{`Developed by: `}</FooterText>
          <DeveloperName>{`Rohit Kumar`}</DeveloperName>
        </Footer>
      </Container>
    );
  }
}

export default MainComponent;
