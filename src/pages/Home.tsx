// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';
// sections
import {
  HomeHero,
  HomeMinimal,
  HomeLookingFor,
  HomeHugePackElements,
} from '../sections/home';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: '100%',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Page title="ระบบตัวแทนขาย Ann-BeautySkincare">
      <RootStyle>
        <HomeHero />
        <ContentStyle>
          <HomeMinimal />
          <HomeHugePackElements />
          <HomeLookingFor />
        </ContentStyle>
      </RootStyle>
    </Page>
  );
}
