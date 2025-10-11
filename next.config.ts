import type { NextConfig } from "next";
import createMdx from '@next/mdx';

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx']
};

const withMdx = createMdx({
  extension: /\.(md|mdx)$/,
})

export default withMdx(nextConfig);
