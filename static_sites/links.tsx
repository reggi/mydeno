/** @jsx h */
import { h } from "https://esm.sh/preact@10.13.2";

type LinkShape = {
  href: string,
  text: string,
  image?: string,
}

type LinksShape = LinkShape[]

type LinkSet = {
  [key: string]: string | Omit<LinkShape, 'text'>,
}

export type OptionLinks = LinksShape | LinkSet

export const cleanLinks = (links: OptionLinks): LinksShape => {
  if (Array.isArray(links)) return links
  return Object.entries(links).map(([text, hrefOrLink]) => {
    if (typeof hrefOrLink === 'string') return {text, href: hrefOrLink}
    return {text, ...hrefOrLink}
  })
}

export const Link = (props: { link: LinkShape }) => (
  <a target="_blank" href={props.link.href} className="link">
    {props.link.image && (
      <img src={props.link.image} alt={`Image for link ${props.link.href}`} className="linkImage" />  
    )}
    <p className="linkParagraph">{props.link.text}</p>
  </a>
)

export const Links = (props: { links: LinkShape[] }) => (
  <div className="links">
    {props.links.map((link, i) => <Link link={link}></Link>)}
  </div>
)
