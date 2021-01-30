import React from 'react'
import { SmileOutlined, SmileFilled } from '@ant-design/icons'
import {Typography} from "antd";
import icon1 from '../../../media/dot-com.jpg'
import icon2 from '../../../media/logo-social.png'

export const Activate = (props: any) => {

    const { Paragraph } = Typography
    return(<div>
            <img style={{display: "none"}} src={icon1}/>
            <img style={{display: "none"}} src={icon2}/>
             <Typography.Title style={{marginTop: "40vh", textAlign: "center"}} level={5} >Your account has been activated successful</Typography.Title>
         </div>
    )
}

