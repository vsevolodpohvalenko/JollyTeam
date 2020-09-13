import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import Dropzone from "react-dropzone";
import s from './ProfileEdit.module.css'
import defaultImage from '../../../../media/default.jpg'
import defaultThumbnail from '../../../../media/thumbnail.jpg'
import Select from 'react-select'
import {CustomDropZoneType} from "./Document";
import {profileAPI} from "../../../../api/profileApi";
import {useDispatch, useSelector} from "react-redux";
import {
    GetCategory,
    GetDocuments,
    GetProfiles,
    postDocument, updateDocument,
    updateManufacturer
} from "../../../../redux/reducers/ProfileReducer";
import {
    GetCategorySelector,
    GetCountriesSelector, GetDocumentsSelector,
    GetSuitableProfile,
    GetUserIDSelector
} from "../../../../redux/reducers/Profile-selectors";

type InputProps = {
    element: string,
    value: any,
    onChange: any
}

let InputText = (props: InputProps) => {
    return (<div id={s.doubleInput}><label>{props.element}</label>
            <input className='form-control' type="text" placeholder={props.element} id={props.element}
                   value={props.value} onChange={props.onChange}/>
        </div>
    )
}

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'

};


export const ProfileEdit = () => {
    const countries: Array<any> = useSelector(GetCountriesSelector)
    const userID: number = useSelector(GetUserIDSelector)
    const previousProfile: Array<{
        id: number,
        companyProfilePicture: string,
        companyName: string,
        companyDescription: string,
        country: string,
        companyLogo: string,
        sections: string,
        owner: number
    }> = useSelector(GetSuitableProfile)
    const documents = useSelector(GetDocumentsSelector)
    const category: Array<{
        id: number,
        Name: string
    }> = useSelector(GetCategorySelector)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetProfiles())
        dispatch(GetCategory())
        dispatch(GetDocuments())
        dispatch(GetCategory())
    }, [])

    const updateMan = (form_data: any, id: number) => dispatch(updateManufacturer(form_data, id))
    const postDoc = (id: number) => dispatch(postDocument(id))
    const updateDoc = (data: any, id: number) => dispatch(updateDocument(data, id))
    const options = countries.map(c => {
        return {value: c.name, label: c.name}
    })
    const categoryOptions = category.map(c => {
        return {value: c.Name, label: c.Name}
    })

    const [companyProfilePicture, setCompanyProfilePicture] = useState<any>();
    const [companyLogo, setCompanyLogo] = useState<Array<any>>();
    const [background, setBackground] = useState<string | Array<any>>(previousProfile[(userID) - 1].companyProfilePicture)
    const [companyName, setCompanyName] = useState<string>(previousProfile[(userID) - 1].companyName)
    const [country, setCountry] = useState<string | { value: string, label: string }>(previousProfile[(userID) - 1].country)
    const [companyDescription, setCompanyDescription] = useState<string>(previousProfile[(userID) - 1].companyDescription)
    const [section, setSection] = useState<any>(JSON.parse(previousProfile[(userID) - 1].sections));
    const [Documents, setDocument] = useState<any>(documents);


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        debugger
        let form_data = new FormData();
        companyProfilePicture !== undefined && (form_data.append('companyProfilePicture', companyProfilePicture[0], companyProfilePicture[0].name))
        companyLogo !== undefined && (form_data.append('companyLogo', companyLogo[0], companyLogo[0].name));
        form_data.append("sections", JSON.stringify(section))
        form_data.append('companyName', companyName);
        form_data.append('companyDescription', companyDescription);
        if (typeof country !== "string") {
            form_data.append('country', country.value);
        } else {
            form_data.append('country', country);
        }
        form_data.append('owner', String(userID));
        const id = userID
        updateMan(form_data, id)

        Documents.forEach((e: {
            id: number,
            Title: string,
            Thumbnail: string,
            Download: string,
            owner: number
        }, index: number) => {
            let form_doc_data = new FormData();
            form_doc_data.append('Title', e.Title);
            Documents[index].Thumbnail.name && form_doc_data.append('Thumbnail', e.Thumbnail);
            Documents[index].Download.name && form_doc_data.append("Download", e.Download)
            form_doc_data.append('owner', String(userID));
            updateDoc(form_doc_data, (documents[index].id) - 1)
        })


    }


    const handleDrop = (acceptedFiles: any) => {
        setCompanyProfilePicture(acceptedFiles.map((file: any) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
        setBackground(acceptedFiles.map((file: any) => URL.createObjectURL(file)))
    }
    type ThumbsType = {
        index: number,
        documents: any,
        userID: number

    }
    const Thumbs = (props: ThumbsType) => {
        const index = props.index
        const file = Documents[index]
        return (
            <div className={s.preview} key={file.name}>
                <div className={s.thumbInner}>
                    <img
                        alt="thumbnail"
                        src={(file.Thumbnail.preview ? file.Thumbnail.preview : file.Thumbnail) || defaultThumbnail}
                        style={img}
                    />
                </div>
            </div>)
    }


    const handleDrop4 = (acceptedFiles: any) => {
        debugger
        setCompanyLogo(acceptedFiles.map((file: any) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }

    const CustomDropZone = (props: CustomDropZoneType) => {

        return (
            <div>
                <label>{props.label}</label>
                <section className={s.thumb}>

                    <Dropzone onDrop={props.onDrop}>
                        {({getRootProps, getInputProps}) => (
                            <div  {...getRootProps({className: "dropzone"})}>

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

    const SectionhandleInputChange = (e: { name: string, value: string }, index: number) => {
        debugger
        const {name, value} = e;
        const list = [...section];
        list[index][name] = value;
        setSection(list);
    };


    const DocumentedInputChange = (e: { target: { name: string, value: string } }, index: number) => {
        const {name, value} = e.target;
        const list = [...Documents];
        list[index][name] = value;
        setDocument(list);
    };


    const DocumenthandleInputFileThumbnail = (aceptedFiles: Array<any>, index: number) => {
        const {preview} = Object.assign(aceptedFiles[0], {preview: URL.createObjectURL(aceptedFiles[0])});
        const list = [...Documents];
        list[index]['Thumbnail'] = aceptedFiles[0];
        list[index]['preview'] = preview;

        setDocument(list);
    }

    const DocumenthandleInputDownload = (acceptedFiles: Array<any>, index: any) => {
        debugger
        const list = [...Documents];
        list[index]['Download'] = acceptedFiles[0];


        setDocument(list);
    }


    const handleRemoveClick = (index: number) => {
        const list = [...section];
        list.splice(index, 1);
        setSection(list);
    };

    const handleRemoveClick2 = (index: number) => {
        profileAPI.DeleteDocuments((Documents[index].id) - 1)
        const list = [...Documents];
        list.splice(index, 1);
        setDocument(list);
    };

    const handleAddClick = () => {
        setSection([...section, {Title: "", Icon: "", Text: ""}]);
    };

    const handleAddClick2 = () => {
        postDoc(userID)
        setDocument([...Documents, {Title: "", Thumbnail: "", Download: ""}])


    };


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
            <div id={s.main}>
                <div className={s.double}>
                    <InputText element="companyName" value={companyName}
                               onChange={(e: ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value)}/>
                    <div className={s.select}>
                        <label>Country</label>
                        <Select options={options} defaultValue={{label: country, value: country}}
                                placeholder={"Choose your country"} onChange={(e: any) => setCountry(e)}/>
                    </div>
                </div>
                <InputText element="companyDescription" value={companyDescription}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => setCompanyDescription(e.target.value)}/>
                <CustomDropZone label="Company Logo" AllowButton={1} onDrop={handleDrop4}
                                p="Drag&Drop Your attachments here"/>

                {section.map((x: { Icon: any, Title: string, Text: string }, i: number) => {
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
                                    <Select options={categoryOptions} defaultValue={{label: x.Icon, value: x.Icon}}
                                            placeholder="Icon" onChange={(e: any) => SectionhandleInputChange({
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


                {Documents.map((y: { Title: string }, i: number) => {
                    return (
                        <div key={i}>
                            <h2>Document</h2>
                            <label>Title</label>
                            <input className='form-control' placeholder="Title" name="Title" value={y.Title}
                                   onChange={e => DocumentedInputChange(e, i)}/>

                            <Thumbs documents={documents} userID={userID} index={i}/>

                            <CustomDropZone name="Thumbnail" label="Thumbnail" AllowButton={0}
                                            onDrop={(acceptedFiles: any) => DocumenthandleInputFileThumbnail(acceptedFiles, i)}
                                            p="Drag&Drop Your attachments here"/>
                            <CustomDropZone name="Download" label="Download" AllowButton={1}
                                            onDrop={(acceptedFiles: any) => DocumenthandleInputDownload(acceptedFiles, i)}
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



