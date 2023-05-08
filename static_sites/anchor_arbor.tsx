
/** @jsx h */
/** @jsxFrag Fragment */
import { h } from "https://esm.sh/preact@10.13.2";
import { Links, OptionLinks, cleanLinks } from "./links.tsx"
import {parseMarkdown} from "https://deno.land/x/markdown_wasm/mod.ts"
import { HTML, HTMLProps } from "./html.tsx";
import { preactResponse } from "./utilities.ts";

export type ArborOptions = {
  image?: string | { mime: string, data: string},
  summary?: string,
  links?: OptionLinks
}

export const AnchorArborPageComponent = (props: ArborOptions & HTMLProps) => {
  const links = cleanLinks(props.links || [])
  
  const Image = () => {
    if (typeof props.image === "string") {
      return <img width="100" height="100" src={props.image} alt={'profile image'} className="topImage"/>
    } else if (props.image) {
      const { mime, data } = props.image
      return <img width="100" height="100" alt={'profile image'} src={`data:${mime};base64, ${data}`} className="topImage"/>
    } 
    return null
  }

  return (
    <HTML {...props}>
      <Image/>
      {props.summary && <div className="summary" dangerouslySetInnerHTML={{__html: parseMarkdown(props.summary)}}/>}
      <Links links={links}></Links>
    </HTML>
  )
}

export const anchorArbor = (props: ArborOptions & HTMLProps) => {
  const wrap = () => <AnchorArborPageComponent {...props}/>
  return () => preactResponse(wrap)
};
