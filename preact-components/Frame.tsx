/** @jsx h */
import { h } from "https://esm.sh/preact@10.10.0";
import { useState } from 'https://esm.sh/preact@10.10.0/hooks';

export const Frame = ({ src }: any) => {
  const [iframeHeight, setIframeHeight] = useState(0);
  return (
    <iframe
      src={src}
      frameBorder="0"
      height={iframeHeight}
      width="100%"
      scrolling="no"
      onLoad={(event: any) => {
        const { contentWindow } = event.target;
        const main = contentWindow.document.body.querySelector("main");

        // Because the login form has a dynamic height, observe any size changes and update the iframe height
        const resizeObserver = new ResizeObserver(entries => {
          entries.forEach(entry => {
            setIframeHeight(entry.contentRect.height);
          });
        });

        resizeObserver.observe(main);

        // When the iframe is hiden (i.e. modal is closed), remove any listeners
        const onVisibilityChange = () => {
          resizeObserver.disconnect();
          contentWindow.addEventListener("visibilitychange", onVisibilityChange);
        };

        // Add listener for when iframe is hiden (i.e. modal is closed)
        contentWindow.addEventListener("visibilitychange", onVisibilityChange);
      }}
    />
  );
};

export default Frame;