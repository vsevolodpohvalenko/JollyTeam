import React, {useState} from 'react'
import s from './Home.module.css'
import cn from "classnames";
import {Link, NavLink, useHistory} from 'react-router-dom'
import {Input} from 'antd';

type PropsType = {
    logout: () => void,
    GetSearchedData: (search: string) => any,
    isAuthenticated: boolean | null,
}

export const Home: React.FC<PropsType> = ({logout, GetSearchedData, isAuthenticated}) => {
    const history = useHistory();
    const Search = (search: string) => {
        debugger
        // @ts-ignore
        GetSearchedData(search).then(() => {
            history.push('/companies')
        })
    }





    const guestLinks = (
      <div className={s.auth}>
      <ul >
      <li><NavLink to="/register">Sing Up</NavLink></li>
      <li><NavLink to="/login" >Sing In</NavLink></li> 
    </ul></div>)


    const authLinks = (
        <div className={s.auth}>
            <ul>
                <li><a onClick={logout} href="/login">Logout</a></li>
            </ul>
        </div>)


    const [active, setActive] = useState(true)
    const [search, setSearch] = useState(" ")

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            Search(search)
        }
    }

    return <div className={s.homebody}>
        <header className={s.header}>
            <a href="/" className={s.logo}> Jolly<span className="text-danger">T</span>eam<span
                className="text-danger">.</span></a>
            <div onClick={() => setActive(!active)} className={cn({[s.active]: active === true}, s.menu_toogle)}></div>
            <nav className={cn({[s.active]: active === true}, s.homenav)}>
                <ul>
                    <li><NavLink to="/companies"> Companies</NavLink></li>
                    <li><NavLink to="/faq">FAQ</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                </ul>
            {isAuthenticated ? authLinks : guestLinks}


            </nav>

            <div className={s.clearfix}></div>
        </header>
        <div className={s.main}>
            <h3 className={s.homeh3}>Finding the right supplier is complicated. JollyTeam makes it easier</h3>
            <Link to="/request_for_quotation" type="submit" className={s.button}>
                Request For Quotation
            </Link>
            <Link to="/companies" type="submit" className={s.button}>
                Companies Overview
            </Link>
            <div className={s.inputWrapper}>
                <div className={s.icon} onClick={() => Search(search)}/>
                <Input placeholder="Search Companies" onKeyDown={handleKeyDown}
                       onChange={(e) => setSearch(e.target.value)} value={search} type="text"/>
            </div>
        </div>
        </div> //:  <Redirect to={props.page[0].find}/>
}