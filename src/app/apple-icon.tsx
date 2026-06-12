import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#064e3b",
          color: "#ffffff",
          display: "flex",
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: 96,
          fontWeight: 800,
          height: "100%",
          justifyContent: "center",
          letterSpacing: 0,
          width: "100%",
        }}
      >
        M
      </div>
    ),
    size,
  );
}
