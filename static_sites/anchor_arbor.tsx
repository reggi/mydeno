
/** @jsx h */
/** @jsxFrag Fragment */
import { h } from "https://esm.sh/preact@10.13.2";
import { Links, OptionLinks, cleanLinks } from "./links.tsx"
import {parseMarkdown} from "https://deno.land/x/markdown_wasm/mod.ts"
import { HTML, HTMLProps } from "./html.tsx";
import { preactResponse } from "./utilities.ts";
import { Image, ImageOptions, spreadImageProps } from "./image.tsx";

export type ArborOptions = {
  topImage?: ImageOptions,
  summary?: string,
  links?: OptionLinks
  footer?: string,
}

export const AnchorArborPageComponent = (props: ArborOptions & HTMLProps) => {
  const links = cleanLinks(props.links || [])
  return (
    <HTML {...props}>
      {props.topImage && <Image className="topImage" width='100' height="100" {...spreadImageProps(props.topImage)} />}
      {props.summary && <div className="summary markdown" dangerouslySetInnerHTML={{__html: parseMarkdown(props.summary)}}/>}
      <Links links={links}></Links>
      {props.footer && <div className="footer markdown" dangerouslySetInnerHTML={{__html: parseMarkdown(props.footer)}}/>}
    </HTML>
  )
}

export const anchorArbor = (props: ArborOptions & HTMLProps) => {
  const wrap = () => <AnchorArborPageComponent {...props}/>
  return () => preactResponse(wrap)
};
