import React, {useState} from "react";
import styles from './Paginator.module.css'
import cn from "classnames";

type propsType = {
  totalItemsCount:number
  pageSize:number
  currentPage:number
  onPageChanged: (pageNumber:number)=>void
  portionSize?:number
}
let Paginator:React.FC<propsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize)
  let pages: Array<number> = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  let portionCount = Math.ceil(pagesCount / portionSize)
  let [portionNumber, setPortionNumber] = useState<number>(1)
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
  let rightPortionPageNumber = portionNumber  * portionSize

  return <div className={styles.number}>
    { portionNumber > 1 &&
        <button className={styles.buttonPaginator} onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button> }

    {pages
        .filter(p => p >= leftPortionPageNumber && p<=rightPortionPageNumber)
        .map((p) => {
          return <span className={ cn({
            [styles.selectedPage]: currentPage === p
          }, styles.pageNumber) }
                       key={p}
                       onClick={(e) => {
                         onPageChanged(p);
                       }}>{p}</span>
        })}
    { portionCount > portionNumber &&
        <button className={styles.buttonPaginator} onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button> }


  </div>
}

export default Paginator;
