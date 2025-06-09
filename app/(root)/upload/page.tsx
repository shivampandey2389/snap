'use client'
import FileInput from "@/components/FileInput"
import FormField from "@/components/FormField"
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "@/constants"
import { getThumbnailUploadUrl, getVideoUploadUrl, saveVideoDetails } from "@/lib/action/video"
import { useFileInput } from "@/lib/hooks/useFileInput"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"


const uploadFileToBunny = (file:File,uploadUrl:string,accessKey:string):Promise<void> =>{
  return fetch(uploadUrl,{
    method:'PUT',
    headers:{
      'Content-Type':file.type,
      AccessKey:accessKey
    },
    body:file,
  }).then((response)=>{
    if(!response) throw new Error('Upload Failed')
  })
}

const page = () => {
  const router = useRouter();
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [videoDuration,setVideoDuration] = useState(0);

 

  const [formData,setFormData] = useState({
    title:'',
    description:'',
    visibility:'public',
  })
  const video=useFileInput(MAX_VIDEO_SIZE);
  const thumbnail =useFileInput(MAX_THUMBNAIL_SIZE);
  
  useEffect(()=>{
    if(video.duration !== null ||0){
      setVideoDuration(video.duration)
    }
  },[video.duration])


  const[error,setError]=useState('');
  const handleInputChange =(e: ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target;
    setFormData((prevState)=>({...prevState,[name]:value}))
  }

  const handleSubmit = async(e:FormEvent) =>{
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if(!video.file || !thumbnail.file){
        setError('Please upload video and  thumbnail')
        return;
      }

      if(!formData.title || !formData.description){
        setError('Please fill in all the details')
        return;
      }

      const {videoId,uploadUrl:videoUploadUrl,accessKey:videoAccessKey} = await getVideoUploadUrl();

      if(!videoUploadUrl || !videoAccessKey) throw new Error('Failed to get upload credentials')

      await uploadFileToBunny(video.file,videoUploadUrl,videoAccessKey)

      const {uploadUrl:thumbnailUploadUrl,accessKey:thumbnailAccessKey,cdnUrl:thumbnailCdnUrl} = await getThumbnailUploadUrl(videoId);

    if(!thumbnailUploadUrl || !thumbnailAccessKey || !thumbnailCdnUrl) throw new Error('Failed to get thumnail upload credentials')

      await uploadFileToBunny(thumbnail.file,thumbnailUploadUrl,thumbnailAccessKey)

      await saveVideoDetails({
        videoId,
        thumbnailUrl:thumbnailCdnUrl,
        ...formData,
        duration:videoDuration
      })

      router.push(`/video/${videoId}`);
    } catch (error) {
      console.log(`Error in submitting: ${error}`)
    }finally{
      setIsSubmitting(false);
    }
  }
  
  return (
    <div className="wrapper-md upload-page">
      <h1>Upload a video</h1>
      {
        error && <div className="error-field">{error}</div>
      }

      <form className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5" onSubmit={handleSubmit}>
        <FormField
          id="title"
          label="Title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter a clear and concise video title "
        />

        <FormField
          id="description"
          label="Description"
          value={formData.description}
          onChange={handleInputChange}
          as="textarea"
          placeholder="Describe the video is proper and concise word"
        />

        <FileInput 
        id="video" 
        label="Video" 
        accept="videos/*" 
        file={video.file} 
        previewUrl={video.previewUrl} 
        inputRef={video.inputRef}
        onChange ={video.handleFileChange}
        onReset={video.resetFile}
        type="video"
        />

        <FileInput 
        id="thumbnail" 
        label="Thumbnail" 
        accept="image/*" 
        file={thumbnail.file} 
        previewUrl={thumbnail.previewUrl} 
        inputRef={thumbnail.inputRef}
        onChange ={thumbnail.handleFileChange}
        onReset={thumbnail.resetFile}
        type="image"
        />

        <FormField
          id="visibility"
          label="Visibility"
          value={formData.visibility}
          onChange={handleInputChange}
          as="select"
          options={[
            {value:'public',label:'Public'},
            {value:'private',label:'Private'}
          ]}
        />

        <button type="submit" disabled={isSubmitting} className="submit-button">{
          isSubmitting ? 'Uploading......':'Upload video'
}
        </button>
      </form>
    </div>
  )
}

export default page