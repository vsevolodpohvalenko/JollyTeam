import React, {useState} from "react";
import s from './manufacturers.module.css'
import cn from "classnames";

const Profile = (props) => {
    return(
        <div className={s.manufacturer}>
            <img src={props.companyLogo}/>
            <h3>{props.companyName}</h3>
            <h6>{props.country}</h6>
            <p>{props.companyDescription}</p>
        </div>
    )
}

export const Manufacturers = (props) => {
    const [activeCountries, setActiveCountries] = useState(false)
    const [activeCategories, setActiveCategories] = useState(false)
    const [search, setSearch] = useState("")

    const Search = (e) => {
        debugger
        setSearch(e)
        props.GetSearchedData(e)
    }

    const Check = ( e) => {
        const checkBox = document.getElementById(`check${e}`);
        debugger
        if (checkBox.checked === true)
        {setSearch(e)
            props.GetSearchedData(e)}
        else props.GetSearchedData("")
    }

    return(
        <div className={s.main}>
            <div className={s.filter}>
                <h2>Sort results by</h2>
                <input type={"text"} value={search} onChange={(e) => Search(e.target.value)} placeholder={"Search keywords"} className={s.input}/>
                <div className={s.title}><h3>Category</h3> <div className={cn({[s.active] : activeCategories === true}, s.skip)} onClick={() => setActiveCategories(!activeCategories)}></div></div>
                {props.categories.map(c => (
                    <div className={cn({[s.active] : activeCategories === true}, s.select)} key={c.id}>
                        <h6 >{c.Name}</h6>
                        <input onClick={() => props.GetSearchedData(c.Name)} type={"checkbox"} id="check"  className={s.checkbox}/>
                    </div>
                ))}
                <div  className={s.title}> <h3>Country</h3><div className={cn({[s.active] : activeCountries === true}, s.skip)} onClick={() => setActiveCountries(!activeCountries)}/></div>
                {props.countries.map((c, index) => (
                    <div className={cn({[s.active] : activeCountries === true}, s.select)} key={index}>
                        <h6  >{c.name}</h6>
                        <input onClick={()  => Check(c.name)} type={"checkbox"} id={`check${c.name}`}  className={s.checkbox}/>
                    </div>
                ))}
            </div>
            <div className={s.profiles}>

                {props.profiles.map((p) => (
                    <Profile key={p.id} companyLogo={ p.companyLogo } companyName={ p.companyName } country={ p.country } companyDescription={ p.companyDescription }/>
                ))}

            </div>
        </div>
    )
}