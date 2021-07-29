import { useEffect, useState } from 'react';
import styled from 'styled-components';

import CodeEditor from 'components/CodeEditor';

export const Wrapper = styled.section`
  border: 1px solid #ccc;
  padding: 5px 10px;
`;

export const MethodTitle = styled.h5`
  font-size: 0.9em;
  padding: 0 10px;
`;

export const EditorBlock = styled.div`
  border: 1px solid #ccc;
  margin: 10px;
  padding: 5px;
`;

const defaultSource = `
export default function(req, res, next) {
  // do something
}
`;

export default function CustomAPIBuilder({ name, methods = [] }) {
  const [source, setSource] = useState({});

  const handleOnChange = (newSource) => {
    setSource(newSource);
  };

  useEffect(() => {
    if (methods && methods.length > 0) {
      const _source = {};
      methods.forEach((m) => {
        _source[m] = defaultSource;
      });
      setSource(_source);
    }
  }, [methods]);

  // if (!loading) return null;

  if (!methods || methods.lenght === 0) {
    return null;
  }

  return (
    <Wrapper>
      {methods.map((m) => (
        <EditorBlock key={m}>
          <MethodTitle>
            {m.toUpperCase()} /{name}
          </MethodTitle>
          <CodeEditor source={source[m]} onChange={handleOnChange} />
        </EditorBlock>
      ))}
    </Wrapper>
  );
}
