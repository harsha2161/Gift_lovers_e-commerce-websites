import { createClient } from "@supabase/supabase-js"

    const url = "https://dnsaskubdliqcxxjxjum.supabase.co"
    const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRuc2Fza3ViZGxpcWN4eGp4anVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MDQ4NzYsImV4cCI6MjA5MDI4MDg3Nn0.ZODP5O94PZI3Ic8IMHPhUoivhgrtb1JOX77us5jYotE"
    const supabase = createClient(url,key)

    export default function mediaUpload(file){
        
        const mediaUploadPromis = new Promise(
            (resolve , reject) =>{
                if(file == null){
                    reject("no file selected")
                    return
                }
                
        const timeStamp = new Date().getTime()
        const newName = timeStamp + file.name
        
        supabase.storage.from("images").upload(newName, file, {
            upsert : false,
            cacheControl : "3600"
        }).then(() => {
            console.log("image upload successfull")

            const publicUrl = supabase.storage.from("images").getPublicUrl(newName)
            resolve(publicUrl.data.publicUrl)
             
        }).catch(
            (e) => {
                console.log(e)
                reject("Error occured in superbase connection")
            }
        )
            }

        )  // out put has been promise

        return mediaUploadPromis;
    }

