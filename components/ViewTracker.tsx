"use client";

import { useEffect } from "react";

const ViewTracker = ({ id }: { id: string }) => {
  useEffect(() => {
    const controller = new AbortController();

    // Fire-and-forget: increment view count on page visit.
    fetch(`/api/startup/${id}/view`, { method: "POST", signal: controller.signal }).catch(
      () => {},
    );

    return () => controller.abort();
  }, [id]);

  return null;
};

export default ViewTracker;

