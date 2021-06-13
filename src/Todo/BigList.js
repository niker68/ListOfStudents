import React from "react"
import BigListItem from "./BigListItem";
import PropTypes from "prop-types"

const styles = {
    li:{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding : ".5rem 1rem",
        border: "1px",
        borderRadius: "4px",
        marginBottom: ".5rem"
    }
}

function BigList(studentsArray){
    return (
        <ul >
            <li style = {styles.li}>
                <span className="photo">
                </span>
                <span className="fio">ФИО
                </span>
                <span className="job">Специальность
                </span>
                <span className="group">Группа
                </span>
                <span className="age">Возраст
                </span>
                <span className="rating">Рейтинг
                </span>
                <span className="color">
                </span>
                <span className="buttondelete">
                </span>
            </li>
            {studentsArray.map( (student) =>{
               return <li><BigListItem student = {student} key={student.id}/></li>
            })}
        </ul>
    )
}

BigList.propTypes = {
    students: PropTypes.array
}

export default BigList