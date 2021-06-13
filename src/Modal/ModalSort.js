import React from "react";
import "./modalSort.css";
const styles ={
    li : { display: "flex",
        style: "none"
    }
}
const ModalSort = ({active,setActive, sort, setSort}) => {
    return (
       <div className ={active ? "modal_active" : "modal"} onClick={()=> {if(active===true){setActive(false)} else {setActive(true)}}}>
           <div className = "modal__content">
               <ul>
                   <li style={styles.li}><button className="buttonfilter" onClick={()=>setSort("Имя А-Я")}>Имя А-Я </button>{sort==="Имя А-Я" && <span>&#160;	&#10003;</span>}</li>
                   <li style={styles.li}><button className="buttonfilter" onClick={()=>setSort("Имя Я-А")}>Имя Я-А </button>{sort==="Имя Я-А" && <span>&#160;	&#10003;</span>}</li>
                   <li style={styles.li}><button className="buttonfilter" onClick={()=>setSort("Сначала моложе")}>Сначала моложе </button>{sort==="Сначала моложе" && <span>&#160;	&#10003;</span>}</li>
                   <li style={styles.li}><button className="buttonfilter" onClick={()=>setSort("Сначала старше")}>Сначала старше </button>{sort==="Сначала старше" && <span>&#160;	&#10003;</span>}</li>
                   <li style={styles.li}><button className="buttonfilter" onClick={()=>setSort("Высокий рейтинг")}>Высокий рейтинг </button>{sort==="Высокий рейтинг" && <span>&#160;	&#10003;</span>}</li>
                   <li style={styles.li}><button className="buttonfilter" onClick={()=>setSort("Низкий рейтинг")}>Низкий рейтинг </button>{sort==="Низкий рейтинг" && <span>&#160;	&#10003;</span>}</li>
               </ul>
           </div>
       </div>
    )
}
export default ModalSort;