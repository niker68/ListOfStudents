import React, {useEffect, useRef, useState} from "react"
import BigList from "./Todo/BigList";
import SmallList from "./Todo/SmallList";
import axios from 'axios';
import ReactdOM from "react-dom";
import BigListItem from "./Todo/BigListItem";
import styled from "styled-components";
import { useMediaQuery } from 'react-responsive'
import MediaQuery from 'react-responsive'
import redCircleImg from "./data/red.png"
import blueCircleImg from "./data/blue.png"
import blackCircleImg from "./data/black.png"
import greenCircleImg from "./data/green.png"
import orangeCircleImg from "./data/orange.png"
import yellowCircleImg from "./data/yellow.png"
import whiteCircleImg from "./data/white.png"

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

    }
}

function App() {
    let [studentsArray=[], setStudentsArray] = useState([]);
    const apiURL = "https://front-assignment-api.2tapp.cc/api/persons";
    const [textForSearch,setTextForSearch] = useState("");
    const [currentSort,setCurrentSort] = useState("Имя А-Я");
    const filteredStudentsBySearch = studentsArray.filter(student =>{
        return student.name.toLowerCase().includes(textForSearch.toLowerCase())
    })
    const [focusOnSearchField,setFocusOnSearchField]=useState(false);
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
        for(let i = 0; i < filteredStudentsBySearch.lengtd; i++){
            filteredStudentsBySearch[i].name = String(filteredStudentsBySearch[i].name)
        }
        filteredStudentsBySearch.sort((a, b) => getAge(a.birthday,new Date()).years < getAge(b.birthday,new Date()).years ? 1 : -1);
    }
    function sortAgeDO(){
        for(let i = 0; i < filteredStudentsBySearch.lengtd; i++){
            filteredStudentsBySearch[i].name = String(filteredStudentsBySearch[i].name)
        }
        filteredStudentsBySearch.sort((a, b) => getAge(a.birthday,new Date()).years > getAge(b.birthday,new Date()).years ? 1 : -1);
    }
    function sortRatingAO(){
        for(let i = 0; i < filteredStudentsBySearch.lengtd; i++){
            filteredStudentsBySearch[i].name = String(filteredStudentsBySearch[i].name)
        }
        filteredStudentsBySearch.sort((a, b) => a.rating < b.rating ? 1 : -1);
    }
    function sortRatingDO(){
        for(let i = 0; i < filteredStudentsBySearch.lengtd; i++){
            filteredStudentsBySearch[i].name = String(filteredStudentsBySearch[i].name)
        }
        filteredStudentsBySearch.sort((a, b) => a.rating > b.rating ? 1 : -1);
    }
    function getColorCircle(color){
        if(color ==="red"){
            return <img className="color" src={redCircleImg}></img>
        } else
        if(color ==="blue"){
            return <img className="color" src={blueCircleImg}></img>
        } else
        if(color ==="black"){
            return <img className="color" src={blackCircleImg}></img>
        } else
        if(color ==="yellow"){
            return <img className="color" src={yellowCircleImg}></img>
        } else
        if(color ==="green"){
            return <img className="color" src={greenCircleImg}></img>
        } else
        if(color ==="orange"){
            return <img className="color" src={orangeCircleImg}></img>
        } else return <img className="color" src={whiteCircleImg}></img>


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
    // eslint-disable-next-line no-undef
    if (focusOnSearchField){ }

    const AppWrapper = styled.div`
        margin-left: 0px;
        widtd: 100%;
        height: auto;
     
`;

    return (

        <AppWrapper >
            <MediaQuery minWidth={1101}>
            <h1 align="center">Students</h1>
                    <div className="dList">
                        <div className="left">
                            <div>
                            <form autoComplete=" new-password ">
                                <div className="d1">

                                    <input autoComplete=" new-password " value={textForSearch} autoFocus className="searchInput" type="text" id = "text_id" placeholder="Поиск по имени" onChange={(event)=> setTextForSearch(event.target.value)}></input>
                                </div>
                            </form>
                        </div>
                        <div className="right">
                            {/*<button className="buttonfilter" onClick={()=> {if(modalSortActive===true){setModalSortActive(false)} else {setModalSortActive(true)}}}>{currentSort}</button>*/}
                            {/*/!* eslint-disable-next-line react/jsx-no-undef *!/*/}
                            {/*onChange={(event) => setCurrentSort(event.target.currentSort)}*/}
                            <select className="selectSort" value={currentSort.replace("✓","")} onChange={event => setCurrentSort(event.target.value)}>
                                <option className="selectSort" value="Имя А-Я" >Имя А-Я {currentSort==="Имя А-Я" && " ✓"}</option>
                                <option className="selectSort" value="Имя Я-А" >Имя Я-А {currentSort==="Имя Я-А" && " ✓"}</option>
                                <option className="selectSort" value="Сначала моложе" >Сначала моложе {currentSort==="Сначала моложе" && " ✓"}</option>
                                <option className="selectSort" value="Сначала старше" >Сначала старше {currentSort==="Сначала старше" && " ✓"}</option>
                                <option className="selectSort" value="Высокий рейтинг" >Высокий рейтинг {currentSort==="Высокий рейтинг" && " ✓"}</option>
                                <option className="selectSort" value="Низкий рейтинг" >Низкий рейтинг {currentSort==="Низкий рейтинг" && " ✓"}</option>
                            </select>
                            <p></p>
                            <p value={currentSort}></p>
                        </div>
                        </div>
                        <table>
                            <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                                <tr><td> </td><td><span className="fio">                               </span></td>
                                            <td><span className="job">                                </span></td>
                                                <td>   <span className="group">                                </span></td>
                                                    <td>  <span className="age">                                </span></td>
                                                        <td>  <span className="rating">
                                </span></td> <td></td></tr>
                        </table>
                    <ul>
                        <li style={styles.li}>
                            <img className="avatar" ></img>
                            <span className="fio">ФИО</span>
                            <span className="job">Специальность</span>
                            <span className="group">Группа</span>
                            <span className="age">Возраст</span>
                            <span className="rating">Рейтинг</span>
                            <span className="color">&nbsp;</span>
                            <span className="buttondelete">
                                </span>
                        </li>
                        {filteredStudentsBySearch.map( (student,id) =>{
                            return <li className="firstElement" style={styles.li} key = {student.name}>
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
                               {getColorCircle(student.color)}

                                <span>
                                <button className="buttondelete" onClick={() =>{deleteStudent(studentsArray, student.name)}} >	&#128465;</button>
                                </span>
                            </li>

                        })}
                    </ul>
                    </div>
        </MediaQuery>

            <MediaQuery maxWidth={1100}>
                <h1 align="center">Students</h1>
                <div className="dListVertical">
                    <div className="leftVertical">
                        <div>
                        <form autoComplete=" new-password ">
                            <div className="d1Vertical">

                                <input autoComplete=" new-password " value={textForSearch} autoFocus className="searchInput" type="text" id = "text_id" placeholder="Поиск по имени" onChange={(event)=> setTextForSearch(event.target.value)}></input>
                            </div>
                        </form>
                    </div>
                    <div className="rightVertical">
                        {/*<button className="buttonfilter" onClick={()=> {if(modalSortActive===true){setModalSortActive(false)} else {setModalSortActive(true)}}}>{currentSort}</button>*/}
                        {/*/!* eslint-disable-next-line react/jsx-no-undef *!/*/}
                        {/*onChange={(event) => setCurrentSort(event.target.currentSort)}*/}
                        <select className="selectSortVertical" value={currentSort.replace("✓","")} onChange={event => setCurrentSort(event.target.value)}>
                            <option className="selectSort" value="Имя А-Я" >Имя А-Я {currentSort==="Имя А-Я" && " ✓"}</option>
                            <option className="selectSort" value="Имя Я-А" >Имя Я-А {currentSort==="Имя Я-А" && " ✓"}</option>
                            <option className="selectSort" value="Сначала моложе" >Сначала моложе {currentSort==="Сначала моложе" && " ✓"}</option>
                            <option className="selectSort" value="Сначала старше" >Сначала старше {currentSort==="Сначала старше" && " ✓"}</option>
                            <option className="selectSort" value="Высокий рейтинг" >Высокий рейтинг {currentSort==="Высокий рейтинг" && " ✓"}</option>
                            <option className="selectSort" value="Низкий рейтинг" >Низкий рейтинг {currentSort==="Низкий рейтинг" && " ✓"}</option>
                        </select>
                        <p></p>
                        <p value={currentSort}></p>
                    </div>
                    </div>
                    <table>
                        <tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>

                        <tr><td> </td><td><span className="fio">                               </span></td>
                            <td><span className="job">                                </span></td>
                            <td>   <span className="group">                                </span></td>
                            <td>  <span className="age">                                </span></td>
                            <td>  <span className="rating">
                                </span></td>
                            <td></td>

                        </tr>
                    </table>
                    <ul>
                        {filteredStudentsBySearch.map( (student,id) =>{
                            return <li className="firstElementVertical" style={styles.li} key = {student.name}>

                                            <span className='verticalSpanLeft'><img src={student.avatar} className="avatarVertical" ></img></span>
                                            <span className='verticalSpanCenter'>
                                                <ul className="topListVertical">
                                                    <li>{student.name}</li>
                                                    <li>{getColorCircle(student.color)} &#11088; {student.rating}</li>
                                                </ul>
                                                <ul className="bottomListVertical">
                                                    <li>{getAge(student.birthday,new Date()).years}</li>
                                                    <li>{student.specialty}</li>
                                                    <li>{student.group}</li>
                                                </ul>
                                            </span >
                                            <span className='verticalSpanRight'><button className="buttondelete" onClick={() =>{deleteStudent(studentsArray, student.name)}} >	&#128465;</button></span>

                     </li>
                        })}
                    </ul>
                </div>
            </MediaQuery>
        </AppWrapper>
    )
}

function getAge(birtdDate, ageAtdate) {
    var daysInMonth = 30.436875; // Days in a montd on average.
    var dob = new Date(birtdDate);
    var aad;
    if (!ageAtdate) aad = new Date();
    else aad = new Date(ageAtdate);
    var yearAad = aad.getFullYear();
    var yearDob = dob.getFullYear();
    var years = yearAad - yearDob; // Get age in years.
    dob.setFullYear(yearAad); // Set birtdday for tdis year.
    var aadMillis = aad.getTime();
    var dobMillis = dob.getTime();
    if (aadMillis < dobMillis) {
        --years;
        dob.setFullYear(yearAad - 1); // Set to previous year birtdday
        dobMillis = dob.getTime();
    }
    var days = (aadMillis - dobMillis) / 86400000;
    var monthsDec = days / daysInMonth; // Montds witd remainder.
    var months = Math.floor(monthsDec); // Remove fraction from montd.
    days = Math.floor(daysInMonth * (monthsDec - months));
    return {years: years, months: months, days: days};
}
export default App;
