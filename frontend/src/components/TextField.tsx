/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import OutlinedInput, { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
import Typography from '@material-ui/core/Typography';
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
  const inputStyle = css({
    display: 'block',
    flex: 1,
  });
  return (
    <div css={divStyle}>
      {label && (
        <Typography variant="body2" css={labelStyle}>
          {label}
        </Typography>
      )}
      <OutlinedInput size="small" margin="dense" css={inputStyle} name={selfInputId} {...props} />
    </div>
  );
};

export default TextField;
