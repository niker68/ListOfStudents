import React, {useEffect, useState} from "react"
import BigList from "./Todo/BigList";
import SmallList from "./Todo/SmallList";
import axios from 'axios';
import ReactDOM from "react-dom";
import BigListItem from "./Todo/BigListItem";
import ModalSort from "./Modal/ModalSort";

const styles = {
    table:{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding : ".5rem 1rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
        marginBottom: ".5rem"} ,
    li:{
        style: "none",
        display: "flex",
        alignItems: "center",
        padding : ".5rem 1rem",
        border: "1px",
        borderRadius: "4px",
        marginBottom: ".5rem"
    }
}

function App() {
    let [studentsArray=[], setStudentsArray] = useState([]);
    const apiURL = "https://front-assignment-api.2tapp.cc/api/persons";
    const [textForSearch,setTextForSearch] = useState("");
    const[modalSortActive, setModalSortActive] = useState(false);
    const [currentSort,setCurrentSort] = useState("Имя А-Я");
    const filteredStudentsBySearch = studentsArray.filter(student =>{
        return student.name.toLowerCase().includes(textForSearch.toLowerCase())
    })
    function deleteStudent (studentsArrayForDelete,name)  {
        // eslint-disable-next-line array-callback-return
        const resultArray=[];
        studentsArrayForDelete.map( (student,id) =>{
            if(!(student.name === name)){
                resultArray.push(student)
            }
            console.log("push " + student.name)
        })
        console.log(resultArray);
        setStudentsArray(resultArray);
    }
    useEffect( async  () => {
        await fetch(apiURL)
            .then(response => response.json())
            .then(data => setStudentsArray(data.students)).catch(error => alert(error.message));
    }, []);
    console.log(studentsArray);
    function sortAZ(){
        for(let i = 0; i < filteredStudentsBySearch.length; i++){
            filteredStudentsBySearch[i].name = String(filteredStudentsBySearch[i].name)
        }
        filteredStudentsBySearch.sort((a, b) => a.name > b.name ? 1 : -1);
    }
    function sortZA(){
        for(let i = 0; i < filteredStudentsBySearch.length; i++){
            filteredStudentsBySearch[i].name = String(filteredStudentsBySearch[i].name)
        }
        filteredStudentsBySearch.sort((a, b) => a.name < b.name ? 1 : -1);
    }
    function sortAgeAO(){
        for(let i = 0; i < filteredStudentsBySearch.length; i++){
            filteredStudentsBySearch[i].name = String(filteredStudentsBySearch[i].name)
        }
        filteredStudentsBySearch.sort((a, b) => getAge(a.birthday,new Date()).years < getAge(b.birthday,new Date()).years ? 1 : -1);
    }
    function sortAgeDO(){
        for(let i = 0; i < filteredStudentsBySearch.length; i++){
            filteredStudentsBySearch[i].name = String(filteredStudentsBySearch[i].name)
        }
        filteredStudentsBySearch.sort((a, b) => getAge(a.birthday,new Date()).years > getAge(b.birthday,new Date()).years ? 1 : -1);
    }
    function sortRatingAO(){
        for(let i = 0; i < filteredStudentsBySearch.length; i++){
            filteredStudentsBySearch[i].name = String(filteredStudentsBySearch[i].name)
        }
        filteredStudentsBySearch.sort((a, b) => a.rating < b.rating ? 1 : -1);
    }
    function sortRatingDO(){
        for(let i = 0; i < filteredStudentsBySearch.length; i++){
            filteredStudentsBySearch[i].name = String(filteredStudentsBySearch[i].name)
        }
        filteredStudentsBySearch.sort((a, b) => a.rating > b.rating ? 1 : -1);
    }

    if (currentSort ==="Сначала старше"){
        sortAgeAO();
    }
    if (currentSort ==="Сначала моложе"){
        sortAgeDO();
    }
    if (currentSort ==="Имя А-Я"){
        sortAZ();
    }
    if (currentSort ==="Имя Я-А"){
        sortZA();
    }
    if (currentSort ==="Высокий рейтинг"){
        sortRatingAO();
    }
    if (currentSort ==="Низкий рейтинг"){
        sortRatingDO();
    }



    return (
        <div class="container">
            <h1 align="center">Students
            </h1>

                    <div className="dList">
                        <div className="left">
                            <form>
                                <div className="d1">
                                    <input type="text" id = "text_id" placeholder="Поиск по имени" onChange={(event)=> setTextForSearch(event.target.value)}></input>
                                </div>
                            </form>
                        </div>
                        <div className="right">
                            <button className="buttonfilter" onClick={()=> {if(modalSortActive===true){setModalSortActive(false)} else {setModalSortActive(true)}}}>{currentSort}</button>
                            {/* eslint-disable-next-line react/jsx-no-undef */}

                        </div>
                    <ul>
                        <li style={styles.li}>
                            <img className="avatar" ></img>
                            <span className="fio">ФИО</span>
                            <span className="job">Специальность</span>
                            <span className="group">Группа</span>
                            <span className="age">Возраст</span>
                            <span className="rating">Рейтинг</span>
                            <span className="color"></span>
                            <span>
                                <button className="buttondelete"  ></button>
                                </span>
                        </li>
                        {filteredStudentsBySearch.map( (student,id) =>{

                            return <li style={styles.li} key = {student.name}>
                                    <img src={student.avatar} className="avatar" ></img>
                                <span className="fio">{student.name}
                                 </span>
                                <span className="job">{student.specialty}
                                </span>
                                <span className="group">{student.group}
                                </span>
                                <span className="age">{getAge(student.birthday,new Date()).years}
                                </span>
                                <span className="rating">{student.rating}
                                </span>
                                <span className="color">{student.color}
                                </span>
                                <span>
                                <button className="buttondelete" onClick={() =>{deleteStudent(studentsArray, student.name)}} >&times;</button>
                                </span>
                            </li>
                        })}
                    </ul>
                    </div>
            <ModalSort className = "modalSort" active = {modalSortActive} setActive = {setModalSortActive} sort = {currentSort} setSort = {setCurrentSort}>
            </ModalSort>
        </div>


    )

}

function getAge(birthDate, ageAtDate) {
    var daysInMonth = 30.436875; // Days in a month on average.
    var dob = new Date(birthDate);
    var aad;
    if (!ageAtDate) aad = new Date();
    else aad = new Date(ageAtDate);
    var yearAad = aad.getFullYear();
    var yearDob = dob.getFullYear();
    var years = yearAad - yearDob; // Get age in years.
    dob.setFullYear(yearAad); // Set birthday for this year.
    var aadMillis = aad.getTime();
    var dobMillis = dob.getTime();
    if (aadMillis < dobMillis) {
        --years;
        dob.setFullYear(yearAad - 1); // Set to previous year birthday
        dobMillis = dob.getTime();
    }
    var days = (aadMillis - dobMillis) / 86400000;
    var monthsDec = days / daysInMonth; // Months with remainder.
    var months = Math.floor(monthsDec); // Remove fraction from month.
    days = Math.floor(daysInMonth * (monthsDec - months));
    return {years: years, months: months, days: days};
}
export default App;
