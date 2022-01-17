/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

interface TextFieldElement extends OutlinedInputProps {
  label?: string;
  inputId?: string;
}

const TextField: FC<TextFieldElement> = ({ label, inputId, ...props }) => {
  const selfInputId = inputId || Math.floor(Math.random() * 10000).toString();
  const divStyle = css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: '0.5rem',
  });
  const labelStyle = css({
    flexBasis: 'content',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  });
  return (
    <div css={divStyle}>
      {label && (
        <Typography variant="body2" css={labelStyle}>
          {label}
        </Typography>
      )}
      <OutlinedInput
        size="small"
        margin="dense"
        sx={{
          display: 'block',
          flex: 1,
        }}
        name={selfInputId}
        {...props}
      />
    </div>
  );
};

export default TextField;
