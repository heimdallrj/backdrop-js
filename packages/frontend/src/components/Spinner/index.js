import ScaleLoader from 'react-spinners/ScaleLoader';

export default function Spinner({
  style = {
    alignSelf: 'center',
    margin: 'auto',
    top: '40%',
    left: '50%',
    position: 'fixed',
  },
}) {
  return (
    <ScaleLoader
      loading
      height={24}
      width={4}
      radius={2}
      margin={2}
      color="red"
      css={style}
    />
  );
}
