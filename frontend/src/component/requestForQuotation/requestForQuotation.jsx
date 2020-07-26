import React, {useState} from "react";
import s from './requestForQuotation.module.css'
import style from '../accounts/Profile/ProfileEdit/ProfileEdit.module.css'
import Dropzone from "react-dropzone";
import Select from 'react-select'



let InputText = (props) => {
    return (<div className={s.inputText}>
            <label>{props.element}</label>
            <input className='form-control' type={props.type} placeholder={`Input your ${props.element.toLowerCase()}`} id={props.element} value={props.value} onChange={props.onChange} required/>
        </div>
    )}

let CustomSelect = (props) => {
    return(
        <div className={s.customSelect}>
            <label>{props.label}</label>
            <Select className={s.select} options={props.options} placeholder = {`Choose your ${props.label.toLowerCase()} from list`} value={props.value} onChange={props.onChange}/>
        </div>
    )
}
const thumb = {
    display: 'inline-flex',
    borderRadius: 10,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};


const img = {
    display: 'block',
    width: 'auto',
    height: '100%'

};

export const RequestForQuotation = (props) => {



    const CustomDropZone = (props) => {

        return (
            <div>
                <label>{props.label}</label>
                <section className={style.thumb}>

                    <Dropzone name={props.name} onDrop={props.onDrop}>
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

    const handleDrop4 = aceptedFiles => {
        debugger
        setAttachments(aceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)

        }
        )));
        console.log(attachments)
    }


    const Thumbs = (props) => {
        debugger
        const file = attachments[0]
        return (
            <div style={thumb} key={file.name}>
                <div className={style.thumbInner}>
                    <img
                        alt="thumbnail"
                        src={file.preview}
                        style={img}
                    />
                </div>
            </div>)
    }

    const options = props.currency.map(c => {
        return {value: c.currencies[0].code, label: c.currencies[0].code}
    })

    const categoryOptions = props.category.map(c => {
        return {value: c.Name, label: c.Name}
    })

    const [keywords, setKeywords] = useState("")
    const [category, setCategory] = useState("")
    const [descriptions, setDescriptions] = useState("")
    const [attachments, setAttachments] = useState("")
    const [preferred_currency, setPreferred_currency] = useState("")
    const [preferred_unit_price, setPreferred_unit_price] = useState("")
    const [preferred_shipping_aggreement, setPreferred_shipping_aggreement] = useState("")
    const [destinationPort, setDestinationPort] = useState("")
    const [payment_method, setPayment_method] = useState("")
    const [privacy_policy, setPrivacy_policy] = useState(false)
    return (<div className={s.main}>
        <h2>Tell suppliers what you need</h2>
        <p>The more specific your information, the more accurately we can match your request to the right suppliers</p>
    <form className="form-group" >
        <div className={s.double}>
        <InputText element = "Keywords"  value={keywords} onChange={(e) => setKeywords(e.target.value)}/>
        <CustomSelect label="Category" options={categoryOptions} value={category} onChange={(e) => setCategory(e)} />
            </div>
        <div className={s.Descriptions}>
        <label>Descriptions</label>
        <textarea className='form-control' style={{height: "20vh"}}  placeholder={"Text your description here"} id ="Descriptions"  value={descriptions} onChange={(e) => setDescriptions(e.target.value)}/>
        {attachments[0] && (<Thumbs/>)}
        </div>
        <CustomDropZone label="Attachments" AllowButton={1} onDrop={handleDrop4} p="Drag&Drop Your attachments here"/>
        <div className={s.double}>
        <CustomSelect label="Preferred currency" options={options} value={preferred_currency} onChange={(e) => setPreferred_currency(e)} />
        <InputText element = "Preferred unit price" value={preferred_unit_price} onChange={(e) => setPreferred_unit_price(e.target.value)}/>
        </div>
        <div className={s.double}>
        <InputText element = "Preferred shipping aggreement" value={preferred_shipping_aggreement} onChange={(e) => setPreferred_shipping_aggreement(e.target.value)}/>
        <InputText element = "Destination port" value={destinationPort} onChange={(e) => setDestinationPort(e.target.value)}/>
        </div>
        <div>
        <label>Payment method</label>
        <Select options={categoryOptions} value={payment_method} onChange={(e) => setPayment_method(e)} />
        </div>
        <div>
        <input type={"checkbox"}  value={privacy_policy} onChange={() => setPrivacy_policy(!privacy_policy)}/>
        <small>I agree with privacy policy</small>
        </div>
        <button className={s.button} type={"submit"}>
            SUBMIT
        </button>
    </form>
    </div>)
}