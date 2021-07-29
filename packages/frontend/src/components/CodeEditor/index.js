import Editor from '@monaco-editor/react';

export default function CodeEditor({
  height = '200px',
  source = '',
  onChange,
}) {
  return (
    <Editor
      height={height}
      defaultLanguage="javascript"
      defaultValue={source}
      options={{
        minimap: {
          enabled: false,
        },
      }}
      onChange={onChange}
    />
  );
}
