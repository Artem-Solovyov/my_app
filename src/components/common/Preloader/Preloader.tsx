import React from "react";
import preloader from "../../../assets/images/Preloader.gif";
import styles from "./Preloader.module.css"


type PropsType = {

}
let Preloader: React.FC<PropsType> = (props) => {
  return (
      <div>
        <img src={preloader} className={styles.preloader} alt={'preloader'}/>
      </div>
  )
}

export default Preloader