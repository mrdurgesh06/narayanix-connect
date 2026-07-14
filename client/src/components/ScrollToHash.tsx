import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Smooth-scrolls to the element matching the URL hash whenever the
// location changes — lets nav links like "/#technology" work whether
// you're already on that page or navigating there from elsewhere.
function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      return;
    }

    const id = hash.replace("#", "");

    // Wait a tick for the target page's content to mount.
    const timeout = setTimeout(() => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);

    return () => clearTimeout(timeout);
  }, [hash, pathname]);

  return null;
}

export default ScrollToHash;
