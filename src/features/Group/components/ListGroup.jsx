import { Container, Grid } from "@mui/material";
import Loadable from "components/Loadable";
import React from "react";

const GroupCard = Loadable(React.lazy(() => import("./GroupCard")));

function ListGroup({ groups = [], setGroup }) {
  return (
    <Container maxWidth="100%">
      <Grid container spacing={2}>
        {groups.map((group) => (
          <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={group._id}>
            <GroupCard group={group} setGroup={setGroup} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default React.memo(ListGroup);
