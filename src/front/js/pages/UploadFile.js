import React, {useState} from "react";

export const UploadFile = () => {

    const [file, setfile] = useState(null)
    const handleFiles = (files) => {
        setfile(files[0])
      
    }

return <>

<div  className="text-center">
    {
        file &&
        <img src= {URL.createObjectURL(file) } alt="image-preview" style={{ maxWidth: '300px'}} />
    }
    <input type= "file" id= "archivos" name="archivos" accept= ".jpg, .png, .git"  onChange={(event) => handleFiles(event.target.files)} />

</div>

</>

}