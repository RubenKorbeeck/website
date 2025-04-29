import React from 'react';
import ReactMarkdown from 'react-markdown';

type Props = {
  content: string;
};

export default function MarkdownRenderer({ content }: Props) {
  return (
    <div className="prose prose-img:rounded prose-img:shadow-lg max-w-none bg-white p-4 border rounded">
      <ReactMarkdown
        components={{
          img: ({ node, ...props }) => (
            <img {...props} alt={props.alt || ''} className="my-4 rounded max-w-full shadow-md" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}