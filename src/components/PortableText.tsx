import { PortableText } from '@portabletext/react';

const components = {
  block: {
    h1: ({children}: any) => <h1 className="text-4xl font-bold my-6">{children}</h1>,
    h2: ({children}: any) => <h2 className="text-3xl font-semibold mt-10 mb-4">{children}</h2>,
    h3: ({children}: any) => <h3 className="text-2xl font-semibold mt-8 mb-4">{children}</h3>,
    normal: ({children}: any) => <p className="text-base text-gray-700 leading-relaxed mb-6">{children}</p>,
    blockquote: ({children}: any) => <blockquote className="border-l-4 border-gray-300 pl-4 my-6 italic text-gray-600">{children}</blockquote>,
  },
  list: {
    bullet: ({children}: any) => <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">{children}</ul>,
    number: ({children}: any) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-700">{children}</ol>,
  },
  listItem: {
    bullet: ({children}: any) => <li>{children}</li>,
    number: ({children}: any) => <li>{children}</li>,
  },
  marks: {
    link: ({children, value}: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} rel={rel} className="text-blue-600 hover:underline">
          {children}
        </a>
      );
    },
    strong: ({children}: any) => <strong className="font-semibold">{children}</strong>,
    em: ({children}: any) => <em className="italic">{children}</em>,
  },
};

export default function PortableTextComponent({ value }: { value: any }) {
  if (!value) return null;
  return (
    <div className="portable-text prose max-w-none">
      <PortableText value={value} components={components} />
    </div>
  );
}
