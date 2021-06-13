import React from "react"
import PropTypes from "prop-types"
import BigList from "./BigList";

const styles = {
    li:{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding : ".5rem 1rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
        marginBottom: ".5rem"
    }
}

 function BigListItem({ student}){
    return (

            <li style = {styles.li}>
                <span className="photo">
                </span>
                <span className="fio">{student.fio}
                </span>
                <span className="job">{student.job}
                </span>
                <span className="group">{student.group}
                </span>
                <span className="age">{student.age}
                </span>
                <span className="rating">{student.rating}
                </span>
                <span className="color">{student.color}
                </span>
                <span>
                <button className="buttondelete" >&times;</button>
                </span>
                </li>

    )
}

BigListItem.propTypes = {
   student: PropTypes.object.isRequired,
    index: PropTypes.number
}

export default BigListItem