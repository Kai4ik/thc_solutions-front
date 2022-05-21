import React from "react";
import styles from "./mission.module.css";

export const Mission = () => {
  return (
    <section className={styles.missionMain}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className={styles.topSvg}
      >
        <path
          fill="white"
          fillOpacity="1"
          d="M0,192L48,186.7C96,181,192,171,288,176C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
      <div className={styles.hero}>
        <div className={styles.title} id="title">
          OUR MISSION
        </div>
        <p>
          We are growing right alongside you! As your projects come to fruition,
          we are constantly looking for new items to stock for your convenience!
          Give us a call, and we can fulfill any order, big or small!
        </p>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className={styles.svg}
      >
        <path
          fill="white"
          fillOpacity="1"
          d="M0,192L48,186.7C96,181,192,171,288,176C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </section>
  );
};
