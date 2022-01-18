// @mui
import { useTheme } from "@mui/material/styles";
import { Container, Grid } from "@mui/material";
// hooks
import useSettings from "../../hooks/useSettings";
// components
import Page from "../../components/Page";
// sections
import { EcommerceBestSalesman } from "../../sections/@dashboard/general/ecommerce";

// ----------------------------------------------------------------------

export default function Ranking() {
  const theme = useTheme();
  const { themeStretch } = useSettings();

  return (
    <Page title="annbeautyskincare">
      <Container
        maxWidth={themeStretch ? false : "xl"}
        sx={{ justifyContent: "center", display: "flex" }}
      >
        <Grid item xs={12} lg={10}>
          <EcommerceBestSalesman />
        </Grid>
      </Container>
    </Page>
  );
}
