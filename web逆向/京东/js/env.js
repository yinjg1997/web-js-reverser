// 检测脚本
// !(() => {
//     const origin_log = console.log;
//     ;
//     // const origin_log = function () {};
//     logToConsole = function () {
//         return origin_log(...arguments)
//         // return
//     }
// })();

// watch = function (obj, name) {
//     return new Proxy(obj, {
//         get(target, p, receiver) {
//             // 过滤没用的信息，不进行打印
//             if (name)
//                 if (p === "Math" || p === "Symbol" || p === "Proxy" || p === "Promise" || p === "Array" || p === "isNaN" || p === "encodeURI" || p === "Uint8Array" || p.toString().indexOf("Symbol(") != -1 || p === "_element") {
//                     var val = Reflect.get(...arguments);
//                     return val
//                 } else {
//                     var val = Reflect.get(...arguments);
//                     const lst = []
//                     for (let i = 0; i < p.length; i++) {
//                         lst.push(p.charCodeAt(i))
//                     }
//                     if (typeof val === 'function') {
//                         logToConsole(`\x1B[32m取值\x1B[0m: ${name}.${p} => function`);
//                     } else {
//                         logToConsole(`\x1B[32m取值\x1B[0m: ${name}.${p} =>`, val);
//                     }
//
//                     return val
//                 }
//         },
//         set(target, p, value, receiver) {
//             var val = Reflect.set(...arguments)
//             if (typeof value === 'function') {
//                 logToConsole(`设置值:${name}.${p}=>function `,);
//             } else {
//                 logToConsole(`设置值:${name}.${p}=> `, value);
//                 if (name === '环境数组' && p === '4') {
//                     debugger
//                 }
//             }
//             return val
//         },
//         has(target, key) {
//             logToConsole(`检查属性存在性: ${name}.${key.toString()}`);
//             return key in target;
//         },
//         ownKeys(target) {
//             logToConsole(`\x1B[34mownKeys检测\x1B[0m: ${name}`);
//             if (name === 'span_domtokenlist') {
//                 debugger
//             }
//             if (name === 'window') {
//                 const keys = [
//                     "Object",
//                     "Function",
//                     "Array",
//                     "Number",
//                     "parseFloat",
//                     "parseInt",
//                     "Infinity",
//                     "NaN",
//                     "undefined",
//                     "Boolean",
//                     "String",
//                     "Symbol",
//                     "Date",
//                     "Promise",
//                     "RegExp",
//                     "Error",
//                     "AggregateError",
//                     "EvalError",
//                     "RangeError",
//                     "ReferenceError",
//                     "SyntaxError",
//                     "TypeError",
//                     "URIError",
//                     "globalThis",
//                     "JSON",
//                     "Math",
//                     "Intl",
//                     "ArrayBuffer",
//                     "Atomics",
//                     "Uint8Array",
//                     "Int8Array",
//                     "Uint16Array",
//                     "Int16Array",
//                     "Uint32Array",
//                     "Int32Array",
//                     "BigUint64Array",
//                     "BigInt64Array",
//                     "Uint8ClampedArray",
//                     "Float32Array",
//                     "Float64Array",
//                     "DataView",
//                     "Map",
//                     "BigInt",
//                     "Set",
//                     "WeakMap",
//                     "WeakSet",
//                     "Proxy",
//                     "Reflect",
//                     "FinalizationRegistry",
//                     "WeakRef",
//                     "decodeURI",
//                     "decodeURIComponent",
//                     "encodeURI",
//                     "encodeURIComponent",
//                     "escape",
//                     "unescape",
//                     "eval",
//                     "isFinite",
//                     "isNaN",
//                     "console",
//                     "Option",
//                     "Image",
//                     "Audio",
//                     "webkitURL",
//                     "webkitRTCPeerConnection",
//                     "webkitMediaStream",
//                     "WebKitMutationObserver",
//                     "WebKitCSSMatrix",
//                     "XSLTProcessor",
//                     "XPathResult",
//                     "XPathExpression",
//                     "XPathEvaluator",
//                     "XMLSerializer",
//                     "XMLHttpRequestUpload",
//                     "XMLHttpRequestEventTarget",
//                     "XMLHttpRequest",
//                     "XMLDocument",
//                     "WritableStreamDefaultWriter",
//                     "WritableStreamDefaultController",
//                     "WritableStream",
//                     "Worker",
//                     "WindowControlsOverlayGeometryChangeEvent",
//                     "WindowControlsOverlay",
//                     "Window",
//                     "WheelEvent",
//                     "WebSocket",
//                     "WebGLVertexArrayObject",
//                     "WebGLUniformLocation",
//                     "WebGLTransformFeedback",
//                     "WebGLTexture",
//                     "WebGLSync",
//                     "WebGLShaderPrecisionFormat",
//                     "WebGLShader",
//                     "WebGLSampler",
//                     "WebGLRenderingContext",
//                     "WebGLRenderbuffer",
//                     "WebGLQuery",
//                     "WebGLProgram",
//                     "WebGLObject",
//                     "WebGLFramebuffer",
//                     "WebGLContextEvent",
//                     "WebGLBuffer",
//                     "WebGLActiveInfo",
//                     "WebGL2RenderingContext",
//                     "WaveShaperNode",
//                     "VisualViewport",
//                     "VisibilityStateEntry",
//                     "VirtualKeyboardGeometryChangeEvent",
//                     "ViewTransitionTypeSet",
//                     "ViewTransition",
//                     "ViewTimeline",
//                     "VideoPlaybackQuality",
//                     "VideoFrame",
//                     "VideoColorSpace",
//                     "ValidityState",
//                     "VTTCue",
//                     "UserActivation",
//                     "URLSearchParams",
//                     "URLPattern",
//                     "URL",
//                     "UIEvent",
//                     "TrustedTypePolicyFactory",
//                     "TrustedTypePolicy",
//                     "TrustedScriptURL",
//                     "TrustedScript",
//                     "TrustedHTML",
//                     "TreeWalker",
//                     "TransitionEvent",
//                     "TransformStreamDefaultController",
//                     "TransformStream",
//                     "TrackEvent",
//                     "TouchList",
//                     "TouchEvent",
//                     "Touch",
//                     "ToggleEvent",
//                     "TimeRanges",
//                     "TextUpdateEvent",
//                     "TextTrackList",
//                     "TextTrackCueList",
//                     "TextTrackCue",
//                     "TextTrack",
//                     "TextMetrics",
//                     "TextFormatUpdateEvent",
//                     "TextFormat",
//                     "TextEvent",
//                     "TextEncoderStream",
//                     "TextEncoder",
//                     "TextDecoderStream",
//                     "TextDecoder",
//                     "Text",
//                     "TaskSignal",
//                     "TaskPriorityChangeEvent",
//                     "TaskController",
//                     "TaskAttributionTiming",
//                     "SyncManager",
//                     "SubmitEvent",
//                     "StyleSheetList",
//                     "StyleSheet",
//                     "StylePropertyMapReadOnly",
//                     "StylePropertyMap",
//                     "StorageEvent",
//                     "Storage",
//                     "StereoPannerNode",
//                     "StaticRange",
//                     "SourceBufferList",
//                     "SourceBuffer",
//                     "ShadowRoot",
//                     "Selection",
//                     "SecurityPolicyViolationEvent",
//                     "ScrollTimeline",
//                     "ScriptProcessorNode",
//                     "ScreenOrientation",
//                     "Screen",
//                     "Scheduling",
//                     "Scheduler",
//                     "SVGViewElement",
//                     "SVGUseElement",
//                     "SVGUnitTypes",
//                     "SVGTransformList",
//                     "SVGTransform",
//                     "SVGTitleElement",
//                     "SVGTextPositioningElement",
//                     "SVGTextPathElement",
//                     "SVGTextElement",
//                     "SVGTextContentElement",
//                     "SVGTSpanElement",
//                     "SVGSymbolElement",
//                     "SVGSwitchElement",
//                     "SVGStyleElement",
//                     "SVGStringList",
//                     "SVGStopElement",
//                     "SVGSetElement",
//                     "SVGScriptElement",
//                     "SVGSVGElement",
//                     "SVGRectElement",
//                     "SVGRect",
//                     "SVGRadialGradientElement",
//                     "SVGPreserveAspectRatio",
//                     "SVGPolylineElement",
//                     "SVGPolygonElement",
//                     "SVGPointList",
//                     "SVGPoint",
//                     "SVGPatternElement",
//                     "SVGPathElement",
//                     "SVGNumberList",
//                     "SVGNumber",
//                     "SVGMetadataElement",
//                     "SVGMatrix",
//                     "SVGMaskElement",
//                     "SVGMarkerElement",
//                     "SVGMPathElement",
//                     "SVGLinearGradientElement",
//                     "SVGLineElement",
//                     "SVGLengthList",
//                     "SVGLength",
//                     "SVGImageElement",
//                     "SVGGraphicsElement",
//                     "SVGGradientElement",
//                     "SVGGeometryElement",
//                     "SVGGElement",
//                     "SVGForeignObjectElement",
//                     "SVGFilterElement",
//                     "SVGFETurbulenceElement",
//                     "SVGFETileElement",
//                     "SVGFESpotLightElement",
//                     "SVGFESpecularLightingElement",
//                     "SVGFEPointLightElement",
//                     "SVGFEOffsetElement",
//                     "SVGFEMorphologyElement",
//                     "SVGFEMergeNodeElement",
//                     "SVGFEMergeElement",
//                     "SVGFEImageElement",
//                     "SVGFEGaussianBlurElement",
//                     "SVGFEFuncRElement",
//                     "SVGFEFuncGElement",
//                     "SVGFEFuncBElement",
//                     "SVGFEFuncAElement",
//                     "SVGFEFloodElement",
//                     "SVGFEDropShadowElement",
//                     "SVGFEDistantLightElement",
//                     "SVGFEDisplacementMapElement",
//                     "SVGFEDiffuseLightingElement",
//                     "SVGFEConvolveMatrixElement",
//                     "SVGFECompositeElement",
//                     "SVGFEComponentTransferElement",
//                     "SVGFEColorMatrixElement",
//                     "SVGFEBlendElement",
//                     "SVGEllipseElement",
//                     "SVGElement",
//                     "SVGDescElement",
//                     "SVGDefsElement",
//                     "SVGComponentTransferFunctionElement",
//                     "SVGClipPathElement",
//                     "SVGCircleElement",
//                     "SVGAnimationElement",
//                     "SVGAnimatedTransformList",
//                     "SVGAnimatedString",
//                     "SVGAnimatedRect",
//                     "SVGAnimatedPreserveAspectRatio",
//                     "SVGAnimatedNumberList",
//                     "SVGAnimatedNumber",
//                     "SVGAnimatedLengthList",
//                     "SVGAnimatedLength",
//                     "SVGAnimatedInteger",
//                     "SVGAnimatedEnumeration",
//                     "SVGAnimatedBoolean",
//                     "SVGAnimatedAngle",
//                     "SVGAnimateTransformElement",
//                     "SVGAnimateMotionElement",
//                     "SVGAnimateElement",
//                     "SVGAngle",
//                     "SVGAElement",
//                     "Response",
//                     "ResizeObserverSize",
//                     "ResizeObserverEntry",
//                     "ResizeObserver",
//                     "Request",
//                     "ReportingObserver",
//                     "ReportBody",
//                     "ReadableStreamDefaultReader",
//                     "ReadableStreamDefaultController",
//                     "ReadableStreamBYOBRequest",
//                     "ReadableStreamBYOBReader",
//                     "ReadableStream",
//                     "ReadableByteStreamController",
//                     "Range",
//                     "RadioNodeList",
//                     "RTCTrackEvent",
//                     "RTCStatsReport",
//                     "RTCSessionDescription",
//                     "RTCSctpTransport",
//                     "RTCRtpTransceiver",
//                     "RTCRtpSender",
//                     "RTCRtpReceiver",
//                     "RTCPeerConnectionIceEvent",
//                     "RTCPeerConnectionIceErrorEvent",
//                     "RTCPeerConnection",
//                     "RTCIceTransport",
//                     "RTCIceCandidate",
//                     "RTCErrorEvent",
//                     "RTCError",
//                     "RTCEncodedVideoFrame",
//                     "RTCEncodedAudioFrame",
//                     "RTCDtlsTransport",
//                     "RTCDataChannelEvent",
//                     "RTCDTMFToneChangeEvent",
//                     "RTCDTMFSender",
//                     "RTCCertificate",
//                     "PromiseRejectionEvent",
//                     "ProgressEvent",
//                     "Profiler",
//                     "ProcessingInstruction",
//                     "PopStateEvent",
//                     "PointerEvent",
//                     "PluginArray",
//                     "Plugin",
//                     "PictureInPictureWindow",
//                     "PictureInPictureEvent",
//                     "PeriodicWave",
//                     "PerformanceTiming",
//                     "PerformanceServerTiming",
//                     "PerformanceScriptTiming",
//                     "PerformanceResourceTiming",
//                     "PerformancePaintTiming",
//                     "PerformanceObserverEntryList",
//                     "PerformanceObserver",
//                     "PerformanceNavigationTiming",
//                     "PerformanceNavigation",
//                     "PerformanceMeasure",
//                     "PerformanceMark",
//                     "PerformanceLongTaskTiming",
//                     "PerformanceLongAnimationFrameTiming",
//                     "PerformanceEventTiming",
//                     "PerformanceEntry",
//                     "PerformanceElementTiming",
//                     "Performance",
//                     "Path2D",
//                     "PannerNode",
//                     "PageTransitionEvent",
//                     "OverconstrainedError",
//                     "OscillatorNode",
//                     "OffscreenCanvasRenderingContext2D",
//                     "OffscreenCanvas",
//                     "OfflineAudioContext",
//                     "OfflineAudioCompletionEvent",
//                     "NodeList",
//                     "NodeIterator",
//                     "NodeFilter",
//                     "Node",
//                     "NetworkInformation",
//                     "NavigatorUAData",
//                     "Navigator",
//                     "NavigationTransition",
//                     "NavigationHistoryEntry",
//                     "NavigationDestination",
//                     "NavigationCurrentEntryChangeEvent",
//                     "Navigation",
//                     "NavigateEvent",
//                     "NamedNodeMap",
//                     "MutationRecord",
//                     "MutationObserver",
//                     "MouseEvent",
//                     "MimeTypeArray",
//                     "MimeType",
//                     "MessagePort",
//                     "MessageEvent",
//                     "MessageChannel",
//                     "MediaStreamTrackVideoStats",
//                     "MediaStreamTrackProcessor",
//                     "MediaStreamTrackGenerator",
//                     "MediaStreamTrackEvent",
//                     "MediaStreamTrackAudioStats",
//                     "MediaStreamTrack",
//                     "MediaStreamEvent",
//                     "MediaStreamAudioSourceNode",
//                     "MediaStreamAudioDestinationNode",
//                     "MediaStream",
//                     "MediaSourceHandle",
//                     "MediaSource",
//                     "MediaRecorder",
//                     "MediaQueryListEvent",
//                     "MediaQueryList",
//                     "MediaList",
//                     "MediaError",
//                     "MediaEncryptedEvent",
//                     "MediaElementAudioSourceNode",
//                     "MediaCapabilities",
//                     "MathMLElement",
//                     "Location",
//                     "LayoutShiftAttribution",
//                     "LayoutShift",
//                     "LargestContentfulPaint",
//                     "KeyframeEffect",
//                     "KeyboardEvent",
//                     "IntersectionObserverEntry",
//                     "IntersectionObserver",
//                     "InputEvent",
//                     "InputDeviceInfo",
//                     "InputDeviceCapabilities",
//                     "Ink",
//                     "ImageData",
//                     "ImageCapture",
//                     "ImageBitmapRenderingContext",
//                     "ImageBitmap",
//                     "IdleDeadline",
//                     "IIRFilterNode",
//                     "IDBVersionChangeEvent",
//                     "IDBTransaction",
//                     "IDBRequest",
//                     "IDBOpenDBRequest",
//                     "IDBObjectStore",
//                     "IDBKeyRange",
//                     "IDBIndex",
//                     "IDBFactory",
//                     "IDBDatabase",
//                     "IDBCursorWithValue",
//                     "IDBCursor",
//                     "History",
//                     "HighlightRegistry",
//                     "Highlight",
//                     "Headers",
//                     "HashChangeEvent",
//                     "HTMLVideoElement",
//                     "HTMLUnknownElement",
//                     "HTMLUListElement",
//                     "HTMLTrackElement",
//                     "HTMLTitleElement",
//                     "HTMLTimeElement",
//                     "HTMLTextAreaElement",
//                     "HTMLTemplateElement",
//                     "HTMLTableSectionElement",
//                     "HTMLTableRowElement",
//                     "HTMLTableElement",
//                     "HTMLTableColElement",
//                     "HTMLTableCellElement",
//                     "HTMLTableCaptionElement",
//                     "HTMLStyleElement",
//                     "HTMLSpanElement",
//                     "HTMLSourceElement",
//                     "HTMLSlotElement",
//                     "HTMLSelectElement",
//                     "HTMLScriptElement",
//                     "HTMLQuoteElement",
//                     "HTMLProgressElement",
//                     "HTMLPreElement",
//                     "HTMLPictureElement",
//                     "HTMLParamElement",
//                     "HTMLParagraphElement",
//                     "HTMLOutputElement",
//                     "HTMLOptionsCollection",
//                     "HTMLOptionElement",
//                     "HTMLOptGroupElement",
//                     "HTMLObjectElement",
//                     "HTMLOListElement",
//                     "HTMLModElement",
//                     "HTMLMeterElement",
//                     "HTMLMetaElement",
//                     "HTMLMenuElement",
//                     "HTMLMediaElement",
//                     "HTMLMarqueeElement",
//                     "HTMLMapElement",
//                     "HTMLLinkElement",
//                     "HTMLLegendElement",
//                     "HTMLLabelElement",
//                     "HTMLLIElement",
//                     "HTMLInputElement",
//                     "HTMLImageElement",
//                     "HTMLIFrameElement",
//                     "HTMLHtmlElement",
//                     "HTMLHeadingElement",
//                     "HTMLHeadElement",
//                     "HTMLHRElement",
//                     "HTMLFrameSetElement",
//                     "HTMLFrameElement",
//                     "HTMLFormElement",
//                     "HTMLFormControlsCollection",
//                     "HTMLFontElement",
//                     "HTMLFieldSetElement",
//                     "HTMLEmbedElement",
//                     "HTMLElement",
//                     "HTMLDocument",
//                     "HTMLDivElement",
//                     "HTMLDirectoryElement",
//                     "HTMLDialogElement",
//                     "HTMLDetailsElement",
//                     "HTMLDataListElement",
//                     "HTMLDataElement",
//                     "HTMLDListElement",
//                     "HTMLCollection",
//                     "HTMLCanvasElement",
//                     "HTMLButtonElement",
//                     "HTMLBodyElement",
//                     "HTMLBaseElement",
//                     "HTMLBRElement",
//                     "HTMLAudioElement",
//                     "HTMLAreaElement",
//                     "HTMLAnchorElement",
//                     "HTMLAllCollection",
//                     "GeolocationPositionError",
//                     "GeolocationPosition",
//                     "GeolocationCoordinates",
//                     "Geolocation",
//                     "GamepadHapticActuator",
//                     "GamepadEvent",
//                     "GamepadButton",
//                     "Gamepad",
//                     "GainNode",
//                     "FormDataEvent",
//                     "FormData",
//                     "FontFaceSetLoadEvent",
//                     "FontFace",
//                     "FocusEvent",
//                     "FileReader",
//                     "FileList",
//                     "File",
//                     "FeaturePolicy",
//                     "External",
//                     "EventTarget",
//                     "EventSource",
//                     "EventCounts",
//                     "Event",
//                     "ErrorEvent",
//                     "EncodedVideoChunk",
//                     "EncodedAudioChunk",
//                     "ElementInternals",
//                     "Element",
//                     "EditContext",
//                     "DynamicsCompressorNode",
//                     "DragEvent",
//                     "DocumentType",
//                     "DocumentTimeline",
//                     "DocumentFragment",
//                     "Document",
//                     "DelegatedInkTrailPresenter",
//                     "DelayNode",
//                     "DecompressionStream",
//                     "DataTransferItemList",
//                     "DataTransferItem",
//                     "DataTransfer",
//                     "DOMTokenList",
//                     "DOMStringMap",
//                     "DOMStringList",
//                     "DOMRectReadOnly",
//                     "DOMRectList",
//                     "DOMRect",
//                     "DOMQuad",
//                     "DOMPointReadOnly",
//                     "DOMPoint",
//                     "DOMParser",
//                     "DOMMatrixReadOnly",
//                     "DOMMatrix",
//                     "DOMImplementation",
//                     "DOMException",
//                     "DOMError",
//                     "CustomStateSet",
//                     "CustomEvent",
//                     "CustomElementRegistry",
//                     "Crypto",
//                     "CountQueuingStrategy",
//                     "ConvolverNode",
//                     "ContentVisibilityAutoStateChangeEvent",
//                     "ConstantSourceNode",
//                     "CompressionStream",
//                     "CompositionEvent",
//                     "Comment",
//                     "CloseWatcher",
//                     "CloseEvent",
//                     "ClipboardEvent",
//                     "CharacterData",
//                     "CharacterBoundsUpdateEvent",
//                     "ChannelSplitterNode",
//                     "ChannelMergerNode",
//                     "CanvasRenderingContext2D",
//                     "CanvasPattern",
//                     "CanvasGradient",
//                     "CanvasCaptureMediaStreamTrack",
//                     "CSSVariableReferenceValue",
//                     "CSSUnparsedValue",
//                     "CSSUnitValue",
//                     "CSSTranslate",
//                     "CSSTransition",
//                     "CSSTransformValue",
//                     "CSSTransformComponent",
//                     "CSSSupportsRule",
//                     "CSSStyleValue",
//                     "CSSStyleSheet",
//                     "CSSStyleRule",
//                     "CSSStyleDeclaration",
//                     "CSSStartingStyleRule",
//                     "CSSSkewY",
//                     "CSSSkewX",
//                     "CSSSkew",
//                     "CSSScopeRule",
//                     "CSSScale",
//                     "CSSRuleList",
//                     "CSSRule",
//                     "CSSRotate",
//                     "CSSPropertyRule",
//                     "CSSPositionValue",
//                     "CSSPositionTryRule",
//                     "CSSPositionTryDescriptors",
//                     "CSSPerspective",
//                     "CSSPageRule",
//                     "CSSNumericValue",
//                     "CSSNumericArray",
//                     "CSSNestedDeclarations",
//                     "CSSNamespaceRule",
//                     "CSSMediaRule",
//                     "CSSMatrixComponent",
//                     "CSSMathValue",
//                     "CSSMathSum",
//                     "CSSMathProduct",
//                     "CSSMathNegate",
//                     "CSSMathMin",
//                     "CSSMathMax",
//                     "CSSMathInvert",
//                     "CSSMathClamp",
//                     "CSSLayerStatementRule",
//                     "CSSLayerBlockRule",
//                     "CSSKeywordValue",
//                     "CSSKeyframesRule",
//                     "CSSKeyframeRule",
//                     "CSSImportRule",
//                     "CSSImageValue",
//                     "CSSGroupingRule",
//                     "CSSFontPaletteValuesRule",
//                     "CSSFontFaceRule",
//                     "CSSCounterStyleRule",
//                     "CSSContainerRule",
//                     "CSSConditionRule",
//                     "CSSAnimation",
//                     "CSS",
//                     "CSPViolationReportBody",
//                     "CDATASection",
//                     "ByteLengthQueuingStrategy",
//                     "BrowserCaptureMediaStreamTrack",
//                     "BroadcastChannel",
//                     "BlobEvent",
//                     "Blob",
//                     "BiquadFilterNode",
//                     "BeforeUnloadEvent",
//                     "BeforeInstallPromptEvent",
//                     "BaseAudioContext",
//                     "BarProp",
//                     "AudioWorkletNode",
//                     "AudioSinkInfo",
//                     "AudioScheduledSourceNode",
//                     "AudioProcessingEvent",
//                     "AudioParamMap",
//                     "AudioParam",
//                     "AudioNode",
//                     "AudioListener",
//                     "AudioDestinationNode",
//                     "AudioData",
//                     "AudioContext",
//                     "AudioBufferSourceNode",
//                     "AudioBuffer",
//                     "Attr",
//                     "AnimationTimeline",
//                     "AnimationPlaybackEvent",
//                     "AnimationEvent",
//                     "AnimationEffect",
//                     "Animation",
//                     "AnalyserNode",
//                     "AbstractRange",
//                     "AbortSignal",
//                     "AbortController",
//                     "window",
//                     "self",
//                     "document",
//                     "name",
//                     "location",
//                     "customElements",
//                     "history",
//                     "navigation",
//                     "locationbar",
//                     "menubar",
//                     "personalbar",
//                     "scrollbars",
//                     "statusbar",
//                     "toolbar",
//                     "status",
//                     "closed",
//                     "frames",
//                     "length",
//                     "top",
//                     "opener",
//                     "parent",
//                     "frameElement",
//                     "navigator",
//                     "origin",
//                     "external",
//                     "screen",
//                     "innerWidth",
//                     "innerHeight",
//                     "scrollX",
//                     "pageXOffset",
//                     "scrollY",
//                     "pageYOffset",
//                     "visualViewport",
//                     "screenX",
//                     "screenY",
//                     "outerWidth",
//                     "outerHeight",
//                     "devicePixelRatio",
//                     "event",
//                     "clientInformation",
//                     "offscreenBuffering",
//                     "screenLeft",
//                     "screenTop",
//                     "styleMedia",
//                     "onsearch",
//                     "trustedTypes",
//                     "performance",
//                     "onappinstalled",
//                     "onbeforeinstallprompt",
//                     "crypto",
//                     "indexedDB",
//                     "sessionStorage",
//                     "localStorage",
//                     "onbeforexrselect",
//                     "onabort",
//                     "onbeforeinput",
//                     "onbeforematch",
//                     "onbeforetoggle",
//                     "onblur",
//                     "oncancel",
//                     "oncanplay",
//                     "oncanplaythrough",
//                     "onchange",
//                     "onclick",
//                     "onclose",
//                     "oncontentvisibilityautostatechange",
//                     "oncontextlost",
//                     "oncontextmenu",
//                     "oncontextrestored",
//                     "oncuechange",
//                     "ondblclick",
//                     "ondrag",
//                     "ondragend",
//                     "ondragenter",
//                     "ondragleave",
//                     "ondragover",
//                     "ondragstart",
//                     "ondrop",
//                     "ondurationchange",
//                     "onemptied",
//                     "onended",
//                     "onerror",
//                     "onfocus",
//                     "onformdata",
//                     "oninput",
//                     "oninvalid",
//                     "onkeydown",
//                     "onkeypress",
//                     "onkeyup",
//                     "onload",
//                     "onloadeddata",
//                     "onloadedmetadata",
//                     "onloadstart",
//                     "onmousedown",
//                     "onmouseenter",
//                     "onmouseleave",
//                     "onmousemove",
//                     "onmouseout",
//                     "onmouseover",
//                     "onmouseup",
//                     "onmousewheel",
//                     "onpause",
//                     "onplay",
//                     "onplaying",
//                     "onprogress",
//                     "onratechange",
//                     "onreset",
//                     "onresize",
//                     "onscroll",
//                     "onsecuritypolicyviolation",
//                     "onseeked",
//                     "onseeking",
//                     "onselect",
//                     "onslotchange",
//                     "onstalled",
//                     "onsubmit",
//                     "onsuspend",
//                     "ontimeupdate",
//                     "ontoggle",
//                     "onvolumechange",
//                     "onwaiting",
//                     "onwebkitanimationend",
//                     "onwebkitanimationiteration",
//                     "onwebkitanimationstart",
//                     "onwebkittransitionend",
//                     "onwheel",
//                     "onauxclick",
//                     "ongotpointercapture",
//                     "onlostpointercapture",
//                     "onpointerdown",
//                     "onpointermove",
//                     "onpointerrawupdate",
//                     "onpointerup",
//                     "onpointercancel",
//                     "onpointerover",
//                     "onpointerout",
//                     "onpointerenter",
//                     "onpointerleave",
//                     "onselectstart",
//                     "onselectionchange",
//                     "onanimationend",
//                     "onanimationiteration",
//                     "onanimationstart",
//                     "ontransitionrun",
//                     "ontransitionstart",
//                     "ontransitionend",
//                     "ontransitioncancel",
//                     "onafterprint",
//                     "onbeforeprint",
//                     "onbeforeunload",
//                     "onhashchange",
//                     "onlanguagechange",
//                     "onmessage",
//                     "onmessageerror",
//                     "onoffline",
//                     "ononline",
//                     "onpagehide",
//                     "onpageshow",
//                     "onpopstate",
//                     "onrejectionhandled",
//                     "onstorage",
//                     "onunhandledrejection",
//                     "onunload",
//                     "isSecureContext",
//                     "crossOriginIsolated",
//                     "scheduler",
//                     "alert",
//                     "atob",
//                     "blur",
//                     "btoa",
//                     "cancelAnimationFrame",
//                     "cancelIdleCallback",
//                     "captureEvents",
//                     "clearInterval",
//                     "clearTimeout",
//                     "close",
//                     "confirm",
//                     "createImageBitmap",
//                     "fetch",
//                     "find",
//                     "focus",
//                     "getComputedStyle",
//                     "getSelection",
//                     "matchMedia",
//                     "moveBy",
//                     "moveTo",
//                     "open",
//                     "postMessage",
//                     "print",
//                     "prompt",
//                     "queueMicrotask",
//                     "releaseEvents",
//                     "reportError",
//                     "requestAnimationFrame",
//                     "requestIdleCallback",
//                     "resizeBy",
//                     "resizeTo",
//                     "scroll",
//                     "scrollBy",
//                     "scrollTo",
//                     "setInterval",
//                     "setTimeout",
//                     "stop",
//                     "structuredClone",
//                     "webkitCancelAnimationFrame",
//                     "webkitRequestAnimationFrame",
//                     "Iterator",
//                     "chrome",
//                     "WebAssembly",
//                     "caches",
//                     "cookieStore",
//                     "ondevicemotion",
//                     "ondeviceorientation",
//                     "ondeviceorientationabsolute",
//                     "launchQueue",
//                     "sharedStorage",
//                     "documentPictureInPicture",
//                     "AICreateMonitor",
//                     "AbsoluteOrientationSensor",
//                     "Accelerometer",
//                     "AudioDecoder",
//                     "AudioEncoder",
//                     "AudioWorklet",
//                     "BatteryManager",
//                     "Cache",
//                     "CacheStorage",
//                     "Clipboard",
//                     "ClipboardItem",
//                     "CookieChangeEvent",
//                     "CookieStore",
//                     "CookieStoreManager",
//                     "Credential",
//                     "CredentialsContainer",
//                     "CryptoKey",
//                     "DeviceMotionEvent",
//                     "DeviceMotionEventAcceleration",
//                     "DeviceMotionEventRotationRate",
//                     "DeviceOrientationEvent",
//                     "FederatedCredential",
//                     "GPU",
//                     "GPUAdapter",
//                     "GPUAdapterInfo",
//                     "GPUBindGroup",
//                     "GPUBindGroupLayout",
//                     "GPUBuffer",
//                     "GPUBufferUsage",
//                     "GPUCanvasContext",
//                     "GPUColorWrite",
//                     "GPUCommandBuffer",
//                     "GPUCommandEncoder",
//                     "GPUCompilationInfo",
//                     "GPUCompilationMessage",
//                     "GPUComputePassEncoder",
//                     "GPUComputePipeline",
//                     "GPUDevice",
//                     "GPUDeviceLostInfo",
//                     "GPUError",
//                     "GPUExternalTexture",
//                     "GPUInternalError",
//                     "GPUMapMode",
//                     "GPUOutOfMemoryError",
//                     "GPUPipelineError",
//                     "GPUPipelineLayout",
//                     "GPUQuerySet",
//                     "GPUQueue",
//                     "GPURenderBundle",
//                     "GPURenderBundleEncoder",
//                     "GPURenderPassEncoder",
//                     "GPURenderPipeline",
//                     "GPUSampler",
//                     "GPUShaderModule",
//                     "GPUShaderStage",
//                     "GPUSupportedFeatures",
//                     "GPUSupportedLimits",
//                     "GPUTexture",
//                     "GPUTextureUsage",
//                     "GPUTextureView",
//                     "GPUUncapturedErrorEvent",
//                     "GPUValidationError",
//                     "GravitySensor",
//                     "Gyroscope",
//                     "IdleDetector",
//                     "ImageDecoder",
//                     "ImageTrack",
//                     "ImageTrackList",
//                     "Keyboard",
//                     "KeyboardLayoutMap",
//                     "LinearAccelerationSensor",
//                     "MIDIAccess",
//                     "MIDIConnectionEvent",
//                     "MIDIInput",
//                     "MIDIInputMap",
//                     "MIDIMessageEvent",
//                     "MIDIOutput",
//                     "MIDIOutputMap",
//                     "MIDIPort",
//                     "MediaDeviceInfo",
//                     "MediaDevices",
//                     "MediaKeyMessageEvent",
//                     "MediaKeySession",
//                     "MediaKeyStatusMap",
//                     "MediaKeySystemAccess",
//                     "MediaKeys",
//                     "NavigationPreloadManager",
//                     "NavigatorManagedData",
//                     "OrientationSensor",
//                     "PasswordCredential",
//                     "ProtectedAudience",
//                     "RelativeOrientationSensor",
//                     "ScreenDetailed",
//                     "ScreenDetails",
//                     "Sensor",
//                     "SensorErrorEvent",
//                     "ServiceWorker",
//                     "ServiceWorkerContainer",
//                     "ServiceWorkerRegistration",
//                     "StorageManager",
//                     "SubtleCrypto",
//                     "VideoDecoder",
//                     "VideoEncoder",
//                     "VirtualKeyboard",
//                     "WGSLLanguageFeatures",
//                     "WebTransport",
//                     "WebTransportBidirectionalStream",
//                     "WebTransportDatagramDuplexStream",
//                     "WebTransportError",
//                     "Worklet",
//                     "XRDOMOverlayState",
//                     "XRLayer",
//                     "XRWebGLBinding",
//                     "AuthenticatorAssertionResponse",
//                     "AuthenticatorAttestationResponse",
//                     "AuthenticatorResponse",
//                     "PublicKeyCredential",
//                     "Bluetooth",
//                     "BluetoothCharacteristicProperties",
//                     "BluetoothDevice",
//                     "BluetoothRemoteGATTCharacteristic",
//                     "BluetoothRemoteGATTDescriptor",
//                     "BluetoothRemoteGATTServer",
//                     "BluetoothRemoteGATTService",
//                     "CaptureController",
//                     "DevicePosture",
//                     "DocumentPictureInPicture",
//                     "EyeDropper",
//                     "FileSystemDirectoryHandle",
//                     "FileSystemFileHandle",
//                     "FileSystemHandle",
//                     "FileSystemWritableFileStream",
//                     "FileSystemObserver",
//                     "FontData",
//                     "FragmentDirective",
//                     "HID",
//                     "HIDConnectionEvent",
//                     "HIDDevice",
//                     "HIDInputReportEvent",
//                     "IdentityCredential",
//                     "IdentityProvider",
//                     "IdentityCredentialError",
//                     "LaunchParams",
//                     "LaunchQueue",
//                     "Lock",
//                     "LockManager",
//                     "NavigatorLogin",
//                     "NotRestoredReasonDetails",
//                     "NotRestoredReasons",
//                     "OTPCredential",
//                     "PaymentAddress",
//                     "PaymentRequest",
//                     "PaymentRequestUpdateEvent",
//                     "PaymentResponse",
//                     "PaymentManager",
//                     "PaymentMethodChangeEvent",
//                     "Presentation",
//                     "PresentationAvailability",
//                     "PresentationConnection",
//                     "PresentationConnectionAvailableEvent",
//                     "PresentationConnectionCloseEvent",
//                     "PresentationConnectionList",
//                     "PresentationReceiver",
//                     "PresentationRequest",
//                     "PressureObserver",
//                     "PressureRecord",
//                     "Serial",
//                     "SerialPort",
//                     "StorageBucket",
//                     "StorageBucketManager",
//                     "USB",
//                     "USBAlternateInterface",
//                     "USBConfiguration",
//                     "USBConnectionEvent",
//                     "USBDevice",
//                     "USBEndpoint",
//                     "USBInTransferResult",
//                     "USBInterface",
//                     "USBIsochronousInTransferPacket",
//                     "USBIsochronousInTransferResult",
//                     "USBIsochronousOutTransferPacket",
//                     "USBIsochronousOutTransferResult",
//                     "USBOutTransferResult",
//                     "WakeLock",
//                     "WakeLockSentinel",
//                     "XRAnchor",
//                     "XRAnchorSet",
//                     "XRBoundedReferenceSpace",
//                     "XRCPUDepthInformation",
//                     "XRCamera",
//                     "XRDepthInformation",
//                     "XRFrame",
//                     "XRHitTestResult",
//                     "XRHitTestSource",
//                     "XRInputSource",
//                     "XRInputSourceArray",
//                     "XRInputSourceEvent",
//                     "XRInputSourcesChangeEvent",
//                     "XRLightEstimate",
//                     "XRLightProbe",
//                     "XRPose",
//                     "XRRay",
//                     "XRReferenceSpace",
//                     "XRReferenceSpaceEvent",
//                     "XRRenderState",
//                     "XRRigidTransform",
//                     "XRSession",
//                     "XRSessionEvent",
//                     "XRSpace",
//                     "XRSystem",
//                     "XRTransientInputHitTestResult",
//                     "XRTransientInputHitTestSource",
//                     "XRView",
//                     "XRViewerPose",
//                     "XRViewport",
//                     "XRWebGLDepthInformation",
//                     "XRWebGLLayer",
//                     "XRHand",
//                     "XRJointPose",
//                     "XRJointSpace",
//                     "getScreenDetails",
//                     "queryLocalFonts",
//                     "showDirectoryPicker",
//                     "showOpenFilePicker",
//                     "showSaveFilePicker",
//                     "originAgentCluster",
//                     "onpageswap",
//                     "onpagereveal",
//                     "credentialless",
//                     "fence",
//                     "speechSynthesis",
//                     "onscrollend",
//                     "onscrollsnapchange",
//                     "onscrollsnapchanging",
//                     "BackgroundFetchManager",
//                     "BackgroundFetchRecord",
//                     "BackgroundFetchRegistration",
//                     "BluetoothUUID",
//                     "CSSMarginRule",
//                     "CSSViewTransitionRule",
//                     "CaretPosition",
//                     "ChapterInformation",
//                     "CropTarget",
//                     "DocumentPictureInPictureEvent",
//                     "Fence",
//                     "FencedFrameConfig",
//                     "HTMLFencedFrameElement",
//                     "MediaMetadata",
//                     "MediaSession",
//                     "NavigationActivation",
//                     "Notification",
//                     "PageRevealEvent",
//                     "PageSwapEvent",
//                     "PeriodicSyncManager",
//                     "PermissionStatus",
//                     "Permissions",
//                     "PushManager",
//                     "PushSubscription",
//                     "PushSubscriptionOptions",
//                     "RTCDataChannel",
//                     "RemotePlayback",
//                     "RestrictionTarget",
//                     "SharedStorage",
//                     "SharedStorageWorklet",
//                     "SharedWorker",
//                     "SnapEvent",
//                     "SpeechSynthesis",
//                     "SpeechSynthesisErrorEvent",
//                     "SpeechSynthesisEvent",
//                     "SpeechSynthesisUtterance",
//                     "SpeechSynthesisVoice",
//                     "WebSocketError",
//                     "WebSocketStream",
//                     "webkitSpeechGrammar",
//                     "webkitSpeechGrammarList",
//                     "webkitSpeechRecognition",
//                     "webkitSpeechRecognitionError",
//                     "webkitSpeechRecognitionEvent",
//                     "webkitRequestFileSystem",
//                     "webkitResolveLocalFileSystemURL",
//                     "PC_ITEM_CONFIG",
//                     "dra",
//                     "customPointEvent",
//                     "_risk_xhr",
//                     "__intercept__fetch__",
//                     "atobFill",
//                     "riskHandlerUtil",
//                     "ParamsSign",
//                     "__core-js_shared__",
//                     "regeneratorRuntime",
//                     "callbackName",
//                     "ajaxCount",
//                     "__JDWEBSIGNHELPER_$DATA__",
//                     "PSign",
//                     "SHA256",
//                     "bp_bizid",
//                     "_0x26e2b7",
//                     "_riskFpMode",
//                     "jdtRiskContext",
//                     "collectConfig",
//                     "jdtRiskUtil",
//                     "jdtRiskEncryptUtil",
//                     "JdtRiskFingerPrint",
//                     "jdtRiskCookieManager",
//                     "jdtLocalStorageManager",
//                     "jdtRiskStorageManager",
//                     "TDEnvCollector",
//                     "__getTkResult",
//                     "_0x37f5",
//                     "__callbackWrapper",
//                     "reportLog",
//                     "_0x1d73",
//                     "_globalState",
//                     "getJsToken",
//                     "getJdEid",
//                     "pageConfig",
//                     "is_sort_black_list",
//                     "jump_mobile",
//                     "apiHost",
//                     "commonAppId",
//                     "preloadArray",
//                     "seajsConfig",
//                     "login",
//                     "regist",
//                     "createCookie",
//                     "readCookie",
//                     "addToFavorite",
//                     "TrimPath",
//                     "$",
//                     "jQuery",
//                     "seajs",
//                     "define",
//                     "EventEmitterPcItem",
//                     "itemEventBus",
//                     "listenTabVisibileReport",
//                     "totouchbate",
//                     "hashTag",
//                     "href",
//                     "_0x3db2",
//                     "_0x3575",
//                     "ParamsSignMain"
//                 ]
//                 if (!keys.includes('$jsDebugIsRegistered')) {
//                     keys.push('$jsDebugIsRegistered');
//                 }
//                 return keys
//             }
//             if (name === 'document') {
//                 return [
//                     "location"
//                 ]
//             }
//             if (name === 'window' || name === 'document') debugger;
//             return Reflect.ownKeys(...arguments)
//         }
//     })
// }
const crypto = require('crypto').webcrypto;

function watch(object, name) {
    const handler = {
        get: function (target, property, receiver) {
            if (property !== 'isNaN' && property !== 'encodeURI' && property !== "Uint8Array" && property !== 'undefined' && property !== 'JSON') {
                console.log(
                    "对象:", name || object,
                    "方法:", "\x1B[32m[GET]\x1B[0m",
                    "属性名:", property,
                    "属性名类型:", typeof property,
                    "\x1B[33m属性值:\x1B[0m", target[property],
                    "属性值类型:", typeof target[property]
                )
            }
            return Reflect.get(...arguments)

        },
        set: function (target, property, value, receiver) {
            console.log(
                "对象:", name || object,
                "方法:", "\x1B[31m[SET]\x1B[0m",
                "属性名:", property,
                //"新属性值:", value,
                "新属性值类型:", typeof value,
                "旧属性值:", target[property],
                "旧属性值类型:", typeof target[property],
            );
            return Reflect.set(...arguments);
        }
    }
    return new Proxy(object, handler)
}

/**
 * 创建具有特定属性和方法的构造函数
 * 该函数主要用于浏览器环境模拟，可以创建具有严格访问控制、继承支持和原型方法的构造函数
 * 通过外部数据存储和Symbol键实现实例数据隔离，提高安全性和防检测能力
 *
 * @param {string} constructorName - 构造函数的名称，将作为全局变量挂载到window对象上
 * @param {boolean} enableStrictMode - 是否启用严格模式验证，启用后需要特定令牌才能调用构造函数
 * @param {Array} [propertiesList=[]] - 属性定义列表，支持简单字符串属性或自定义属性描述符
 *        - 简单属性：字符串形式，如 "name"
 *        - 自定义属性：数组形式，如 ["all", {get: function() {...}}]
 * @param {Object} [prototypeMethods={}] - 要添加到原型上的方法
 * @param {string} [parentConstructorName=null] - 父构造函数的名称，用于实现继承
 * @returns {Function} 返回新创建的构造函数，同时会挂载到window对象上
 *
 * @example
 * // 创建简单的Person构造函数
 * createConstructor("Person", true, ["name", "age"], {
 *   greet: function() { return `Hello, ${this.name}`; }
 * });
 *
 * @example
 * // 创建继承自Animal的Dog构造函数
 * createConstructor("Dog", true, ["breed"], {
 *   bark: function() { return "Woof!"; }
 * }, "Animal");
 */
// (1) 安全函数实现
const safeFunction = (function () {
    let initialized = false;
    let myFunction_toString_symbol;

    const set_native = function set_native(func, key, value) {
        Object.defineProperty(func, key, {
            "enumerable": false,
            "configurable": true,
            "writable": true,
            "value": value
        });
    };

    return function safeFunction(func) {
        if (!initialized) {
            Function.prototype.$call = Function.prototype.call;
            const $toString = Function.toString;
            myFunction_toString_symbol = Symbol('functionToString');

            const myToString = function myToString() {
                return typeof this === 'function' && this[myFunction_toString_symbol] || $toString.$call(this);
            };

            delete Function.prototype.toString;
            set_native(Function.prototype, "toString", myToString);
            set_native(Function.prototype.toString, myFunction_toString_symbol, "function toString() { [native code] }");

            initialized = true;
        }
        // 避免重复添加
        if (!func.hasOwnProperty(myFunction_toString_symbol)) {
            set_native(func, myFunction_toString_symbol, `function ${func.name || ''}() { [native code] }`);
        }

        return func;
    };
})();

// (2) 构造函数（类构造器）
const CONSTRUCTOR_TOKEN = "constructor_token";

function createConstructor(constructorName, enableStrictMode, propertiesList = [], prototypeMethods = {}, parentConstructorName = null) {
    const instancesData = {};

    // 创建有名称的构造函数
    const constructorFunction = function (element, propertySetter, validationToken) {
        // 验证逻辑
        if (enableStrictMode && !(validationToken && validationToken === CONSTRUCTOR_TOKEN)) {
            throw new Error("Illegal constructor");
        }

        if (parentConstructorName && window[parentConstructorName]) {
            window[parentConstructorName].call(this, element, null, CONSTRUCTOR_TOKEN);
        }

        if (propertySetter && typeof propertySetter === "function") {
            propertySetter(this);
        }

        const instanceProperties = element && typeof element === "object" ? {...element} : {};
        this._element = Symbol('_element');
        instancesData[this._element] = instanceProperties;

        if (element && typeof element === "object") {
            Object.keys(element).forEach(key => {
                if (!this[key]) {
                    this[key] = element[key];
                }
            });
        }
    };

    // 设置函数名
    Object.defineProperty(constructorFunction, 'name', {
        value: constructorName,
        writable: false,
        enumerable: false,
        configurable: true
    });

    // 设置继承关系
    if (parentConstructorName && window[parentConstructorName]) {
        constructorFunction.prototype = Object.create(window[parentConstructorName].prototype);
        constructorFunction.prototype.constructor = constructorFunction;
        Object.setPrototypeOf(constructorFunction, window[parentConstructorName]);
    }

    // 设置toStringTag
    Object.defineProperty(constructorFunction.prototype, Symbol.toStringTag, {
        value: constructorName,
        writable: false,
        enumerable: false,
        configurable: true
    });

    // 添加原型方法
    Object.keys(prototypeMethods).forEach(methodName => {
        constructorFunction.prototype[methodName] = prototypeMethods[methodName];
        if (typeof constructorFunction.prototype[methodName] === "function") {
            safeFunction(constructorFunction.prototype[methodName]);
        }
    });

    // 保护构造函数
    safeFunction(constructorFunction);

    // 将构造函数挂载到全局对象
    window[constructorName] = constructorFunction;

    return constructorFunction;
}

// 二、补环境
// (1) window对象处理
global_val = globalThis   // globalThis  其实就是global  就是node中的顶级变量
// 给global加一个window属性哈  给global全局配一个window属性   给global顶级变量挂载一个全局变量window
Object.defineProperty(global_val, "window", {
    get: function () {
        return global_val
    },
    set: function set_window(val) {
        global_val = val
    },
    enumerable: true,
    configurable: true,

})
// 无论代码调取那个都是指向这个window  做一个全局处理
window.top = window.self = window.window = window
delete window.crypto;
delete global;

// (2)补原型链环境
// EventTarget 后面就没爹了，没爹不用写，默认是Object
createConstructor("EventTarget", true, [], {})
createConstructor("WindowProperties", true, [], {}, "EventTarget")
// 创建Window空间   createConstructor 一般处理的都是大Window这样的类对象，小window一半都是我们自己构建
createConstructor("Window", true, [], {}, "WindowProperties")
// 小window需要和大Window建立父子关系
Object.setPrototypeOf(window, Window.prototype) // 等价 window.__proto__ = Window.prototype
// 给小window补toStringTag方法  因为小window是单独处理的，所以需要单独把这些加进来
Object.defineProperty(window, Symbol.toStringTag, {
    value: "Window",   // '[object Window]'  因为是这个字符串所以需要返回Window
    writable: false,
    enumerable: false,
    configurable: true
});


/* 补Element
* Element --》 Node --》 EventTarget --》 Object
* 因为Element的父类是Node，Node的父类是EventTarget，EventTarget的父类Object，而且在createConstructor方法中，每次在最后面也只能添加一层的父类
* 所以我们给Element设置完父类Node以后，还需要给Node以同样的方式设置父类EventTarget  连续三个createConstructor，这才完成了一个原型串
* */
createConstructor("Node", true, ["parentNode", "childNodes"], {}, "EventTarget")
createConstructor("Element", true, ["childElementCount", "innerHTML"], {}, "Node")

// 补document的爹和爷  document --》 HTMLDocument  --》 Document --》 node  经过查看链，这些方法都在Document中，所以就补在Document类中
createConstructor("Document", true, [], {
    createElement: function createElement(tagName) {
        // 打印一下tagName 看一下创建的是那个标签
        console.log("Document prototype  createElement ", tagName)

        if (tagName === "script") {
            // 因为script后面也有可能调用了别的，所以我们在这里也需要进行监控
            const script = watch(new HTMLScriptElement({
                parentNode: watch(new HTMLHeadElement(null, null
                    , CONSTRUCTOR_TOKEN), "script的parentNode")
            }, null, CONSTRUCTOR_TOKEN), "script对象")
            return script
        }

        // canvas和上面的script就一样了
        if (tagName === "canvas") {
            return {}
        }


    },
    createEvent: function createEvent(eventType) {

    },
    querySelector: function querySelector(selector) {

    },
    getElementsByTagName: function getElementsByTagName(tagName) {

    },
}, "Node")
createConstructor("HTMLDocument", true, [], {}, "Document")


// 补document.all 的爹直接就是Object
createConstructor("HTMLAllCollection", true, [], {})

// 补document.documentElement  HTMLHtmlElement --》 HTMLElement  --》 Element --》 Node --》 EventTarget --》 Object
createConstructor("HTMLElement", true, [], {}, "Element")
createConstructor("HTMLHtmlElement", true, [], {}, "HTMLElement")

// 补document.body   HTMLBodyElement -->  HTMLElement  -->  Element  -->  Node  --> EventTarget --> Object
createConstructor("HTMLBodyElement", true, [], {}, "HTMLElement")

//补script
createConstructor("HTMLScriptElement", true, [], {}, "HTMLElement")
//补parentNode
createConstructor("HTMLHeadElement", true, [], {
    removeChild: function removeChild() {
        console.log("removeChild 被调用了")
    }
}, "HTMLElement")


// （3）添加监控
// 监控document
// window.document = watch({},"document")   给document对象先置空{}，然后在监控起来，监控的名字是"document"，在返回window.document
//如果案例不检测原型链，我们就可以使用基础补环境直接documenti = {}  按照上面的先置空，然后在监控，但是本案例对原型链进行了检测，
// 所以我们需要先通过dir(document)先找到它爹它爷，然后补HTMLDocument --》Document --》 node这样的原型链出来， 最后再用创建的爹HTMLDocument new一个document对象出来
window.document = watch(new HTMLDocument({
    // 这里是document实例化的时候传入的一些属性
    // all:new HTMLAllCollection(null,null,true)  其实这样就实例化一个对象就可以了，但是还有一种可能是document.all.xxx 所以我们也需要在实例化的同时也监控一下
    // 所以我们就watch(new HTMLAllCollection(null,null,true),谁调用的呀)document.all.xxx,也就被监控了
    all: watch(new HTMLAllCollection(null, null, CONSTRUCTOR_TOKEN), "document.all"),

    //按照上面的方式补全documentElement
    documentElement: watch(new HTMLHtmlElement(null, null, CONSTRUCTOR_TOKEN), "document.documentElement"),

    //在补一个cookie属性
    cookie: "__jdu=17648118356681396776962; unpl=JF8EAKBnNSttUU1XVRIFGBASTlVXWw9YHx9WazAMA10MHFxSH1AaGkB7XlVdWRRLFB9uYhRXXlNKXA4bBCsSEHteVVxcDEsRA21uNWRVUCVXSBtsGHwQBhAZbl4IexcCX2cDU1hRS1QMGQYcFRlLX1xZWw5MHwRsVwRkXV57ZDUaMhoiEXsWOl8QCE0QBmZnBV1fXExTDBsAExUWTVpcWV44SicA; areaId=15; PCSYCityID=CN_330000_330100_0; shshshfpa=736d9c46-cdc8-6125-e8d9-d316e1d8886b-1764857359; shshshfpx=736d9c46-cdc8-6125-e8d9-d316e1d8886b-1764857359; xapieid=jdd034ZPA5WU6ABAXY3NAMX4B6XVHCRAUYAWRJ4GHXYCAMA4LKMYDVLUDRQH7UDP7GVOIENTWG7KMW7YJH32HA3K4VZBQAQAAAAM25GZCOJQAAAAADOX2V4X3TPBIOYX; o2State=; ipLoc-djd=15-1213-3038-59932; __jdv=237926171%7Cdirect%7C-%7Cnone%7C-%7C1764811835669; wlfstk_smdl=8cr8ijws7b3povimo31euhr836x5xim6; cn=0; corpBehavior=1; cid=9; bjd_login_checked=1765156165994; user-key=98581e8c-c2b4-4d27-9c49-101110b1d27f; header-language=zh_CN; __USE_NEW_PAGEFRAME__=true; __USE_NEW_PAGEFRAME_VERSION__=v11; language=zh_CN; dsm-lang=zh_CN; b_belong=OKJ4J7LJBNUL5HMCDNV7ZMXXNHPJ6AVJBWM3GBMTO7W6DB3IVIGEMCCURYB6L4LWMY3YMXBKQTJXS3C3TIASQ235BFZBDPM2TH7PIC32NP7CIMFM5V7P4TNRCI4BMKWACRILLM7TGQ5M6ZPHWQRLQT75HULKRHJPRD6IL6I; TrackID=1RoXklNm_rkWNLSXGDRxcAT6uMpdMh-YMbUDNrUKng_ngEOXTMu5rjJjy95N-QhVVnjDU6LCM1ou_O2QtRkV2atJmfUDSTxZXyzuo5i2SUMdjz2IudRGbIbGlbLS7jt8fTaefKvpynR7nfLq89XwShg; pinId=lsQG_9VBX1_t38U8g8sxy0_CHPgS_i7E; pin=jd%E9%92%9B%E5%BA%A6-%E5%95%86%E5%93%81%E8%B4%A2%E5%8A%A1; unick=60v8dj6scm7k3v; ceshi3.com=000; _tp=x7tBDXYBYbmr2RNSebS3RmjS7A7fQwql%2BWYDV5XLt47q7vS9qTdp83TMrS5yjexsWyJ9jNM7mg%2FRElPTByv%2Fjg%3D%3D; 3AB9D23F7A4B3CSS=jdd034ZPA5WU6ABAXY3NAMX4B6XVHCRAUYAWRJ4GHXYCAMA4LKMYDVLUDRQH7UDP7GVOIENTWG7KMW7YJH32HA3K4VZBQAQAAAAM27UQW6YQAAAAADJZYACWSE5MQFEX; _base_=YKH2KDFHMOZBLCUV7NSRBWQUJPBI7JIMU5R3EFJ5UDHJ5LCU7R2NILKK5UJ6GLA2RGYT464UKXAI4JUXB7M672MZOT6FGO2MU2LUEVYO6HDNYTZKH7LBU7KD2QWUB24ZYBRKHS6ICOXUEEOB6TAYX67HM4K7DDHLBNHU6VP7KQA2BBDDBVHPBAVEIGJUQXP3VL52KNRE2QP7PGOY7JQ5JORVMSKSSX4HF5F64VEJGKOFOTJERH5QW4GFANOR7GBUW4TE3RLU7BN5HTVGE2WIEESKVQBDTGHQHRURVFNGXQN45YJHEEYVYLZPY44BILQRVC7PK56W5DENKVWMX57JROSEXOXICDCJHNPDHGFHXQRPQQ6D3YFA; __jda=143920055.17648118356681396776962.1764811836.1765162240.1765183418.18; __jdc=143920055; __jdb=143920055.3.17648118356681396776962|18.1765183418; is_avif=onAVIF; shshshfpb=BApXW8Qcp_v9AmzJWP4-PkVoQumFaHjmxBibEdHZq9xJ1C9ZfOKOP10O5yXLYdqMmNpd584DRn4cQcq087rgG485eNk3rrCKbQvH0f35tEV3A5OASA42rbKzJvB70uDGLXuCinv1k6XajpMLSMVpY0R8ymqM; 3AB9D23F7A4B3C9B=4ZPA5WU6ABAXY3NAMX4B6XVHCRAUYAWRJ4GHXYCAMA4LKMYDVLUDRQH7UDP7GVOIENTWG7KMW7YJH32HA3K4VZBQAQ; sdtoken=AAbEsBpEIOVjqTAKCQtvQu17_PB38uJ6_qFk7xf-VmW7rgO-E162pCTi3B_AhNOS4z1POUGDi6UOOGS3HHm3iXuEiQ65U6aBBAdohXfrJB4sAWqi8ynh_FefXLHrN-IvNqi-oWKz4sv8Hn3b5UZ7_o5jNCXBlNz1LG0",

    //补body
    body: watch(new HTMLBodyElement(null, null, CONSTRUCTOR_TOKEN), "document.body"),

}, null, CONSTRUCTOR_TOKEN), "document")
// 监控window，名字是"window" 重新用window   重新用的名字 = watch(监控对象, 监控的名字)
window = watch(window, "window")

// console.log(window.crypto)
// setProxyArr(['window', 'document', 'location', 'navigator', 'history', 'screen']);
