// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Container, Typography } from '@mui/material';
// components
import Image from '../../components/Image';
import { MotionInView, varFade } from '../../components/animate';
// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: 'https://live.staticflickr.com/65535/51758657201_73bc57b631_z.jpg',
    title: 'VALENTA THAITEA',
    description:
      '',
  },
  {
    icon: 'https://live.staticflickr.com/65535/51759307769_6fb7d27c36_z.jpg',
    title: 'VALENTA COFFEE',
    description: '',
  },
  {
    icon: 'https://live.staticflickr.com/65535/51759307754_37fddcd092_z.jpg',
    title: 'VALENTA COCOA',
    description: '',
  },
];

const shadowIcon = (color: string) => `drop-shadow(2px 2px 2px ${alpha(color, 0.48)})`;

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15),
  },
}));

const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity: number) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);

  return {
    border: 0,
    maxWidth: 380,
    minHeight: 440,
    margin: 'auto',
    textAlign: 'center',
    padding: theme.spacing(10, 5, 0),
    boxShadow: theme.customShadows.z12,
    [theme.breakpoints.up('md')]: {
      boxShadow: 'none',
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    '&.cardLeft': {
      [theme.breakpoints.up('md')]: { marginTop: -40 },
    },
    '&.cardCenter': {
      [theme.breakpoints.up('md')]: {
        marginTop: -80,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `-40px 40px 80px 0 ${shadowCard(0.4)}`,
        '&:before': {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          content: "''",
          margin: 'auto',
          position: 'absolute',
          width: 'calc(100% - 40px)',
          height: 'calc(100% - 40px)',
          borderRadius: Number(theme.shape.borderRadius) * 2,
          backgroundColor: theme.palette.background.paper,
          boxShadow: `-20px 20px 40px 0 ${shadowCard(0.12)}`,
        },
      },
    },
  };
});

// ----------------------------------------------------------------------

export default function HomeMinimal() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle>
      <Container>
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 10, md: 25 },
          }}
        >
          <MotionInView variants={varFade().inUp}>
            <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
            Ann Beauty Skin Care Product.
            </Typography>
          </MotionInView>
          <MotionInView variants={varFade().inDown}>
            <Typography variant="h2">ผลิตภัณฑ์ของเรา</Typography>
          </MotionInView>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gap: { xs: 5, lg: 10 },
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
          }}
        >
          {CARDS.map((card, index) => (
            <MotionInView variants={varFade().inUp} key={card.title}>
              <CardStyle
                className={(index === 0 && 'cardLeft') || (index === 1 && 'cardCenter') || ''}
              >
                <Image
                  src={card.icon}
                  alt={card.title}
                  sx={{
                    mb: 3,
                    mx: 'auto',
                    width: 290,
                    height: 320,
                    filter: (theme) => shadowIcon(theme.palette.primary.main),
                    ...(index === 0 && {
                      filter: (theme) => shadowIcon(theme.palette.info.main),
                    }),
                    ...(index === 1 && {
                      filter: (theme) => shadowIcon(theme.palette.error.main),
                    }),
                  }}
                />
                <Typography variant="h5" paragraph>
                  {card.title}
                </Typography>
                <Typography sx={{ color: isLight ? 'text.secondary' : 'common.white' }}>
                  {card.description}
                </Typography>
              </CardStyle>
            </MotionInView>
          ))}
        </Box>
      </Container>
    </RootStyle>
  );
}
