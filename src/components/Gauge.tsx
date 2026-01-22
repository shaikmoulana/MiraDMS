import { Box, CircularProgress, Typography } from '@mui/material';

const Gauge = ({ value, color }) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        value={value}
        size={70}
        thickness={5}
        sx={{
          color: color,
          backgroundColor: '#f3f4f6',
          borderRadius: '50%',
        }}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography fontWeight={600} fontSize={16}>
          {value}%
        </Typography>
      </Box>
    </Box>
  );
};

export default Gauge;
