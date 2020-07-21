import React, {useEffect, useState} from "react";
import Dropzone from "react-dropzone";
import s from './ProfileEdit.module.css'
import defaultImage from '../../../../media/default.jpg'
import {profileAPI} from "../../../../api";
import Select from 'react-select'

let InputText = (props) => {
    return (<div><label>{props.element}</label>
            <input className='form-control' type="text" placeholder={props.element} id={props.element}
                   value={props.value} onChange={props.onChange} required/>
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

export const ProfileEdit = (props) => {


    const [CompanyProfilePicture, setCompanyProfilePicture] = useState([]);

    const [CompanyLogo, setCompanyLogo] = useState([]);
    const [background, setBackground] = useState('')
    const [CompanyName, setCompanyName] = useState('')
    const [Country, setCountry] = useState('')
    const [CompanyDescription, setCompanyDescription] = useState('')
    const [Section, setSection] = useState([{Title: "", Icon: "", Text: ""}]);
    const [Documents, setDocument] = useState([{Title: "", Thumbnail: "", Download: ""}]);


    const options = props.countries.map(c => {
        return {value: c.name, label: c.name}
    })


    const handleSubmit = (e) => {
        e.preventDefault()
        debugger
        let form_data = new FormData();
        form_data.append('CompanyProfilePicture', CompanyProfilePicture[0], CompanyProfilePicture[0].name);
        form_data.append('CompanyLogo', CompanyLogo[0], CompanyLogo[0].name);
        form_data.append("Sections", JSON.stringify(Section))
        form_data.append("Documents", JSON.stringify(Documents))
        form_data.append('CompanyName', CompanyName);
        form_data.append('CompanyDescription', CompanyDescription);
        form_data.append('Country', Country.value);
        form_data.append('owner', String(props.userID));
        profileAPI.PostProfile(form_data)
    }


    const handleDrop = acceptedFiles => {
        setCompanyProfilePicture(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
        setBackground(acceptedFiles.map(file => URL.createObjectURL(file)))
    }

    const Thumbs = (props) => {
        debugger
        const index = props.index
        const file = Documents[index]
            return (
        <div style={thumb} key={file.name}>
            <div className={s.thumbInner}>
                <img
                    alt="thumbnail"
                    src={file.preview}
                    style={img}
                />
            </div>
        </div>)
    }


    const handleDrop4 = acceptedFiles => {
        setCompanyLogo(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }
    const CustomDropZone = (props) => {

        return (
            <div>
                <label>{props.label}</label>
                <section className={s.thumb}>

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

    const SectionhandleInputChange = (e, index) => {
        const {name, value} = e.target;
        const list = [...Section];
        list[index][name] = value;
        setSection(list);
    };

    const DocumenhandleInputChange = (e, index) => {
        const {name, value} = e.target;
        const list = [...Documents];
        list[index][name] = value;
        setDocument(list);
    };


    const DocumenthandleInputFileThumbnail = (acceptedFiles, index) => {
        const {name, preview} = Object.assign(acceptedFiles[0], {preview: URL.createObjectURL(acceptedFiles[0])});
        const list = [...Documents];
        list[index]['name'] = name;
        list[index]['preview'] = preview;

        setDocument(list);
    }

    const DocumenthandleInputDownload = (acceptedFiles, index) => {
        const {name} = acceptedFiles[0]
        const list = [...Documents];
        list[index]['Download'] = name;


        setDocument(list);
    }


    const handleRemoveClick = index => {
        const list = [...Section];
        list.splice(index, 1);
        setSection(list);
    };

    const handleRemoveClick2 = index => {
        const list = [...Documents];
        list.splice(index, 1);
        setDocument(list);
    };

    const handleAddClick = () => {
        setSection([...Section, {Title: "", Icon: "", Text: ""}]);
    };

    const handleAddClick2 = () => {
        setDocument([...Documents, {Title: "", Icon: "", Text: ""}]);
    };


    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        CompanyProfilePicture.forEach(file => URL.revokeObjectURL(file.preview));
    }, [CompanyProfilePicture]);
    return (
        <form className="form-group" onSubmit={handleSubmit}>
            <section style={
                {backgroundImage: `linear-gradient( rgba(56, 56, 56, 0.596), rgba(56, 56, 56, 0.596) ), url(${background || defaultImage})`}}
                     className={s.pic}>
                <Dropzone onDrop={handleDrop}>
                    {({getRootProps, getInputProps}) => (
                        <div {...getRootProps({className: "dropzone"})}>
                            <div className={s.compamyPictureform}>
                                <input {...getInputProps()} />
                                <div className={s.clip}/>
                                <p>Drag & Drop your company picture here</p>
                                <h5>Company Profile Picture</h5>
                                <button type="button">
                                    Upload
                                </button>
                            </div>
                        </div>

                    )}
                </Dropzone>
            </section>
            <InputText element="CompanyName" onChange={e => setCompanyName(e.target.value)} required/>
            <Select options={options} value={Country} onChange={(e) => setCountry(e)}/>
            <InputText element="CompanyDescription" value={CompanyDescription}
                       onChange={e => setCompanyDescription(e.target.value)} required/>
            <CustomDropZone label="Company Logo" AllowButton={1} onDrop={handleDrop4}
                            p="Drag&Drop Your attachments here"/>

            {Section.map((x, i) => {
                return (
                    <div>
                        <h2>Section</h2>
                        <label>Title</label>
                        <input className='form-control' placeholder="Title" name="Title" value={x.Title}
                               onChange={e => SectionhandleInputChange(e, i)}/>
                        <label>Icon</label>
                        <input className='form-control' placeholder="Icon" name="Icon" value={x.Icon}
                               onChange={e => SectionhandleInputChange(e, i)}/>
                        <label>Text</label>
                        <input className='form-control' placeholder="Text" name="Text" value={x.Text}
                               onChange={e => SectionhandleInputChange(e, i)}/>
                        <div>
                            {Section.length !== 1 &&
                            <div className="text-danger" onClick={() => handleRemoveClick(i)}>Remove</div>}
                            {Section.length - 1 === i && <div className="text-danger" onClick={() => {
                                handleAddClick()
                            }}>Add 1 Section</div>}
                        </div>
                    </div>
                )
            })}


            {Documents.map((y, i) => {
                return (
                    <div>
                        <h2>Document</h2>
                        <label>Title</label>
                        <input className='form-control' placeholder="Title" name="Title" value={y.Title}
                               onChange={e => DocumenhandleInputChange(e, i)}/>

                        {Documents[i].name && (<Thumbs index = {i}/>)}

                        <CustomDropZone name="Thumbnail" label="Thumbnail" AllowButton={0}
                                        onDrop={acceptedFiles => DocumenthandleInputFileThumbnail(acceptedFiles, i)}
                                        p="Drag&Drop Your attachments here"/>
                        <CustomDropZone name="Download" label="Download" AllowButton={1}
                                        onDrop={acceptedFiles => DocumenthandleInputDownload(acceptedFiles, i)}
                                        p="Drag&Drop Your attachments here"/>
                        <div>
                            {Documents.length !== 1 &&
                            <div className="text-danger" onClick={() => handleRemoveClick2(i)}>Remove</div>}
                            {Documents.length - 1 === i && <div className="text-danger" onClick={() => {
                                handleAddClick2()
                            }}>Add 1 Section</div>}
                        </div>
                    </div>
                )
            })}
            <button className={s.button} type={"submit"}>Send Form</button>
        </form>
    );
}



