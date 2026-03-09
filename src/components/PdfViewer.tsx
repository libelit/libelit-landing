import React from "react";
import { RotateDirection, Worker } from "@react-pdf-viewer/core";
import {
  Viewer,
  SpecialZoomLevel,
  RenderPageProps,
} from "@react-pdf-viewer/core";
import { toolbarPlugin, ToolbarSlot } from "@react-pdf-viewer/toolbar";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";

const PdfViewer = ({ file }: any) => {
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",

        flexDirection: "column",
        paddingBottom: "16px",
        margin: "0",
      }}
    >
      <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
        <div style={{ padding: "10px", backgroundColor: "#f0f0f0" }}>
          <Toolbar>
            {(props: ToolbarSlot) => {
              const {
                CurrentPageInput,
                ZoomOut,
                ZoomIn,
                CurrentScale,
                Rotate,
                Download,
                Print,
              } = props;

              return (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <ZoomOut />
                  <ZoomIn />
                  <CurrentScale />
                  <CurrentPageInput />
                  <Rotate direction={RotateDirection.Forward} />
                  <Rotate direction={RotateDirection.Backward} />
                  <Download />
                  <Print />
                </div>
              );
            }}
          </Toolbar>
        </div>
        <div
          style={{ flexGrow: 1, overflow: "auto", backgroundColor: "white" }}
        >
          <Viewer
            fileUrl={file}
            defaultScale={SpecialZoomLevel.PageWidth}
            plugins={[toolbarPluginInstance]}
            renderPage={(props: RenderPageProps) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div style={{ width: "100%" }}>
                  {props.canvasLayer.children}
                </div>
              </div>
            )}
          />
        </div>
      </Worker>
    </div>
  );
};

export default PdfViewer;
