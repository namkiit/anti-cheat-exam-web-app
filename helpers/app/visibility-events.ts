import { useState, useEffect } from "react";

export function getBrowserVisibilityProp() {
  if (typeof document.hidden !== "undefined") {
    // Opera 12.10 and Firefox 18 and later support
    return "visibilitychange";
  } else if (typeof document["msHidden"] !== "undefined") {
    return "msvisibilitychange";
  } else if (typeof document["webkitHidden"] !== "undefined") {
    return "webkitvisibilitychange";
  }
}

export function getBrowserDocumentHiddenProp() {
  if (typeof document.hidden !== "undefined") {
    return "hidden";
  } else if (typeof document["msHidden"] !== "undefined") {
    return "msHidden";
  } else if (typeof document["webkitHidden"] !== "undefined") {
    return "webkitHidden";
  }
}

export function getIsDocumentHidden() {
  return !document[getBrowserDocumentHiddenProp()];
}
