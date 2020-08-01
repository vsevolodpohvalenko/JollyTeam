import React, {useState} from "react";
import Dropzone from "react-dropzone";
import s from './ProfileEdit.module.css'
import defaultImage from '../../../../media/default.jpg'
import defaultThumbnail from '../../../../media/thumbnail.jpg'
import {profileAPI} from "../../../../api";
import Select from 'react-select'


let InputText = (props) => {
    return (<div id={s.doubleInput}><label>{props.element}</label>
            <input className='form-control'  type="text" placeholder={props.element} id={props.element}
                   value={props.value} onChange={props.onChange} />
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
    const options = props.countries.map(c => {
        return {value: c.name, label: c.name}
    })
    const categoryOptions = props.category.map(c => {
        return {value: c.Name, label: c.Name}
    })

    const [companyProfilePicture, setCompanyProfilePicture] = useState();

    const [companyLogo, setCompanyLogo] = useState();
    const [background, setBackground] = useState(props.previousProfile[(props.userID)-1].companyProfilePicture)
    const [companyName, setCompanyName] = useState( props.previousProfile[(props.userID)-1].companyName )
    const [country, setCountry] = useState(props.previousProfile[(props.userID)-1].country)
    const [companyDescription, setCompanyDescription] = useState(props.previousProfile[(props.userID)-1].companyDescription)
    const [section, setSection] = useState(JSON.parse(props.previousProfile[(props.userID)-1].sections));
    const [Documents, setDocument] = useState( props.documents);





    const handleSubmit = (e) => {
        e.preventDefault()
        debugger
        let form_data = new FormData();
        companyProfilePicture !== undefined && (form_data.append('companyProfilePicture', companyProfilePicture[0], companyProfilePicture[0].name))
        companyLogo !== undefined && (form_data.append('companyLogo',  companyLogo[0], companyLogo[0].name));
        form_data.append("sections", JSON.stringify(section))
        form_data.append('companyName', companyName);
        form_data.append('companyDescription', companyDescription);
        form_data.append('country', country.value || country);
        form_data.append('owner', props.userID);
        const id = props.userID
        props.updateManufacturer(form_data, id)

        Documents.forEach( (e, index)=> {
            let form_doc_data = new FormData();
            form_doc_data.append('Title', e.Title);
            Documents[index].Thumbnail.name  &&   form_doc_data.append('Thumbnail', e.Thumbnail);
            Documents[index].Download.name && form_doc_data.append("Download", e.Download)
            form_doc_data.append('owner', props.userID);
            props.updateDocument(form_doc_data, (props.documents[index].id)-1)
        })


    }


    const handleDrop = aceptedFiles => {
        setCompanyProfilePicture(aceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
        setBackground(aceptedFiles.map(file => URL.createObjectURL(file)))
    }

    const Thumbs = (props) => {
        const index = props.index
        const file = Documents[index]
            return (
        <div style={thumb} key={file.name}>
            <div className={s.thumbInner}>
                <img
                    alt="thumbnail"
                    src={(file.Thumbnail.preview ? file.Thumbnail.preview : file.Thumbnail) || defaultThumbnail}
                    style={img}
                />
            </div>
        </div>)
    }


    const handleDrop4 = aceptedFiles => {
        debugger
        setCompanyLogo(aceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }
    const CustomDropZone = (props) => {

        return  (
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
        debugger
        const {name, value} = e;
        const list = [...section];
        list[index][name] = value;
        setSection(list);
    };



    const DocumenhandleInputChange = (e, index) => {
        const {name, value} = e.target;
        const list = [...Documents];
        list[index][name] = value;
        setDocument(list);
    };


    const DocumenthandleInputFileThumbnail = (aceptedFiles, index) => {
        const {preview} = Object.assign(aceptedFiles[0], {preview: URL.createObjectURL(aceptedFiles[0])});
        const list = [...Documents];
        list[index]['Thumbnail'] = aceptedFiles[0];
        list[index]['preview'] = preview;

        setDocument(list);
    }

    const DocumenthandleInputDownload = (aceptedFiles, index) => {
        debugger
        const list = [...Documents];
        list[index]['Download'] = aceptedFiles[0];


        setDocument(list);
    }


    const handleRemoveClick = index => {
        const list = [...section];
        list.splice(index, 1);
        setSection(list);
    };

    const handleRemoveClick2 = index => {
        profileAPI.DeleteDocuments((Documents[index].id)-1)
        const list = [...Documents];
        list.splice(index, 1);
        setDocument(list);
    };

    const handleAddClick = () => {
        setSection([...section, {Title: "", Icon: "", Text: ""}]);
    };

    const handleAddClick2 = () => {
        props.postDocument(props.userID)
        setDocument([...Documents, {Title: "", Thumbnail: "", Download: ""}])


    };



    return  (
        <form  className="form-group" onSubmit={handleSubmit}>
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
            <div id={s.main}>
            <div className={s.double}>
            <InputText element="companyName" value={companyName} onChange={e => setCompanyName(e.target.value)} />
            <div className={s.select}>
            <label>Country</label>
            <Select options={options} defaultValue={{ label: country, value: country }} placeholder={"Choose your country"} onChange={(e) => setCountry(e)}/>
            </div>
            </div>
            <InputText element="companyDescription" value={companyDescription}
                       onChange={e => setCompanyDescription(e.target.value)} />
            <CustomDropZone label="Company Logo" AllowButton={1} onDrop={handleDrop4}
                            p="Drag&Drop Your attachments here"/>

            {section.map((x, i) => {
                return (
                    <div key={i}>
                        <h2>Section</h2>
                        <div className={s.double}>
                        <div id={s.doubleInput}>
                        <label>Title</label>
                        <input className='form-control' placeholder="Title" name="Title" value={x.Title}
                               onChange={e => SectionhandleInputChange(e.target, i)}/>
                        </div>
                        <div id={s.doubleInput}>
                        <label>Icon</label>
                        <Select options={categoryOptions} defaultValue={{ label: x.Icon, value: x.Icon }}    placeholder="Icon"  onChange={e => SectionhandleInputChange({
                            name: "Icon",
                            value: e.value
                        }, i)}/>
                        </div>
                        </div>
                        <label>Text</label>
                        <input className='form-control' placeholder="Text" name="Text" value={x.Text}
                               onChange={e => SectionhandleInputChange(e.target, i)}/>
                        <div>
                            {section.length !== 1 &&
                            <div className="text-danger" onClick={() => handleRemoveClick(i)}>Remove</div>}
                            {section.length - 1 === i && <div className="text-danger" onClick={() => {
                                handleAddClick()
                            }}>Add 1 Section</div>}
                        </div>
                    </div>
                )
            })}


            {Documents.map((y, i) => {
                return (
                    <div key={i}>
                        <h2>Document</h2>
                        <label>Title</label>
                        <input className='form-control' placeholder="Title" name="Title" value={y.Title}
                               onChange={e => DocumenhandleInputChange(e, i)}/>

                        <Thumbs documents = {props.documents} userID = {props.userID} index = {i}/>

                        <CustomDropZone name="Thumbnail" label="Thumbnail" AllowButton={0}
                                        onDrop={aceptedFiles => DocumenthandleInputFileThumbnail(aceptedFiles, i)}
                                        p="Drag&Drop Your attachments here"/>
                        <CustomDropZone name="Download" label="Download" AllowButton={1}
                                        onDrop={aceptedFiles => DocumenthandleInputDownload(aceptedFiles, i)}
                                        p="Drag&Drop Your attachments here"/>
                        <div>
                            {Documents.length !== 1 &&
                            <div className="text-danger" onClick={() => handleRemoveClick2(i)}>Remove</div>}
                            {Documents.length - 1 === i && <div className="text-danger" onClick={() => {
                                handleAddClick2()
                            }}>Add 1 Document</div>}
                        </div>
                    </div>
                )
            })}
            <button className={s.button} type={"submit"}>Send Form</button>
            </div>
        </form>
    )
}



