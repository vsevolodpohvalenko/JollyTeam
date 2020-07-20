import React, {useEffect, useState} from "react";
import Dropzone from "react-dropzone";
import s from './ProfileEdit.module.css'
import defaultImage from '../../../../media/default.jpg'
import {profileAPI} from "../../../../api";
import Select from 'react-select'
import {Document} from "./Document";



let InputText = (props) => {
  return (<div><label>{props.element}</label>
    <input className='form-control' type="text" placeholder={props.element} id={props.element} value={props.value} onChange={props.onChange} required/>
    </div>
)}

export  const ProfileEdit = (props) => {


  const [CompanyProfilePicture, setCompanyProfilePicture] = useState([]);

  const [CompanyLogo, setCompanyLogo] = useState([]);
  const [background, setBackground] = useState('')
  const [CompanyName, setCompanyName] = useState('')
  const [Country, setCountry] = useState('')
  const [CompanyDescription, setCompanyDescription] = useState('')
  const [SectionsTitle, setSectionsTitle] = useState('')
  const [SectionText, setSectionText] = useState('')

  const [SectionIcon, setSectionIcon] = useState('')


  const options = props.countries.map(c => {
      return {value: c.name, label: c.name}
  })



  const handleSubmit = (e) => {
    e.preventDefault();
    debugger
    let form_data = new FormData();
    let form_data_section = new FormData()
    form_data.append('CompanyProfilePicture', CompanyProfilePicture[0], CompanyProfilePicture[0].name);
    form_data.append('CompanyLogo', CompanyLogo[0], CompanyLogo[0].name);
    form_data_section.append('Icon', SectionIcon);
    form_data.append('CompanyName', CompanyName);
    form_data.append('CompanyDescription', CompanyDescription);
    form_data.append('Country', Country.value);
    form_data_section.append('Title', SectionsTitle);
    form_data_section.append('Text', SectionText);
    form_data.append('owner', String(props.userID));
    profileAPI.PostProfile(form_data)
    profileAPI.PostSection(form_data_section)
  }


  const handleDrop = acceptedFiles => {
    setCompanyProfilePicture(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
    setBackground(acceptedFiles.map(file => URL.createObjectURL(file)))
  }

  const handleDrop4 = acceptedFiles => {
    setCompanyLogo(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }
  const CustomDropZone = (props) => {

    return(
      <div >
        <label>{props.label}</label>
      <section  className={s.thumb}>

       <Dropzone onDrop={props.onDrop}>
         {({ getRootProps, getInputProps}) => (
           <div {...getRootProps({ className: "dropzone" })}>

             <input {...getInputProps()} />
             <div className={s.clip}/>
            <p>{props.p}</p>
             <h5>{props.h5}</h5>

           {!!props.AllowButton && (<button type="button" >
             Upload
           </button>)}
           </div>
         )}
       </Dropzone>
       </section>
       </div>
    )
  }
  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    CompanyProfilePicture.forEach(file => URL.revokeObjectURL(file.preview));
  }, [CompanyProfilePicture]);
  return (
    <form className="form-group" onSubmit={handleSubmit}>
      <section style = {
       {backgroundImage: `linear-gradient( rgba(56, 56, 56, 0.596), rgba(56, 56, 56, 0.596) ), url(${background || defaultImage})`}} className={s.pic}>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps}) => (
          <div {...getRootProps({ className: "dropzone" })}>
            <div className={s.compamyPictureform}>
            <input {...getInputProps()} />
            <div className={s.clip}/>
            <p>Drag & Drop your company picture here</p>
            <h5>Company Profile Picture</h5>
          <button type="button" >
            Upload
          </button>
          </div>
          </div>

        )}
      </Dropzone>
      </section>
      <InputText element="CompanyName"  onChange={e => setCompanyName(e.target.value)} required/>
      <Select options={options} value={Country}  onChange={(e) => setCountry(e)}/>
      <InputText element="CompanyDescription" value={CompanyDescription} onChange={e => setCompanyDescription(e.target.value)} required/>
      <CustomDropZone label = "Company Logo" AllowButton={1} onDrop = {handleDrop4} p="Drag&Drop Your attachments here"/>

      <h2>Section</h2>
      <InputText element="SectionsTitle" value={SectionsTitle} onChange={e => setSectionsTitle(e.target.value)} required/>
      <InputText element="SectionIcon" value={SectionIcon} onChange={e => setSectionIcon(e.target.value)} required/>

      <InputText element="SectionText" value={SectionText} onChange={e => setSectionText(e.target.value)} required/>
      <Document/>
      <Document/>
      <button className={s.button}>Lets go</button>
      </form>
  );
}



