import React from "react";
import styles from "./loading.module.css";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import * as plant from "./lf30_editor_akvgfotv.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: plant.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const Loading = () => {
  return (
    <FadeIn>
      <div
        style={{
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 data-text="Loading" className={styles.loadingText}>
          Loading
        </h1>
        <Lottie
          style={{ margin: "0 0 40px 0" }}
          options={defaultOptions}
          height={190}
          width={130}
        />
      </div>
    </FadeIn>
  );
};
