import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Skeleton } from "@/primitives/skeleton";

export default function QuickReference() {
  const router = useRouter();
  const { dynamicDoc } = router.query;

  const [fullDocument, setFullDocument] = useState({});
  const [hashURL, setHashURL] = useState("");

  useEffect(() => {
    setFullDocument({});
    if (dynamicDoc) {
      //  axios 
      setFullDocument({
        markupText,
        title: post?.title || null,
        description: post?.intro || null,
      });
    }
  }, [dynamicDoc]);

  const scrollToTop = () => {
    console.log("Button clicked, scrolling to top");

    // Fallback scroll method
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    document.body.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  useEffect(() => {
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash;
      if (hash) {
        blinkSection();
        setHashURL(hash);
      }
    });
  }, [hashURL]);

  return (
    <>
      {fullDocument.markupText ? (
        <>
          <div id="quickReferenceContainer" className="bg-slate-100 dark:bg-slate-900 px-5 py-5">
            <div dangerouslySetInnerHTML={{ __html: fullDocument.markupText }}></div>
          </div>
        </>
      ) : (
        <div className="flex flex-col space-y-3 py-3">
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      )}
    </>
  );
}
