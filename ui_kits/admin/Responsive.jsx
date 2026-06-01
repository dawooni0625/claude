/* global React */
// Shared responsive helper. Tracks the live viewport width and exposes
// breakpoint flags aligned to the KIRBS grid tokens
// (mobile 320 / tablet 768 / desktop 1024 / desktop-hd 1440).
//
//   const { width, isMobile, isTablet, isDesktop } = useViewport();
//
// isMobile  → < 768  : drawer sidebar, stacked content, condensed top bar
// isTablet  → 768–1023: drawer sidebar, 2-up grids
// isDesktop → ≥ 1024 : static sidebar, full multi-column layout

function useViewport() {
  const read = () => (typeof window !== 'undefined' ? window.innerWidth : 1280);
  const [width, setWidth] = React.useState(read());
  React.useEffect(() => {
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setWidth(read()));
    };
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize); cancelAnimationFrame(raf); };
  }, []);
  return {
    width,
    isMobile:  width < 768,
    isTablet:  width >= 768 && width < 1024,
    isDesktop: width >= 1024,
    // sidebar collapses to a drawer below desktop
    drawerNav: width < 1024,
  };
}

Object.assign(window, { useViewport });
