import ReactQuill from 'react-quill';
import styled from 'styled-components';

import { FormField } from 'providers/ThemeProvider/styled';

import 'react-quill/dist/quill.snow.css';

export const LabelWrap = styled.div``;
export const Label = styled.label`
  color: rgba(55, 65, 81, 1);
  letter-spacing: 0.025em;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.75rem;
  line-height: 1.8rem;
`;

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const formats = [
  'header',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

export default function RichText({
  value,
  onChange,
  label,
  name,
  placeholder,
}) {
  return (
    <FormField>
      <LabelWrap>{label && <Label htmlFor={name}>{label}</Label>}</LabelWrap>
      <ReactQuill
        theme={'snow'}
        onChange={onChange}
        value={value || ''}
        modules={modules}
        formats={formats}
        bounds={'.app'}
        placeholder={placeholder}
      />
    </FormField>
  );
}
