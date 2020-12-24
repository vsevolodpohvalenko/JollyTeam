import React from 'react'
import { SmileOutlined, SmileFilled } from '@ant-design/icons'
import {Typography} from "antd";

export const Activate = (props: any) => {

    const { Paragraph } = Typography
    return(
             <Typography.Title style={{marginTop: "40vh", textAlign: "center"}} level={5} >Your account has been activated successful</Typography.Title>
    )
}

