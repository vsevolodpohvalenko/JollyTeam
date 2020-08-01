import React from "react";
import defaultImage from "../../../../media/default.jpg";
import clothesForCouples from '../../../../media/clothes.png'
import mensClothing  from '../../../../media/suit.svg'
import Sportswear from '../../../../media/boots.svg'
import womansClothes from '../../../../media/dress.svg'
import s from './ProfileView.module.css'
import {Link} from "react-router-dom";

export const ProfileView = (props) => {
    debugger
    return <div className={s.main}>
        {props.profiles.map(p => (
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
                    <div className={[ s.edit_button, s.edit].join(' ') }><Link  to={"/profileEdit"}>Edit</Link></div>
                </div>

                <div className={s.box_size}>
                    <div className={[ s.button].join(' ') }><Link  to={"/profileEdit"}>Edit</Link></div>
                    <p>{p.companyDescription}</p>
                    <div className={s.Sections}>
                    <p>{p.section}</p>
                    {props.profiles[0] && JSON.parse(p.sections).map(e => (
                            <div className={s.section}>
                                <div>
                                    {e.Icon === "Clothes For Couples" && (<img alt={"icon"} className={s.icon} src={clothesForCouples}/>)}
                                    {e.Icon === "Men's clothing" && (<img alt={"icon"}  className={s.icon} src={mensClothing}/>)}
                                    {e.Icon === "Sportswear" && (<img alt={"icon"} className={s.icon} src={Sportswear}/>)}
                                    {e.Icon === "Woman's Clothes" && (<img alt={"icon"} className={s.icon} src={womansClothes}/>)}

                                    <h3>{e.Title}</h3>
                                </div>
                                <p>{e.Text}</p>

                            </div>
                        )
                    )}
                    </div>
                </div>
            </div>
        ))}
        <div className={[s.Documents].join(' ')} >
        {props.my_documents.map(d => (<div >
                <a href={d.Download} download><img alt={"thumbnail"} src={d.Thumbnail}/></a>
                <p>{d.Title}</p>
                <a href={d.Download} download>Download</a>
            </div>
        ))}
        </div>
    </div>

}