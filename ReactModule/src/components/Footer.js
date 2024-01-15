import styles from "./Footer.module.css";
import { FaGithub } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer>
      <>
        <div className={styles["footer-container"]}>
          <div className={styles["footer-item1"]}>
            <img className={styles.navImg} src="./logo.png" alt="Logo" />
            <div className={styles["footer-item1-text"]}>
              <a
                className={styles["footer-item1-text-icos"]}
                href="https://github.com/ruip005/DWDM_Projeto_Uber"
                target="_blank"
              >
                <FaGithub className={styles["footer-item1-text-icos-icon"]} />
                <span className={styles["footer-item1-text-icos-label"]}>
                  Github
                </span>
              </a>
              <a
                className={styles["footer-item1-text-icos"]}
                href="https://www.instagram.com/uw33d/"
                target="_blank"
              >
                <RiInstagramFill
                  className={styles["footer-item1-text-icos-icon"]}
                />
                <span className={styles["footer-item1-text-icos-label"]}>
                  Instagram
                </span>
              </a>
            </div>
          </div>
          <div className={styles["footer-item2"]}>
            <p className={styles["footer-item2-text"]}>
              © {new Date().getFullYear()} Meal on Demand. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </>
    </footer>
  );
};

export default Footer;
