import React, {ChangeEvent, FormEvent, useState} from "react";
import s from './requestForQuotation.module.css'
import style from '../accounts/Profile/ProfileEdit/ProfileEdit.module.css'
import Dropzone from "react-dropzone";
import Select from 'react-select'
import {CustomDropZoneType} from "../accounts/Profile/ProfileEdit/Document";
import {profileAPI} from "../../api/profileApi";


type TextPropsType = {
    element: string,
    type?: string,
    value: any,
    onChange: any

}
let InputText = (props: TextPropsType) => {
    return (<div className={s.inputText}>
            <label>{props.element}</label>
            <input className='form-control' type={props.type} placeholder={`Input your ${props.element.toLowerCase()}`}
                   id={props.element} value={props.value} onChange={props.onChange} required/>
        </div>
    )
}


let CustomSelect = (props: { label: string, value: any, onChange: any, options: Array<{ label: string, value: string }> }) => {
    return (
        <div className={s.customSelect}>
            <label>{props.label}</label>
            <Select className={s.select} options={props.options}
                    placeholder={`Choose your ${props.label.toLowerCase()} from list`} value={props.value}
                    onChange={props.onChange}/>
        </div>
    )
}

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'

};

export const RequestForQuotation = (props: {
    currency: Array<any>, category: Array<{
        id: number,
        Name: string
    }>
}) => {
    const CustomDropZone = (props: CustomDropZoneType) => {

        return (
            <div>
                <label>{props.label}</label>
                <section className={style.thumb}>

                    <Dropzone onDrop={props.onDrop}>
                        {({getRootProps, getInputProps}) => (
                            <div {...getRootProps({className: "dropzone"})}>

                                <input {...getInputProps()} />
                                <div className={s.clip}/>
                                <p>{props.p}</p>
                                <h5>{props.h5}</h5>

                                {!!props.AllowButton && (<button type="button">
                                    Upload
                                </button>)}
                            </div>
                        )}
                    </Dropzone>
                </section>
            </div>
        )
    }

    const handleDrop4 = (aceptedFiles: any) => {
        debugger
        setAttachments(aceptedFiles.map((file: any) => Object.assign(file, {
                preview: URL.createObjectURL(file)

            }
        )));
        console.log(attachments)
    }


    const Thumbs = () => {
        debugger
        const file: any = attachments[0]
        return (
            <div className={s.preview} key={file.name}>
                <div className={style.thumbInner}>
                    <img
                        alt="thumbnail"
                        src={file.preview}
                        style={img}
                    />
                </div>
            </div>)
    }

    const options = props.currency.map((c) => {
        return {value: c.currencies[0].code, label: c.currencies[0].code}
    })

    const categoryOptions = props.category.map(c => {
        return {value: c.Name, label: c.Name}
    })

    const [keywords, setKeywords] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [descriptions, setDescriptions] = useState<string>("")
    const [attachments, setAttachments] = useState<any>("")
    const [preferred_currency, setPreferred_currency] = useState<string>("")
    const [preferred_unit_price, setPreferred_unit_price] = useState<string>("")
    const [preferred_shipping_agreement, setPreferred_shipping_agreement] = useState<string>("")
    const [destinationPort, setDestinationPort] = useState<string>("")
    const [payment_method, setPayment_method] = useState<string>("")
    const [privacy_policy, setPrivacy_policy] = useState<boolean>(false)

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let form_data = new FormData();
        form_data.append("keywords", keywords)
        form_data.append("category", category)
        form_data.append("descriptions", descriptions)
        form_data.append('attachments', attachments[0], attachments[0].name)
        form_data.append("preferredCurrency", preferred_currency)
        form_data.append("preferredUntilPrice", preferred_unit_price)
        form_data.append("preferredShippingAgreement", preferred_shipping_agreement)
        form_data.append("destinationPort", destinationPort)
        form_data.append("paymentMethod", payment_method)
        form_data.append("iAgree", String(privacy_policy))
        profileAPI.postRequestForQuotations(form_data)

    }

    return (<div className={s.main}>
        <h2>Tell suppliers what you need</h2>
        <p>The more specific your information, the more accurately we can match your request to the right suppliers</p>
        <form className="form-group" onSubmit={HandleSubmit}>
            <div className={s.double}>
                <InputText element="Keywords" value={keywords}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => setKeywords(e.target.value)}/>
                <CustomSelect label="Category" options={categoryOptions} value={category}
                              onChange={(e: string) => setCategory(e)}/>
            </div>
            <div className={s.Descriptions}>
                <label>Descriptions</label>
                <textarea className='form-control' style={{height: "20vh"}} placeholder={"Text your description here"}
                          id="Descriptions" value={descriptions} onChange={(e) => setDescriptions(e.target.value)}/>
                {attachments[0] && (<Thumbs/>)}
            </div>
            <CustomDropZone label="Attachments" AllowButton={1} onDrop={handleDrop4}
                            p="Drag&Drop Your attachments here"/>
            <div className={s.double}>
                <CustomSelect label="Preferred currency" options={options} value={preferred_currency}
                              onChange={(e: string) => setPreferred_currency(e)}/>
                <InputText element="Preferred unit price" value={preferred_unit_price}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => setPreferred_unit_price(e.target.value)}/>
            </div>
            <div className={s.double}>
                <InputText element="Preferred shipping aggreement" value={preferred_shipping_agreement}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => setPreferred_shipping_agreement(e.target.value)}/>
                <InputText element="Destination port" value={destinationPort}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => setDestinationPort(e.target.value)}/>
            </div>
            <div>
                <label>Payment method</label>

                <Select options={categoryOptions} onChange={(e: any) => setPayment_method(e)}/>
            </div>
            <div>
                <input type={"checkbox"} onChange={() => setPrivacy_policy(!privacy_policy)}/>
                <small>I agree with privacy policy</small>
            </div>
            <button className={s.button} type={"submit"}>
                SUBMIT
            </button>
        </form>
    </div>)
}