import React, {useState} from "react";
import Dropzone from "react-dropzone";
import s from './ProfileEdit.module.css'
import {profileAPI} from "../../../../api";
let InputText = (props) => {
  return (<div><label>{props.element}</label>
    <input className='form-control' type="text" placeholder={props.element} id={props.element} value={props.value} onChange={props.onChange} required/>
    </div>
)}

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
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

  const CustomDropZone = (props) => {

    return(
      <div className={s.dropwrapper}>
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

export const Document = () => {
  const [DocumentThumbnail, setDocumentThumbnail] = useState([]);
  const [DocumentTitle, setDocumentTitle] = useState('')
  const [DocumentDownload, setDocumentDownload] = useState([])

    const handleSubmit = (e) => {
    e.preventDefault();
    debugger
    let form_data_document = new FormData()
    form_data_document.append('Thumbnail', DocumentThumbnail[0], DocumentThumbnail[0].name);
    form_data_document.append('Download', DocumentDownload[0], DocumentDownload[0].name);
    form_data_document.append('Title', DocumentTitle);
    profileAPI.PostDocument(form_data_document)

  }

    const thumbs2 = DocumentThumbnail.map(file => (
    <div style={thumb} key={file.name}>
      <div className={s.thumbInner}>
        <img
          alt="thumbnail"
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));

      const handleDrop3 = acceptedFiles => {
    setDocumentDownload(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }

  const handleDrop2 = acceptedFiles => {
    setDocumentThumbnail(acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  }

  return (
    <form onSubmit={handleSubmit}>
    <h2>Document</h2>
    <InputText element="DocumentTitle" value={DocumentTitle} onChange={e => setDocumentTitle(e.target.value)} required/>
    <aside className={s.thumbsContainer}>
      {thumbs2}
    </aside>

    <CustomDropZone label = "Thunbnail" AllowButton={0} onDrop = {handleDrop2} p="Drag&Drop Your attachments here"/>
    <CustomDropZone label = "Download" AllowButton={1} onDrop = {handleDrop3} p="Drag&Drop Your attachments here"/>
    <button className={s.button} >Lets go</button>
    </form>
  )
}



