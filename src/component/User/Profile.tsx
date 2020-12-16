import React, {useEffect} from "react";
import defaultImage from "../../media/default.jpg";
import s from './Profile.module.css'
import {useDispatch, useSelector} from "react-redux";
import {GetDocumentsSelector, GetSuitableProfile} from "../../redux/reducers/Profile-selectors";
import {GetDocuments, GetProfiles} from "../../redux/reducers/ProfileReducer";
import {RouteComponentProps, withRouter, WithRouterProps, WithRouterStatics} from "react-router";
import {
    ApiOutlined,
    BulbOutlined,
    CarOutlined,
    CoffeeOutlined,
    FormatPainterOutlined,
    SettingOutlined,
    ShopOutlined,
    SkinOutlined
} from "@ant-design/icons";

type PropsType = {

    ProfileId: number,

}

export const Profile: React.ComponentClass<Omit<RouteComponentProps<any>, keyof RouteComponentProps<any>> & WithRouterProps<(props: number) => JSX.Element>> & WithRouterStatics<(props: any) => JSX.Element> = withRouter((props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetDocuments())
        dispatch(GetProfiles())
    }, [])

    const profiles: Array<{
        id: number,
        companyProfilePicture: string,
        companyName: string,
        companyDescription: string,
        country: string,
        companyLogo: string,
        sections: string,
        owner: number
    }> = useSelector(GetSuitableProfile)
    const my_documents: Array<{
        id: number,
        Title: string,
        Thumbnail: string,
        Download: string,
        owner: number
    }> = useSelector(GetDocumentsSelector)
    debugger
    const profile = profiles.filter(p => p.id === Number(props.match.params.id))
    return <div className={s.main}>
        {profile.map(p => (
            <div>
                <div className={s.back} style={
                    {backgroundImage: ` linear-gradient( rgba(56, 56, 56, 0.596), rgba(56, 56, 56, 0.596), rgba(56, 56, 56, 0.596), rgba(255, 255, 255, 0.56) ),  url(${(p.companyProfilePicture || defaultImage)})`}}>
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
                    {profile && JSON.parse(p.sections).map((e: {
                            Text: string,
                            Icon: string,
                            Title: string,

                        }) => (
                            <div className={s.section}>
                                <div>
                                    {e.Icon === "Logistics companies" && (
                                        <CarOutlined className={s.icon}/>)}
                                    {e.Icon === "Restaurant business" && (
                                        <CoffeeOutlined className={s.icon}/>)}
                                    {e.Icon === "Grocery supplier" && (
                                        <ShopOutlined className={s.icon}/>)}
                                    {e.Icon === "Small manufacturers" && (
                                        <BulbOutlined className={s.icon}/>)}
                                    {e.Icon === "Fabric supplier" && (
                                        <SkinOutlined className={s.icon}/>)}
                                    {e.Icon === "Supplier of kitchen utensils" && (
                                        <SettingOutlined className={s.icon}/>)}
                                    {e.Icon === "Supplier of household appliances" && (
                                        <ApiOutlined className={s.icon}/>)}
                                    {e.Icon === "Interior designers" && (
                                        <FormatPainterOutlined className={s.icon}/>)}


                                    <h3>{e.Title}</h3>
                                </div>
                                <p>{e.Text}</p>

                            </div>
                        )
                    )}
                </div>
            </div>
        ))}
        {my_documents.map(d => (<div className={s.box_size}>
                <a href={d.Download} download><img alt={"thumbnail"} src={d.Thumbnail}/></a>
                <small>{d.Title}</small>
                <a href={d.Download} download>Download</a>
            </div>
        ))}

    </div>

})