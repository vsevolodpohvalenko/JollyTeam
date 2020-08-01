import React from "react";
import defaultImage from "../../media/default.jpg";
import clothesForCouples from '../../media/clothes.png'
import mansClothes  from '../../media/suit.svg'
import SportsWear from '../../media/boots.svg'
import womansClothes from '../../media/dress.svg'
import s from './Profile.module.css'
import {Link} from "react-router-dom";

export const Profile = (props) => {
    debugger
    const profile = props.profiles.filter( p => p.id === Number(props.ProfileId))
    const document = props.my_documents.filter( d => d.id === Number(props.ProfileId))
    return <div className={s.main}>
        {profile.map(p => (
            <div>
                <div className={s.back} style={
                    {backgroundImage: ` linear-gradient( rgba(56, 56, 56, 0.596), rgba(56, 56, 56, 0.596), rgba(56, 56, 56, 0.596), rgba(255, 255, 255, 0.56) ),  url(${( p.companyProfilePicture || defaultImage)})`}}>
                    <div className={s.name_country}>
                        <img alt={"logo"} className={s.logo} src={p.companyLogo}/>
                        <div>
                            <h3>{p.companyName}</h3>
                            <h5>{p.country}</h5>
                        </div>
                    </div>
                </div>
                <div className={s.box_size}>
                    <p>{p.companyDescription}</p>
                    <p>{p.section}</p>
                    {profile && JSON.parse(p.sections).map(e => (
                            <div className={s.section}>
                                <div>
                                    {e.Icon === "Clothes For Couples" && (<img alt={"icon"} className={s.icon} src={clothesForCouples}/>)}
                                    {e.Icon === "Man's Clothes" && (<img alt={"icon"}  className={s.icon} src={mansClothes}/>)}
                                    {e.Icon === "SportsWear" && (<img alt={"icon"} className={s.icon} src={SportsWear}/>)}
                                    {e.Icon === "Woman's Clothes" && (<img alt={"icon"} className={s.icon} src={womansClothes}/>)}

                                    <h3>{e.Title}</h3>
                                </div>
                                <p>{e.Text}</p>

                            </div>
                        )
                    )}
                </div>
            </div>
        ))}
        {document.map(d => (<div className={s.box_size}>
                <a href={d.Download} download><img alt={"thumbnail"} src={d.Thumbnail}/></a>
                <small>{d.Title}</small>
                <a href={d.Download} download>Download</a>
            </div>
        ))}

    </div>

}