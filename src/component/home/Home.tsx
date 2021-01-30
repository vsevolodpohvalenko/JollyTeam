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
            <div onClick={() => setActive(!active)} className={cn({[s.active]: active === true}, s.menu_toogle)}/>
            <nav className={cn({[s.active]: active === true}, s.homenav)}>
                <ul>
                    <li><NavLink to="/companies"> Companies</NavLink></li>
                    <li><NavLink to="/faq">FAQ</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                </ul>
            {isAuthenticated ? authLinks : guestLinks}


            </nav>

            <div className={s.clearfix}/>
        </header>
        <div className={s.main}>
            <h3 className={s.homeh3}>On our portal you can find suppliers and partners for small businesses</h3>
            <Link to="/request_for_proposals" type="submit" className={s.button}>
                Request For Proposals
            </Link>
            <Link to="/contact" type="submit" className={s.button}>
                Creat a Connection
            </Link>
            <div className={s.inputWrapper}>
                <div className={s.icon} onClick={() => Search(search)}/>
                <input placeholder="Search Companies" onKeyDown={handleKeyDown}
                       onChange={(e) => setSearch(e.target.value)} value={search} type="text"/>
            </div>
        </div>
        </div> //:  <Redirect to={props.page[0].find}/>
}