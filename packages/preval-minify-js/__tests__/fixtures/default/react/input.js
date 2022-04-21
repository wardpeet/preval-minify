const React = require('react');
const ReactDOM = require('react-dom')
const minifyJs = require('../../../../dist/minify.macro');

function App() {
  return <React.Fragment>
    <script dangerouslySetInnerHTML={{
      __html: minifyJs`
  const hasNativeLazyLoadSupport = typeof HTMLImageElement !== "undefined" && "loading" in HTMLImageElement.prototype;
  if(hasNativeLazyLoadSupport) {
    document.body.addEventListener('load', function gatsbyImageNativeLoader(e) {
      // if image is not tagged with Main Image we bail
      if (typeof e.target.dataset["mainImage"] === 'undefined') {
        return
      }

      // if a main image does not have a ssr tag, we know it's not the first run anymore
      if (typeof e.target.dataset["gatsbyImageSsr"] === 'undefined') {
        return;
      }


      const target = e.target;

      let imageWrapper = null;
      let parentElement = target;
      while (imageWrapper === null && parentElement) {
        if (typeof parentElement.parentNode.dataset["gatsbyImageWrapper"] !== "undefined") {
          imageWrapper = parentElement.parentNode;
        }
        parentElement = parentElement.parentNode;
      }
      const placeholder = imageWrapper.querySelector("[data-placeholder-image]");

      const img = new Image();
      img.src = target.currentSrc;
      // We decode the img through javascript so we're sure the blur-up effect works
      img.decode()
        .catch(() => {
          // do nothing
        })
        .then(() => {
          target.style.opacity = 1;
          if (placeholder) {
            placeholder.style.opacity = 0;
            placeholder.style.transition = "opacity 500ms linear";
          }
        })
    }, true)
  }
`}}></script>
  </React.Fragment>
}

ReactDOM.render(React.createElement(App), document.querySelector('.root'))
